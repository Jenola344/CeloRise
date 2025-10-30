import { Button } from "@/components/ui/button";
import { CeloRiseLogo } from "@/components/icons";
import { Wallet } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <CeloRiseLogo className="h-6 w-6 text-primary" />
          <span className="text-xl font-headline font-bold">CeloRise</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#projects" className="text-muted-foreground transition-colors hover:text-foreground">Projects</a>
          <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">About</a>
          <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">Docs</a>
        </nav>
        <Button>
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      </div>
    </header>
  );
}
