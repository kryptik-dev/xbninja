// Load environment variables from .env file
require('dotenv').config();

const { Client, GatewayIntentBits, Events, AttachmentBuilder } = require('discord.js');
const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);
const AdmZip = require('adm-zip');
const express = require('express');
const cors = require('cors');

// Bot configuration
const config = {
  token: process.env.DISCORD_BOT_TOKEN,
  channelId: process.env.MONITOR_CHANNEL_ID, // Channel to monitor for file updates
  downloadPath: path.join(__dirname, 'temp'), // Store files in bot/temp folder first
  allowedUsers: process.env.ALLOWED_USER_IDS?.split(',') || [], // Users allowed to trigger updates
  fileTypes: ['.xex', '.zip', '.ini', '.rar', '.7z', '.exe'], // File types to monitor
  
  // GitHub configuration
  github: {
    token: process.env.GITHUB_TOKEN,
    owner: 'kryptik-dev',
    repo: 'xbninja',
    branch: 'master',
    path: 'Files/Ninja Files'
  },
  
  // Express server configuration
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0'
  }
};

// Create Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

// Create Express server
const app = express();
app.use(cors());
app.use(express.json());

// Bot status tracking
let botStats = {
  startTime: new Date(),
  filesProcessed: 0,
  lastFileProcessed: null,
  botStatus: 'starting',
  uptime: 0
};

// Update uptime every minute
setInterval(() => {
  botStats.uptime = Date.now() - botStats.startTime.getTime();
}, 60000);

// Express routes
app.get('/', (req, res) => {
  res.json({
    message: '🤖 NiNJA File Bot API',
    version: '1.0.0',
    status: 'running',
    uptime: Math.floor(botStats.uptime / 1000),
    startTime: botStats.startTime.toISOString()
  });
});

app.get('/status', (req, res) => {
  res.json({
    botStatus: botStats.botStatus,
    uptime: Math.floor(botStats.uptime / 1000),
    startTime: botStats.startTime.toISOString(),
    filesProcessed: botStats.filesProcessed,
    lastFileProcessed: botStats.lastFileProcessed,
    monitoredChannel: config.channelId,
    downloadPath: config.downloadPath,
    supportedFileTypes: config.fileTypes
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(botStats.uptime / 1000)
  });
});

app.get('/files', async (req, res) => {
  try {
    // Check if directory exists
    if (!await fs.pathExists(config.downloadPath)) {
      return res.status(404).json({ 
        error: 'Files directory not found',
        path: config.downloadPath,
        message: 'Directory does not exist or is not accessible'
      });
    }
    
    const files = await fs.readdir(config.downloadPath);
    const fileStats = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(config.downloadPath, file);
        const stat = await fs.stat(filePath);
        return {
          name: file,
          size: stat.size,
          sizeMB: (stat.size / 1024 / 1024).toFixed(2),
          modified: stat.mtime.toISOString()
        };
      })
    );
    
    res.json({
      files: fileStats,
      totalFiles: fileStats.length,
      totalSizeMB: (fileStats.reduce((sum, file) => sum + file.size, 0) / 1024 / 1024).toFixed(2),
      directory: config.downloadPath
    });
  } catch (error) {
    console.error('Error reading files directory:', error);
    res.status(500).json({ 
      error: 'Failed to read files directory',
      details: error.message,
      path: config.downloadPath
    });
  }
});

// Start Express server
const server = app.listen(config.server.port, config.server.host, () => {
  console.log(`🌐 Express server running on http://${config.server.host}:${config.server.port}`);
  console.log(`📊 Status: http://${config.server.host}:${config.server.port}/status`);
  console.log(`📁 Files: http://${config.server.host}:${config.server.port}/files`);
});

