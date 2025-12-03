// src/components/CustomToast.js
import { Box, HStack, Icon, Text, VStack } from '@gluestack-ui/themed';
import { CheckCircle } from 'lucide-react-native';

const CustomToast = ({ title, message, visible }) => {
  if (!visible) return null;

  return (
    <Box
      position="absolute"
      bottom="$10"
      left="$4"
      right="$4"
      zIndex={999}
    >
      <Box
        bg="$success600"
        borderRadius="$lg"
        p="$4"
        mx="$4"
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <HStack space="sm" alignItems="center">
          <Box 
            bg="$success100" 
            p="$2" 
            borderRadius="$full"
          >
            <Icon as={CheckCircle} size="lg" color="$white" />
          </Box>
          <VStack space="xs" flex={1}>
            <Text color="$white" fontSize="$md" fontWeight="bold">
              {title}
            </Text>
            <Text color="$success100" fontSize="$sm">
              {message}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default CustomToast;