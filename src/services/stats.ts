import type { Prompt } from './prompts';

export interface CommunityStats {
  totalWords: number;
  totalReflections: number;
  categoryDistribution: {
    emotional: number;
    creative: number;
    philosophical: number;
    meta: number;
  };
  averageReflectionLength: number;
  activeUsers: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  type: 'words' | 'reflections' | 'streak' | 'category';
  requirement: number;
}

// Initialize community stats
export const initialCommunityStats: CommunityStats = {
  totalWords: 0,
  totalReflections: 0,
  categoryDistribution: {
    emotional: 0,
    creative: 0,
    philosophical: 0,
    meta: 0
  },
  averageReflectionLength: 0,
  activeUsers: 0
};

// Define achievements
export const achievements: Achievement[] = [
  {
    id: 'first-reflection',
    title: 'First Steps',
    description: 'Complete your first reflection',
    icon: '🎯',
    unlocked: false,
    progress: 0,
    type: 'reflections',
    requirement: 1
  },
  {
    id: 'word-milestone-100',
    title: 'Word Warrior',
    description: 'Write 100 words in total',
    icon: '📝',
    unlocked: false,
    progress: 0,
    type: 'words',
    requirement: 100
  },
  {
    id: 'category-explorer',
    title: 'Category Explorer',
    description: 'Try prompts from all three categories',
    icon: '🗺️',
    unlocked: false,
    progress: 0,
    type: 'category',
    requirement: 3
  },
  {
    id: 'reflection-streak-3',
    title: 'Consistent Thinker',
    description: 'Complete reflections for 3 days in a row',
    icon: '🔥',
    unlocked: false,
    progress: 0,
    type: 'streak',
    requirement: 3
  }
];

// Helper function to format numbers
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

// Helper function to update community stats
export const updateCommunityStats = (
  currentStats: CommunityStats,
  newReflection: { wordCount: number; category: Prompt['category'] }
): CommunityStats => {
  const newTotalWords = currentStats.totalWords + newReflection.wordCount;
  const newTotalReflections = currentStats.totalReflections + 1;
  
  return {
    ...currentStats,
    totalWords: newTotalWords,
    totalReflections: newTotalReflections,
    categoryDistribution: {
      ...currentStats.categoryDistribution,
      [newReflection.category]: currentStats.categoryDistribution[newReflection.category] + 1
    },
    averageReflectionLength: Math.round(newTotalWords / newTotalReflections)
  };
};

// Helper function to check and update achievements
export const checkAchievements = (
  currentAchievements: Achievement[],
  stats: { wordCount: number; reflectionCount: number; categories: Set<Prompt['category']>; streak: number }
): Achievement[] => {
  return currentAchievements.map(achievement => {
    let progress = 0;
    let unlocked = achievement.unlocked;

    switch (achievement.type) {
      case 'words':
        progress = Math.min(100, (stats.wordCount / achievement.requirement) * 100);
        unlocked = stats.wordCount >= achievement.requirement;
        break;
      case 'reflections':
        progress = Math.min(100, (stats.reflectionCount / achievement.requirement) * 100);
        unlocked = stats.reflectionCount >= achievement.requirement;
        break;
      case 'category':
        progress = Math.min(100, (stats.categories.size / achievement.requirement) * 100);
        unlocked = stats.categories.size >= achievement.requirement;
        break;
      case 'streak':
        progress = Math.min(100, (stats.streak / achievement.requirement) * 100);
        unlocked = stats.streak >= achievement.requirement;
        break;
    }

    return {
      ...achievement,
      progress,
      unlocked: achievement.unlocked || unlocked
    };
  });
}; 