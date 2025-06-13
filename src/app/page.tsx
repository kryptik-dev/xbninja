import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Shield,
  Gamepad2,
  Server,
  Download,
  Play,
  Users,
  Clock,
  Zap,
  Settings,
  Target,
  Palette,
  Globe,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: Server,
    title: "KV Life",
    description: "With perfect system challenge responses, KVs will last longer on NiNJA.",
  },
  {
    icon: Badge,
    title: "Low Prices",
    description: "Leading the industry with our features while maintaining low prices.",
  },
  {
    icon: Clock,
    title: "Reserved Time",
    description: "Your time only expires when using the service, and your time doesn't expire during freemode.",
  },
  {
    icon: Zap,
    title: "NiNJA Engine",
    description: "An offhost engine like no other, built from scratch, to give you the competitive edge.",
  },
  {
    icon: Shield,
    title: "NiNJA Bypasses",
    description: "Our CoD bypasses will prevent you from being banned.",
  },
  {
    icon: Target,
    title: "NiNJA Protections",
    description: "Our CoD protections will prevent you from being harassed by other cheaters.",
  },
  {
    icon: Users,
    title: "No-KV Mode",
    description: "Use one of our KVs to get online and play, saving you time and money.",
  },
  {
    icon: Play,
    title: "Quick Launch",
    description: "Easily load or launch your favorite games or menus.",
  },
  {
    icon: Palette,
    title: "Customizable UI",
    description: "Customize your UI to the look and feel that best expresses you.",
  },
  {
    icon: Globe,
    title: "SNet Browser",
    description: "Matchmaking made easier; user-friendly interface to easily join other SNet users.",
  },
];

const downloads = [
  {
    title: "NiNJA PLUGIN FILES",
    description: "Complete plugin package for 17559",
    url: "/files.zip",
    size: "~25MB",
  },
  {
    title: "OFFICIAL 17559 xeBuild 1.21 GUI",
    description: "Official xeBuild tool",
    url: "/XeBuild.zip",
    size: "~15MB",
  },
  {
    title: "OFFICIAL 17559 dash_launch (v3.21)",
    description: "Official dash launch tool",
    url: "/Dashlaunch.zip",
    size: "~8MB",
  },
];

