"use client";

import { useFormState, useFormStatus } from "react-dom";
import { handleRewardDistribution, type FormState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Award } from 'lucide-react';
import type { Project } from "@/lib/data";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full font-bold">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Distributing...
        </>
      ) : (
        "Distribute Rewards"
      )}
    </Button>
  );
}

export function RewardDistributionForm({ projects }: { projects: Project[] }) {
    const initialState: FormState = {
        message: '',
        rewards: null,
    };
    const [state, formAction] = useFormState(handleRewardDistribution, initialState);

    // This is a workaround to pass the projects data to the server action
    // In a real app, this might be fetched from a DB within the action
    const actionWithProjects = formAction.bind(null, projects.map(p => ({ projectId: p.id, impactMetrics: p.impactMetrics })));

    return (
        <Card className="w-full max-w-lg mx-auto">
            <form action={actionWithProjects}>
                <CardHeader>
                    <CardTitle className="font-headline text-lg">Reward Simulation</CardTitle>
                    <CardDescription>Enter the total CELO rewards to distribute among projects.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="totalRewards">Total Rewards (CELO)</Label>
                        <Input
                            id="totalRewards"
                            name="totalRewards"
                            type="number"
                            placeholder="e.g., 10000"
                            required
                            min="1"
                        />
                    </div>
                     {state.message && !state.rewards && <p className="text-sm text-destructive">{state.message}</p>}

                    {state.rewards && (
                        <div className="space-y-4 pt-4">
                            <h3 className="font-semibold text-foreground">Distribution Results</h3>
                            <div className="rounded-lg border bg-background">
                                <ul className="divide-y">
                                {state.rewards.map(reward => {
                                    const project = projects.find(p => p.id === reward.projectId);
                                    return (
                                        <li key={reward.projectId} className="flex items-center justify-between p-3">
                                            <div className="flex items-center gap-3">
                                                <Award className="h-5 w-5 text-accent" />
                                                <span className="font-medium">{project?.name || reward.projectId}</span>
                                            </div>
                                            <span className="font-mono text-primary font-bold">{reward.rewardAmount.toLocaleString()} CELO</span>
                                        </li>
                                    )
                                })}
                                </ul>
                            </div>
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                   <SubmitButton />
                </CardFooter>
            </form>
        </Card>
    );
}
