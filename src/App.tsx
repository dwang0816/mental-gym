import { useState, useEffect } from 'react'
import './App.css'
import { getRandomPrompt } from './services/prompts'
import { getAIReflectionStream, typewriterEffect } from './services/claude'

function App() {
  const [currentPrompt, setCurrentPrompt] = useState(getRandomPrompt())
  const [userEntry, setUserEntry] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showExample, setShowExample] = useState(true)
  const [isStreaming, setIsStreaming] = useState(false)
  const [displayedPrompt, setDisplayedPrompt] = useState('')

  // Typewriter effect for prompts
  useEffect(() => {
    setDisplayedPrompt('')
    const cleanup = typewriterEffect(
      currentPrompt.text,
      (text) => setDisplayedPrompt(text),
      () => {},
      25
    )
    return cleanup
  }, [currentPrompt.text])

  const handleNewPrompt = () => {
    const newPrompt = getRandomPrompt()
    setCurrentPrompt(newPrompt)
    setUserEntry('')
    setAiResponse('')
    setIsStreaming(false)
  }

  const handleStartWriting = () => {
    setShowExample(false)
  }

  const handleGetAIFeedback = async () => {
    if (!userEntry.trim()) {
      alert('Please write something first!')
      return
    }

    setIsLoading(true)
    setIsStreaming(true)
    setAiResponse('')

    try {
      await getAIReflectionStream(
        userEntry,
        currentPrompt.text,
        // onChunk - called for each piece of streamed text
        (chunk: string) => {
          setAiResponse(prev => prev + chunk)
        },
        // onComplete - called when streaming is done
        () => {
          setIsLoading(false)
          setIsStreaming(false)
        },
        // onError - called if there's an error
        (errorMessage: string) => {
          setAiResponse(errorMessage)
          setIsLoading(false)
          setIsStreaming(false)
        }
      )
    } catch (error) {
      console.error('Error getting AI feedback:', error)
      setAiResponse("Thanks for sharing your thoughts! I'm having trouble connecting right now, but your reflection is valuable.")
      setIsLoading(false)
      setIsStreaming(false)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Mental Gym 🧠</h1>
        <p>Daily prompts to strengthen your thinking</p>
      </header>

      {/* Example Section */}
      {showExample && (
        <div className="example-section">
          <div className="example-header">
            <h3>✨ Here's how it works</h3>
            <p>See what a typical reflection looks like:</p>
          </div>
          
          <div className="example-flow">
            <div className="example-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>🤔 You get a thoughtful prompt</h4>
                <div className="example-prompt">
                  "Think of a time when you had to make a difficult decision. What values guided your choice?"
                </div>
              </div>
            </div>

            <div className="example-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>✍️ You share your thoughts</h4>
                <div className="example-writing">
                  "Last year I had to choose between a high-paying job and one that aligned with my values. I chose the meaningful work because I realized that feeling fulfilled at the end of each day was more important to me than a bigger paycheck. It was scary financially, but I knew I'd regret not following my heart."
                </div>
              </div>
            </div>

            <div className="example-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>💭 AI offers gentle reflection</h4>
                <div className="example-ai-response">
                  "What strikes me about your story is how clearly you identified what truly matters to you - that sense of daily fulfillment. It takes courage to choose meaning over money, especially when there's financial uncertainty involved. 
                  
                  I'm curious: How has that decision shaped other choices you've made since then? It sounds like you've discovered something important about what drives you."
                </div>
              </div>
            </div>
          </div>

          <div className="example-footer">
            <button className="start-btn" onClick={handleStartWriting}>
              Ready to try? Let's start! 🚀
            </button>
            <p className="example-note">
              No signup required • Your thoughts stay private • Takes just 2-3 minutes
            </p>
          </div>
        </div>
      )}

      <main className="app-main">
        {/* Prompt Card */}
        <div className="prompt-card">
          <div className="prompt-category">
            <span className="category-emoji">
              {currentPrompt.category === 'emotional' ? '💝' : 
               currentPrompt.category === 'creative' ? '🎨' : '🤔'}
            </span>
            <span className="category-label">
              {currentPrompt.category === 'emotional' ? 'Emotional Intelligence' :
               currentPrompt.category === 'creative' ? 'Creative Thinking' : 'Deep Reflection'}
            </span>
          </div>
          
          <div className="prompt-text">
            {displayedPrompt}
            {displayedPrompt.length < currentPrompt.text.length && (
              <span className="typing-cursor">|</span>
            )}
          </div>
          
          <button className="new-prompt-btn" onClick={handleNewPrompt}>
            Try Another Prompt
          </button>
        </div>

        {/* Write Area */}
        <div className="write-area">
          <div className="write-header">
            <h3>Your Thoughts</h3>
            <span className="word-count">
              {userEntry.trim().split(/\s+/).filter(word => word.length > 0).length} words
            </span>
          </div>
          
          <textarea
            value={userEntry}
            onChange={(e) => setUserEntry(e.target.value)}
            onFocus={handleStartWriting}
            placeholder="Start writing your thoughts here... Take your time and be honest with yourself."
            className="write-textarea"
            rows={8}
          />
          
          <div className="write-actions">
            <button 
              onClick={handleGetAIFeedback}
              disabled={isLoading || !userEntry.trim()}
              className="ai-feedback-btn"
            >
              {isLoading ? 'Getting thoughtful feedback...' : 'Get AI Reflection'}
            </button>
            
            {userEntry.length > 20 && !aiResponse && (
              <p className="ai-hint">
                ✨ Ready for some thoughtful feedback? Click above when you're done writing.
              </p>
            )}
          </div>
        </div>

        {/* AI Response */}
        {(aiResponse || isStreaming) && (
          <div className="ai-response">
            <div className="ai-response-header">
              <h3>💭 AI Reflection</h3>
              <span className="ai-badge">
                {isStreaming ? 'Thinking...' : 'Powered by ChatGPT'}
              </span>
            </div>
            
            <div className="ai-response-content">
              {aiResponse}
              {isStreaming && (
                <span className="streaming-cursor">▋</span>
              )}
            </div>
            
            <div className="ai-response-footer">
              <p className="ai-disclaimer">
                This reflection is generated by AI to help you think deeper. 
                Your thoughts and experiences are uniquely yours.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
