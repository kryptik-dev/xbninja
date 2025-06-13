'use client';

import Image from "next/image";
import Link from "next/link";
import { Server, Shield, Zap, Target, Users, Play, Palette, Globe } from "lucide-react";
import { motion, useScroll, useTransform, animate, useMotionValue } from "framer-motion";
import ParticlesBackground from "@/components/particles-background";
import { useRef } from "react";
import { useScroll as useScrollContext } from "@/context/ScrollContext";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1 }
};

const sectionVariants = {
  hidden: { 
    opacity: 0,
    y: 100,
    scale: 0.95
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8
    }
  }
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const { downloadsRef, tutorialsRef, tokensRef } = useScrollContext();

  // Smooth scroll function
  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      const yOffset = -100; // Offset for navbar height
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      animate(window.scrollY, y, {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
        onUpdate: (latest) => {
          window.scrollTo(0, latest);
        },
      });
    }
  };

  return (
    <div className="relative min-h-screen">
      <ParticlesBackground />
      <div className="relative z-10">
      {/* Hero Section */}
        <motion.section 
          style={{ opacity, scale }}
          className="relative py-20 px-4 min-h-screen flex items-center justify-center"
        >
        <div className="container mx-auto text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
            <Image
              src="/ninja-revived-header-new.png"
              alt="NiNJA: The REVIVED XBLS"
              width={730}
              height={275}
              className="mx-auto mb-8 max-w-full h-auto"
              priority
            />
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              NiNJA: The REVIVED XBLS
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
              NiNJA will always supply the <strong>BEST</strong> online JTAG/RGH experience!<br />
              Off-host cheats (with ban bypasses) that can beat ANY other cheater!
            </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <div className="glass-card px-6 py-2 text-lg">
              NEW PRICES: <span className="text-primary font-bold">$18/mo</span>
              </div>
              <div className="glass-card px-6 py-2 text-lg">
              2 Week Option: <span className="text-primary font-bold">$14/2wk</span>
          </div>
            </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 px-4 min-h-screen flex items-center justify-center"
      >
        <div className="container mx-auto">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-center mb-16"
            >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose NiNJA?</h2>
            <p className="text-muted-foreground text-lg">Discover the features that make NiNJA the best choice for your JTAG/RGH needs</p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
            {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                  className="glass-card p-6 group"
                >
                  <div className="mb-4 text-4xl">
                    {feature.icon === 'Server' && <Server className="w-12 h-12 text-primary" />}
                    {feature.icon === 'Shield' && <Shield className="w-12 h-12 text-primary" />}
                    {feature.icon === 'Zap' && <Zap className="w-12 h-12 text-primary" />}
                    {feature.icon === 'Target' && <Target className="w-12 h-12 text-primary" />}
                    {feature.icon === 'Users' && <Users className="w-12 h-12 text-primary" />}
                    {feature.icon === 'Play' && <Play className="w-12 h-12 text-primary" />}
                    {feature.icon === 'Palette' && <Palette className="w-12 h-12 text-primary" />}
                    {feature.icon === 'Globe' && <Globe className="w-12 h-12 text-primary" />}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
            ))}
            </motion.div>
          </div>
        </motion.section>

        {/* NiNJA Includes Section */}
        <motion.section 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-20 px-4 min-h-screen flex items-center justify-center"
        >
          <div className="container mx-auto">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">NiNJA INCLUDES</h2>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              className="max-w-4xl mx-auto"
            >
              <div className="glass-card p-8">
                <motion.div
                  variants={staggerContainer}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {[
                    "CoD Engines", "CoD Bypasses", "CoD Protections", "SNet Browser",
                    "No-KV Mode", "Quick Launch", "Reserved Time", "XBL Error Fixes",
                    "XDK & RGL Support", "Achievement Unlocker", "Advanced MSP Spoofing"
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
        </div>
      </motion.section>

      {/* Downloads Section */}
      <motion.section 
        ref={downloadsRef}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 px-4 min-h-screen flex items-center justify-center"
      >
        <div className="container mx-auto">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-center mb-16"
            >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">DOWNLOADS</h2>
            <p className="text-muted-foreground text-lg">Links to get NiNJA XEX + launch.ini + JRPC.ini files to use, as well as xeBuild and dashlaunch!</p>
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-primary mb-4">NEW DOWNLOADS FOR 17559!</h3>
            </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
            {downloads.map((download, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                  className="glass-card p-6 text-center flex flex-col justify-between h-full"
                >
                  <div>
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="h-8 w-8 text-primary mx-auto mb-4"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                    </motion.div>
                  <h3 className="font-bold text-lg mb-2">{download.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{download.description}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2 mt-6">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="glass-card px-4 py-1 inline-block text-base font-medium mb-4"
                    >
                      {download.size}
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link href={download.url} className="neon-button px-6 py-2 text-base font-semibold">
                    Download Now
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
            ))}
            </motion.div>
        </div>
      </motion.section>

      {/* Video Tutorials */}
      <motion.section 
        ref={tutorialsRef}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 px-4 min-h-screen flex items-center justify-center"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Tutorials</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="glass-card p-4 rounded-xl overflow-hidden hover:scale-105 transition-transform">
                <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.youtube.com/embed/9CSkBFj3V0A"
                    title="NiNJA Tutorial"
                    className="w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="glass-card p-4 rounded-xl overflow-hidden hover:scale-105 transition-transform">
                <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.youtube.com/embed/Rkrr3TwbK44"
                    title="NiNJA Tutorial"
                    className="w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="glass-card p-4 rounded-xl overflow-hidden hover:scale-105 transition-transform">
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/1m0COINgwFk"
                    title="NiNJA Tutorial"
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
              />
            </div>
              </div>
              <div className="glass-card p-4 rounded-xl overflow-hidden hover:scale-105 transition-transform">
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/Hs-9lYIgb3Q"
                    title="NiNJA Tutorial"
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
        </div>
      </motion.section>

      {/* Purchase Section */}
      <motion.section 
        ref={tokensRef}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 px-4 min-h-screen flex items-center justify-center"
      >
        <div className="container mx-auto">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-center mb-16"
            >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">BUY NiNJA NOW!</h2>
            <p className="text-muted-foreground text-lg mb-8">Click below to open a Discord chat with one of our sellers!<br />Ask about our auto-buy site!</p>
            </motion.div>

          <div className="max-w-4xl mx-auto">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <h3 className="text-2xl font-bold mb-6">Official NiNJA Sellers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {sellers.map((seller, index) => (
                    <Link
                      key={index}
                      href={`https://discord.com/users/${seller.id}`}
                      className="glass-card p-6 flex flex-col items-center justify-center gap-3 hover:scale-105 transition-transform"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <span className="font-greater-theory text-xl">{seller.name}</span>
                      <div className="flex items-center gap-2 text-primary">
                        <span className="text-sm">Official Seller</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" fill="#1877F2" />
                          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    </Link>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="text-center mb-8"
              >
                <div className="relative mb-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border/40"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-background px-4 text-muted-foreground text-lg font-medium">OR</span>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="https://shop.xbninja.com/group/b4d1decb-2827-4540-9635-9956aaf66109" className="neon-button inline-block">
                    Buy NiNJA Tokens
                    </Link>
                </motion.div>
              </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Warning Section */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 px-4 min-h-screen flex items-center justify-center"
      >
        <div className="container mx-auto">
          <div className="glass-card max-w-3xl mx-auto border-2 border-destructive/50 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-destructive/5"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-destructive" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <h3 className="text-2xl font-bold text-destructive">IMPORTANT WARNING</h3>
              </div>
              <div className="space-y-4">
                <p className="text-lg text-destructive/90">
                  If someone offers you tokens for a discount do not buy them!
                </p>
                <p className="text-xl font-bold text-destructive">
                  PLEASE BE AWARE THIS WILL EARN YOU A <span className="underline">PERMANENT BAN</span>!
              </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 px-4"
      >
        <div className="container mx-auto text-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex justify-center space-x-8 mb-8"
            >
              <motion.div variants={fadeInUp}>
            <Link href="https://ogx.bio/legal/tos" className="text-muted-foreground hover:text-primary transition-colors">
              Terms & Conditions
            </Link>
              </motion.div>
              <motion.div variants={fadeInUp}>
            <Link href="https://ogx.bio/legal/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
              </motion.div>
              <motion.div variants={fadeInUp}>
            <Link href="https://ogx.bio/legal/faq" className="text-muted-foreground hover:text-primary transition-colors">
              Refund Policy
            </Link>
              </motion.div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-muted-foreground"
            >
              © 2025 NiNJA Revived. All Rights Reserved
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs text-muted-foreground mt-2"
            >
              Designed and powered by{' '}
              <Link
                href="https://amaandildar.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary font-semibold transition-colors"
              >
                Amaan Dildar
              </Link>
            </motion.p>
          </div>
        </motion.section>
        </div>
    </div>
  );
}

const features = [
  {
    icon: 'Server',
    title: "KV Life",
    description: "With perfect system challenge responses, KVs will last longer on NiNJA."
  },
  {
    icon: 'Shield',
    title: "Low Prices",
    description: "Leading the industry with our features while maintaining low prices."
  },
  {
    icon: 'Zap',
    title: "Reserved Time",
    description: "Your time only expires when using the service, and your time doesn't expire during freemode."
  },
  {
    icon: 'Target',
    title: "NiNJA Engine",
    description: "An offhost engine like no other, built from scratch, to give you the competitive edge."
  },
  {
    icon: 'Users',
    title: "NiNJA Bypasses",
    description: "Our CoD bypasses will prevent you from being banned."
  },
  {
    icon: 'Play',
    title: "NiNJA Protections",
    description: "Our CoD protections will prevent you from being harassed by other cheaters."
  },
  {
    icon: 'Palette',
    title: "No-KV Mode",
    description: "Use one of our KVs to get online and play, saving you time and money."
  },
  {
    icon: 'Globe',
    title: "Quick Launch",
    description: "Easily load or launch your favorite games or menus."
  }
];

const downloads = [
  {
    title: "NiNJA PLUGIN FILES",
    description: "Complete plugin package for 17559",
    url: "https://xbninja.com/files.zip?download=nocache",
    size: "~25MB"
  },
  {
    title: "OFFICIAL 17559 xeBuild 1.21 GUI",
    description: "Official xeBuild tool",
    url: "https://xbninja.com/XeBuild.zip?download=nocache",
    size: "~15MB"
  },
  {
    title: "OFFICIAL 17559 dash_launch (v3.21)",
    description: "Official dash launch tool",
    url: "https://xbninja.com/Dashlaunch.zip?download=nocache",
    size: "~8MB"
  }
];

const sellers = [
  { name: "Dread", id: "268894598145769473", icon: "/dread.png" },
  { name: "Cykotic", id: "253986575682109441", icon: "/cykotic.png" },
  { name: "WarHeadinc", id: "102523345542586368", icon: "/warheadinc.png" },
  { name: "Sinful", id: "400156684263096320", icon: "/sinful.png" }
];
