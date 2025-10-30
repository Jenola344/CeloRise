'use server';
/**
 * @fileOverview A flow to distribute rewards based on project performance.
 *
 * - distributeRewardsBasedOnProjectPerformance - A function that distributes rewards based on project performance.
 * - DistributeRewardsInput - The input type for the distributeRewardsBasedOnProjectPerformance function.
 * - DistributeRewardsOutput - The return type for the distributeRewardsBasedOnProjectPerformance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DistributeRewardsInputSchema = z.object({
  projects: z.array(
    z.object({
      projectId: z.string().describe('The unique identifier of the project.'),
      impactMetrics: z.string().describe('The impact metrics of the project.'),
    })
  ).describe('An array of projects with their impact metrics.'),
  totalRewards: z.number().describe('The total rewards to be distributed.'),
});
export type DistributeRewardsInput = z.infer<typeof DistributeRewardsInputSchema>;

const DistributeRewardsOutputSchema = z.array(
  z.object({
    projectId: z.string().describe('The unique identifier of the project.'),
    rewardAmount: z.number().describe('The amount of reward allocated to the project.'),
  })
);
export type DistributeRewardsOutput = z.infer<typeof DistributeRewardsOutputSchema>;

export async function distributeRewardsBasedOnProjectPerformance(
  input: DistributeRewardsInput
): Promise<DistributeRewardsOutput> {
  return distributeRewardsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'distributeRewardsPrompt',
  input: {schema: DistributeRewardsInputSchema},
  output: {schema: DistributeRewardsOutputSchema},
  prompt: `You are an AI assistant that helps distribute rewards among impactful projects based on their performance metrics.

You will receive an array of projects with their impact metrics and the total rewards to be distributed.
Your goal is to allocate rewards to each project based on their impact, ensuring that the most deserving projects receive the most support.

Projects: {{{JSON.stringify projects}}}
Total Rewards: {{{totalRewards}}}

Allocate rewards based on the impactMetrics of each project. The rewardAmount should reflect the project's contribution to the overall goal.
Ensure the total reward distributed does not exceed the totalRewards available.

Output the result as a JSON array:
{{#each projects}}
{
  "projectId": "{{projectId}}",
  "rewardAmount": rewardAmount // A number, reward for project {{projectId}}
}
{{/each}}`,
});

const distributeRewardsFlow = ai.defineFlow(
  {
    name: 'distributeRewardsFlow',
    inputSchema: DistributeRewardsInputSchema,
    outputSchema: DistributeRewardsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
