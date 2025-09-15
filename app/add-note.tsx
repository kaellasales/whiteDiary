// app/add-note.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView, // Importação Adicionada
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import styles from '../constants/styles';

export default function AddNoteScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // ...lógica existente...
  const [existingNotes, setExistingNotes] = useState<any[]>([]);
  const [noteIndex, setNoteIndex] = useState<number | null>(null);

  useEffect(() => { const loadNotes = async () => { const stored = await AsyncStorage.getItem('notes'); if (stored) { setExistingNotes(JSON.parse(stored)); } }; loadNotes(); }, []);
  useEffect(() => { const saveTimeout = setTimeout(async () => { if (title.trim() === '' && content.trim() === '') return; let updatedNotes = [...existingNotes]; if (noteIndex === null) { const newNote = { title, content, lastModified: Date.now(), isFavorite: false }; updatedNotes.unshift(newNote); setNoteIndex(0); } else { updatedNotes[noteIndex] = { ...updatedNotes[noteIndex], title, content, lastModified: Date.now() }; } setExistingNotes(updatedNotes); await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes)); }, 700); return () => clearTimeout(saveTimeout); }, [title, content]);
  const saveNoteManually = async () => { if (title.trim() === '' && content.trim() === '') { router.back(); return; } let updatedNotes = [...existingNotes]; if (noteIndex === null) { const newNote = { title, content, lastModified: Date.now(), isFavorite: false }; updatedNotes.unshift(newNote); setNoteIndex(0); } else { updatedNotes[noteIndex] = { ...updatedNotes[noteIndex], title, content, lastModified: Date.now() }; } setExistingNotes(updatedNotes); await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes)); router.back(); };

  return (
    // SafeAreaView garante que o conteúdo não fique sob a barra de status/notch
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0D1117' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* ESTA VIEW APLICA O PADDING E RESTAURA O LAYOUT */}
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
          
          <View style={styles.editHeader}>
            <TouchableOpacity onPress={saveNoteManually} style={styles.backButton}>
              <Image source={require('../assets/images/back-icon.png')} style={{ width: 28, height: 28 }} />
            </TouchableOpacity>
            <TextInput style={styles.titleInput} placeholder="Título" placeholderTextColor="#555" value={title} onChangeText={setTitle} autoFocus={true} multiline />
          </View>

          <View style={styles.separator} />

          <ScrollView 
            style={{ flex: 1 }} 
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <TextInput
              style={styles.textArea}
              placeholder="Comece a escrever..."
              placeholderTextColor="#555"
              multiline
              value={content}
              onChangeText={setContent}
            />
          </ScrollView>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}