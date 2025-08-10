// services/aiService.ts
import { OPENAI_API_KEY } from '@env';
import { getEnvVar } from '../utils/envValidation';

// Fallback to Expo's built-in environment variables for web compatibility
const getApiKey = () => {
  return OPENAI_API_KEY || process.env.EXPO_PUBLIC_OPENAI_API_KEY || '';
};

// Get OpenAI API URL from environment or use default
const getApiUrl = () => {
  return process.env.OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions';
};

interface AIResponse {
  success: boolean;
  response?: string;
  error?: string;
}

export class AIService {
  private static readonly OPENAI_API_URL = getApiUrl();

  private static validateApiKey(): boolean {
    const apiKey = getApiKey();
    console.log('AI Service: Validating API key...');
    console.log('AI Service: API key exists:', !!apiKey);
    console.log('AI Service: API key length:', apiKey ? apiKey.length : 0);
    console.log('AI Service: API key starts with sk-:', apiKey ? apiKey.startsWith('sk-') : false);
    console.log('AI Service: API key source:', OPENAI_API_KEY ? 'react-native-dotenv' : 'expo built-in');
    const isValid = !!(apiKey && apiKey.trim() !== '');
    console.log('AI Service: API key validation result:', isValid);
    return isValid;
  }



  static async getAIResponse(question: string): Promise<AIResponse> {
    try {
      console.log('AI Service: Processing question:', question);
      
      if (!this.validateApiKey()) {
        console.warn('OpenAI API key not configured, using fallback response');
        return {
          success: true,
          response: this.getFallbackResponse(question)
        };
      }

      console.log('AI Service: Making OpenAI API request');
      
      const requestBody = {
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are Gabay AI, an intelligent study companion and tutor for Filipino students. Your name "Gabay" means "guide" in Filipino. You help students with academic questions across all subjects including math, science, history, literature, and study techniques. Provide clear, helpful explanations that are culturally relevant and encouraging. Keep responses concise but informative. Use emojis to make responses engaging. Always be supportive and motivating in your responses.'
          },
          {
            role: 'user',
            content: question
          }
        ],
        max_tokens: 300,
        temperature: 0.7
      };

      const apiKey = getApiKey();
      
