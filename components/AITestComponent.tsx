import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { AIService } from '../services/aiService';
import { OPENAI_API_KEY } from '@env';

const AITestComponent: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    // Debug API key status
    const apiKey = OPENAI_API_KEY || process.env.EXPO_PUBLIC_OPENAI_API_KEY || '';
    const apiKeyExists = !!apiKey;
    const apiKeyLength = apiKey ? apiKey.length : 0;
    const apiKeyStartsCorrect = apiKey ? apiKey.startsWith('sk-') : false;
    const source = OPENAI_API_KEY ? 'react-native-dotenv' : 'expo built-in';
    
    setDebugInfo(`API Key Status:
- Exists: ${apiKeyExists}
- Length: ${apiKeyLength}
- Starts with sk-: ${apiKeyStartsCorrect}
- Source: ${source}
- First 10 chars: ${apiKey ? apiKey.substring(0, 10) + '...' : 'N/A'}`);
  }, []);

  const testAI = async () => {
    if (!question.trim()) {
      Alert.alert('Error', 'Please enter a question');
      return;
    }

    setLoading(true);
    try {
      console.log('Testing AI with question:', question);
      const result = await AIService.getAIResponse(question);
      console.log('AI Test Result:', result);
      
      if (result.success) {
        setResponse(result.response || 'No response received');
      } else {
        // Handle specific error cases
        setResponse(`⚠️ ${result.response || 'Service temporarily unavailable'}`);
      }
    } catch (error) {
      console.error('AI Test Error:', error);
      setResponse('❌ Error: ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="p-4 bg-white rounded-lg m-4">
      <Text className="text-lg font-bold mb-4">AI Service Test</Text>
      
      {/* Debug Information */}
      <View className="bg-gray-100 p-3 rounded-lg mb-4">
        <Text className="text-sm font-bold mb-2">Debug Info:</Text>
        <Text className="text-xs text-gray-700">{debugInfo}</Text>
      </View>
      
      <TextInput
        className="border border-gray-300 p-3 rounded-lg mb-4"
        placeholder="Ask a question..."
        value={question}
        onChangeText={setQuestion}
        multiline
      />
      
      <TouchableOpacity
        className={`p-3 rounded-lg mb-4 ${loading ? 'bg-gray-400' : 'bg-blue-500'}`}
        onPress={testAI}
        disabled={loading}
      >
        <Text className="text-white text-center font-bold">
          {loading ? 'Testing...' : 'Test AI'}
        </Text>
      </TouchableOpacity>
      
      {response ? (
        <View className="bg-gray-100 p-3 rounded-lg">
          <Text className="font-bold mb-2">Response:</Text>
          <Text>{response}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default AITestComponent;