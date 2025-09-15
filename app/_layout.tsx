import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';


function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { user, loading };
}

export default function RootLayout() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }

    const inAppGroup = segments[0] === 'app';

   
    if (user && !inAppGroup) {
      router.replace({ pathname: 'index' });
    } 
    
    else if (!user && inAppGroup) {
      router.replace({ pathname: 'login' });
    }
  }, [user, loading, segments]);

  if (loading) {
    return null; 
  }

  return <Slot />;
}