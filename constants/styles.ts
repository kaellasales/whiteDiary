import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0D1117',
  },

  // Botão menu hambúrguer
  menuButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  menuLine: {
    width: 28,
    height: 3,
    backgroundColor: '#9b5de5', // roxo
    marginVertical: 3,
    borderRadius: 2,
  },

  logo: {
    width: '100%',
    height: 150,
    marginTop: 40,
    marginBottom: 20,
    alignSelf: 'center',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    color: '#E6EDF3',
    marginBottom: 5,
    fontFamily: 'monospace',
  },
  separator: {
    height: 3,
    backgroundColor: '#444',
    marginVertical: 0,
    alignSelf: 'center',
    width: '110%',
  },

  // Cards em 3 colunas
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 10,
    paddingBottom: 100,
  },
  noteCard: {
    width: '30%',
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  iconPlaceholder: {
    width: 80,
    height: 90,
    borderRadius: 12,
    backgroundColor: '#161B22',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
  noteImage: {
    width: 60,
    height: 70,
    tintColor: '#E6EDF3',
  },
  noteCardTitle: {
    color: '#E6EDF3',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
    fontFamily: 'monospace',
  },

  // Botão adicionar
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 12,
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

// Telas de Edição e Adição
  darkContainer: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: '#0D1117',
  },
  
  editHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  
  backButton: { 
    padding: 5,
  },

  // Ajuste o titleInput
  titleInput: {
    height: 40,
    flex: 1, // Permite que ele cresça, mas respeita outros elementos na linha
    fontSize: 26,
    fontWeight: 'bold',
    color: '#E6EDF3',
    marginLeft: 20,
    // Removendo largura fixa para permitir que ele se ajuste
    // Certifique-se de que não haja margens/paddings excessivos
  },

  textArea: {
    backgroundColor: 'transparent',
    color: '#E6EDF3',
    padding: 10,
    textAlignVertical: 'top',
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },

  // NOVO ESTILO para o ícone de estrela
  starIcon: {
    width: 30, // Tamanho do ícone
    height: 30, // Tamanho do ícone
    tintColor: '#9b5de5', // Cor da estrela (exemplo roxo)
    marginLeft: 20, // Empurra a estrela para a direita
  },

  // ... (mantenha o resto dos seus estilos)
});

export default styles;