import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
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
  // Não há isFavorite nesta tela, pois é uma nova nota. Favoritar só na edição.

  // ... (TODA A SUA LÓGICA useEffect e saveNoteManually permanece EXATAMENTE IGUAL)

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
        // Nova nota, adiciona ao topo
        const newNote = { 
          title, 
          content, 
          lastModified: Date.now(),
          isFavorite: false, // Nova nota não é favorita por padrão
        };
        updatedNotes.unshift(newNote); 
        setNoteIndex(0);
      } else {
        // Editando uma nota existente (auto-save), atualiza o item
        updatedNotes[noteIndex] = { 
          ...updatedNotes[noteIndex], // Mantém o status isFavorite existente
          title, 
          content, 
          lastModified: Date.now(),
        };
      }

      setExistingNotes(updatedNotes);
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    }, 700);

    return () => clearTimeout(saveTimeout);
  }, [title, content]); // isFavorite não é dependência aqui

  const saveNoteManually = async () => {
    if (title.trim() === '' && content.trim() === '') {
      router.back();
      return;
    }

    let updatedNotes = [...existingNotes];

    if (noteIndex === null) {
      const newNote = { 
        title, 
        content, 
        lastModified: Date.now(),
        isFavorite: false, // Nova nota não é favorita por padrão
      };
      updatedNotes.unshift(newNote);
      setNoteIndex(0);
    } else {
      updatedNotes[noteIndex] = { 
        ...updatedNotes[noteIndex], 
        title, 
        content, 
        lastModified: Date.now(),
      };
    }

    setExistingNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    router.back();
  };

  return (
    <View style={styles.darkContainer}>
      <View style={styles.editHeader}>
        <TouchableOpacity onPress={saveNoteManually} style={styles.backButton}>
          <Image
            source={require('../assets/images/back-icon.png')}
            style={{ width: 28, height: 28 }}
          />
        </TouchableOpacity>
        
        <TextInput
          style={styles.titleInput}
          placeholder="Título"
          placeholderTextColor="#555"
          value={title}
          onChangeText={setTitle}
          autoFocus={true}
          multiline
        />
        {/* Ícone de estrela NÃO presente aqui, pois é para nova nota */}
      </View>

      {/* Separador e título */}
      <View style={styles.separator} />


      <TextInput
        style={styles.textArea}
        placeholder="Comece a escrever..."
        placeholderTextColor="#555"
        multiline
        value={content}
        onChangeText={setContent}
      />
    </View>
  );
}