// Level configuration for the gamification system
// This defines the XP requirements and rewards for each level

export interface LevelConfig {
  level: number;
  title: string;
  requiredXP: number;
  description: string;
  benefits?: string[];
}

// Define the levels and their requirements
// Each level requires more XP than the previous one
export const levelConfigs: LevelConfig[] = [
  {
    level: 1,
    title: "Content Novice",
    requiredXP: 0, // Starting level
    description: "You're just getting started on your content journey!",
    benefits: ["Access to basic content templates"]
  },
  {
    level: 2,
    title: "Content Creator",
    requiredXP: 1000,
    description: "You're creating content regularly and building your skills.",
    benefits: ["Unlock social media post templates", "Daily mission rewards increased by 10%"]
  },
  {
    level: 3,
    title: "Content Master",
    requiredXP: 3000,
    description: "You've mastered the basics and are becoming a content expert.",
    benefits: ["Unlock advanced blog templates", "Mission rewards increased by 25%"]
  },
  {
    level: 4,
    title: "Content Strategist",
    requiredXP: 6000,
    description: "You're developing strategic content that drives engagement.",
    benefits: ["Unlock video script templates", "Weekly bonus missions"]
  },
  {
    level: 5,
    title: "Content Authority",
    requiredXP: 10000,
    description: "You're an authority in creating engaging mortgage content.",
    benefits: ["Unlock email campaign templates", "Mission rewards increased by 50%"]
  },
  {
    level: 6,
    title: "Content Influencer",
    requiredXP: 15000,
    description: "Your content is influencing the mortgage industry.",
    benefits: ["Unlock co-marketing templates", "Daily mission limit increased"]
  },
  {
    level: 7,
    title: "Content Visionary",
    requiredXP: 21000,
    description: "You're a visionary in mortgage content creation.",
    benefits: ["Unlock premium templates", "Special monthly challenges"]
  },
  {
    level: 8,
    title: "Content Legend",
    requiredXP: 28000,
    description: "You've achieved legendary status in mortgage content.",
    benefits: ["Unlock all content features", "Double XP weekends"]
  },
  {
    level: 9,
    title: "Content Guru",
    requiredXP: 36000,
    description: "You've reached guru status in the mortgage content world.",
    benefits: ["Early access to new features", "Custom content strategy session"]
  },
  {
    level: 10,
    title: "Content Mastermind",
    requiredXP: 45000,
    description: "You're a mastermind of mortgage content creation.",
    benefits: ["VIP status", "Exclusive mastermind group access"]
  }
];

/**
 * Get the level configuration for a specific level
 * @param level The level number
 * @returns The level configuration or the highest level if the level is higher than available configs
 */
export const getLevelConfig = (level: number): LevelConfig => {
  if (level <= 0) return levelConfigs[0];
  if (level > levelConfigs.length) return levelConfigs[levelConfigs.length - 1];
  return levelConfigs[level - 1];
};

/**
 * Calculate the level based on total XP
 * @param xpTotal The total XP accumulated
 * @returns The current level
 */
export const calculateLevel = (xpTotal: number): number => {
  let level = 1;
  
  for (let i = 1; i < levelConfigs.length; i++) {
    if (xpTotal >= levelConfigs[i].requiredXP) {
      level = i + 1;
    } else {
      break;
    }
  }
  
  return level;
};

/**
 * Calculate XP needed to reach the next level
 * @param xpTotal The total XP accumulated
 * @returns The XP needed to reach the next level
 */
export const calculateXpToNextLevel = (xpTotal: number): number => {
  const currentLevel = calculateLevel(xpTotal);
  
  // If at max level, return 0
  if (currentLevel >= levelConfigs.length) {
    return 0;
  }
  
  const nextLevelXP = levelConfigs[currentLevel].requiredXP;
  return nextLevelXP - xpTotal;
};

/**
 * Calculate the progress percentage towards the next level
 * @param xpTotal The total XP accumulated
 * @returns A number between 0 and 1 representing the progress percentage
 */
export const calculateLevelProgress = (xpTotal: number): number => {
  const currentLevel = calculateLevel(xpTotal);
  
  // If at max level, return 1 (100%)
  if (currentLevel >= levelConfigs.length) {
    return 1;
  }
  
  const currentLevelXP = levelConfigs[currentLevel - 1].requiredXP;
  const nextLevelXP = levelConfigs[currentLevel].requiredXP;
  const xpForCurrentLevel = nextLevelXP - currentLevelXP;
  const xpProgress = xpTotal - currentLevelXP;
  
  return xpProgress / xpForCurrentLevel;
};
