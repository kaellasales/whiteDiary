import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function AddNoteScreen() {
  const router = useRouter();
  const [note, setNote] = useState('');

  const saveNote = async () => {
    if (note.trim() === '') {
      alert('Digite algo antes de salvar!');
      return;
    }

    const stored = await AsyncStorage.getItem('notes');
    const existingNotes = stored ? JSON.parse(stored) : [];

    const updatedNotes = [...existingNotes, note];
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));

    router.back(); // volta para tela anterior
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Anotação</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua anotação..."
        multiline
        value={note}
        onChangeText={setNote}
      />
      <TouchableOpacity style={styles.button} onPress={saveNote}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancel} onPress={() => router.back()}>
        <Text style={styles.cancelText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    height: 150,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    textAlignVertical: 'top'
  },
  button: {
    backgroundColor: '#2a9d8f',
    marginTop: 15,
    padding: 15,
    alignItems: 'center',
    borderRadius: 8
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  cancel: { marginTop: 10, alignItems: 'center' },
  cancelText: { color: '#555' }
});
