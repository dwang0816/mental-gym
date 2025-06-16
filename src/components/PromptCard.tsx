import React from 'react';
import type { Prompt } from '../services/prompts';

interface PromptCardProps {
  prompt: Prompt;
  onNewPrompt?: () => void;
  special?: boolean;
}

const PromptCard = ({ prompt, onNewPrompt, special }: PromptCardProps) => {
  const getCategoryEmoji = (category: Prompt['category']) => {
    switch (category) {
      case 'emotional': return '💝';
      case 'creative': return '🎨';
      case 'philosophical': return '🤔';
      case 'meta': return '🧠';
      default: return '💭';
    }
  };

  const getCategoryLabel = (category: Prompt['category']) => {
    switch (category) {
      case 'emotional': return 'Emotional Intelligence';
      case 'creative': return 'Creative Thinking';
      case 'philosophical': return 'Deep Reflection';
      case 'meta': return 'Mind Gym Challenge';
      default: return 'Thinking Prompt';
    }
  };

  return (
    <div className={`prompt-card${special ? ' special-prompt' : ''}`}>
      {special && (
        <div className="rare-badge">🌟 Rare Question</div>
      )}
      <div className="prompt-category">
        <span className="category-emoji">{getCategoryEmoji(prompt.category)}</span>
        <span className="category-label">{getCategoryLabel(prompt.category)}</span>
      </div>
      
      <div className="prompt-text">
        {prompt.text}
      </div>
      
      {onNewPrompt && (
        <button className="new-prompt-btn" onClick={onNewPrompt}>
          Try Another Prompt
        </button>
      )}
    </div>
  );
};

export default PromptCard; 