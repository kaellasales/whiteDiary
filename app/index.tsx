import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import styles from '../constants/styles';

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

  const truncateTitle = (title: string) => {
    return title.length > 10 ? title.slice(0, 10) + '...' : title;
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      
      {/* Linha agora vem antes do título */}
      <View style={styles.separator} />

      <Text style={styles.sectionTitle}>Minhas notas</Text>

      <ScrollView contentContainerStyle={styles.grid}>
        {notes.map((note, index) => (
          <TouchableOpacity
            key={index}
            style={styles.noteCard}
            onPress={() =>
              router.push({
                pathname: '/EditNote',
                params: { index: String(index) },
              })
            }
            onLongPress={() => {
              Alert.alert(
                'Excluir anotação',
                'Tem certeza que deseja excluir esta anotação?',
                [
                  { text: 'Cancelar', style: 'cancel' },
                  {
                    text: 'Excluir',
                    onPress: () => deleteNote(index),
                    style: 'destructive',
                  },
                ]
              );
            }}
          >
            <View style={styles.iconPlaceholder}>
              <Image
                source={require('../assets/images/note-icon.png')}
                style={styles.noteImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.noteCardTitle}>{truncateTitle(note.title)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/add-note')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
