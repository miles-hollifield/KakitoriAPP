import api from '../../../utils/api.js';

// Fallback to mock data for development if API fails
const mockSessions = [
  {
    id: 1,
    title: 'Grammar Help - Te-form',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    message_count: 4,
    last_message_preview: 'Thank you! That explanation was very helpful.'
  },
  {
    id: 2,
    title: 'Kanji Practice Session',
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
    updated_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    message_count: 8,
    last_message_preview: 'Let me practice writing this kanji: 水'
  },
  {
    id: 3,
    title: 'Vocabulary Review',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    message_count: 6,
    last_message_preview: 'What does "arigatou gozaimasu" mean?'
  }
];

const mockMessages = {
  1: [
    {
      id: 1,
      role: 'user',
      content: 'Can you explain the te-form in Japanese?',
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 2,
      role: 'assistant',
      content: 'The te-form is a crucial conjugation in Japanese! It\'s used to connect verbs and create various grammatical structures. For example, "taberu" (to eat) becomes "tabete". Would you like me to explain the conjugation rules?',
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000 + 30000).toISOString()
    }
  ],
  2: [
    {
      id: 3,
      role: 'user',
      content: 'How do I write the kanji for water?',
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 4,
      role: 'assistant',
      content: 'The kanji for water is 水 (mizu/sui). It has 4 strokes and looks like flowing water. The stroke order is important - start with the vertical line, then the horizontal line, then the two diagonal strokes.',
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000 + 30000).toISOString()
    }
  ]
};

// API service for chat operations
class ChatAPIService {
  constructor() {
    this.useMockData = true; // Toggle this for development
  }

  // Get all chat sessions for the current user
  async getChatSessions() {
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockSessions;
    }

