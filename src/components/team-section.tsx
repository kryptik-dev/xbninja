'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DiscordUserCard from './discord-user-card';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description?: string;
}

interface TeamSectionProps {
  title: string;
  subtitle?: string;
  members: TeamMember[];
  className?: string;
}

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

export default function TeamSection({ 
  title, 
  subtitle, 
  members, 
  className = '' 
}: TeamSectionProps) {
  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="container mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-left sm:text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-left sm:text-center">{title}</h2>
          {subtitle && (
            <p className="text-muted-foreground text-lg text-left sm:text-center max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <DiscordUserCard
                userId={member.id}
                displayName={member.name}
                role={member.role}
              />
            </motion.div>
          ))}
        </motion.div>


      </div>
    </section>
  );
}
