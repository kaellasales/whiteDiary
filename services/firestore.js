// services/firestore.js
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import app from '../firebaseConfig';

const db = getFirestore(app);

export const addDiaryEntry = async (userId, text) => {
  const colRef = collection(db, 'diaryEntries');
  return addDoc(colRef, { userId, text, createdAt: new Date() });
};

export const getDiaryEntriesByUser = async (userId) => {
  const colRef = collection(db, 'diaryEntries');
  const q = query(colRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