// Ensure download directory exists
async function ensureDownloadDir() {
  try {
    // Create the temp directory in bot folder
    await fs.ensureDir(config.downloadPath);
    console.log(`✅ Temp directory ensured: ${config.downloadPath}`);
    
    // Verify we can read the directory
    await fs.readdir(config.downloadPath);
    console.log(`✅ Temp directory is readable`);
    
    // Clean up any old files in temp
    const tempFiles = await fs.readdir(config.downloadPath);
    for (const file of tempFiles) {
      const filePath = path.join(config.downloadPath, file);
      await fs.remove(filePath);
      console.log(`🧹 Cleaned up old temp file: ${file}`);
    }
    
  } catch (error) {
    console.error('❌ Error creating temp directory:', error);
    console.error(`📁 Attempted path: ${config.downloadPath}`);
  }
}

// Download file from URL
async function downloadFile(url, filename) {
  try {
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream',
      timeout: 30000
    });

    const filePath = path.join(config.downloadPath, filename);
    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log(`✅ Downloaded: ${filename}`);
        resolve(filePath);
      });
      writer.on('error', reject);
    });
  } catch (error) {
    console.error(`❌ Error downloading ${filename}:`, error);
    throw error;
  }
}

// Extract .zip file and find NiNJA.xex
async function extractZipAndFindNinja(zipFilePath, originalFilename) {
  try {
    console.log(`📦 Extracting ${originalFilename} to find NiNJA.xex...`);
    
    const zip = new AdmZip(zipFilePath);
    const tempExtractPath = path.join(path.dirname(zipFilePath), 'temp_extract');
    
    // Create temp extraction directory
    await fs.ensureDir(tempExtractPath);
    
    // Extract all files
    zip.extractAllTo(tempExtractPath, true);
    
    // Search for NiNJA.xex files (case-insensitive)
    const ninjaFiles = [];
    
    async function searchForNinja(dir) {
      const items = await fs.readdir(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = await fs.stat(fullPath);
        
        if (stat.isDirectory()) {
          await searchForNinja(fullPath);
        } else if (item.toLowerCase() === 'ninja.xex') {
          ninjaFiles.push({
            path: fullPath,
            name: item,
            size: stat.size
          });
        }
      }
    }
    
    await searchForNinja(tempExtractPath);
    
    if (ninjaFiles.length === 0) {
      console.log(`⚠️ No NiNJA.xex found in ${originalFilename}`);
      await fs.remove(tempExtractPath);
      return null;
    }
    
    // If multiple NiNJA.xex files found, choose the largest one
    let selectedFile = ninjaFiles[0];
    if (ninjaFiles.length > 1) {
      console.log(`📋 Found ${ninjaFiles.length} NiNJA.xex files, selecting largest...`);
      selectedFile = ninjaFiles.reduce((largest, current) => 
        current.size > largest.size ? current : largest
      );
      console.log(`✅ Selected: ${selectedFile.name} (${(selectedFile.size / 1024).toFixed(2)} KB)`);
    }
    
    // Copy the selected NiNJA.xex to the main Files directory
    const finalPath = path.join(config.downloadPath, selectedFile.name);
    await fs.copy(selectedFile.path, finalPath);
    
    // Clean up temp extraction
    await fs.remove(tempExtractPath);
    
    console.log(`✅ Extracted NiNJA.xex from ${originalFilename}`);
    return finalPath;
    
  } catch (error) {
    console.error(`❌ Error extracting ${originalFilename}:`, error);
    return null;
  }
}

