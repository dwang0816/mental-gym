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

// Utility function to add delay
const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// New streaming function with controlled speed
export const getAIReflectionStream = async (
  entry: string, 
  prompt: string, 
  onChunk: (chunk: string) => void,
  onComplete: () => void,
  onError: (error: string) => void
): Promise<void> => {
  try {
    const stream = await openai.chat.completions.create({
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
      temperature: 0.7,
      stream: true
    });

    let fullResponse = '';
    let buffer = '';

    // Collect all chunks first
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        fullResponse += content;
        buffer += content;
      }
    }

    // Now stream the collected response with controlled timing
    if (!fullResponse.trim()) {
      onError("I appreciate you sharing your thoughts. There's something meaningful in what you've written.");
      return;
    }

    // Stream character by character with natural timing
    let currentIndex = 0;
    const streamWithDelay = async () => {
      while (currentIndex < buffer.length) {
        const char = buffer[currentIndex];
        onChunk(char);
        currentIndex++;
        
        // Variable delay based on character type for natural feel
        let delayTime = 40; // Base delay (40ms per character)
        
        if (char === '.' || char === '!' || char === '?') {
          delayTime = 300; // Longer pause after sentences
        } else if (char === ',' || char === ';') {
          delayTime = 150; // Medium pause after clauses
        } else if (char === ' ') {
          delayTime = 60; // Slight pause between words
        } else if (char === '\n') {
          delayTime = 200; // Pause for line breaks
        }
        
        await delay(delayTime);
      }
      onComplete();
    };

    await streamWithDelay();

  } catch (error) {
    console.error('Error getting AI reflection stream:', error);
    onError("Thanks for sharing your thoughts! I'm having trouble connecting right now, but your reflection is valuable.");
  }
};

export const typewriterEffect = (
  text: string,
  onUpdate: (currentText: string) => void,
  onComplete: () => void,
  speed: number = 30
): (() => void) => {
  let index = 0;
  let currentText = '';
  
  const interval = setInterval(() => {
    if (index < text.length) {
      currentText += text[index];
      onUpdate(currentText);
      index++;
    } else {
      clearInterval(interval);
      onComplete();
    }
  }, speed);

  return () => clearInterval(interval);
}; 