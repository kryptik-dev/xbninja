'use client';

import Image from "next/image";
import Link from "next/link";
import { Server, Shield, Zap, Target, Users, Play, Palette, Globe, Clock, Calendar, CalendarCheck, Repeat, Award, Gift, Infinity, Gamepad2, ShieldCheck, UserX, Globe2, Key, Rocket, TimerReset, Bug, Laptop2, Trophy, BadgeDollarSign } from "lucide-react";
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

const ninjaIncludes = [
  {
    icon: <Gamepad2 className="w-12 h-12 text-primary" />, // CoD Engines
    title: "CoD Engines",
    description: "Premium off-host engines for all major Call of Duty titles."
  },
  {
    icon: <ShieldCheck className="w-12 h-12 text-primary" />, // CoD Bypasses
    title: "CoD Bypasses",
    description: "Advanced bypasses to keep you safe from bans and restrictions."
  },
  {
    icon: <UserX className="w-12 h-12 text-primary" />, // CoD Protections
    title: "CoD Protections",
    description: "Industry-leading protections against modders and cheaters."
  },
  {
    icon: <Globe2 className="w-12 h-12 text-primary" />, // SNet Browser
    title: "SNet Browser",
    description: "Browse and connect to stealth servers with ease."
  },
  {
    icon: <Key className="w-12 h-12 text-primary" />, // No-KV Mode
    title: "No-KV Mode",
    description: "Play online without needing a Key Vault (KV)."
  },
  {
    icon: <Rocket className="w-12 h-12 text-primary" />, // Quick Launch
    title: "Quick Launch",
    description: "Instantly launch your favorite games and menus."
  },
  {
    icon: <TimerReset className="w-12 h-12 text-primary" />, // Reserved Time
    title: "Reserved Time",
    description: "Your time only counts down while you are online."
  },
  {
    icon: <Bug className="w-12 h-12 text-primary" />, // XBL Error Fixes
    title: "XBL Error Fixes",
    description: "Automatic fixes for common Xbox Live errors."
  },
  {
    icon: <Laptop2 className="w-12 h-12 text-primary" />, // XDK & RGL Support
    title: "XDK & RGL Support",
    description: "Full support for XDK and RGL development environments."
  },
  {
    icon: <Trophy className="w-12 h-12 text-primary" />, // Achievement Unlocker
    title: "Achievement Unlocker",
    description: "Unlock achievements instantly and safely."
  },
  {
    icon: <BadgeDollarSign className="w-12 h-12 text-primary" />, // Advanced MSP Spoofing
    title: "Advanced MSP Spoofing",
    description: "Spoof Microsoft Points for in-game purchases."
  }
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const { downloadsRef, tutorialsRef, tokensRef, pricingRef, heroRef } = useScrollContext();

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
          ref={heroRef}
          style={{ opacity, scale }}
          className="relative py-20 px-4 min-h-screen flex items-center justify-center"
        >
        <div className="container mx-auto text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
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
              <button
                className="neon-button text-lg font-bold px-8 py-3"
                onClick={() => scrollToSection(pricingRef)}
              >
                Check Out Our New Prices
              </button>
              <a
                href="https://shop.xbninja.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-bold px-8 py-3 rounded-full border border-black bg-white text-black transition-colors duration-200 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:mt-0 mt-2"
              >
                Visit the Shop
              </a>
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
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Everything you need for the ultimate Xbox 360 stealth experience, all in one place.</p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              className="max-w-5xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ninjaIncludes.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    className="glass-card p-6 group flex flex-col items-center"
                  >
                    <div className="mb-4 text-4xl">{item.icon}</div>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
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

      {/* Pricing Section */}
      <motion.section 
        ref={pricingRef}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pricing</h2>
            <p className="text-muted-foreground text-lg">Choose the plan that fits your needs. All options below are available for NiNJA access.</p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {/* Pricing Cards */}
            <motion.div variants={scaleIn} whileHover={{ scale: 1.05 }} className="glass-card p-6 group flex flex-col items-center">
              <div className="mb-4 text-4xl"><Clock className="w-10 h-10 text-primary" /></div>
              <h3 className="font-bold text-lg mb-2">1 Day</h3>
              <div className="text-primary font-bold text-2xl mb-2">$1</div>
              <p className="text-muted-foreground text-sm text-center">Perfect for quick testing or short sessions.</p>
            </motion.div>
            <motion.div variants={scaleIn} whileHover={{ scale: 1.05 }} className="glass-card p-6 group flex flex-col items-center">
              <div className="mb-4 text-4xl"><Calendar className="w-10 h-10 text-primary" /></div>
              <h3 className="font-bold text-lg mb-2">3 Days</h3>
              <div className="text-primary font-bold text-2xl mb-2">$2</div>
              <p className="text-muted-foreground text-sm text-center">A weekend of fun or extended testing.</p>
            </motion.div>
            <motion.div variants={scaleIn} whileHover={{ scale: 1.05 }} className="glass-card p-6 group flex flex-col items-center">
              <div className="mb-4 text-4xl"><CalendarCheck className="w-10 h-10 text-primary" /></div>
              <h3 className="font-bold text-lg mb-2">1 Week</h3>
              <div className="text-primary font-bold text-2xl mb-2">$4</div>
              <p className="text-muted-foreground text-sm text-center">Great value for regular players.</p>
            </motion.div>
            <motion.div variants={scaleIn} whileHover={{ scale: 1.05 }} className="glass-card p-6 group flex flex-col items-center">
              <div className="mb-4 text-4xl"><Repeat className="w-10 h-10 text-primary" /></div>
              <h3 className="font-bold text-lg mb-2">2 Weeks</h3>
              <div className="text-primary font-bold text-2xl mb-2">$6</div>
              <p className="text-muted-foreground text-sm text-center">Double the time, double the fun.</p>
            </motion.div>
            <motion.div variants={scaleIn} whileHover={{ scale: 1.05 }} className="glass-card p-6 group flex flex-col items-center">
              <div className="mb-4 text-4xl"><Award className="w-10 h-10 text-primary" /></div>
              <h3 className="font-bold text-lg mb-2">4 Weeks</h3>
              <div className="text-primary font-bold text-2xl mb-2">$9</div>
              <p className="text-muted-foreground text-sm text-center">Best for dedicated users and savings.</p>
            </motion.div>
            <motion.div variants={scaleIn} whileHover={{ scale: 1.05 }} className="glass-card p-6 group flex flex-col items-center">
              <div className="mb-4 text-4xl"><Gift className="w-10 h-10 text-primary" /></div>
              <h3 className="font-bold text-lg mb-2">Random Token</h3>
              <div className="text-primary font-bold text-2xl mb-2">$25</div>
              <p className="text-muted-foreground text-sm text-center">Get a surprise token for any duration!</p>
            </motion.div>
            <motion.div variants={scaleIn} whileHover={{ scale: 1.05 }} className="glass-card p-6 group flex flex-col items-center col-span-1 md:col-span-2 lg:col-span-3">
              <div className="mb-4 text-4xl"><Infinity className="w-10 h-10 text-primary" /></div>
              <h3 className="font-bold text-lg mb-2">Lifetime</h3>
              <div className="text-primary font-bold text-2xl mb-2">$30</div>
              <p className="text-muted-foreground text-sm text-center">One payment, access forever.</p>
            </motion.div>
          </motion.div>
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
                        <Image
                          src={seller.icon}
                          alt={seller.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
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
        className="pt-16 pb-8 px-4 bg-glass-effect border-t border-border/30"
      >
        <div className="container mx-auto">
          <div className="flex flex-col gap-10 mb-8 md:flex-row md:justify-between md:items-start md:gap-0 items-start">
            {/* Logo and Brand */}
            <div className="flex flex-col gap-3 items-start">
              <Link href="/">
                <Image src="/lgo220x50-new.png" alt="NiNJA Logo" width={160} height={36} className="h-auto mb-2" />
              </Link>
              <span className="text-muted-foreground text-sm">The REVIVED XBLS</span>
            </div>
            {/* Links */}
            <div className="flex flex-col gap-8 w-full md:w-auto md:flex-row md:gap-16 text-left">
              <div>
                <h4 className="font-semibold mb-2 text-primary">Legal</h4>
                <ul className="space-y-2">
                  <li><Link href="https://ogx.bio/legal/tos" className="hover:text-primary transition-colors block py-1">Terms & Conditions</Link></li>
                  <li><Link href="https://ogx.bio/legal/privacy" className="hover:text-primary transition-colors block py-1">Privacy Policy</Link></li>
                  <li><Link href="https://ogx.bio/legal/faq" className="hover:text-primary transition-colors block py-1">Refund Policy</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-primary">Community</h4>
                <ul className="space-y-2">
                  <li><Link href="https://dsc.gg/xbninja" className="hover:text-primary transition-colors flex items-center gap-2 block py-1"><svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='currentColor' viewBox='0 0 24 24'><path d='M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z'/></svg> Discord</Link></li>
                  <li><Link href="https://shop.xbninja.com/" className="hover:text-primary transition-colors flex items-center gap-2 block py-1"><svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2'><path strokeLinecap='round' strokeLinejoin='round' d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3' /></svg> Shop</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-border/30 pt-6 flex flex-col gap-2 md:flex-row md:justify-between md:items-center md:gap-4 text-left">
            <div>
              <span className="text-muted-foreground">© 2025 NiNJA Revived. All Rights Reserved</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Designed and powered by{' '}
              <Link
                href="https://amaandildar.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary font-semibold transition-colors"
              >
                Amaan Dildar
              </Link>
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground text-left border-t border-border/20 pt-4">
            NiNJA REVIVED is in no way endorsed or affiliated to the Microsoft Corporation, Xbox, Xbox LIVE and any Xbox images are registered trademarks of their respected owners.
          </div>
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
    description: "Complete plugin package for 17559 (xbNiNJA.zip)",
    url: "/Files/Ninja%20Files/xbNiNJA.zip",
    size: "7.97MB"
  },
  {
    title: "OFFICIAL 17559 xeBuild 1.21 GUI",
    description: "Official xeBuild tool (xeBuild_1.21.zip)",
    url: "/Files/XeBuild/xeBuild_1.21.zip",
    size: "1.23MB"
  },
  {
    title: "OFFICIAL 17559 dash_launch (v3.21)",
    description: "Official dash launch tool (dash_launch_v3.21.zip)",
    url: "/Files/Dashlaunch/dash_launch_v3.21.zip",
    size: "2.44MB"
  }
];

const sellers = [
  { name: "Dread", id: "268894598145769473", icon: "/sellers/dread.png" },
  { name: "Cykotic", id: "253986575682109441", icon: "/sellers/cykotic.webp" },
  { name: "WarHeadinc", id: "102523345542586368", icon: "/sellers/warhead.webp" },
  { name: "Sinful", id: "400156684263096320", icon: "/sellers/sinful.webp" }
];
