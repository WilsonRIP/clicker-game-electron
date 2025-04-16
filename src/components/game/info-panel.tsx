"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { BsLightningChargeFill, BsTrophyFill, BsArrowUpCircleFill, BsInfoCircleFill } from "react-icons/bs";

export function InfoPanel() {
  const steps = [
    {
      title: "Click to Earn",
      description: "Click the button to earn points and increase your score",
      icon: <BsLightningChargeFill className="h-3.5 w-3.5" />
    },
    {
      title: "Upgrade Power",
      description: "Purchase upgrades to increase your clicking power and automation",
      icon: <BsArrowUpCircleFill className="h-3.5 w-3.5" />
    },
    {
      title: "Unlock Achievements",
      description: "Complete goals to unlock special achievements and show your progress",
      icon: <BsTrophyFill className="h-3.5 w-3.5" />
    },
    {
      title: "New Content",
      description: "Keep playing to discover new upgrades and rare achievements",
      icon: <BsInfoCircleFill className="h-3.5 w-3.5" />
    }
  ];

  return (
    <Card className="border shadow-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 py-3 px-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary">
            📖
          </span>
          How to Play
        </CardTitle>
        <CardDescription className="text-xs">
          Follow these steps to master the clicker game
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-3 p-2.5 rounded-md bg-card/60 border border-muted/40 hover:bg-accent/5 transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (index * 0.1) }}
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                {step.icon}
              </div>
              <div>
                <h3 className="text-sm font-medium">{step.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 