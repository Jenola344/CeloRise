import Image from 'next/image';
import type { Project } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Target } from 'lucide-react';

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === project.imageId);
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {image && (
        <div className="relative h-48 w-full">
          <Image
            src={image.imageUrl}
            alt={project.name}
            fill
            className="object-cover"
            data-ai-hint={image.imageHint}
          />
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                 <Badge variant="secondary" className="mb-2">{project.category}</Badge>
                 <CardTitle className="font-headline text-xl">{project.name}</CardTitle>
            </div>
            <div className="text-primary p-2 bg-primary/10 rounded-lg">
                <Target className="w-6 h-6"/>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{project.description}</CardDescription>
        <div className="mt-4">
            <p className="text-sm font-semibold text-foreground">Impact Metrics:</p>
            <p className="text-sm text-muted-foreground">{project.impactMetrics}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full font-bold" variant="outline">Stake CELO</Button>
      </CardFooter>
    </Card>
  );
}
