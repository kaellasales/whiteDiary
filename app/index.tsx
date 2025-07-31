import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useRouter } from 'expo-router';

type Note = {
  title: string;
  content: string;
};

export default function HomeScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (isFocused) {
      loadNotes();
    }
  }, [isFocused]);

  const loadNotes = async () => {
    const stored = await AsyncStorage.getItem('notes');
    if (stored) {
      setNotes(JSON.parse(stored));
    }
  };

  const deleteNote = async (index: number) => {
    const updated = [...notes];
    updated.splice(index, 1);
    setNotes(updated);
    await AsyncStorage.setItem('notes', JSON.stringify(updated));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Anotações</Text>

      <ScrollView style={styles.scroll}>
        {notes.length === 0 && <Text style={styles.noNotes}>Nenhuma anotação ainda.</Text>}
        {notes.map((note, index) => (
          <View key={index} style={styles.noteBox}>

            <TouchableOpacity onPress={() => router.push({ pathname: '/EditNote', params: { index: String(index) } })}>
              <Text style={styles.noteTitle}>{note.title}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteNote(index)}>
              <Text style={styles.deleteText}>Excluir</Text>
            </TouchableOpacity>

          </View>
          
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/add-note')}>
        <Text style={styles.addButtonText}>+ Nova Anotação</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  scroll: { marginBottom: 20 },
  noNotes: { fontStyle: 'italic', color: '#888' },
  noteBox: { padding: 15, backgroundColor: '#f0f0f0', marginBottom: 10, borderRadius: 8 },
  noteTitle: { fontSize: 16, fontWeight: 'bold' },
  deleteButton: { marginTop: 5, alignSelf: 'flex-end' },
  deleteText: { color: 'red', fontWeight: 'bold' },
  addButton: {
    backgroundColor: '#2a9d8f',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8
  },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