const sellers = [
  { name: "Dread", id: "268894598145769473" },
  { name: "Cykotic", id: "253986575682109441" },
  { name: "WarHeadinc", id: "102523345542586368" },
  { name: "Sinful", id: "400156684263096320" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-md bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image
                src="/lgo220x50-new.png"
                alt="NiNJA Logo"
                width={220}
                height={50}
                className="h-8 w-auto"
                priority
              />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#tokens" className="text-foreground/80 hover:text-primary transition-colors">
                BUY NiNJA TOKENS
              </Link>
              <Link href="#downloads" className="text-foreground/80 hover:text-primary transition-colors">
                DOWNLOADS
              </Link>
              <Link href="#tutorials" className="text-foreground/80 hover:text-primary transition-colors">
                VIDEO TUTORIALS
              </Link>
              <Link href="https://dsc.gg/xbninja" className="text-foreground/80 hover:text-primary transition-colors">
                GET SUPPORT
              </Link>
            </div>
            <Button variant="outline" size="sm" className="md:hidden">
              <Gamepad2 className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in-up">
            <Image
              src="/ninja-revived-header-new.png"
              alt="NiNJA: The REVIVED XBLS"
              width={730}
              height={275}
              className="mx-auto mb-8 max-w-full h-auto"
              priority
            />
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              NiNJA: The REVIVED XBLS
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
              NiNJA will always supply the <strong>BEST</strong> online JTAG/RGH experience!<br />
              Off-host cheats (with ban bypasses) that can beat ANY other cheater!
            </p>
          </div>

          <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center items-center mb-12" style={{ animationDelay: "0.4s" }}>
            <Badge variant="secondary" className="text-lg px-6 py-2">
              NEW PRICES: <span className="text-primary font-bold">$18/mo</span>
            </Badge>
            <Badge variant="secondary" className="text-lg px-6 py-2">
              2 Week Option: <span className="text-primary font-bold">$14/2wk</span>
            </Badge>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <Link href="https://shop.xbninja.com/group/b4d1decb-2827-4540-9635-9956aaf66109">
              <Image
                src="/ninja-site-games-cheats-new.png"
                alt="NiNJA Cheats and Features"
                width={880}
                height={640}
                className="mx-auto rounded-lg shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:scale-105 max-w-full h-auto"
              />
            </Link>
            <p className="text-red-500 font-semibold text-lg mt-4 underline cursor-pointer">
              Click the picture above to buy using our auto-buy!
            </p>
          </div>

          <div className="animate-fade-in-up mt-8" style={{ animationDelay: "0.8s" }}>
            <p className="text-red-500 font-semibold text-lg">
              Discord server is back, <Link href="https://dsc.gg/xbninja" className="underline hover:text-primary transition-colors">click here to join</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose NiNJA?</h2>
            <p className="text-muted-foreground text-lg">Discover the features that make NiNJA the best choice for your JTAG/RGH needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 inline-flex p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <section id="downloads" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">DOWNLOADS</h2>
            <p className="text-muted-foreground text-lg">Links to get NiNJA XEX + launch.ini + JRPC.ini files to use, as well as xeBuild and dashlaunch!</p>
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-primary mb-4">NEW DOWNLOADS FOR 17559!</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {downloads.map((download, index) => (
              <Card key={index} className="group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <Download className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">{download.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{download.description}</p>
                  <Badge variant="outline" className="mb-4">{download.size}</Badge>
                  <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Download Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Tutorials */}
      <section id="tutorials" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">TUTORIALS</h2>
            <p className="text-muted-foreground text-lg">Watch the following videos for help installing/updating/using NiNJA!</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/1m0COINgwFk"
                title="NiNJA Engine Tutorial"
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
              />
            </div>
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/Hs-9lYIgb3Q"
                title="NiNJA Installation Guide"
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Purchase Section */}
      <section id="tokens" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">BUY NiNJA NOW!</h2>
            <p className="text-muted-foreground text-lg mb-8">Click below to open a Discord chat with one of our sellers!<br />Ask about our auto-buy site!</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-center mb-6">NiNJA INCLUDES:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    "CoD Engines", "CoD Bypasses", "CoD Protections", "SNet Browser",
                    "No-KV Mode", "Quick Launch", "Reserved Time", "XBL Error Fixes",
                    "XDK & RGL Support", "Achievement Unlocker", "Advanced MSP Spoofing"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="text-center mb-8">
              <p className="text-red-500 font-semibold text-lg mb-4">Official sellers for NiNJA Revived:</p>
              <div className="flex flex-wrap justify-center gap-4">
                {sellers.map((seller, index) => (
                  <Button key={index} variant="outline" asChild>
                    <Link href={`https://discord.com/users/${seller.id}`}>
                      {seller.name}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="py-12 px-4 bg-destructive/10">
        <div className="container mx-auto">
          <Card className="max-w-2xl mx-auto border-destructive">
            <CardContent className="p-8 text-center">
              <Image
                src="/alert.png"
                alt="Warning"
                width={64}
                height={64}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-destructive mb-4">⚠️ IMPORTANT WARNING ⚠️</h3>
              <p className="text-destructive">
                If someone offers you tokens for a discount do not buy them!<br />
                PLEASE BE AWARE THIS WILL EARN YOU A <strong>PERMANENT BAN</strong>!
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/40">
        <div className="container mx-auto text-center">
          <div className="flex justify-center space-x-8 mb-8">
            <Link href="https://ogx.bio/legal/tos" className="text-muted-foreground hover:text-primary transition-colors">
              Terms & Conditions
            </Link>
            <Link href="https://ogx.bio/legal/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="https://ogx.bio/legal/faq" className="text-muted-foreground hover:text-primary transition-colors">
              Refund Policy
            </Link>
          </div>
          <p className="text-muted-foreground">
            © 2025 NiNJA Revived. All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
