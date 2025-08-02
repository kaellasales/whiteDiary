import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0D1117',
  },
  logo: {
    width: '100%',
    height: 80,
    marginBottom: 10,
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E6EDF3',
  },
  separator: {
    height: 1,
    backgroundColor: '#444',
    marginVertical: 10,
    alignSelf: 'center',
    width: '100%',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 100,
  },
  noteCard: {
    width: '48%',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  iconPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
  noteImage: {
    width: 40,
    height: 40,
  },
  noteCardTitle: {
    color: '#E6EDF3',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#2a9d8f',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addButtonText: {
    color: '#E6EDF3',
    fontWeight: 'bold',
    fontSize: 24,
  },
  darkContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0D1117',
  },
  backButton: { marginBottom: 10 },
  backButtonText: { color: '#E6EDF3', fontWeight: 'bold', fontSize: 16 },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 15,
    fontSize: 16,
    color: '#E6EDF3',
  },
  input: {
    backgroundColor: '#222',
    color: '#E6EDF3',
    padding: 15,
    borderRadius: 8,
    textAlignVertical: 'top',
  },
  titleEdit: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E6EDF3',
    marginBottom: 20,
  },
  
});

export default styles;
