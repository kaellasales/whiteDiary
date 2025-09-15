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
} from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../constants/styles';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0D1117' }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.authContainer}
      >
        <Image
          source={require('../assets/images/logo.png')} // Verifique se o caminho do logo está correto
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
          secureTextEntry // Esconde a senha
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.authButton} 
            onPress={() => router.push('/')} // Navega para a tela principal (index)
          >
            <Text style={styles.authButtonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.authButton} 
            onPress={() => router.push('../app/cadastro')} // Navega para a tela de cadastro
          >
            <Text style={styles.authButtonText}>Registra-se</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => { /* Lógica de esqueci a senha virá aqui */ }}>
          <Text style={styles.authLink}>Esqueci a senha?</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}