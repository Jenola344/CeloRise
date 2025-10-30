import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ProjectCard } from '@/components/project-card';
import { projects } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { RewardDistributionForm } from '@/components/reward-distribution-form';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-card overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 z-10 relative">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold tracking-tighter">
                  Invest in Impact,
                  <br />
                  <span className="text-primary">Grow the Future</span>
                </h1>
                <p className="max-w-xl mx-auto md:mx-0 text-lg text-muted-foreground">
                  CeloRise empowers you to support real-world impact projects in finance, climate, education, and health. Stake your CELO and earn rewards while making a difference.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button size="lg" className="font-bold">
                    Explore Projects
                    <ArrowRight className="ml-2" />
                  </Button>
                  <Button size="lg" variant="outline" className="font-bold">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="relative h-64 md:h-auto">
                {heroImage && (
                  <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover rounded-lg shadow-2xl"
                    data-ai-hint={heroImage.imageHint}
                  />
                )}
                 <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent md:bg-gradient-to-r md:from-background md:via-background/50 md:to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">
                Impact Projects
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                Discover and support projects that are creating tangible, positive change across the globe.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section id="distribute-rewards" className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                 <div className="inline-block bg-primary/10 text-primary p-3 rounded-full">
                    <Leaf className="w-8 h-8" />
                 </div>
                 <h2 className="text-3xl md:text-4xl font-headline font-bold">Distribute Staking Rewards</h2>
                 <p className="text-muted-foreground max-w-lg">
                   Our AI-powered system analyzes project performance to ensure rewards are distributed fairly and effectively, maximizing the impact of your staked assets. Enter the total rewards to begin.
                 </p>
              </div>
               <RewardDistributionForm projects={projects} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
