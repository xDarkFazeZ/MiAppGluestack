import {
    Box,
    Button,
    ButtonText,
    HStack,
    Icon,
    InfoIcon,
    ScrollView,
    Text,
    VStack
} from '@gluestack-ui/themed';
import { useState } from 'react';
import CustomCard from '../components/CustomCard';

const CustomComponentScreen = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshCards = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <ScrollView flex={1} bg="$backgroundLight0" p="$4">
      <VStack space="xl" key={refreshKey}>
        <Box alignItems="center" mb="$2">
          <Text size="2xl" fontWeight="bold" textAlign="center" color="$textDark800">
            🎴 Tarjetas Interactivas
          </Text>
          <Text textAlign="center" color="$textDark600" mt="$2" px="$4">
            Presiona cualquier tarjeta para descubrir curiosidades sobre React Native y Gluestack UI
          </Text>
        </Box>

        <VStack space="md">
          <Box bg="$primary50" p="$4" borderRadius="$lg" borderLeftWidth={4} borderLeftColor="$primary500">
            <HStack alignItems="center" space="sm">
              <Icon as={InfoIcon} size="lg" color="$primary600" />
              <VStack flex={1}>
                <Text color="$primary700" size="md" fontWeight="bold">
                  Cómo usar:
                </Text>
                <Text color="$primary600" size="sm">
                  1. Toca una tarjeta para ver una curiosidad{'\n'}
                  2. Toca de nuevo para volver{'\n'}
                  3. Cada toque muestra una curiosidad diferente
                </Text>
              </VStack>
            </HStack>
          </Box>

          {/* Tarjetas interactivas */}
          <Text color="$textDark700" fontWeight="bold" size="lg" mt="$4">
            Descubre Curiosidades:
          </Text>
          
          <CustomCard />
          <CustomCard />
          <CustomCard />
          <CustomCard />
          
          <Button onPress={refreshCards} variant="outline" mt="$4">
            <ButtonText>🔄 Mostrar Nuevas Curiosidades</ButtonText>
          </Button>

          <Box bg="$success50" p="$4" borderRadius="$lg" mt="$2">
            <Text color="$success800" size="sm" textAlign="center" fontWeight="medium">
              ✅ ¡Has aprendido algo nuevo sobre desarrollo móvil!
            </Text>
          </Box>
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default CustomComponentScreen;