import {
    Box,
    HStack,
    Icon,
    Pressable,
    Text,
    VStack
} from '@gluestack-ui/themed';
import { InfoIcon, RotateCcwIcon, StarIcon } from 'lucide-react-native';
import { useState } from 'react';

// Array de curiosidades sobre React Native y Gluestack
const CURIOSITIES = [
  "React Native permite crear apps nativas usando JavaScript y React. ¡No necesitas Swift ni Kotlin!",
  "Gluestack UI es un sistema de diseño creado específicamente para React Native con más de 40 componentes.",
  "Expo simplifica el desarrollo en React Native, manejando la configuración nativa por ti.",
  "Las apps React Native comparten hasta el 90% de código entre iOS y Android.",
  "Gluestack UI incluye modo oscuro automático y está completamente personalizable.",
  "Hot Reload en React Native permite ver cambios en tiempo real sin recargar.",
  "Puedes usar componentes nativos junto con React Native para máximo rendimiento.",
  "Gluestack UI está construido sobre NativeBase con mejor rendimiento."
];

const CustomCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCuriosity, setCurrentCuriosity] = useState(0);

  const handlePress = () => {
    if (!isFlipped) {
      // Seleccionar una curiosidad aleatoria diferente cada vez
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * CURIOSITIES.length);
      } while (newIndex === currentCuriosity && CURIOSITIES.length > 1);
      
      setCurrentCuriosity(newIndex);
    }
    setIsFlipped(!isFlipped);
  };

  return (
    <Pressable onPress={handlePress}>
      {({ isPressed }) => (
        <Box
          w="$full"
          minHeight={140}
          bg={isFlipped ? "$primary600" : "$backgroundLight0"}
          p="$4"
          borderRadius="$xl"
          borderWidth={2}
          borderColor={isFlipped ? "$primary700" : "$primary300"}
          shadowColor="$backgroundDark900"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.2}
          shadowRadius={8}
          elevation={5}
          my="$2"
          style={{
            transform: [{ scale: isPressed ? 0.98 : 1 }]
          }}
        >
          {/* Cara frontal - solo visible cuando no está girada */}
          {!isFlipped ? (
            <VStack space="md" alignItems="center" justifyContent="center" flex={1}>
              <Icon as={InfoIcon} size="xl" color="$primary500" />
              <Text fontWeight="bold" size="lg" color="$primary600" textAlign="center">
                Presióname
              </Text>
              <Text color="$primary400" size="sm" textAlign="center">
                Toca para descubrir una curiosidad
              </Text>
              <Box bg="$primary100" px="$3" py="$1" borderRadius="$full" mt="$2">
                <Text color="$primary600" size="xs" fontWeight="bold">
                  👆 Tocar para girar
                </Text>
              </Box>
            </VStack>
          ) : (
            /* Cara trasera - solo visible cuando está girada */
            <VStack space="md" flex={1}>
              <HStack justifyContent="space-between" alignItems="flex-start">
                <Box bg="$primary500" px="$3" py="$1" borderRadius="$full">
                  <Text color="$white" size="xs" fontWeight="bold">
                    💡 Curiosidad
                  </Text>
                </Box>
                <HStack space="sm" alignItems="center">
                  <Icon as={StarIcon} size="sm" color="$warning300" />
                  <Text color="$white" size="xs">#{currentCuriosity + 1}</Text>
                </HStack>
              </HStack>
              
              <Box flex={1} justifyContent="center">
                <Text color="$white" size="md" textAlign="center" lineHeight="$lg">
                  {CURIOSITIES[currentCuriosity]}
                </Text>
              </Box>
              
              <HStack justifyContent="space-between" alignItems="center" mt="$2">
                <HStack space="sm">
                  <Box bg="$primary500" px="$2" py="$1" borderRadius="$full">
                    <Text color="$white" size="xs">
                      React Native
                    </Text>
                  </Box>
                  <Box bg="$primary500" px="$2" py="$1" borderRadius="$full">
                    <Text color="$white" size="xs">
                      Gluestack
                    </Text>
                  </Box>
                </HStack>
                
                <HStack alignItems="center" space="xs">
                  <Icon as={RotateCcwIcon} size="sm" color="$primary200" />
                  <Text color="$primary200" size="xs">
                    Tocar para volver
                  </Text>
                </HStack>
              </HStack>
            </VStack>
          )}
        </Box>
      )}
    </Pressable>
  );
};

export default CustomCard;