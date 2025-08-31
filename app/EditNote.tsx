import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
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
  const [isFavorite, setIsFavorite] = useState(false); // NOVO estado para o favorito

  // ... (TODA A SUA LÓGICA useEffect e handleBack permanece EXATAMENTE IGUAL)

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
        setIsFavorite(note.isFavorite || false); // Carrega o status de favorito
      }
    };
    loadNote();
  }, [index]);

  // Modifica a lógica de salvamento para incluir o isFavorite
  useEffect(() => {
    const saveTimeout = setTimeout(async () => {
      if (noteIndex === null) return;
      if (title.trim() === '' && content.trim() === '') return;

      const updatedNotes = [...notes];
      // Certifica-se de que a nota no índice original tem o título e conteúdo
      // antes de removê-la e readicioná-la com o novo status de favorito.
      // Se a lógica de mover para o topo está presente, o índice é 0,
      // então a nota que está sendo editada já estaria no topo.
      
      // O ideal seria encontrar a nota pelo ID ou uma propriedade única,
      // mas como estamos usando índice, manter a lógica de splice/unshift.
      
      // Remove a nota antiga (no índice antes da atualização)
      const oldNote = updatedNotes.splice(noteIndex, 1)[0]; 

      // Adiciona a nota atualizada no topo, incluindo o status de favorito
      updatedNotes.unshift({ 
        ...oldNote, // Mantém outras propriedades se existirem
        title, 
        content, 
        lastModified: Date.now(),
        isFavorite, // Salva o status de favorito
      });

      setNotes(updatedNotes);
      setNoteIndex(0); // O novo índice é 0 após mover para o topo
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    }, 700);

    return () => clearTimeout(saveTimeout);
  }, [title, content, isFavorite]); // Adicionado isFavorite às dependências

  // Salvamento manual ao voltar, também incluindo isFavorite
  const handleBack = async () => {
    if (noteIndex === null) {
      router.back();
      return;
    }
    if (title.trim() === '' && content.trim() === '') {
      // Se vazio, apenas volta, sem salvar. A nota existente (se houver) permanece.
      router.back();
      return;
    }

    const updatedNotes = [...notes];
    const oldNote = updatedNotes.splice(noteIndex, 1)[0]; // Remove a nota antiga

    updatedNotes.unshift({ 
      ...oldNote, 
      title, 
      content, 
      lastModified: Date.now(),
      isFavorite,
    });

    setNotes(updatedNotes);
    setNoteIndex(0);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    router.back();
  };

  // Função para alternar o status de favorito
  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
  };

  return (
    <View style={styles.darkContainer}>
      <View style={styles.editHeader}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
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
          multiline // Permite múltiplas linhas para o título se for muito longo
        />

        {/* Ícone de estrela */}
        <TouchableOpacity onPress={toggleFavorite}>
          <Image
            source={isFavorite ? require('../assets/images/star-filled-icon.png') : require('../assets/images/star-icon.png')}
            style={styles.starIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Separador e título */}
      <View style={styles.separator} />


      <TextInput
        style={styles.textArea}
        placeholder="Comece a escrever..."
        placeholderTextColor="#555"
        value={content}
        onChangeText={setContent}
        multiline
        autoFocus={false}
      />
    </View>
  );
}