// Upload file to GitHub repository
async function uploadToGitHub(filePath, filename) {
  try {
    console.log(`🚀 Uploading ${filename} to GitHub...`);
    console.log(`📁 File path: ${filePath}`);
    
    // Change to the project root directory
    const projectRoot = path.resolve(__dirname, '..');
    process.chdir(projectRoot);
    console.log(`📂 Working directory: ${process.cwd()}`);
    
    // Check if file exists
    if (!await fs.pathExists(filePath)) {
      console.error(`❌ File does not exist: ${filePath}`);
      return false;
    }
    
    // Get relative path from project root (should be out/Files/Ninja Files/filename)
    const relativePath = path.relative(process.cwd(), filePath);
    console.log(`📁 Relative path: ${relativePath}`);
    
         // Always move file from temp to correct GitHub location
     console.log(`📁 Moving file from temp to GitHub location...`);
     const correctPath = path.join('Files', 'Ninja Files', filename);
     const correctFullPath = path.join(process.cwd(), correctPath);
    
    // Ensure directory exists
    await fs.ensureDir(path.dirname(correctFullPath));
    
         // Move file to correct location
     await fs.move(filePath, correctFullPath, { overwrite: true });
     console.log(`✅ Moved file to: ${correctPath}`);
     
     // Update filePath and relativePath for git operations
     filePath = correctFullPath;
     finalRelativePath = path.relative(process.cwd(), filePath);
     console.log(`📁 Final relative path: ${finalRelativePath}`);
     
     // Check if file content has actually changed
     try {
       const { stdout: diffOutput } = await execAsync(`git diff --quiet "${finalRelativePath}"`);
       console.log(`📋 File content check: no changes detected`);
       // If git diff --quiet succeeds, it means no changes
       console.log(`ℹ️ File content unchanged - no commit needed`);
       return true;
     } catch (diffError) {
       // If git diff --quiet fails, it means there are changes
       console.log(`📋 File content check: changes detected, proceeding with commit`);
     }
    
    // Clean up any git lock files that might be blocking us
    try {
      const gitLockPath = path.join(process.cwd(), '.git', 'index.lock');
      if (await fs.pathExists(gitLockPath)) {
        console.log(`🔓 Removing git lock file...`);
        await fs.remove(gitLockPath);
        console.log(`✅ Git lock file removed`);
      }
    } catch (error) {
      console.log(`⚠️ Could not remove git lock file:`, error.message);
    }
    
    // Check git status first
    try {
      const { stdout: statusOutput } = await execAsync('git status --porcelain');
      if (statusOutput.trim()) {
        console.log(`📋 Git has uncommitted changes, stashing them...`);
        await execAsync('git stash push -m "🤖 Bot stash before file update"');
      }
    } catch (error) {
      console.log(`📋 Git status check failed, continuing...`);
    }
    
                          // Use the final path for git operations
           console.log(`🎯 Using final file path: ${finalRelativePath}`);
           await execAsync(`git add -f "${finalRelativePath}"`);
           console.log(`✅ Added ${finalRelativePath} to git (forced)`);
     
           // Force stage all changes and verify
      console.log(`🔄 Force staging all changes...`);
      await execAsync(`git add -A`);
      
      const { stdout: stagedFiles } = await execAsync('git status --porcelain');
      console.log(`📋 Staged files: ${stagedFiles}`);
      
      // Double-check our specific file is staged
      if (!stagedFiles.includes(filename) && !stagedFiles.includes(finalRelativePath.replace(/\\/g, '/'))) {
        console.log(`⚠️ File still not staged, using aggressive staging...`);
        await execAsync(`git add -f "${finalRelativePath}"`);
        const { stdout: finalStaged } = await execAsync('git status --porcelain');
        console.log(`📋 Final staged files: ${finalStaged}`);
      }
     
           // Force commit even if git thinks nothing changed
      const commitMessage = `🤖 Auto-update: ${filename} - Updated by NiNJA File Bot`;
      
      if (stagedFiles.trim()) {
        // Normal commit with staged changes
        await execAsync(`git commit -m "${commitMessage}"`);
        console.log(`✅ Committed ${filename} to GitHub`);
      } else {
        // Force commit even if no staged changes (file might be identical but we want to ensure it's there)
        console.log(`🔄 No staged changes detected, forcing commit...`);
        await execAsync(`git add -f "${finalRelativePath}"`);
        await execAsync(`git commit --allow-empty -m "${commitMessage}"`);
        console.log(`✅ Force committed ${filename} to GitHub`);
      }
    
              // Push to GitHub
     await execAsync('git push origin master');
     console.log(`✅ Pushed ${filename} to GitHub`);
     
     // Delete .git folder to prevent tracking commit history
     console.log(`🗑️ Deleting .git folder to prevent history tracking...`);
     try {
       const gitFolderPath = path.join(process.cwd(), '.git');
       if (await fs.pathExists(gitFolderPath)) {
         await fs.remove(gitFolderPath);
         console.log(`✅ .git folder deleted successfully`);
       }
     } catch (error) {
       console.log(`⚠️ Could not delete .git folder:`, error.message);
     }
     
     return true;
     } catch (error) {
     console.error(`❌ Error uploading ${filename} to GitHub:`, error);
     
     // Delete .git folder even on error to prevent history tracking
     console.log(`🗑️ Deleting .git folder after error...`);
     try {
       const gitFolderPath = path.join(process.cwd(), '.git');
       if (await fs.pathExists(gitFolderPath)) {
         await fs.remove(gitFolderPath);
         console.log(`✅ .git folder deleted after error`);
       }
     } catch (deleteError) {
       console.log(`⚠️ Could not delete .git folder after error:`, deleteError.message);
     }
     
     return false;
   }
}

