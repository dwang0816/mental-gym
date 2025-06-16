import { useState } from 'react'
import './App.css'
import { prompts } from './services/prompts'
import PromptCard from './components/PromptCard'
import WriteArea from './components/WriteArea'
import AIResponse from './components/AIResponse'
import CommunityStats from './components/CommunityStats'
import { 
  initialCommunityStats, 
  achievements as initialAchievements,
  updateCommunityStats,
  checkAchievements
} from './services/stats'
import type { CommunityStats as CommunityStatsType } from './services/stats'
import type { Prompt } from './services/prompts'

// Special rare question prompt
const specialPrompt: Prompt = {
  id: 999,
  text: "What is one belief, habit, or assumption you hold that you've never truly questioned? Take a moment to challenge it now—what new perspective emerges when you do?",
  category: 'meta',
}

function getRandomPromptWithSpecial(prompts: Prompt[], special: Prompt, specialChance = 0.04) {
  // 4% chance to show the special prompt
  if (Math.random() < specialChance) return special
  const randomIndex = Math.floor(Math.random() * prompts.length)
  return prompts[randomIndex]
}

function App() {
  const [showExample, setShowExample] = useState(true)
  const [currentPrompt, setCurrentPrompt] = useState<Prompt>(prompts[0])
  const [userEntry, setUserEntry] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [communityStats, setCommunityStats] = useState<CommunityStatsType>(initialCommunityStats)
  const [userAchievements, setUserAchievements] = useState(initialAchievements)
  const [userStats, setUserStats] = useState({
    wordCount: 0,
    reflectionCount: 0,
    categories: new Set<Prompt['category']>(),
    streak: 0
  })
  const [showMobileInsights, setShowMobileInsights] = useState(false)

  const handleStartWriting = () => {
    setShowExample(false)
  }

  const handleNewPrompt = () => {
    setCurrentPrompt(getRandomPromptWithSpecial(prompts, specialPrompt))
    setUserEntry('')
    setAiResponse('')
    setIsStreaming(false)
  }

  const handleAIResponse = (response: string) => {
    const wordCount = userEntry.trim().split(/\s+/).filter(word => word.length > 0).length
    const newUserStats = {
      ...userStats,
      wordCount: userStats.wordCount + wordCount,
      reflectionCount: userStats.reflectionCount + 1,
      categories: new Set([...userStats.categories, currentPrompt.category])
    }

    // Update community stats
    const newCommunityStats = updateCommunityStats(communityStats, {
      wordCount,
      category: currentPrompt.category
    })
    setCommunityStats(newCommunityStats)

    // Update user stats and check achievements
    setUserStats(newUserStats)
    const updatedAchievements = checkAchievements(userAchievements, newUserStats)
    setUserAchievements(updatedAchievements)

    setAiResponse(response)
  }

  // Determine if the current prompt is the special one
  const isSpecialPrompt = currentPrompt.id === specialPrompt.id

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="mental-gym-title">The Mental Gym</h1>
        <p>Daily prompts to strengthen your thinking</p>
      </header>

      {/* Mobile Community Insights Toggle Button */}
      <button
        className="mobile-insights-toggle"
        onClick={() => setShowMobileInsights((v) => !v)}
        aria-label="Show Community Insights"
      >
        <span role="img" aria-label="community">📊</span> Community Insights
      </button>

      {/* Community Insights as a fixed-position box, not wrapped with main content */}
      <div className="community-insights-fixed">
        <CommunityStats stats={communityStats} />
      </div>

      {/* Mobile Community Insights Modal/Panel */}
      {showMobileInsights && (
        <div className="mobile-insights-modal" onClick={() => setShowMobileInsights(false)}>
          <div className="mobile-insights-content" onClick={e => e.stopPropagation()}>
            <button className="close-mobile-insights" onClick={() => setShowMobileInsights(false)} aria-label="Close Insights">✕</button>
            <CommunityStats stats={communityStats} />
          </div>
        </div>
      )}

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
        <PromptCard prompt={currentPrompt} onNewPrompt={handleNewPrompt} special={isSpecialPrompt} />
        <WriteArea
          value={userEntry}
          onChange={setUserEntry}
          prompt={currentPrompt}
          onAIResponse={handleAIResponse}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        {(aiResponse || isStreaming) && (
          <AIResponse response={aiResponse} />
        )}
      </main>
    </div>
  )
}

export default App
