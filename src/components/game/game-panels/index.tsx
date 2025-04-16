"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Upgrades } from "../upgrades";
import { Achievements } from "../achievements";

export function GamePanels() {
  return (
    <Tabs defaultValue="upgrades">
      <TabsList className="grid w-full grid-cols-2 h-11">
        <TabsTrigger value="upgrades" className="text-xs sm:text-sm">Upgrades</TabsTrigger>
        <TabsTrigger value="achievements" className="text-xs sm:text-sm">Achievements</TabsTrigger>
      </TabsList>
      <TabsContent value="upgrades" className="mt-3">
        {/* Render the existing Upgrades component here */}
        <Upgrades />
      </TabsContent>
      <TabsContent value="achievements" className="mt-3">
        {/* Render the existing Achievements component here */}
        <Achievements />
      </TabsContent>
    </Tabs>
  );
} 