// src/hooks/useUserProfile.js - VERSIÓN MEJORADA
import { onAuthStateChanged } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { auth, database } from '../src/firebase/firebaseConfig';

export const useUserProfile = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      console.log('Auth state changed:', currentUser?.email);
      setUser(currentUser);
      
      if (currentUser) {
        // Obtener datos adicionales de Realtime Database
        const userRef = ref(database, 'users/' + currentUser.uid);
        const unsubscribeDB = onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          console.log('Datos de Realtime Database:', data);
          setUserData(data);
          setLoading(false);
        }, (error) => {
          console.error('Error obteniendo datos del usuario:', error);
          // Si hay error, usar datos de auth
          setUserData({
            first_name: currentUser.displayName?.split(' ')[0],
            last_name: currentUser.displayName?.split(' ')[1],
            email: currentUser.email,
            photoURL: currentUser.photoURL
          });
          setLoading(false);
        });
        
        return () => unsubscribeDB();
      } else {
        console.log('No hay usuario autenticado');
        setUserData(null);
        setLoading(false);
      }
    });

    return unsubscribeAuth;
  }, []);

  // Función para obtener el nombre para mostrar
  const getDisplayName = () => {
    if (!user) {
      console.log('No hay usuario en getDisplayName');
      return 'Usuario';
    }
    
    console.log('Usuario en getDisplayName:', user);
    console.log('UserData en getDisplayName:', userData);
    
    // Prioridad 1: displayName de Firebase Auth (especialmente útil para Google Auth)
    if (user.displayName) {
      console.log('Usando displayName de Auth:', user.displayName);
      return user.displayName;
    }
    
    // Prioridad 2: Datos de Realtime Database
    if (userData) {
      if (userData.first_name && userData.last_name) {
        const fullName = `${userData.first_name} ${userData.last_name}`;
        console.log('Usando nombre completo de Database:', fullName);
        return fullName;
      }
      if (userData.first_name) {
        console.log('Usando first_name de Database:', userData.first_name);
        return userData.first_name;
      }
    }
    
    // Prioridad 3: Email sin dominio
    if (user.email) {
      const emailParts = user.email.split('@');
      const username = emailParts[0];
      const nameFromEmail = username.charAt(0).toUpperCase() + username.slice(1);
      console.log('Usando nombre del email:', nameFromEmail);
      return nameFromEmail;
    }
    
    console.log('Usando nombre por defecto: Usuario');
    return 'Usuario';
  };

  // Función para obtener el nombre completo (si está disponible)
  const getFullName = () => {
    if (userData) {
      if (userData.first_name && userData.last_name) {
        return `${userData.first_name} ${userData.last_name}`;
      }
    }
    return getDisplayName();
  };

  // Función para obtener el primer nombre
  const getFirstName = () => {
    // Prioridad 1: first_name de Realtime Database
    if (userData?.first_name) {
      console.log('Usando first_name de Database:', userData.first_name);
      return userData.first_name;
    }
    
    // Prioridad 2: Primer nombre del displayName de Firebase Auth
    if (user?.displayName) {
      const firstName = user.displayName.split(' ')[0];
      console.log('Usando primer nombre de displayName:', firstName);
      return firstName;
    }
    
    // Prioridad 3: Del displayName general
    const displayName = getDisplayName();
    const firstName = displayName.split(' ')[0] || displayName;
    console.log('Usando primer nombre de displayName general:', firstName);
    return firstName;
  };

  return {
    user,
    userData,
    loading,
    getDisplayName,
    getFullName,
    getFirstName,
    email: user?.email || null,
    photoURL: user?.photoURL || userData?.photoURL || null,
    isAuthenticated: !!user,
  };
};