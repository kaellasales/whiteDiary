import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import styles from '../../constants/styles';
// Funções e objetos do Firebase que precisamos
import { auth, db } from '../../firebaseConfig';
import { collection, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore';

export default function HomeScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const [notes, setNotes] = useState<any[]>([]);


  useEffect(() => {
    if (isFocused) {
      loadNotes();
    }
  }, [isFocused]);

  const loadNotes = () => {
    if (!auth.currentUser) return;

    const notesCollection = collection(db, 'users', auth.currentUser.uid, 'notes');
    const q = query(notesCollection, orderBy('lastModified', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotes(notesData);
    });

    return unsubscribe;
  };

  const deleteNote = async (noteId: string) => {
    if (!auth.currentUser) return;
    const noteRef = doc(db, 'users', auth.currentUser.uid, 'notes', noteId);
    await deleteDoc(noteRef);
  };

  const truncateTitle = (title: string) => {
    return title.length > 12 ? title.slice(0, 12) + '...' : title;
  };
  
  // Adicionei apenas um botão simples de Logout
  const handleLogout = () => {
    auth.signOut().then(() => router.replace('/auth/login'));
  }

  return (
    <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingHorizontal: 15 }}>
             <Image
                source={require('../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <TouchableOpacity onPress={handleLogout}>
                <Text style={{color: '#aaa'}}>Sair</Text>
            </TouchableOpacity>
        </View>
      
      <Text style={styles.sectionTitle}>Minhas notas</Text>
      <View style={styles.separator} />

      <ScrollView contentContainerStyle={styles.grid}>
        {notes.length === 0 ? (
          <Text style={{ color: '#aaa', textAlign: 'center', marginTop: 20 }}>
            Nenhuma nota ainda. Toque no + para criar sua primeira!
          </Text>
        ) : (
          notes.map((note) => ( // Alterado de (note, index) para (note)
            <TouchableOpacity
              key={note.id} // Usando o ID do Firestore como chave
              style={styles.noteCard}
              onPress={() =>
                router.push({ pathname: '/app/EditNote', params: { noteId: note.id } }) // Passando o ID
              }
              onLongPress={() => {
                Alert.alert(
                  'Excluir anotação', 'Tem certeza?',
                  [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Excluir', onPress: () => deleteNote(note.id), style: 'destructive' }, // Passando o ID
                  ]
                );
              }}
            >
              {note.isFavorite && <Image source={require('../assets/images/star-filled-icon.png')} style={{position: 'absolute', top: 8, right: 8, width: 16, height: 16}}/>}
              <View style={styles.iconPlaceholder}>
                <Image
                  source={require('../assets/images/note-icon.png')}
                  style={styles.noteImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.noteCardTitle}>{truncateTitle(note.title)}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/app/add-note')}>
        <Image 
          source={require('../assets/images/addbutton.png')}
          style={{ width: 50, height: 50 }}
        />
      </TouchableOpacity>
    </View>
  );
}