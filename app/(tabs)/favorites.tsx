// app/(tabs)/favorites.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import styles from '../../constants/styles';
import CustomTopTabs from '../../components/CustomTopTabs';

import { auth, db } from '../../firebaseConfig';
import { collection, onSnapshot, query, orderBy, doc, deleteDoc, where } from 'firebase/firestore';

export default function FavoritesScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    if (isFocused) {
      unsubscribe = loadNotes();
    }
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [isFocused]);

  const loadNotes = () => {
    const user = auth.currentUser;
    if (!user) return () => {};

    const notesCollection = collection(db, 'users', user.uid, 'notes');
    const q = query(notesCollection, where('isFavorite', '==', true), orderBy('lastModified', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotes(notesData);
    });
    return unsubscribe;
  };

  const deleteNote = async (noteId: string) => {
    const user = auth.currentUser;
    if (!user) return;
    const noteRef = doc(db, 'users', user.uid, 'notes', noteId);
    await deleteDoc(noteRef);
  };

  const truncateTitle = (title: string): string => {
    if (!title) return '';
    return title.length > 12 ? title.slice(0, 12) + '...' : title;
  };
  
  const handleLogout = () => {
    auth.signOut().then(() => router.replace('/auth/login'));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0D1117' }}>
      <View style={styles.container}>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Image
            source={require('../../assets/images/logout-icon.png')}
            style={styles.logoutIcon}
          />
        </TouchableOpacity>
        
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        
        <CustomTopTabs activeTab="favorites" />
        
        <View style={styles.separator} />

        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.grid}>
          {notes.length === 0 ? (
            <Text style={{ color: '#aaa', textAlign: 'center', marginTop: 20 }}>
              Nenhuma nota favorita ainda.
            </Text>
          ) : (
            notes.map((note) => (
              <TouchableOpacity
                key={note.id}
                style={styles.noteCard}
                onPress={() =>
                  router.push({ pathname: '/(tabs)/EditNote', params: { noteId: note.id } })
                }
                onLongPress={() => {
                  Alert.alert(
                    'Excluir anotação', 'Tem certeza?',
                    [
                      { text: 'Cancelar', style: 'cancel' },
                      { text: 'Excluir', onPress: () => deleteNote(note.id), style: 'destructive' },
                    ]
                  );
                }}
              >
                {/* ===== ESTILO DA ESTRELA ATUALIZADO AQUI ===== */}
                {note.isFavorite && (
                  <Image
                    source={require('../../assets/images/star-filled-icon.png')}
                    style={styles.favoriteStarIcon}
                  />
                )}
                {/* ============================================= */}
                <View style={styles.iconPlaceholder}>
                  <Image
                    source={require('../../assets/images/note-icon.png')}
                    style={styles.noteImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.noteCardTitle}>{truncateTitle(note.title)}</Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>

        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/(tabs)/add-note')}>
          <Image 
            source={require('../../assets/images/addbutton.png')}
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}