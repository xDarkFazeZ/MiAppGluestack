import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
    Box,
    Divider,
    HStack,
    Icon,
    Image,
    Modal,
    ModalBackdrop,
    ModalBody,
    ModalContent,
    Pressable,
    ScrollView,
    Text,
    VStack
} from '@gluestack-ui/themed';
import * as ImagePicker from 'expo-image-picker';
import {
    Camera,
    Grid3X3,
    Heart,
    MapPin,
} from 'lucide-react-native';
import { useState } from 'react';

const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [activeTab, setActiveTab] = useState('gallery');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Se necesitan permisos para acceder a la galería');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const openImageModal = (imageUri) => {
    setSelectedImage(imageUri);
    setShowModal(true);
  };

  const closeImageModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  // Datos de ejemplo para la galería
  const galleryImages = [
    'https://images.unsplash.com/photo-1579546929662-711aa81148cf',
    'https://images.unsplash.com/photo-1606787366850-de6330128bfc',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    'https://images.unsplash.com/photo-1551650975-87deedd944c3',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713',
    'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
  ];

  const StatsItem = ({ number, label }) => (
    <VStack alignItems="center" space="$1">
      <Text fontWeight="bold" size="lg" color="$textDark800">
        {number}
      </Text>
      <Text size="sm" color="$textDark500">
        {label}
      </Text>
    </VStack>
  );

  return (
    <>
      <ScrollView 
        flex={1}
        bg="$backgroundLight0"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Header con imagen de portada - HACE SCROLL DESDE ARRIBA */}
        <Box position="relative" h={200}>
          <Image
            w="$full"
            h="$full"
            alt="Portada"
            source={{
              uri: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf',
            }}
          />
          <Box 
            position="absolute" 
            bottom={-60} 
            left={0} 
            right={0} 
            alignItems="center"
          >
            {/* Avatar con botón de cámara */}
            <Pressable onPress={pickImage} position="relative">
              <Avatar size="2xl" borderWidth={4} borderColor="$white">
                <AvatarFallbackText>Juan Iram Gámez</AvatarFallbackText>
                <AvatarImage
                  alt="Avatar del usuario"
                  source={{ 
                    uri: profileImage || 'https://i.pravatar.cc/300?img=12' 
                  }}
                />
              </Avatar>
              <Box
                position="absolute"
                bottom={0}
                right={0}
                bg="$primary600"
                p="$2"
                borderRadius="$full"
                borderWidth={2}
                borderColor="$white"
              >
                <Icon as={Camera} size="sm" color="$white" />
              </Box>
            </Pressable>
          </Box>
        </Box>

        {/* Contenido principal - TODO HACE SCROLL JUNTO */}
        <Box flex={1} mt={60} p="$4" pb="$8">
          
          {/* Información del usuario */}
          <VStack space="md" alignItems="center" mb="$6">
            <Text fontWeight="bold" size="2xl" color="$textDark800">
              Juan Iram Gámez
            </Text>
            <Text color="$textDark500" textAlign="center">
              Desarrollador Móvil | React Native
            </Text>
            <HStack space="sm" alignItems="center">
              <Icon as={MapPin} size="sm" color="$textDark500" />
              <Text color="$textDark500">Guadalajara, México</Text>
            </HStack>
          </VStack>

          {/* Estadísticas */}
          <HStack justifyContent="space-around" mb="$6" py="$3" bg="$backgroundLight50" borderRadius="$lg">
            <StatsItem number="44" label="Following" />
            <StatsItem number="4" label="Followers" />
            <StatsItem number="0" label="Likes" />
          </HStack>

          <Divider mb="$4" />

          {/* Tabs */}
          <HStack space="md" mb="$4">
            <Pressable 
              flex={1} 
              onPress={() => setActiveTab('gallery')}
              borderBottomWidth={2}
              borderBottomColor={activeTab === 'gallery' ? '$primary600' : 'transparent'}
              pb="$2"
              alignItems="center"
            >
              <HStack space="sm" alignItems="center">
                <Icon as={Grid3X3} size="sm" color={activeTab === 'gallery' ? '$primary600' : '$textDark500'} />
                <Text 
                  fontWeight={activeTab === 'gallery' ? 'bold' : 'normal'} 
                  color={activeTab === 'gallery' ? '$primary600' : '$textDark500'}
                >
                  Gallery
                </Text>
              </HStack>
            </Pressable>

            <Pressable 
              flex={1} 
              onPress={() => setActiveTab('likes')}
              borderBottomWidth={2}
              borderBottomColor={activeTab === 'likes' ? '$primary600' : 'transparent'}
              pb="$2"
              alignItems="center"
            >
              <HStack space="sm" alignItems="center">
                <Icon as={Heart} size="sm" color={activeTab === 'likes' ? '$primary600' : '$textDark500'} />
                <Text 
                  fontWeight={activeTab === 'likes' ? 'bold' : 'normal'} 
                  color={activeTab === 'likes' ? '$primary600' : '$textDark500'}
                >
                  Likes
                </Text>
              </HStack>
            </Pressable>
          </HStack>

          {/* Galería de imágenes */}
          {activeTab === 'gallery' && (
            <Box>
              <Text fontWeight="bold" size="lg" mb="$3" color="$textDark800">
                My Gallery
              </Text>
              <Box flexDirection="row" flexWrap="wrap" justifyContent="space-between">
                {galleryImages.map((image, index) => (
                  <Pressable 
                    key={index} 
                    width="32%"
                    height={100}
                    mb="$2"
                    onPress={() => openImageModal(image)}
                  >
                    <Image
                      source={{ uri: image }}
                      alt={`Gallery image ${index + 1}`}
                      width="$full"
                      height="$full"
                      borderRadius="$lg"
                    />
                  </Pressable>
                ))}
              </Box>
            </Box>
          )}

          {/* Pestaña de Likes */}
          {activeTab === 'likes' && (
            <Box alignItems="center" justifyContent="center" py="$20">
              <Icon as={Heart} size="xl" color="$primary300" mb="$4" />
              <Text color="$textDark500" textAlign="center">
                No likes yet{'\n'}
                <Text size="sm">Posts you like will appear here</Text>
              </Text>
            </Box>
          )}

        </Box>
      </ScrollView>

      {/* Modal mejorado para imágenes */}
      <Modal
        isOpen={showModal}
        onClose={closeImageModal}
        size="full"
      >
        <ModalBackdrop />
        <ModalContent 
          bg="transparent" 
          shadow="none" 
          margin={0}
          justifyContent="center"
          alignItems="center"
        >
          <ModalBody p="$0" margin={0}>
            <Pressable 
              onPress={closeImageModal} 
              flex={1} 
              width="$full"
              justifyContent="center"
              alignItems="center"
            >
              {selectedImage && (
                <Image
                  source={{ uri: selectedImage }}
                  alt="Imagen ampliada"
                  width={350}
                  height={350}
                  borderRadius="$lg"
                  resizeMode="cover"
                />
              )}
            </Pressable>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileScreen;