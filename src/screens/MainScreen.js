// src/screens/MainScreen.js
import {
  Box,
  Center,
  HStack,
  Icon,
  Text,
  VStack
} from '@gluestack-ui/themed';
import { Smartphone, User } from 'lucide-react-native';
import { auth } from '../firebase/firebaseConfig';

const MainScreen = () => {
  const user = auth.currentUser;

  // Función para obtener un nombre amigable del email
  const getUserDisplayName = () => {
    if (!user) return 'Usuario';
    
    // Si el usuario tiene displayName, usarlo
    if (user.displayName) {
      return user.displayName;
    }
    
    // Si no tiene displayName, usar el email sin el dominio
    if (user.email) {
      const emailParts = user.email.split('@');
      const username = emailParts[0];
      // Capitalizar la primera letra
      return username.charAt(0).toUpperCase() + username.slice(1);
    }
    
    return 'Usuario';
  };

  return (
    <Center flex={1} bg="$backgroundLight0" pt="$16">
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
            {getUserDisplayName()}
          </Text>
        </HStack>

        {/* Información adicional del usuario */}
        <VStack space="md" width="$full" mt="$8" alignItems="center" bg="$backgroundLight50" p="$4" borderRadius="$lg">
          <Text color="$textDark500" fontWeight="bold" size="lg">Información de la cuenta:</Text>
          <Text color="$textDark500">Email: {user?.email || 'No disponible'}</Text>
          <Text color="$textDark500">Usuario desde: {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'No disponible'}</Text>
          <Text color="$textDark500">Email verificado: {user?.emailVerified ? 'Sí' : 'No'}</Text>
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
  );
};

export default MainScreen;