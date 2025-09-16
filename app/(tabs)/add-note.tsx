// app/(tabs)/add-note.tsx

// 1. Importe 'useCallback' do React e 'useFocusEffect' do Expo Router
import React, { useState, useCallback } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import styles from '../../constants/styles';
import { auth, db } from '../../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function AddNoteScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // 2. Adicione este hook para limpar os campos toda vez que a tela for focada
  useFocusEffect(
    useCallback(() => {
      // Esta função é executada toda vez que a tela entra em foco
      setTitle('');
      setContent('');
      setIsSaving(false); // Garante que o estado de 'salvando' também seja resetado
    }, [])
  );

  const saveNoteManually = async () => {
    if (title.trim() === '' && content.trim() === '') {
      router.back();
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Erro', 'Você precisa estar logado para salvar uma nota.');
      return;
    }

    setIsSaving(true);
    try {
      const notesCollectionRef = collection(db, 'users', user.uid, 'notes');
      await addDoc(notesCollectionRef, {
        title: title.trim() || "Sem Título",
        content: content.trim(),
        isFavorite: false,
        lastModified: serverTimestamp(),
      });
      router.back();
    } catch (error) {
      console.error("Erro ao salvar a nota: ", error);
      Alert.alert('Erro', 'Não foi possível salvar a nota.');
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0D1117' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
          <View style={styles.editHeader}>
            <TouchableOpacity onPress={saveNoteManually} style={styles.backButton} disabled={isSaving}>
              <Image source={require('../../assets/images/back-icon.png')} style={{ width: 28, height: 28 }} />
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