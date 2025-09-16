// app/(tabs)/EditNote.tsx

import React, { useState, useEffect, useCallback } from 'react';
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
import { useLocalSearchParams, useRouter } from 'expo-router';
import styles from '../../constants/styles';

import { auth, db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

export default function EditNoteScreen() {
  const router = useRouter();
  const { noteId } = useLocalSearchParams<{ noteId: string }>();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!noteId) {
      Alert.alert("Erro", "ID da nota não fornecido.");
      router.back();
      return;
    }

    const loadNote = async () => {
      setIsLoading(true);

      // ===== CORREÇÃO PARA O ERRO 'currentUser is possibly null' =====
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Sessão Expirada", "Por favor, faça o login novamente.");
        setIsLoading(false);
        router.replace('/auth/login');
        return;
      }
      // =============================================================

      const noteRef = doc(db, 'users', user.uid, 'notes', noteId);
      try {
        const docSnap = await getDoc(noteRef);
        if (docSnap.exists()) {
          const noteData = docSnap.data();
          setTitle(noteData.title);
          setContent(noteData.content || ''); // Carrega o conteúdo para o estado
          setIsFavorite(noteData.isFavorite || false);
        } else {
          Alert.alert("Erro", "Nota não encontrada.");
          router.back();
        }
      } catch (error) {
        console.error("Erro ao carregar a nota:", error);
        Alert.alert("Erro", "Não foi possível carregar a nota.");
      } finally {
        setIsLoading(false);
      }
    };

    loadNote();
  }, [noteId]);

  const saveNote = useCallback(async () => {
    // ===== CORREÇÃO PARA O ERRO 'currentUser is possibly null' =====
    const user = auth.currentUser;
    if (!noteId || !user) {
      return; // Simplesmente não salva se não houver ID da nota ou usuário
    }
    // =============================================================

    const noteRef = doc(db, 'users', user.uid, 'notes', noteId);
    try {
      await updateDoc(noteRef, {
        title: title,
        content: content,
        isFavorite: isFavorite,
        lastModified: serverTimestamp(),
      });
    } catch (error) {
      console.error("Erro ao salvar a nota:", error);
    }
  }, [noteId, title, content, isFavorite]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!isLoading) {
        saveNote();
      }
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [title, content, isFavorite, saveNote, isLoading]);

  const handleBack = async () => {
    await saveNote();
    router.back();
  };
  
  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.darkContainer}>
        <ActivityIndicator size="large" color="#9b5de5" style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0D1117' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
          <View style={styles.editHeader}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Image source={require('../../assets/images/back-icon.png')} style={{ width: 28, height: 28 }} />
            </TouchableOpacity>
            <TextInput
              style={styles.titleInput}
              placeholder="Título"
              placeholderTextColor="#555"
              value={title}
              onChangeText={setTitle}
              multiline
            />
            <TouchableOpacity onPress={toggleFavorite}>
              <Image
                source={isFavorite ? require('../../assets/images/star-filled-icon.png') : require('../../assets/images/star-icon.png')}
                style={styles.starIcon}
              />
            </TouchableOpacity>
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
              value={content}
              onChangeText={setContent}
              multiline
              autoFocus={false}
            />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}