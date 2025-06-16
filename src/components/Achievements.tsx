import type { Achievement } from '../services/stats';

interface AchievementsProps {
  achievements: Achievement[];
}

const Achievements = ({ achievements }: AchievementsProps) => {
  return (
    <div className="achievements">
      <h3>Your Achievements</h3>
      <div className="achievements-grid">
        {achievements.map(achievement => (
          <div 
            key={achievement.id} 
            className={`achievement-badge ${achievement.unlocked ? 'unlocked' : 'locked'}`}
          >
            <span className="achievement-icon">{achievement.icon}</span>
            <div className="achievement-info">
              <h5>{achievement.title}</h5>
              <p>{achievement.description}</p>
              {!achievement.unlocked && (
                <div className="progress-container">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${achievement.progress}%` }}
                  />
                  <span className="progress-text">{Math.round(achievement.progress)}%</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements; 