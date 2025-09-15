// app/login.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../../constants/styles';
import { auth } from '../../firebaseConfig';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    try {
      await auth.signInWithEmailAndPassword(email, password);
      router.push('/');
    } catch (error: any) {
      Alert.alert('Erro no Login', 'E-mail ou senha inválidos.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0D1117' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.authContainer}
      >
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.authLogo}
          resizeMode="contain"
        />
        <TextInput
          style={styles.authInput}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.authInput}
          placeholder="Senha"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.authButton}
            onPress={handleLogin}
          >
            <Text style={styles.authButtonText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.authButton}
            onPress={() => router.push('/cadastro')}
          >
            <Text style={styles.authButtonText}>Registra-se</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => { /* Lógica de esqueci a senha */ }}>
          <Text style={styles.authLink}>Esqueci a senha?</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
