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
import styles from '../../constants/styles';
import { auth } from  '../../firebaseConfig';

export default function CadastroScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    setErrorMessage(''); // Limpa o erro anterior a cada tentativa
    if (email === '' || password === '') {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      alert('Sucesso! Sua conta foi criada. Faça o login para continuar.');
      router.push('/auth/login');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('Este e-mail já está em uso.');
      } else if (error.code === 'auth/invalid-email') {
        setErrorMessage('O e-mail fornecido não é válido.');
      } else if (error.code === 'auth/weak-password') {
        setErrorMessage('A senha deve ter no mínimo 6 caracteres.');
      } else {
        setErrorMessage('Ocorreu um erro ao criar a conta.');
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0D1117' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.authContainer}
      >
        <Image
          source={require('../../assets/images/logo.png')}
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

        {/* 3. Mostra a mensagem de erro aqui, se ela existir */}
        {errorMessage ? (
          <Text style={{ color: '#ff4d4d', textAlign: 'center', marginBottom: 10 }}>
            {errorMessage}
          </Text>
        ) : null}

        <TouchableOpacity
          style={styles.authButtonFull}
          onPress={handleSignUp}
        >
          <Text style={styles.authButtonText}>Registrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/auth/login')}>
          <Text style={styles.authLink}>Já tenho cadastro</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}