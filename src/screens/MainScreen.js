import {
  Box,
  Center,
  Icon,
  Text,
  VStack
} from '@gluestack-ui/themed';
import { Smartphone } from 'lucide-react-native';

const MainScreen = () => {
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
        
        <Text textAlign="center" color="$textDark600" size="lg">
          Juan Iram Gámez
        </Text>

        {/* Características */}
        <VStack space="md" width="$full" mt="$8">
        </VStack>
      </VStack>
    </Center>
  );
};

export default MainScreen;