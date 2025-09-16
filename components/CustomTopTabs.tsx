// components/CustomTopTabs.tsx

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// ATENÇÃO: Importar o tipo 'Href'
import { useRouter, Href } from 'expo-router'; 
import styles from '../constants/styles';

interface CustomTopTabsProps {
  activeTab: 'index' | 'favorites';
}

export default function CustomTopTabs({ activeTab }: CustomTopTabsProps) {
  const router = useRouter();

  const tabs = [
    { key: 'index', name: 'Minhas notas', route: '/(tabs)/' },
    { key: 'favorites', name: 'Favoritos', route: '/(tabs)/favorites' },
  ] as const;

  return (
    <View style={styles.topTabsContainer}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tabButton, isActive && styles.activeTabButton]}
            onPress={() => {
              if (!isActive) {
                // Forçamos o tipo para 'Href', que é o esperado pelo router
                router.replace(tab.route as Href); 
              }
            }}
          >
            <Text style={[styles.tabButtonText, isActive && styles.activeTabButtonText]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}