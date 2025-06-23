import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getFirebaseAuth, getFirebaseDatabase } from '../../firebase/firebase';
import { ref, get } from 'firebase/database';
import DashboardHeader from '../../components/DashboardHeader';
import flashcardsScreenStyles from '../../styles/flashcardsScreenStyles';

const FlashcardsScreen: React.FC = () => {
  const [firstName, setFirstName] = useState('User');
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getFirebaseAuth();
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const db = getFirebaseDatabase();
        const userRef = ref(db, `users/${userId}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const first = (data.username || 'User').split(' ')[0];
          setFirstName(first);
          setPoints(data.points || 0);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1b2845' }}>
      <ScrollView contentContainerStyle={flashcardsScreenStyles.container}>
        {/* ✅ Proper header layout */}
        <View style={flashcardsScreenStyles.headerContainer}>
          <DashboardHeader firstName={firstName} points={points} />
        </View>

        <Text style={flashcardsScreenStyles.heading}>Flashcards</Text>

        {/* Add New Flashcard */}
        <View style={flashcardsScreenStyles.card}>
          <Text style={flashcardsScreenStyles.subHeading}>Add New Flashcard</Text>

          <Text style={flashcardsScreenStyles.label}>Question</Text>
          <TextInput
            style={flashcardsScreenStyles.input}
            placeholder="Enter your question"
            value=""
            editable={false}
          />

          <Text style={flashcardsScreenStyles.label}>Answer</Text>
          <TextInput
            style={flashcardsScreenStyles.input}
            placeholder="Enter the answer"
            value=""
            editable={false}
          />

          <Text style={flashcardsScreenStyles.label}>Category</Text>
          <View style={flashcardsScreenStyles.pickerWrapper}>
            <Picker selectedValue="Geography" enabled={false} style={flashcardsScreenStyles.picker}>
              <Picker.Item label="Geography" value="Geography" />
              <Picker.Item label="Literature" value="Literature" />
            </Picker>
          </View>

          <TouchableOpacity style={flashcardsScreenStyles.submitButton} disabled>
            <Text style={flashcardsScreenStyles.submitButtonText}>＋ Add Flashcard</Text>
          </TouchableOpacity>
        </View>

        {/* Filter by Category */}
        <View style={flashcardsScreenStyles.card}>
          <Text style={flashcardsScreenStyles.label}>Filter by Category</Text>
          <View style={flashcardsScreenStyles.pickerWrapper}>
            <Picker selectedValue="All Categories" enabled={false} style={flashcardsScreenStyles.picker}>
              <Picker.Item label="All Categories" value="All Categories" />
              <Picker.Item label="Geography" value="Geography" />
              <Picker.Item label="Literature" value="Literature" />
            </Picker>
          </View>
        </View>

        {/* Study Flashcards */}
        <View style={flashcardsScreenStyles.card}>
          <Text style={flashcardsScreenStyles.subHeading}>Study Flashcards</Text>
          <View style={flashcardsScreenStyles.badge}>
            <Text style={flashcardsScreenStyles.badgeText}>Geography</Text>
          </View>
          <Text style={flashcardsScreenStyles.questionText}>
            What is the capital of France?
          </Text>
          <View style={flashcardsScreenStyles.buttonRow}>
            <TouchableOpacity style={flashcardsScreenStyles.actionButton} disabled>
              <Text style={flashcardsScreenStyles.actionButtonText}>Show Answer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={flashcardsScreenStyles.actionButton} disabled>
              <Text style={flashcardsScreenStyles.actionButtonText}>Next Card</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Smart Flashcards */}
        <View style={flashcardsScreenStyles.card}>
          <Text style={flashcardsScreenStyles.subHeading}>Smart Flashcards</Text>
          <Text style={flashcardsScreenStyles.note}>
            Let AI analyze your notes and automatically generate flashcards to help you study more effectively.
          </Text>
          <TouchableOpacity style={flashcardsScreenStyles.disabledButton} disabled>
            <Text style={flashcardsScreenStyles.disabledButtonText}>Generate AI Flashcards 🔒</Text>
          </TouchableOpacity>
        </View>

        {/* Flashcard Decks */}
        <View style={flashcardsScreenStyles.card}>
          <Text style={flashcardsScreenStyles.subHeading}>Your Flashcard Decks</Text>
          <View style={flashcardsScreenStyles.deckRow}>
            <Text style={flashcardsScreenStyles.deckTitle}>📘 Geography</Text>
            <Text style={flashcardsScreenStyles.deckCount}>1 cards</Text>
          </View>
          <View style={flashcardsScreenStyles.deckRow}>
            <Text style={flashcardsScreenStyles.deckTitle}>📗 Literature</Text>
            <Text style={flashcardsScreenStyles.deckCount}>1 cards</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FlashcardsScreen;