// Clean up git lock files
async function cleanupGitLocks() {
  try {
    const projectRoot = path.resolve(__dirname, '..');
    const gitLockPath = path.join(projectRoot, '.git', 'index.lock');
    
    if (await fs.pathExists(gitLockPath)) {
      console.log(`🔓 Found git lock file, removing it...`);
      await fs.remove(gitLockPath);
      console.log(`✅ Git lock file removed`);
    }
    
    // Also check for other common git lock files
    const gitLocks = [
      path.join(projectRoot, '.git', 'HEAD.lock'),
      path.join(projectRoot, '.git', 'refs', 'heads', 'main.lock')
    ];
    
    for (const lockPath of gitLocks) {
      if (await fs.pathExists(lockPath)) {
        console.log(`🔓 Removing git lock: ${path.basename(lockPath)}`);
        await fs.remove(lockPath);
      }
    }
    
  } catch (error) {
    console.error('❌ Error cleaning up git locks:', error);
  }
}

 // Initialize git repository (always fresh since we delete .git after each upload)
 async function initializeGit() {
   try {
     const projectRoot = path.resolve(__dirname, '..');
     process.chdir(projectRoot);
     
     // Clean up any existing git locks first
     await cleanupGitLocks();
     
     // Always initialize fresh git repository
     console.log('🔧 Initializing fresh git repository...');
     
     // Initialize git
     await execAsync('git init');
     
     // Add remote origin
     await execAsync(`git remote add origin https://github.com/${config.github.owner}/${config.github.repo}.git`);
     
     // Set up git config
     await execAsync('git config user.name "NiNJA File Bot"');
     await execAsync('git config user.email "bot@xbninja.com"');
     
     // Set branch to master
     await execAsync('git branch -M master');
     
     console.log('✅ Fresh git repository initialized successfully');
   } catch (error) {
     console.error('❌ Error initializing git:', error);
   }
 }

