import React, { useState } from 'react';
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
} from 'react-native';
// AsyncStorage foi removido
import { useRouter } from 'expo-router';
import styles from '../../constants/styles';

// 1. Importações necessárias do Firebase
import { auth, db } from '../../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function AddNoteScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 2. Removemos os useEffects e estados que gerenciavam a lista inteira de notas (existingNotes, noteIndex).
  //    A tela de "adicionar" agora tem uma única responsabilidade: criar uma nova nota.

  // 3. A função de salvar foi simplificada para usar o Firestore
  const saveNoteManually = async () => {
    // A verificação se está vazio continua igual
    if (title.trim() === '' && content.trim() === '') {
      router.back();
      return;
    }

    // Garante que o usuário está logado para poder salvar
    if (!auth.currentUser) {
        Alert.alert('Erro', 'Você precisa estar logado para salvar uma nota.');
        return;
    }

    try {
      // Cria uma referência para a subcoleção 'notes' do usuário atual
      const notesCollectionRef = collection(db, 'users', auth.currentUser.uid, 'notes');
      
      // Adiciona um novo documento na coleção com os dados da nota
      await addDoc(notesCollectionRef, {
        title: title || "Sem Título", // Garante um título padrão
        content: content,
        isFavorite: false, // Notas novas nunca são favoritas
        lastModified: serverTimestamp(), // O Firebase cuida de colocar a data/hora atual
      });

      router.back();

    } catch (error) {
      console.error("Erro ao salvar a nota: ", error);
      Alert.alert('Erro', 'Não foi possível salvar a nota.');
    }
  };

  // O seu código JSX (a parte visual) não precisa de nenhuma alteração.
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0D1117' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
          
          <View style={styles.editHeader}>
            <TouchableOpacity onPress={saveNoteManually} style={styles.backButton}>
              <Image source={require('../assets/images/back-icon.png')} style={{ width: 28, height: 28 }} />
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