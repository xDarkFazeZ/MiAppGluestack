// src/hooks/useGoogleAuthSimple.js
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { useState } from 'react';
import { auth, database } from '../src/firebase/firebaseConfig';

export const useGoogleAuthSimple = (navigation) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para generar ID aleatorio
  const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  // Función para generar IP aleatoria
  const generateRandomIP = () => {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);

      const redirectUri = 'https://auth.expo.io/@juaniram';
      const encodedRedirectUri = encodeURIComponent(redirectUri);
      
      const clientId = "1053700047910-ssb4msi9l54cmn4j1mtqklj54f1b1shl.apps.googleusercontent.com";
      
      const authUrl = 
        `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${clientId}` +
        `&redirect_uri=${encodedRedirectUri}` +
        `&response_type=id_token` +
        `&scope=openid%20profile%20email` +
        `&nonce=${Math.random().toString(36).substring(2, 15)}`;

      console.log('🌐 Abriendo Google OAuth...');
      
      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        redirectUri
      );

      console.log('🔍 Resultado de autenticación:', result.type);
      
      if (result.type === 'success' && result.url) {
        const urlObj = new URL(result.url);
        const hash = urlObj.hash.substring(1);
        const params = new URLSearchParams(hash);
        const idToken = params.get('id_token');
        
        console.log('🔑 ID Token encontrado:', idToken ? '✅' : '❌');
        
        if (idToken) {
          console.log('🔐 Creando credencial Firebase...');
          const credential = GoogleAuthProvider.credential(idToken);
          
          console.log('🔥 Autenticando con Firebase...');
          const userCredential = await signInWithCredential(auth, credential);
          const user = userCredential.user;
          
          console.log('🎉 Login exitoso con Google!');
          console.log('   Email:', user.email);
          console.log('   Nombre:', user.displayName);
          console.log('   UID:', user.uid);
          
          // Verificar si es usuario nuevo
          const isNewUser = user.metadata.creationTime === user.metadata.lastSignInTime;
          
          if (isNewUser) {
            console.log('📝 Usuario nuevo, guardando en Realtime Database...');
            
            const userId = generateRandomId();
            const userIP = generateRandomIP();
            
            const userData = {
              id: userId,
              first_name: user.displayName?.split(' ')[0] || user.email.split('@')[0],
              last_name: user.displayName?.split(' ')[1] || '',
              email: user.email,
              photoURL: user.photoURL,
              gender: "Not specified",
              ip_address: userIP,
              provider: 'google',
              created_at: new Date().toISOString(),
              auth_uid: user.uid,
              updated_at: new Date().toISOString()
            };

            await set(ref(database, 'users/' + user.uid), userData);
            console.log('✅ Usuario guardado en Realtime Database');
          } else {
            console.log('👤 Usuario existente');
          }
          
          // Navegar al Home
          console.log('🏠 Navegando a Home...');
          if (navigation) {
            navigation.replace('Home');
          }
          
          return user;
        } else {
          console.log('⚠️ No se encontró id_token en la URL');
          setError('Error en autenticación: no se recibió token');
        }
      } else if (result.type === 'cancel') {
        console.log('⏹️ Usuario canceló la autenticación');
        setError('Autenticación cancelada por el usuario');
      } else {
        console.log('❌ Resultado inesperado:', result);
        setError('Error en el proceso de autenticación');
      }
      
    } catch (error) {
      console.error('❌ Error en Google Sign-In:', error);
      setError(error.message || 'Error desconocido en la autenticación');
    } finally {
      setLoading(false);
    }
  };

  return {
    signInWithGoogle,
    loading,
    error
  };
};