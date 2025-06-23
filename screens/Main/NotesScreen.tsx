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
import * as ImagePicker from 'expo-image-picker';

import notesScreenStyles from '../../styles/notesScreenStyles';
import DashboardHeader from '../../components/DashboardHeader';
import { getFirebaseAuth, getFirebaseDatabase } from '../../firebase/firebase';
import { ref, get } from 'firebase/database';

const NotesScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [folder, setFolder] = useState('No Folder');
  const [image, setImage] = useState<string | null>(null);
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
          const fullName = data.username || 'User';
          const extractedFirstName = fullName.split(' ')[0];
          setFirstName(extractedFirstName);
          setPoints(data.points || 0);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleAddNote = () => {
    console.log('Note added:', { title, folder, content, image });
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1b2845' }}>
      <ScrollView contentContainerStyle={notesScreenStyles.container}>
        <DashboardHeader firstName={firstName} points={points} />

        <Text style={notesScreenStyles.heading}>Add New Note</Text>

        <View style={notesScreenStyles.card}>
          <Text style={notesScreenStyles.label}>Title</Text>
          <TextInput
            style={notesScreenStyles.input}
            placeholder="Enter note title"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={notesScreenStyles.label}>Folder</Text>
          <View style={notesScreenStyles.pickerWrapper}>
            <Picker
              selectedValue={folder}
              style={notesScreenStyles.picker}
              onValueChange={(itemValue: string) => setFolder(itemValue)}
            >
              <Picker.Item label="No Folder" value="No Folder" />
              <Picker.Item label="Math" value="Math" />
              <Picker.Item label="Physics" value="Physics" />
            </Picker>
          </View>

          <Text style={notesScreenStyles.label}>Content</Text>
          <TextInput
            style={notesScreenStyles.textArea}
            placeholder="Enter your notes here..."
            value={content}
            onChangeText={setContent}
            multiline
          />

          <Text style={notesScreenStyles.label}>Upload Image (OCR)</Text>
          <TouchableOpacity style={notesScreenStyles.fileButton} onPress={handleImagePick}>
            <Text style={notesScreenStyles.fileButtonText}>
              {image ? 'Image Selected' : 'Choose File'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={notesScreenStyles.submitButton} onPress={handleAddNote}>
            <Text style={notesScreenStyles.submitButtonText}>Add Note</Text>
          </TouchableOpacity>
        </View>

        {/* Summarized Notes Section */}
        <View style={notesScreenStyles.section}>
          <Text style={notesScreenStyles.sectionTitle}>Math</Text>
          <View style={notesScreenStyles.noteCard}>
            <Text style={notesScreenStyles.noteTitle}>Chapter 1 Summary</Text>
            <Text style={notesScreenStyles.noteContent}>This is a summary of chapter 1...</Text>
            <View style={notesScreenStyles.noteButtons}>
              <TouchableOpacity style={notesScreenStyles.noteButton}><Text>⚡ Summarize</Text></TouchableOpacity>
              <TouchableOpacity style={notesScreenStyles.noteButton}><Text>🧠 Generate Test</Text></TouchableOpacity>
            </View>
          </View>

          <Text style={notesScreenStyles.sectionTitle}>Physics</Text>
          <View style={notesScreenStyles.noteCard}>
            <Text style={notesScreenStyles.noteTitle}>Important Formulas</Text>
            <Text style={notesScreenStyles.noteContent}>List of important formulas...</Text>
            <View style={notesScreenStyles.noteButtons}>
              <TouchableOpacity style={notesScreenStyles.noteButton}><Text>⚡ Summarize</Text></TouchableOpacity>
              <TouchableOpacity style={notesScreenStyles.noteButton}><Text>🧠 Generate Test</Text></TouchableOpacity>
            </View>
          </View>
        </View>

        {/* AI Summarization Section */}
        <View style={notesScreenStyles.section}>
          <Text style={notesScreenStyles.sectionTitle}>AI Summarization</Text>
          <View style={notesScreenStyles.pickerWrapper}>
            <Picker selectedValue={"Bullet Points"} style={notesScreenStyles.picker}>
              <Picker.Item label="Bullet Points" value="Bullet Points" />
              <Picker.Item label="Paragraph" value="Paragraph" />
            </Picker>
          </View>
          <TouchableOpacity style={notesScreenStyles.submitButton}>
            <Text style={notesScreenStyles.submitButtonText}>Generate Summary</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotesScreen;
