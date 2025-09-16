// app/(tabs)/_layout.tsx

import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Esconde o cabeçalho padrão de cada tela
        tabBarStyle: { display: 'none' }, // <-- ESTA É A MUDANÇA PRINCIPAL
      }}
    >
      {/* Aqui definimos as telas que fazem parte do grupo (tabs) */}
      <Tabs.Screen name="index" />
      <Tabs.Screen name="favorites" />
      
      {/* A tela 'add-note' e 'EditNote' não precisam ser listadas aqui 
        porque não queremos que elas tenham um botão na barra de abas.
        O Expo Router vai encontrá-las normalmente quando você navegar para elas.
      */}
    </Tabs>
  );
}