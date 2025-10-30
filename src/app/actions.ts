'use server';

import { distributeRewardsBasedOnProjectPerformance, DistributeRewardsOutput } from '@/ai/flows/distribute-rewards-project-performance';
import { z } from 'zod';

export interface FormState {
  message: string;
  rewards: DistributeRewardsOutput | null;
}

const ProjectSchema = z.object({
  projectId: z.string(),
  impactMetrics: z.string(),
});

const ProjectsSchema = z.array(ProjectSchema);

export async function handleRewardDistribution(
  projectsForAction: z.infer<typeof ProjectsSchema>,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const schema = z.object({
    totalRewards: z.coerce.number().positive("Total rewards must be a positive number."),
  });

  const validatedFields = schema.safeParse({
    totalRewards: formData.get('totalRewards'),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((e) => e.message).join(', '),
      rewards: null,
    };
  }

  try {
    const result = await distributeRewardsBasedOnProjectPerformance({
      projects: projectsForAction,
      totalRewards: validatedFields.data.totalRewards,
    });
    
    // Validate if the sum of rewards is reasonable
    const totalDistributed = result.reduce((sum, item) => sum + item.rewardAmount, 0);
    if (totalDistributed > validatedFields.data.totalRewards * 1.1) { // Allow for a small margin of error
        console.error("AI returned a total reward amount significantly higher than requested.", { totalDistributed, requested: validatedFields.data.totalRewards });
        return {
            message: 'An error occurred while calculating rewards. The AI model returned an inconsistent result.',
            rewards: null
        }
    }


    return {
      message: 'Rewards distributed successfully.',
      rewards: result,
    };
  } catch (error) {
    console.error('Error in reward distribution:', error);
    return {
      message: 'An unexpected error occurred. Please try again later.',
      rewards: null,
    };
  }
}
