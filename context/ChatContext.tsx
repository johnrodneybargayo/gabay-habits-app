import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getFirebaseDatabase } from '../firebase/firebase';
import { ref, push, onValue, set, serverTimestamp, onDisconnect } from 'firebase/database';

export interface Message {
  id: string;
  sender: string;
  senderUid: string;
  time: string;
  timestamp: number;
  content: string;
  type: 'user' | 'system' | 'ai';
}

export interface Participant {
  uid: string;
  name: string;
  online: boolean;
  lastSeen: number;
}

export interface ChatRoom {
  id: string;
  name: string;
  description: string;
  subject?: string;
  capacity: number;
  isPublic?: boolean;
  createdAt: number;
  createdBy?: string;
  participants: Record<string, Participant>;
  messages: Record<string, Message>;
  lastActivity: number;
}

type ChatContextType = {
  currentRoom: ChatRoom | null;
  currentUser: { uid: string; name: string } | null;
  availableRooms: Record<string, ChatRoom>;
  joinRoom: (roomId: string, userName: string) => Promise<void>;
  leaveRoom: () => void;
  sendMessage: (content: string) => Promise<void>;
  createRoom: (name: string, description: string, subject: string) => Promise<string>;
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
  typingUsers: string[];
  loading: boolean;
  joiningRooms: Record<string, boolean>;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

type ChatProviderProps = {
  children: ReactNode;
};

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [currentRoom, setCurrentRoom] = useState<ChatRoom | null>(null);
  const [currentUser, setCurrentUser] = useState<{ uid: string; name: string } | null>(null);
  const [availableRooms, setAvailableRooms] = useState<Record<string, ChatRoom>>({});
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [joiningRooms, setJoiningRooms] = useState<Record<string, boolean>>({});
  const database = getFirebaseDatabase();

  // Initialize default rooms on mount
  useEffect(() => {
    initializeDefaultRooms();
  }, []);

  // Listen for available rooms from Firebase
  useEffect(() => {
    const roomsRef = ref(database, 'chatRooms');
    const unsubscribe = onValue(roomsRef, (snapshot) => {
      const roomsData = snapshot.val();
      if (roomsData) {
        setAvailableRooms(roomsData);
      } else {
        // Initialize default rooms if none exist
        initializeDefaultRooms();
      }
    });

    return () => unsubscribe();
  }, []);

  // Listen for current room updates
  useEffect(() => {
    if (!currentRoom) return;

    const roomRef = ref(database, `chatRooms/${currentRoom.id}`);
    const unsubscribe = onValue(roomRef, (snapshot) => {
      const roomData = snapshot.val();
      if (roomData) {
        setCurrentRoom(roomData);
      }
    });

    return () => unsubscribe();
  }, [currentRoom?.id]);

  const initializeDefaultRooms = async () => {
    const defaultRooms: Record<string, ChatRoom> = {
      'math-study-group': {
        id: 'math-study-group',
        name: 'Math Study Group',
        description: 'Working on calculus problems and derivatives',
        subject: 'Mathematics',
        capacity: 8,
        participants: {},
        messages: {
          'welcome': {
            id: 'welcome',
            sender: 'System',
            senderUid: 'system',
            time: new Date(Date.now() - 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            timestamp: Date.now() - 3600000,
            content: 'Welcome to the Math Study Group! Feel free to ask questions.',
            type: 'system'
          }
        },
        createdAt: Date.now(),
        lastActivity: Date.now()
      },
      'physics-lab': {
        id: 'physics-lab',
        name: 'Physics Lab',
        description: 'Discussing mechanics and thermodynamics',
        subject: 'Physics',
        capacity: 6,
        participants: {},
        messages: {
          'intro': {
            id: 'intro',
            sender: 'System',
            senderUid: 'system',
            time: new Date(Date.now() - 1800000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            timestamp: Date.now() - 1800000,
            content: 'Welcome to the Physics Lab! Discuss mechanics and thermodynamics here.',
            type: 'system'
          }
        },
        createdAt: Date.now(),
        lastActivity: Date.now()
      },
      'computer-science': {
        id: 'computer-science',
        name: 'CS Study Hall',
        description: 'Programming, algorithms, and data structures',
        subject: 'Computer Science',
        capacity: 10,
        participants: {},
        messages: {},
        createdAt: Date.now(),
        lastActivity: Date.now()
      }
    };

    try {
      // Save default rooms to Firebase
      const roomsRef = ref(database, 'chatRooms');
      await set(roomsRef, defaultRooms);
    } catch (error) {
      console.error('Error initializing default rooms:', error);
      // Fallback to local state if Firebase fails
      setAvailableRooms(defaultRooms);
    }
  };

  const generateUserId = () => {
    return 'user_' + Date.now().toString() + '_' + Math.random().toString(36).substr(2, 9);
  };

  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Math-related responses
    if (lowerQuestion.includes('derivative') || lowerQuestion.includes('calculus')) {
      return "📚 For derivatives, remember the power rule: d/dx[x^n] = nx^(n-1). For example, d/dx[x³] = 3x². Would you like me to explain a specific derivative problem?";
    }
    if (lowerQuestion.includes('integral') || lowerQuestion.includes('integration')) {
      return "🧮 Integration is the reverse of differentiation. The basic power rule for integration is: ∫x^n dx = x^(n+1)/(n+1) + C. What specific integration problem are you working on?";
    }
    if (lowerQuestion.includes('limit')) {
      return "📈 Limits help us understand function behavior as x approaches a value. Use L'Hôpital's rule for indeterminate forms like 0/0. What limit are you trying to evaluate?";
    }
    
    // Physics-related responses
    if (lowerQuestion.includes('physics') || lowerQuestion.includes('force') || lowerQuestion.includes('newton')) {
      return "⚡ Newton's laws are fundamental! F = ma (Force = mass × acceleration). Remember: objects at rest stay at rest unless acted upon by a force. What physics concept can I help clarify?";
    }
    if (lowerQuestion.includes('velocity') || lowerQuestion.includes('acceleration')) {
      return "🚀 Velocity is the rate of change of position (v = Δx/Δt), while acceleration is the rate of change of velocity (a = Δv/Δt). Are you working on kinematics problems?";
    }
    
    // Study techniques
    if (lowerQuestion.includes('study') || lowerQuestion.includes('learn') || lowerQuestion.includes('memorize')) {
      return "🎯 Try active recall and spaced repetition! Break complex topics into smaller chunks, teach concepts to others, and practice regularly. What subject are you studying?";
    }
    if (lowerQuestion.includes('exam') || lowerQuestion.includes('test')) {
      return "📝 For exam prep: 1) Create a study schedule, 2) Practice past papers, 3) Form study groups, 4) Get enough sleep before the exam. What exam are you preparing for?";
    }
    
    // General help
    if (lowerQuestion.includes('help') || lowerQuestion.includes('explain')) {
      return "💡 I'm here to help! I can assist with math, physics, study techniques, and academic concepts. Try asking specific questions like '@ai explain derivatives' or '@ai help with physics forces'.";
    }
    
    // Default response
    return `🤖 I understand you're asking about: "${question}". I can help with math (calculus, algebra), physics (mechanics, forces), and study techniques. Try asking more specific questions for better assistance!`;
  };

  const joinRoom = async (roomId: string, userName: string) => {
    if (!roomId || !userName.trim() || !availableRooms[roomId]) return;

    // Set room-specific loading state
    setJoiningRooms(prev => ({ ...prev, [roomId]: true }));
    const userId = generateUserId();
    setCurrentUser({ uid: userId, name: userName.trim() });
    
    const room = availableRooms[roomId];

    try {
      // Add user to participants in Firebase
      const participantRef = ref(database, `chatRooms/${roomId}/participants/${userId}`);
      await set(participantRef, {
        uid: userId,
        name: userName.trim(),
        online: true,
        lastSeen: serverTimestamp()
      });

      // Set up presence system - mark user as offline when they disconnect
      const presenceRef = ref(database, `chatRooms/${roomId}/participants/${userId}/online`);
      onDisconnect(presenceRef).set(false);

      // Add join message
      const joinMessage: Message = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        sender: 'System',
        senderUid: 'system',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: Date.now(),
        content: `${userName} joined the room`,
        type: 'system'
      };

      // Add message to Firebase
      const messageRef = ref(database, `chatRooms/${roomId}/messages/${joinMessage.id}`);
      await set(messageRef, joinMessage);

      // Update last activity
      const lastActivityRef = ref(database, `chatRooms/${roomId}/lastActivity`);
      await set(lastActivityRef, serverTimestamp());

      setCurrentRoom(room);
    } catch (error) {
      console.error('Error joining room:', error);
    }
    
    // Clear room-specific loading state
    setJoiningRooms(prev => ({ ...prev, [roomId]: false }));
  };

  const leaveRoom = async () => {
    if (!currentRoom || !currentUser) return;

    try {
      // Add leave message to Firebase
      const leaveMessage: Message = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        sender: 'System',
        senderUid: 'system',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: Date.now(),
        content: `${currentUser.name} left the room`,
        type: 'system'
      };

      const messageRef = ref(database, `chatRooms/${currentRoom.id}/messages/${leaveMessage.id}`);
      await set(messageRef, leaveMessage);

      // Remove user from participants in Firebase
      const participantRef = ref(database, `chatRooms/${currentRoom.id}/participants/${currentUser.uid}`);
      await set(participantRef, null);

      // Update last activity
      const lastActivityRef = ref(database, `chatRooms/${currentRoom.id}/lastActivity`);
      await set(lastActivityRef, serverTimestamp());

      setCurrentRoom(null);
      setCurrentUser(null);
    } catch (error) {
      console.error('Error leaving room:', error);
    }
  };

  const sendMessage = async (content: string) => {
    if (!currentRoom || !currentUser || !content.trim()) return;

    const roomId = currentRoom.id;
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newMessage: Message = {
      id: messageId,
      sender: currentUser.name,
      senderUid: currentUser.uid,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
      content: content.trim(),
      type: 'user'
    };

    try {
      // Add message to Firebase
      const messageRef = ref(database, `chatRooms/${roomId}/messages/${messageId}`);
      await set(messageRef, newMessage);

      // Update last activity
      const lastActivityRef = ref(database, `chatRooms/${roomId}/lastActivity`);
      await set(lastActivityRef, serverTimestamp());
    } catch (error) {
      console.error('Error sending message:', error);
      return;
    }

    // Handle AI response if message starts with @ai
    if (content.toLowerCase().startsWith('@ai')) {
      setTimeout(async () => {
        const question = content.substring(3).trim();
        const aiMessageId = `msg_${Date.now()}_ai_${Math.random().toString(36).substr(2, 9)}`;
        const aiResponse: Message = {
          id: aiMessageId,
          sender: 'AI Tutor',
          senderUid: 'ai_tutor',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          timestamp: Date.now(),
          content: getAIResponse(question),
          type: 'ai'
        };
        
        try {
          // Add AI response to Firebase
          const aiMessageRef = ref(database, `chatRooms/${roomId}/messages/${aiMessageId}`);
          await set(aiMessageRef, aiResponse);

          // Update last activity
          const lastActivityRef = ref(database, `chatRooms/${roomId}/lastActivity`);
          await set(lastActivityRef, serverTimestamp());
        } catch (error) {
          console.error('Error sending AI response:', error);
        }
      }, 1500);
    }
  };

  const createRoom = async (name: string, description: string, subject: string): Promise<string> => {
    const roomId = `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newRoom: ChatRoom = {
      id: roomId,
      name: name.trim(),
      description: description.trim(),
      subject: subject.trim(),
      capacity: 8,
      participants: {},
      messages: {
        'welcome': {
          id: 'welcome',
          sender: 'System',
          senderUid: 'system',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          timestamp: Date.now(),
          content: `Welcome to ${name.trim()}! ${description.trim()}`,
          type: 'system'
        }
      },
      createdAt: Date.now(),
      lastActivity: Date.now()
    };

    try {
      // Add room to Firebase
      const roomRef = ref(database, `chatRooms/${roomId}`);
      await set(roomRef, newRoom);
    } catch (error) {
      console.error('Error creating room:', error);
      throw error;
    }

    return roomId;
  };

  const value: ChatContextType = {
    currentRoom,
    currentUser,
    availableRooms,
    joinRoom,
    leaveRoom,
    sendMessage,
    createRoom,
    isTyping,
    setIsTyping,
    typingUsers,
    loading,
    joiningRooms
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;