import OpenAI from 'openai';

// Note: In production, this should be done on a backend server
// For prototype purposes, we'll handle it client-side

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true // Only for prototype!
});

export const getAIReflection = async (entry: string, prompt: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a thoughtful friend reading someone's journal entry. 
Your goal is to help them think deeper about their experience.

Respond with:
1. One genuine observation about their thinking
2. One thought-provoking but gentle question  
3. One encouraging insight or connection

Keep it conversational, warm, and under 150 words.
Avoid therapy-speak or being preachy.
Write as if you're having a friendly conversation.`
        },
        {
          role: 'user',
          content: `Prompt: "${prompt}"\n\nJournal Entry: "${entry}"\n\nPlease provide thoughtful, friendly feedback.`
        }
      ],
      max_tokens: 200,
      temperature: 0.7
    });

    return response.choices[0]?.message?.content || 
           "I appreciate you sharing your thoughts. There's something meaningful in what you've written.";
  } catch (error) {
    console.error('Error getting AI reflection:', error);
    return "Thanks for sharing your thoughts! I'm having trouble connecting right now, but your reflection is valuable.";
  }
}; 