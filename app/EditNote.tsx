import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import styles from '../constants/styles';

export default function EditNoteScreen() {
  const router = useRouter();
  const { index } = useLocalSearchParams<{ index: string }>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    loadNote();
  }, []);

  const loadNote = async () => {
    const stored = await AsyncStorage.getItem('notes');
    if (stored && index !== undefined) {
      const notes = JSON.parse(stored);
      const note = notes[parseInt(index)];
      setTitle(note.title);
      setContent(note.content);
    }
  };

  const saveNote = async () => {
    const stored = await AsyncStorage.getItem('notes');
    if (stored && index !== undefined) {
      const notes = JSON.parse(stored);
      notes[parseInt(index)] = { title, content };
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
      router.back();
    }
  };

  return (
    <View style={styles.darkContainer}>
      <TouchableOpacity onPress={saveNote} style={styles.backButton}>
        <Image
          source={require('../assets/images/back-icon.png')}
          style={{ width: 28, height: 28 }}
        />
      </TouchableOpacity>

      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o título"
        placeholderTextColor="#aaa"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Conteúdo</Text>
      <TextInput
        style={[styles.input, { flex: 1, textAlignVertical: 'top', fontSize: 14, marginBottom: 12 }]}
        placeholder="Digite o conteúdo"
        placeholderTextColor="#aaa"
        value={content}
        onChangeText={setContent}
        multiline
      />
    </View>
  );
}