      // Retry logic for rate limiting
      let lastError;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const response = await fetch(this.OPENAI_API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
          });

          if (response.ok) {
            const data = await response.json();
            console.log('AI Service: OpenAI API response received');
            
            if (data.choices && data.choices[0] && data.choices[0].message) {
              const aiResponse = data.choices[0].message.content?.trim();
              if (aiResponse) {
                console.log('AI Service: Successfully got AI response:', aiResponse);
                return {
                  success: true,
                  response: aiResponse
                };
              }
            }
            
            console.warn('Invalid OpenAI API response format');
            break;
          }
          
          // Handle specific error codes
          if (response.status === 429) {
            const waitTime = Math.pow(2, attempt) * 1000; // Exponential backoff
            console.warn(`AI Service: Rate limited (attempt ${attempt}/3). Waiting ${waitTime}ms before retry...`);
            
            if (attempt < 3) {
              await new Promise(resolve => setTimeout(resolve, waitTime));
              continue;
            } else {
              lastError = new Error(`Rate limit exceeded. Please try again in a few minutes.`);
            }
          } else if (response.status === 401) {
            lastError = new Error(`Invalid API key. Please check your OpenAI API key configuration.`);
            break;
          } else if (response.status === 403) {
            lastError = new Error(`Access forbidden. Please check your OpenAI API key permissions.`);
            break;
          } else {
            lastError = new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
            break;
          }
        } catch (networkError) {
          lastError = networkError;
          if (attempt < 3) {
            console.warn(`AI Service: Network error (attempt ${attempt}/3). Retrying...`);
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
          }
        }
      }
      
      throw lastError || new Error('Unknown error occurred');
      
    } catch (error) {
      console.error('AI Service Error:', error);
      
      // Check if it's a rate limiting error
      if (error instanceof Error && error.message.includes('Rate limit exceeded')) {
        console.warn('Rate limit exceeded');
        return {
          success: false,
          response: `I'm currently experiencing high demand. Please try again in a few minutes. In the meantime, here's a helpful response: ${this.getFallbackResponse(question)}`,
          error: error.message
        };
      }
      
      // Check if it's an API key error
      if (error instanceof Error && (error.message.includes('Invalid API key') || error.message.includes('Access forbidden'))) {
        console.warn('API key error, using fallback response');
        return {
          success: false,
          response: `There's an issue with the AI service configuration. Here's a helpful response instead: ${this.getFallbackResponse(question)}`,
          error: error.message
        };
      }
      
      console.warn('Using fallback response');
      return {
        success: true,
        response: this.getFallbackResponse(question)
      };
    }
  }

  // Fallback responses for when API is unavailable
  static getFallbackResponse(question: string): string {
    const lowerQuestion = question.toLowerCase();
    
    // Math-related responses
    if (lowerQuestion.includes('derivative') || lowerQuestion.includes('calculus')) {
      return "📚 Hi! I'm Gabay AI, your study companion! For derivatives, remember the power rule: d/dx[x^n] = nx^(n-1). For example, d/dx[x³] = 3x². Would you like me to explain a specific derivative problem? I'm here to guide you! 🌟";
    }
    if (lowerQuestion.includes('integral') || lowerQuestion.includes('integration')) {
      return "🧮 Gabay here! Integration is the reverse of differentiation. The basic power rule for integration is: ∫x^n dx = x^(n+1)/(n+1) + C. What specific integration problem are you working on? Let's solve it together! 💪";
    }
    if (lowerQuestion.includes('limit')) {
      return "📈 Gabay AI at your service! Limits help us understand function behavior as x approaches a value. Use L'Hôpital's rule for indeterminate forms like 0/0. What limit are you trying to evaluate? I'll guide you through it! ✨";
    }
    
    // Physics-related responses
    if (lowerQuestion.includes('physics') || lowerQuestion.includes('force') || lowerQuestion.includes('newton')) {
      return "⚡ Hello! Gabay AI here to help with physics! Newton's laws are fundamental: F = ma (Force = mass × acceleration). Remember: objects at rest stay at rest unless acted upon by a force. What physics concept can I help clarify? 🚀";
    }
    if (lowerQuestion.includes('velocity') || lowerQuestion.includes('acceleration')) {
      return "🚀 Gabay AI here! Velocity is the rate of change of position (v = Δx/Δt), while acceleration is the rate of change of velocity (a = Δv/Δt). Are you working on kinematics problems? Let's tackle them together! 💫";
    }
    
    // Study techniques
    if (lowerQuestion.includes('study') || lowerQuestion.includes('learn') || lowerQuestion.includes('memorize')) {
      return "🎯 Gabay AI here to guide your studies! Try active recall and spaced repetition! Break complex topics into smaller chunks, teach concepts to others, and practice regularly. What subject are you studying? I'm here to support you! 📖";
    }
    if (lowerQuestion.includes('exam') || lowerQuestion.includes('test')) {
      return "📝 Gabay AI here with exam tips! For exam prep: 1) Create a study schedule, 2) Practice past papers, 3) Form study groups, 4) Get enough sleep before the exam. What exam are you preparing for? You've got this! 🌟";
    }
    
    // General help
    if (lowerQuestion.includes('help') || lowerQuestion.includes('explain')) {
      return "💡 Hello! I'm Gabay AI, your personal study guide! I can assist with math, physics, science, literature, history, and study techniques. Try asking specific questions for better assistance! I'm here to help you succeed! 🎓";
    }
    
    // Default response
    return `🤖 Hi there! I'm Gabay AI, your study companion! I understand you're asking about: "${question}". I can help with math (calculus, algebra), physics (mechanics, forces), science, literature, history, and study techniques. Try asking more specific questions for better assistance! Let's learn together! 🌟`;
  }
}