// Process file attachment
async function processFileAttachment(attachment, message) {
  try {
    // Check if it's a valid file type
    const fileExtension = path.extname(attachment.name).toLowerCase();
    if (!config.fileTypes.includes(fileExtension)) {
      console.log(`⚠️ Skipping file with unsupported extension: ${attachment.name}`);
      return;
    }

    console.log(`📁 Processing file: ${attachment.name}`);
    
    // Download the file
    const filePath = await downloadFile(attachment.url, attachment.name);
    
    let finalFilePath = filePath;
    let processedFilename = attachment.name;
    let extractionInfo = '';
    
    // Handle .zip files specially
    if (attachment.name.toLowerCase().endsWith('.zip')) {
      console.log(`📦 Processing .zip file: ${attachment.name}`);
      
      const extractedFile = await extractZipAndFindNinja(filePath, attachment.name);
      if (extractedFile) {
        finalFilePath = extractedFile;
        processedFilename = 'NiNJA.xex';
        extractionInfo = `\n📦 **Extracted from:** ${attachment.name}`;
        
        // Remove the original .zip file since we only need NiNJA.xex
        await fs.remove(filePath);
        console.log(`🗑️ Removed original .zip file: ${attachment.name}`);
      } else {
        // No NiNJA.xex found in zip
        console.log(`⚠️ No NiNJA.xex found in ${attachment.name}`);
        return;
      }
    }
    
    // Upload to GitHub
    let githubStatus = '❌ Failed';
    if (config.github.token) {
      const uploaded = await uploadToGitHub(finalFilePath, processedFilename);
      githubStatus = uploaded ? '✅ Success' : '❌ Failed';
    }
    
    // Log success (no Discord message)
    console.log(`✅ File processed successfully: ${processedFilename}${extractionInfo}`);

    console.log(`✅ File processed successfully: ${attachment.name}`);
    
    // Update bot stats
    botStats.filesProcessed++;
    botStats.lastFileProcessed = {
      filename: processedFilename,
      timestamp: new Date().toISOString(),
      originalFile: attachment.name,
      size: attachment.size
    };
  } catch (error) {
    console.error(`❌ Error processing file ${attachment.name}:`, error);
  }
}

// Process message for file updates
async function processMessage(message) {
  // Ignore bot messages
  if (message.author.bot) return;

  // Check if message has attachments
  if (message.attachments.size > 0) {
    console.log(`📨 New message with attachments from ${message.author.tag}`);
    
    // Process each attachment
    for (const [id, attachment] of message.attachments) {
      await processFileAttachment(attachment, message);
    }
  }

  // Check for file links (like Discord CDN links)
  const urlRegex = /https?:\/\/[^\s]+/g;
  const urls = message.content.match(urlRegex);
  
  if (urls) {
    for (const url of urls) {
      // Check if it's a Discord CDN link
      if (url.includes('cdn.discordapp.com') || url.includes('media.discordapp.net')) {
        // Extract filename from URL
        const filename = path.basename(url.split('?')[0]);
        const fileExtension = path.extname(filename).toLowerCase();
        
        if (config.fileTypes.includes(fileExtension)) {
          console.log(`🔗 Processing Discord CDN link: ${filename}`);
          
          // Create a mock attachment object
          const mockAttachment = {
            name: filename,
            url: url,
            size: 0 // Unknown size for CDN links
          };
          
          await processFileAttachment(mockAttachment, message);
        }
      }
    }
  }
}

// Bot ready event
client.once(Events.ClientReady, async () => {
  console.log(`🤖 Bot logged in as ${client.user.tag}`);
  console.log(`📺 Monitoring channel: ${config.channelId}`);
  console.log(`📁 Download path: ${config.downloadPath}`);
  console.log(`📋 Allowed file types: ${config.fileTypes.join(', ')}`);
  
  botStats.botStatus = 'online';
  
  await ensureDownloadDir();
  await initializeGit();
});

// Message event
client.on(Events.MessageCreate, async (message) => {
  try {
    // Only process messages in the monitored channel
    if (message.channelId === config.channelId) {
      await processMessage(message);
    }
  } catch (error) {
    console.error('❌ Error processing message:', error);
  }
});

// Error handling
client.on('error', (error) => {
  console.error('❌ Discord client error:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled promise rejection:', error);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down bot...');
  botStats.botStatus = 'shutting_down';
  
  // Close Express server
  server.close(() => {
    console.log('🌐 Express server closed');
  });
  
  await client.destroy();
  process.exit(0);
});

// Start the bot
if (!config.token) {
  console.error('❌ DISCORD_BOT_TOKEN environment variable is required!');
  process.exit(1);
}

if (!config.channelId) {
  console.error('❌ MONITOR_CHANNEL_ID environment variable is required!');
  process.exit(1);
}

if (!config.github.token) {
  console.warn('⚠️ GITHUB_TOKEN not provided - GitHub uploads will be disabled');
}

client.login(config.token);
