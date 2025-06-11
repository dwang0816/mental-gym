import React, { useState } from 'react';
import type { Prompt } from '../services/prompts';
import { getAIReflection } from '../services/claude';

interface WriteAreaProps {
  value: string;
  onChange: (value: string) => void;
  prompt: Prompt;
  onAIResponse: (response: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const WriteArea = ({ 
  value, 
  onChange, 
  prompt, 
  onAIResponse, 
  isLoading, 
  setIsLoading 
}: WriteAreaProps) => {
  const [hasRequestedAI, setHasRequestedAI] = useState(false);

  const handleGetAIFeedback = async () => {
    if (!value.trim()) {
      alert('Please write something first!');
      return;
    }

    setIsLoading(true);
    setHasRequestedAI(true);
    
    try {
      const response = await getAIReflection(value, prompt.text);
      onAIResponse(response);
    } catch (error) {
      console.error('Error getting AI feedback:', error);
      onAIResponse("Thanks for sharing your thoughts! I'm having trouble connecting right now, but your reflection is valuable.");
    } finally {
      setIsLoading(false);
    }
  };

  const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="write-area">
      <div className="write-header">
        <h3>Your Thoughts</h3>
        <span className="word-count">{wordCount} words</span>
      </div>
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start writing your thoughts here... Take your time and be honest with yourself."
        className="write-textarea"
        rows={8}
      />
      
      <div className="write-actions">
        <button 
          onClick={handleGetAIFeedback}
          disabled={isLoading || !value.trim()}
          className="ai-feedback-btn"
        >
          {isLoading ? 'Getting thoughtful feedback...' : 'Get AI Reflection'}
        </button>
        
        {!hasRequestedAI && value.length > 20 && (
          <p className="ai-hint">
            ✨ Ready for some thoughtful feedback? Click above when you're done writing.
          </p>
        )}
      </div>
    </div>
  );
};

export default WriteArea; 