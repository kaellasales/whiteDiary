// constants/styles.ts

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // ... todos os outros estilos permanecem os mesmos ...
  container: { flex: 1, padding: 20, backgroundColor: '#0D1117' },
  logo: { width: '100%', height: 150, marginTop: 40, marginBottom: 20, alignSelf: 'center' },
  sectionTitle: { textAlign: 'center', fontSize: 35, fontWeight: 'bold', color: '#E6EDF3', marginBottom: 5, fontFamily: 'monospace' },
  separator: { height: 3, backgroundColor: '#444', marginVertical: 0, alignSelf: 'center', width: '110%' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', gap: 10, paddingBottom: 100 },
  noteCard: { width: '30%', borderRadius: 12, paddingVertical: 20, alignItems: 'center', marginBottom: 10 },
  iconPlaceholder: { width: 80, height: 90, borderRadius: 12, backgroundColor: '#161B22', alignItems: 'center', justifyContent: 'center', marginBottom: 8, overflow: 'hidden' },
  noteImage: { width: 60, height: 70, tintColor: '#E6EDF3' },
  noteCardTitle: { color: '#E6EDF3', fontWeight: '600', fontSize: 14, textAlign: 'center', marginTop: 4, fontFamily: 'monospace' },
  addButton: { width: 60, height: 60, paddingBottom: 30, borderRadius: 12, position: 'absolute', bottom: 20, right: 20, alignItems: 'center', justifyContent: 'center' },
  darkContainer: { flex: 1, paddingTop: 10, paddingHorizontal: 20, backgroundColor: '#0D1117' },
  editHeader: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  backButton: { padding: 5 },
  titleInput: { height: 50, flex: 1, fontSize: 26, fontWeight: 'bold', color: '#E6EDF3', marginLeft: 5 },
  
  // ===== ÁREA RESTAURADA E CORRIGIDA =====
  textArea: {
    backgroundColor: 'transparent',
    color: '#E6EDF3',
    padding: 10,
    textAlignVertical: 'top',
    flex: 1, // <<< A PROPRIEDADE FOI RESTAURADA PARA O ORIGINAL
    fontSize: 16,
    lineHeight: 24,
  },
  // ===== FIM DA RESTAURAÇÃO =====

  starIcon: { width: 30, height: 30, tintColor: '#9b5de5', marginLeft: 20 },
  authContainer: { flex: 1, backgroundColor: '#0D1117', justifyContent: 'center', padding: 20 },
  authLogo: { width: '80%', height: 150, alignSelf: 'center', marginBottom: 50 },
  authInput: { backgroundColor: '#161B22', color: '#E6EDF3', borderWidth: 1, borderColor: '#30363D', borderRadius: 8, paddingHorizontal: 15, paddingVertical: 12, fontSize: 16, marginBottom: 20 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', gap: 15 },
  authButton: { backgroundColor: '#9b5de5', paddingVertical: 15, borderRadius: 8, alignItems: 'center', flex: 1 },
  authButtonFull: { backgroundColor: '#9b5de5', paddingVertical: 15, borderRadius: 8, alignItems: 'center' },
  authButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  authLink: { color: '#58A6FF', textAlign: 'center', marginTop: 25 },
});

export default styles;