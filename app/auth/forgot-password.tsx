// app/auth/forgot-password.tsx

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
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../../constants/styles';

// Importações necessárias do Firebase
import { auth } from '../../firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordReset = async () => {
    if (email.trim() === '') {
      Alert.alert("Campo obrigatório", "Por favor, digite seu e-mail.");
      return;
    }

    setIsLoading(true);
    try {
      // Função do Firebase para enviar o e-mail de redefinição
      await sendPasswordResetEmail(auth, email);
      
      Alert.alert(
        "Verifique seu E-mail",
        `Se uma conta com o e-mail ${email} existir, um link para redefinir sua senha foi enviado.`
      );
      router.back(); // Volta para a tela de login

    } catch (error: any) {
      // O Firebase já trata o erro de e-mail inválido, mas podemos ter um alerta genérico
      console.error("Erro ao redefinir senha:", error);
      Alert.alert("Erro", "Não foi possível enviar o e-mail. Verifique o endereço digitado.");
    } finally {
      setIsLoading(false);
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

        <Text style={styles.authInstructionText}>
          Digite seu e-mail abaixo e enviaremos um link para você criar uma nova senha.
        </Text>

        <TextInput
          style={styles.authInput}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoFocus={true}
        />
        
        <TouchableOpacity
          style={styles.authButtonFull}
          onPress={handlePasswordReset}
          disabled={isLoading}
        >
          {isLoading 
            ? <ActivityIndicator color="#FFF" /> 
            : <Text style={styles.authButtonText}>Enviar Link de Recuperação</Text>
          }
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backToLoginLink}>Voltar para o Login</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}