    try {
      const response = await api.get('/ai-tutor/sessions');
      return response.data;
    } catch (error) {
      console.error('Error fetching chat sessions:', error);
      // Fallback to mock data if API fails
      return mockSessions;
    }
  }

  // Create a new chat session
  async createChatSession(title = 'New Chat') {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const newSession = {
        id: Date.now(),
        title,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        messages: []
      };
      mockSessions.unshift(newSession);
      return newSession;
    }

    try {
      const response = await api.post('/ai-tutor/sessions', { title });
      return response.data;
    } catch (error) {
      console.error('Error creating chat session:', error);
      // Fallback to mock behavior
      const newSession = {
        id: Date.now(),
        title,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        messages: []
      };
      mockSessions.unshift(newSession);
      return newSession;
    }
  }

  // Get a specific chat session with all messages
  async getChatSession(sessionId) {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const session = mockSessions.find(s => s.id === sessionId);
      if (!session) {
        throw new Error('Session not found');
      }
      return {
        ...session,
        messages: mockMessages[sessionId] || []
      };
    }

    try {
      const response = await api.get(`/ai-tutor/sessions/${sessionId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching chat session:', error);
      // Fallback to mock data
      const session = mockSessions.find(s => s.id === sessionId);
      if (!session) {
        throw new Error('Session not found');
      }
      return {
        ...session,
        messages: mockMessages[sessionId] || []
      };
    }
  }

  // Update a chat session (rename)
  async updateChatSession(sessionId, title) {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const session = mockSessions.find(s => s.id === sessionId);
      if (session) {
        session.title = title;
        session.updated_at = new Date().toISOString();
      }
      return session;
    }

    try {
      const response = await api.put(`/ai-tutor/sessions/${sessionId}`, { title });
      return response.data;
    } catch (error) {
      console.error('Error updating chat session:', error);
      // Fallback to mock behavior
      const session = mockSessions.find(s => s.id === sessionId);
      if (session) {
        session.title = title;
        session.updated_at = new Date().toISOString();
      }
      return session;
    }
  }

  // Delete a chat session
  async deleteChatSession(sessionId) {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const index = mockSessions.findIndex(s => s.id === sessionId);
      if (index !== -1) {
        mockSessions.splice(index, 1);
        delete mockMessages[sessionId];
      }
      return { message: 'Session deleted' };
    }

    try {
      const response = await api.delete(`/ai-tutor/sessions/${sessionId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting chat session:', error);
      // Fallback to mock behavior
      const index = mockSessions.findIndex(s => s.id === sessionId);
      if (index !== -1) {
        mockSessions.splice(index, 1);
        delete mockMessages[sessionId];
      }
      return { message: 'Session deleted' };
    }
  }

  // Send a message to the AI tutor
  async sendMessage(message, sessionId = null) {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate thinking time
      
      let targetSessionId = sessionId;
      
      // If no session ID, create a new session
      if (!targetSessionId) {
        const newSession = await this.createChatSession();
        targetSessionId = newSession.id;
      }

      // Add user message to mock data
      const userMessage = {
        id: Date.now(),
        role: 'user',
        content: message,
        created_at: new Date().toISOString()
      };

      if (!mockMessages[targetSessionId]) {
        mockMessages[targetSessionId] = [];
      }
      mockMessages[targetSessionId].push(userMessage);

      // Generate a mock AI response
      const aiResponse = this.generateMockResponse(message);
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: aiResponse,
        created_at: new Date().toISOString()
      };
      mockMessages[targetSessionId].push(aiMessage);

      // Update session timestamp and message count
      const session = mockSessions.find(s => s.id === targetSessionId);
      if (session) {
        session.updated_at = new Date().toISOString();
        session.message_count = mockMessages[targetSessionId].length;
        session.last_message_preview = aiResponse.substring(0, 100);
      }

      return {
        response: aiResponse,
        session_id: targetSessionId
      };
    }

    try {
      const response = await api.post('/ai-tutor/chat', { 
        message,
        ...(sessionId && { session_id: sessionId })
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      // Fallback to mock behavior
      let targetSessionId = sessionId;
      
      if (!targetSessionId) {
        const newSession = await this.createChatSession();
        targetSessionId = newSession.id;
      }

      const userMessage = {
        id: Date.now(),
        role: 'user',
        content: message,
        created_at: new Date().toISOString()
      };

      if (!mockMessages[targetSessionId]) {
        mockMessages[targetSessionId] = [];
      }
      mockMessages[targetSessionId].push(userMessage);

      const aiResponse = this.generateMockResponse(message);
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: aiResponse,
        created_at: new Date().toISOString()
      };
      mockMessages[targetSessionId].push(aiMessage);

      return {
        response: aiResponse,
        session_id: targetSessionId
      };
    }
  }

  // Generate mock AI responses for development
  generateMockResponse(userMessage) {
    const responses = [
      "That's a great question about Japanese! Let me explain that for you...",
      "I can help you with that! In Japanese, this concept is quite interesting...",
      "Good observation! This is actually a common topic that many learners ask about...",
      "Let me break that down for you step by step...",
      "That's an important aspect of Japanese grammar. Here's what you need to know..."
    ];
    
    // Simple keyword-based responses
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('kanji')) {
      return "Kanji are the logographic characters used in Japanese writing. Each kanji has meaning and can have multiple readings. Would you like to practice some specific kanji?";
    } else if (lowerMessage.includes('hiragana') || lowerMessage.includes('katakana')) {
      return "Hiragana and katakana are the two syllabic scripts in Japanese. Hiragana is used for native Japanese words and grammar particles, while katakana is mainly for foreign words and emphasis.";
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('greeting')) {
      return "In Japanese, 'hello' can be expressed as こんにちは (konnichiwa) during the day, or おはよう (ohayou) in the morning. More formally, you'd say おはようございます (ohayou gozaimasu).";
    }
    
    return responses[Math.floor(Math.random() * responses.length)] + " " + userMessage;
  }
}

export const chatAPI = new ChatAPIService();
