// src/screens/MainScreen.js - VERSIÓN CON CUSTOM TOAST
import {
  Box,
  Center,
  HStack,
  Icon,
  Text,
  VStack
} from '@gluestack-ui/themed';
import { Smartphone, User } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { useUserProfile } from '../../hooks/useUserProfile';
import CustomToast from '../components/CustomToast';

const MainScreen = () => {
  const { getDisplayName, user, userData, email, getFirstName } = useUserProfile();
  const [showToast, setShowToast] = useState(false);
  const [toastTitle, setToastTitle] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  
  // Usar useRef para evitar mostrar el toast múltiples veces
  const hasShownToast = useRef(false);

  // Mostrar toast cuando el usuario inicia sesión o crea cuenta
  useEffect(() => {
    if (user && !hasShownToast.current) {
      const firstName = getFirstName();
      const displayName = getDisplayName();
      const userName = firstName || displayName;
      
      // Configurar mensajes del toast
      setToastTitle('¡Login exitoso!');
      setToastMessage(`Bienvenido de nuevo, ${userName}!`);
      
      // Mostrar toast después de un pequeño delay
      const timer = setTimeout(() => {
        setShowToast(true);
        
        // Ocultar automáticamente después de 10 segundos
        setTimeout(() => {
          setShowToast(false);
        }, 10000);
        
        hasShownToast.current = true;
      }, 800);
      
      return () => clearTimeout(timer);
    }
    
    // Resetear cuando el usuario cierra sesión
    if (!user) {
      hasShownToast.current = false;
    }
  }, [user, getFirstName, getDisplayName]);

  return (
    <Box flex={1} bg="$backgroundLight0">
      <Center flex={1} pt="$16">
        <VStack space="xl" alignItems="center" p="$4" width="$full">
          
          {/* Logo/Icono de la app */}
          <Box 
            bg="$primary100" 
            p="$6" 
            borderRadius="$full"
            borderWidth={2}
            borderColor="$primary300"
          >
            <Icon as={Smartphone} size="xl" color="$primary600" />
          </Box>

          <Text size="3xl" fontWeight="bold" color="$textDark800" textAlign="center">
            Bienvenido
          </Text>
          
          <HStack alignItems="center" space="sm">
            <Icon as={User} size="md" color="$primary500" />
            <Text textAlign="center" color="$textDark600" size="lg">
              {getDisplayName()}
            </Text>
          </HStack>

          {/* Información adicional del usuario */}
          <VStack space="md" width="$full" mt="$8" alignItems="center" bg="$backgroundLight50" p="$4" borderRadius="$lg">
            <Text color="$textDark500" fontWeight="bold" size="lg">Información de la cuenta:</Text>
            <Text color="$textDark500">Email: {email || 'No disponible'}</Text>
            <Text color="$textDark500">
              Nombre completo: {userData?.first_name && userData?.last_name 
                ? `${userData.first_name} ${userData.last_name}` 
                : 'No disponible'}
            </Text>
            <Text color="$textDark500">
              Género: {userData?.gender || 'No especificado'}
            </Text>
            {user && (
              <>
                <Text color="$textDark500">
                  Usuario desde: {user.metadata?.creationTime 
                    ? new Date(user.metadata.creationTime).toLocaleDateString() 
                    : 'No disponible'}
                </Text>
                <Text color="$textDark500">
                  Email verificado: {user.emailVerified ? 'Sí' : 'No'}
                </Text>
              </>
            )}
          </VStack>

          {/* Características */}
          <VStack space="md" width="$full" mt="$8">
            <Text color="$textDark800" fontWeight="bold" size="xl" textAlign="center">
              ¡Explora la aplicación!
            </Text>
            <Text color="$textDark500" textAlign="center">
              Usa el menú lateral para navegar entre las diferentes secciones
            </Text>
          </VStack>
        </VStack>
      </Center>

      {/* Custom Toast */}
      <CustomToast 
        title={toastTitle}
        message={toastMessage}
        visible={showToast}
      />
    </Box>
  );
};

export default MainScreen;