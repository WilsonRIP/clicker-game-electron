import { GameProvider } from "../components/game-context";
import { ClickerButton } from "../components/game/clicker";
import { GameHeader } from "../components/game/header";
import { InfoPanel } from "../components/game/info-panel";
import { Footer } from "../components/footer";
import { Toaster } from "sonner";
import { GamePanels } from "../components/game/game-panels";

export default function Home() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/90 dark:from-background dark:via-background/95 dark:to-background/90">
        <div className="container mx-auto max-w-7xl px-4">
          <GameHeader />
          
          <main className="py-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
              {/* Background decorations */}
              <div className="absolute left-5 top-1/3 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
              <div className="absolute right-5 top-1/4 -z-10 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl"></div>
              <div className="absolute left-1/4 bottom-1/4 -z-10 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl"></div>
              
              {/* Left column - Clicker */}
              <div className="lg:col-span-6 xl:col-span-5">
                <div className="flex h-[calc(100vh-240px)] md:h-[calc(100vh-200px)] items-center justify-center lg:sticky lg:top-24">
                  <ClickerButton />
                </div>
              </div>
              
              {/* Right column - Game components */}
              <div className="lg:col-span-6 xl:col-span-7 space-y-5">
                {/* Game info panel at the top for better visibility */}
                <InfoPanel />
                
                {/* Replaced Upgrades and Achievements with GamePanels */}
                <GamePanels />
                
                <Footer />
              </div>
            </div>
          </main>
        </div>
        <Toaster position="bottom-right" richColors closeButton />
      </div>
    </GameProvider>
  );
}
