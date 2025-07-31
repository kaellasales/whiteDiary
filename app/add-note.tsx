import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function AddNoteScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [existingNotes, setExistingNotes] = useState<any[]>([]);
  const [noteIndex, setNoteIndex] = useState<number | null>(null);

  // Carregar notas existentes uma vez
  useEffect(() => {
    const loadNotes = async () => {
      const stored = await AsyncStorage.getItem('notes');
      if (stored) {
        setExistingNotes(JSON.parse(stored));
      }
    };
    loadNotes();
  }, []);

  // Autosave
  useEffect(() => {
    const saveTimeout = setTimeout(async () => {
      if (title.trim() === '' && content.trim() === '') return;

      let updatedNotes = [...existingNotes];

      if (noteIndex === null) {
        // Criar nova nota
        const newNote = { title, content };
        updatedNotes.push(newNote);
        setNoteIndex(updatedNotes.length - 1);
      } else {
        // Atualizar nota existente
        updatedNotes[noteIndex] = { title, content };
      }

      setExistingNotes(updatedNotes);
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    }, 700);

    return () => clearTimeout(saveTimeout);
  }, [title, content]);

  return (
    <View style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>&lt; todos notes</Text>
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
        style={[styles.input, { height: 150 }]}
        placeholder="Digite sua anotação..."
        placeholderTextColor="#aaa"
        multiline
        value={content}
        onChangeText={setContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#121212' },
  backButton: { marginBottom: 10 },
  backButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  label: { fontWeight: 'bold', marginBottom: 5, marginTop: 15, fontSize: 16, color: '#fff' },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 15,
    borderRadius: 8,
    textAlignVertical: 'top'
  }
});
