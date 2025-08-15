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
  const [notes, setNotes] = useState<any[]>([]);
  const [noteIndex, setNoteIndex] = useState<number | null>(null);

  // Carrega a nota e a lista completa
  useEffect(() => {
    const loadNote = async () => {
      const stored = await AsyncStorage.getItem('notes');
      if (stored && index !== undefined) {
        const parsed = JSON.parse(stored);
        setNotes(parsed);
        setNoteIndex(parseInt(index));
        const note = parsed[parseInt(index)];
        setTitle(note.title);
        setContent(note.content);
      }
    };
    loadNote();
  }, [index]);

  // Salvamento automático enquanto digita
  useEffect(() => {
    const saveTimeout = setTimeout(async () => {
      if (noteIndex === null) return; // não faz nada se não tiver nota carregada
      if (title.trim() === '' && content.trim() === '') return;

      const updatedNotes = [...notes];
      updatedNotes.splice(noteIndex, 1); // remove a nota antiga
      updatedNotes.unshift({ title, content, lastModified: Date.now() }); // coloca no topo

      setNotes(updatedNotes);
      setNoteIndex(0); // novo índice é 0 após mover para topo
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    }, 700);

    return () => clearTimeout(saveTimeout);
  }, [title, content]);

  // Salvamento ao voltar
  const handleBack = async () => {
    if (noteIndex === null) {
      router.back();
      return;
    }
    if (title.trim() === '' && content.trim() === '') {
      router.back();
      return;
    }

    const updatedNotes = [...notes];
    updatedNotes.splice(noteIndex, 1);
    updatedNotes.unshift({ title, content, lastModified: Date.now() });

    setNotes(updatedNotes);
    setNoteIndex(0);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    router.back();
  };

  return (
    <View style={styles.darkContainer}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
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
        style={styles.textArea} // mesma altura do AddNote
        placeholder="Digite o conteúdo"
        placeholderTextColor="#aaa"
        value={content}
        onChangeText={setContent}
        multiline
      />
    </View>
  );
}
