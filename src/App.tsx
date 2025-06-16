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
  const [showFAQ, setShowFAQ] = useState(false)

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

      {/* FAQ Toggle Button */}
      <button
        className="faq-toggle"
        onClick={() => setShowFAQ((v) => !v)}
        aria-label="Toggle FAQ"
      >
        <span role="img" aria-label="faq">❓</span> FAQ
      </button>

      {/* FAQ Modal */}
      {showFAQ && (
        <div className="faq-modal" onClick={() => setShowFAQ(false)}>
          <div className="faq-content" onClick={e => e.stopPropagation()}>
            <button className="close-faq" onClick={() => setShowFAQ(false)} aria-label="Close FAQ">✕</button>
            <h2>Frequently Asked Questions</h2>
            <div className="faq-item">
              <h3>What is The Mental Gym?</h3>
              <p>The Mental Gym is a web app designed to strengthen your thinking through daily prompts. It offers thought-provoking questions across categories like emotional intelligence, creativity, and philosophy. Each prompt encourages deep reflection, and you can receive AI-powered feedback on your thoughts.</p>
            </div>
            <div className="faq-item">
              <h3>How do I use The Mental Gym?</h3>
              <p>Simply visit the app, read the daily prompt, and write your thoughts in the provided text area. Click "Get AI Reflection" to receive feedback. You can also click "Try Another Prompt" to explore different questions.</p>
            </div>
            <div className="faq-item">
              <h3>What are the different prompt categories?</h3>
              <p>Prompts are categorized into Emotional, Creative, Philosophical, and Meta. Each category focuses on different aspects of thinking and reflection.</p>
            </div>
            <div className="faq-item">
              <h3>How does the AI feedback work?</h3>
              <p>The app uses OpenAI's GPT-3.5-turbo to analyze your writing. The AI provides observations, gentle questions, and encouragement based on your input. It aims to feel like a thoughtful friend rather than a robotic assistant.</p>
            </div>
            <div className="faq-item">
              <h3>Is my data private?</h3>
              <p>Yes! The Mental Gym does not store any user data. Each session is independent, and your writing is only processed for the current interaction.</p>
            </div>
            <div className="faq-item">
              <h3>What are Community Insights?</h3>
              <p>Community Insights show aggregated stats from all users, such as total words written, AI reflections generated, and category distribution. It helps you see how others are engaging with the app.</p>
            </div>
            <div className="faq-item">
              <h3>Is The Mental Gym free to use?</h3>
              <p>Yes, The Mental Gym is completely free. There are no hidden costs or subscriptions.</p>
            </div>
            <div className="faq-item">
              <h3>Can I use The Mental Gym on mobile?</h3>
              <p>Absolutely! The app is fully responsive and works beautifully on both desktop and mobile devices. On mobile, Community Insights are toggled with a button for a cleaner experience.</p>
            </div>
            <div className="faq-item">
              <h3>How can I contribute to The Mental Gym?</h3>
              <p>Contributions are welcome! You can submit new prompts, improve the AI conversation flow, enhance the design, or make the experience more accessible. Check the README for details on how to contribute.</p>
            </div>
          </div>
        </div>
      )}

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
