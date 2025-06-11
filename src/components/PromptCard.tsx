
import type { Prompt } from '../services/prompts';

interface PromptCardProps {
  prompt: Prompt;
  onNewPrompt: () => void;
}

const PromptCard = ({ prompt, onNewPrompt }: PromptCardProps) => {
  const getCategoryEmoji = (category: Prompt['category']) => {
    switch (category) {
      case 'emotional': return '💝';
      case 'creative': return '🎨';
      case 'philosophical': return '🤔';
      default: return '💭';
    }
  };

  const getCategoryLabel = (category: Prompt['category']) => {
    switch (category) {
      case 'emotional': return 'Emotional Intelligence';
      case 'creative': return 'Creative Thinking';
      case 'philosophical': return 'Deep Reflection';
      default: return 'Thinking Prompt';
    }
  };

  return (
    <div className="prompt-card">
      <div className="prompt-category">
        <span className="category-emoji">{getCategoryEmoji(prompt.category)}</span>
        <span className="category-label">{getCategoryLabel(prompt.category)}</span>
      </div>
      
      <div className="prompt-text">
        {prompt.text}
      </div>
      
      <button className="new-prompt-btn" onClick={onNewPrompt}>
        Try Another Prompt
      </button>
    </div>
  );
};

export default PromptCard; 