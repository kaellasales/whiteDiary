import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import styles from '../constants/styles';

export default function AddNoteScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [existingNotes, setExistingNotes] = useState<any[]>([]);
  const [noteIndex, setNoteIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadNotes = async () => {
      const stored = await AsyncStorage.getItem('notes');
      if (stored) {
        setExistingNotes(JSON.parse(stored));
      }
    };
    loadNotes();
  }, []);

  useEffect(() => {
    const saveTimeout = setTimeout(async () => {
      if (title.trim() === '' && content.trim() === '') return;

      let updatedNotes = [...existingNotes];

      if (noteIndex === null) {
        const newNote = { title, content };
        updatedNotes.push(newNote);
        setNoteIndex(updatedNotes.length - 1);
      } else {
        updatedNotes[noteIndex] = { title, content };
      }

      setExistingNotes(updatedNotes);
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    }, 700);

    return () => clearTimeout(saveTimeout);
  }, [title, content]);

  const saveNoteManually = async () => {
    if (title.trim() === '' && content.trim() === '') {
      router.back();
      return;
    }

    let updatedNotes = [...existingNotes];

    if (noteIndex === null) {
      const newNote = { title, content };
      updatedNotes.push(newNote);
      setNoteIndex(updatedNotes.length - 1);
    } else {
      updatedNotes[noteIndex] = { title, content };
    }

    setExistingNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    router.back();
  };

  return (
    <View style={styles.darkContainer}>
      <TouchableOpacity onPress={saveNoteManually} style={styles.backButton}>
        <Image
          source={require('../assets/images/back-icon.png')}
          style={{ width: 28, height: 28 }}
        />
      </TouchableOpacity>

      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o título..."
        placeholderTextColor="#aaa"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Conteúdo</Text>
      <TextInput
        style={[styles.input, { flex: 1, textAlignVertical: 'top', fontSize: 14, marginBottom: 12 }]}
        placeholder="Digite sua anotação..."
        placeholderTextColor="#aaa"
        multiline
        value={content}
        onChangeText={setContent}
      />
    </View>
  );
}
