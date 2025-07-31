import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useLocalSearchParams } from 'expo-router';

type Note = {
  title: string;
  content: string;
};

export default function EditNoteScreen() {
  const router = useRouter();
  const { index } = useLocalSearchParams();
  const noteIndex = Number(index);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Carregar a nota ao montar
  useEffect(() => {
    loadNote();
  }, []);

  // Função para carregar a nota do AsyncStorage
  const loadNote = async () => {
    const stored = await AsyncStorage.getItem('notes');
    if (stored) {
      const notes: Note[] = JSON.parse(stored);
      const note = notes[noteIndex];
      if (note) {
        setTitle(note.title);
        setContent(note.content);
      } else {
        router.back();
      }
    }
  };

  // Função para salvar a nota no AsyncStorage automaticamente
  const autosaveNote = async (newTitle: string, newContent: string) => {
    const stored = await AsyncStorage.getItem('notes');
    if (stored) {
      const notes: Note[] = JSON.parse(stored);
      notes[noteIndex] = { title: newTitle, content: newContent };
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
    }
  };

  // Atualiza o título e salva automaticamente
  const handleTitleChange = (text: string) => {
    setTitle(text);
    autosaveNote(text, content);
  };

  // Atualiza o conteúdo e salva automaticamente
  const handleContentChange = (text: string) => {
    setContent(text);
    autosaveNote(title, text);
  };

  return (
    <View style={styles.container}>
      {/* Botão voltar com texto */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>&lt; todos notes</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={handleTitleChange}
        placeholder="Digite o título"
      />

      <Text style={styles.label}>Conteúdo</Text>
      <TextInput
        style={[styles.input, { height: 150 }]}
        multiline
        value={content}
        onChangeText={handleContentChange}
        placeholder="Digite o conteúdo"
      />

      {/* Não tem botão salvar nem cancelar */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#121212' }, // fundo escuro, igual na imagem
  backButton: { marginBottom: 10 },
  backButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  label: { fontWeight: 'bold', marginBottom: 5, marginTop: 15, fontSize: 16, color: '#fff' },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 15,
    borderRadius: 8,
    textAlignVertical: 'top'
  },
});
