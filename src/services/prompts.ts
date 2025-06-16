export interface Prompt {
  id: number;
  text: string;
  category: 'emotional' | 'creative' | 'philosophical' | 'meta';
}

export const prompts: Prompt[] = [
  {
    id: 1,
    text: "Think about the best advice someone gave you. Why did it stick with you, and how has it shaped who you are today?",
    category: 'emotional'
  },
  {
    id: 2,
    text: "Describe a time when you changed your mind about something important. What helped you see things differently?",
    category: 'philosophical'
  },
  {
    id: 3,
    text: "If you could have dinner with your 10-year-old self, what would you want them to know about life?",
    category: 'emotional'
  },
  {
    id: 4,
    text: "What's something you do that makes you feel most like yourself? Why do you think that is?",
    category: 'creative'
  },
  {
    id: 5,
    text: "Think of a moment when someone showed you unexpected kindness. How did it affect you beyond just that day?",
    category: 'emotional'
  },
  {
    id: 6,
    text: "If you could redesign one mundane daily routine to be more meaningful or joyful, what would it be and how would you change it?",
    category: 'creative'
  },
  {
    id: 7,
    text: "What's one belief you held strongly five years ago that you've since questioned? What caused this shift?",
    category: 'philosophical'
  },
  {
    id: 8,
    text: "Describe a skill or talent you wish you had. What draws you to it, and what would you do with it?",
    category: 'creative'
  },
  {
    id: 9,
    text: "Think about a relationship that has taught you the most about yourself. What did you learn?",
    category: 'emotional'
  },
  {
    id: 10,
    text: "If you could solve one problem in your community, what would it be and how would you approach it?",
    category: 'philosophical'
  }
];

export const getRandomPrompt = (): Prompt => {
  const randomIndex = Math.floor(Math.random() * prompts.length);
  return prompts[randomIndex];
};

export const getPromptsByCategory = (category: Prompt['category']): Prompt[] => {
  return prompts.filter(prompt => prompt.category === category);
}; 