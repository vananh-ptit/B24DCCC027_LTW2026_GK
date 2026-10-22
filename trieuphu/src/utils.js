import { MILESTONES, PRIZES } from './data';

export const calcPrize = (correctCount, reason) => {
  if (reason === 'win') return PRIZES[PRIZES.length - 1];
  
  
  const achievedMilestones = MILESTONES.filter(m => m <= correctCount);
  if (achievedMilestones.length === 0) return 0;
  
  const highestMilestone = Math.max(...achievedMilestones);
  return PRIZES[highestMilestone - 1];
};