"use client";

import { motion } from "framer-motion";
import { Github, Heart } from "lucide-react";

export function Footer() {
  return (
    <motion.footer 
      className="py-3 text-center text-xs text-muted-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      <p className="flex items-center justify-center gap-1.5">
        Made with 
        <motion.span 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-red-500"
        >
          <Heart className="h-3 w-3 fill-current" />
        </motion.span>
        - Clicker Game v1.0
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="ml-2 inline-flex items-center hover:text-primary transition-colors"
        >
          <Github className="h-3 w-3 mr-1" />
          Source
        </a>
      </p>
    </motion.footer>
  );
} 