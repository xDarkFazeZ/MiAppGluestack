// src/screens/RegisterScreen.js - VERSIÓN CORREGIDA
import {
  Alert,
  AlertText,
  Box,
  Button,
  ButtonText,
  Center,
  CloseIcon,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  HStack,
  Icon,
  Input,
  InputField,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollView,
  Text,
  VStack
} from '@gluestack-ui/themed';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { ArrowLeft, Calendar, CheckCircle, Lock, Mail, MapPin, Phone, Shield, User } from 'lucide-react-native';
import { useState } from 'react';
import { auth, database } from '../firebase/firebaseConfig';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthDate: '',
    address: '',
    gender: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [welcomeName, setWelcomeName] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegister = async () => {
    // Validaciones
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      setError('Por favor, completa los campos requeridos (*)');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 1. Crear usuario en Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // 2. Actualizar displayName en Auth
      await updateProfile(user, {
        displayName: `${formData.firstName} ${formData.lastName}`
      });

      // 3. Generar IP aleatoria
      const generateRandomIP = () => {
        return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
      };

      // 4. Datos del usuario para Realtime Database
      const userData = {
        id: Date.now(),
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone || "No especificado",
        birth_date: formData.birthDate || "No especificado",
        address: formData.address || "No especificado",
        gender: formData.gender || "Not specified",
        ip_address: generateRandomIP(),
        created_at: new Date().toISOString()
      };

      // 5. Guardar en Realtime Database
      await set(ref(database, 'users/' + user.uid), userData);

      console.log('Usuario creado exitosamente');

      // 6. Mostrar modal de bienvenida
      setWelcomeName(`${formData.firstName} ${formData.lastName}`);
      setShowWelcomeModal(true);

    } catch (error) {
      console.error('Error creando cuenta:', error);
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Email inválido';
      case 'auth/email-already-in-use':
        return 'Este email ya está registrado';
      case 'auth/weak-password':
        return 'La contraseña es muy débil';
      case 'auth/operation-not-allowed':
        return 'Operación no permitida';
      default:
        return 'Error al crear la cuenta. Por favor intenta de nuevo.';
    }
  };

  return (
    <ScrollView flex={1} bg="$backgroundLight0">
      <Center flex={1} p="$4" minHeight="100%">
        <VStack space="lg" width="$full" maxWidth={400}>

          {/* Header con botón de regreso */}
          <HStack alignItems="center" mb="$6" mt="$12">
            <Button
              variant="link"
              onPress={() => navigation.goBack()}
              p="$2"
            >
              <Icon as={ArrowLeft} size="lg" color="$primary600" />
            </Button>
            <Text fontSize="$2xl" fontWeight="$bold" color="$textDark900" ml="$2">
              Crear Cuenta
            </Text>
          </HStack>

          {/* Formulario */}
          <Box
            width="$full"
            bg="$white"
            p="$6"
            borderRadius="lg"
            style={{
              shadowColor: "$borderLight400",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 4,
            }}
            borderWidth={1}
            borderColor="$borderLight200"
          >
            <VStack space="lg">
              {/* Información Personal */}
              <Text fontSize="$lg" fontWeight="$bold" color="$primary600">
                Información Personal
              </Text>

              <HStack space="md">
                <FormControl flex={1}>
                  <FormControlLabel>
                    <FormControlLabelText fontSize="$sm" color="$textDark600">
                      Nombre *
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input variant="outline" size="md">
                    <Box width="$8" justifyContent="center" alignItems="center">
                      <Icon as={User} size="sm" color="$primary500" />
                    </Box>
                    <InputField
                      placeholder="Juan"
                      value={formData.firstName}
                      onChangeText={(text) => handleInputChange('firstName', text)}
                    />
                  </Input>
                </FormControl>

                <FormControl flex={1}>
                  <FormControlLabel>
                    <FormControlLabelText fontSize="$sm" color="$textDark600">
                      Apellido *
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input variant="outline" size="md">
                    <Box width="$8" justifyContent="center" alignItems="center">
                      <Icon as={User} size="sm" color="$primary500" />
                    </Box>
                    <InputField
                      placeholder="Pérez"
                      value={formData.lastName}
                      onChangeText={(text) => handleInputChange('lastName', text)}
                    />
                  </Input>
                </FormControl>
              </HStack>

              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText fontSize="$sm" color="$textDark600">
                    Género
                  </FormControlLabelText>
                </FormControlLabel>
                <Input variant="outline" size="md">
                  <Box width="$8" justifyContent="center" alignItems="center">
                    <Icon as={User} size="sm" color="$primary500" />
                  </Box>
                  <InputField
                    placeholder="Masculino/Femenino/Otro"
                    value={formData.gender}
                    onChangeText={(text) => handleInputChange('gender', text)}
                  />
                </Input>
              </FormControl>

              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText fontSize="$sm" color="$textDark600">
                    Fecha de Nacimiento
                  </FormControlLabelText>
                </FormControlLabel>
                <Input variant="outline" size="md">
                  <Box width="$8" justifyContent="center" alignItems="center">
                    <Icon as={Calendar} size="sm" color="$primary500" />
                  </Box>
                  <InputField
                    placeholder="DD/MM/AAAA"
                    value={formData.birthDate}
                    onChangeText={(text) => handleInputChange('birthDate', text)}
                  />
                </Input>
              </FormControl>

              {/* Contacto */}
              <Text fontSize="$lg" fontWeight="$bold" color="$primary600" mt="$2">
                Información de Contacto
              </Text>

              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText fontSize="$sm" color="$textDark600">
                    Email *
                  </FormControlLabelText>
                </FormControlLabel>
                <Input variant="outline" size="md">
                  <Box width="$8" justifyContent="center" alignItems="center">
                    <Icon as={Mail} size="sm" color="$primary500" />
                  </Box>
                  <InputField
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </Input>
              </FormControl>

              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText fontSize="$sm" color="$textDark600">
                    Teléfono
                  </FormControlLabelText>
                </FormControlLabel>
                <Input variant="outline" size="md">
                  <Box width="$8" justifyContent="center" alignItems="center">
                    <Icon as={Phone} size="sm" color="$primary500" />
                  </Box>
                  <InputField
                    placeholder="+52 123 456 7890"
                    value={formData.phone}
                    onChangeText={(text) => handleInputChange('phone', text)}
                    keyboardType="phone-pad"
                  />
                </Input>
              </FormControl>

              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText fontSize="$sm" color="$textDark600">
                    Dirección
                  </FormControlLabelText>
                </FormControlLabel>
                <Input variant="outline" size="md">
                  <Box width="$8" justifyContent="center" alignItems="center">
                    <Icon as={MapPin} size="sm" color="$primary500" />
                  </Box>
                  <InputField
                    placeholder="Calle, Ciudad, Estado"
                    value={formData.address}
                    onChangeText={(text) => handleInputChange('address', text)}
                  />
                </Input>
              </FormControl>

              {/* Seguridad */}
              <Text fontSize="$lg" fontWeight="$bold" color="$primary600" mt="$2">
                Seguridad
              </Text>

              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText fontSize="$sm" color="$textDark600">
                    Contraseña *
                  </FormControlLabelText>
                </FormControlLabel>
                <Input variant="outline" size="md">
                  <Box width="$8" justifyContent="center" alignItems="center">
                    <Icon as={Lock} size="sm" color="$primary500" />
                  </Box>
                  <InputField
                    placeholder="Mínimo 6 caracteres"
                    value={formData.password}
                    onChangeText={(text) => handleInputChange('password', text)}
                    secureTextEntry
                  />
                </Input>
              </FormControl>

              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText fontSize="$sm" color="$textDark600">
                    Confirmar Contraseña *
                  </FormControlLabelText>
                </FormControlLabel>
                <Input variant="outline" size="md">
                  <Box width="$8" justifyContent="center" alignItems="center">
                    <Icon as={Shield} size="sm" color="$primary500" />
                  </Box>
                  <InputField
                    placeholder="Repite tu contraseña"
                    value={formData.confirmPassword}
                    onChangeText={(text) => handleInputChange('confirmPassword', text)}
                    secureTextEntry
                  />
                </Input>
              </FormControl>

              {error ? (
                <Alert action="error" variant="solid" borderRadius="$md" mt="$2">
                  <AlertText fontSize="$sm" fontWeight="$medium">
                    {error}
                  </AlertText>
                </Alert>
              ) : null}

              <Button
                onPress={handleRegister}
                disabled={loading}
                size="lg"
                action="primary"
                borderRadius="$md"
                height="$12"
                mt="$4"
              >
                <ButtonText fontWeight="$bold" fontSize="$md">
                  {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                </ButtonText>
              </Button>
            </VStack>
          </Box>

          {/* Términos y condiciones */}
          <Box mt="$4" p="$4" bg="$backgroundLight50" borderRadius="$lg">
            <Text color="$textDark500" fontSize="$xs" textAlign="center" lineHeight="$sm">
              Al crear una cuenta, aceptas nuestros{' '}
              <Text color="$primary600" fontWeight="$medium">
                Términos de Servicio
              </Text>
              ,{' '}
              <Text color="$primary600" fontWeight="$medium">
                Política de Privacidad
              </Text>{' '}
              y{' '}
              <Text color="$primary600" fontWeight="$medium">
                Política de Cookies
              </Text>.
            </Text>
          </Box>

          {/* Ya tienes cuenta - DISEÑO MODERNO MEJORADO */}
          <Box
            mt="$8"
            p="$4"
            bg="$primary600"
            borderRadius="$lg"
            style={{
              shadowColor: "$primary600",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <HStack alignItems="center" justifyContent="space-between" space="md">
              <VStack flex={1}>
                <Text color="$white" fontWeight="bold" fontSize="$sm">
                  ¿Ya tienes una cuenta?
                </Text>
                <Text color="$primary100" fontSize="$xs" mt="$1">
                  Inicia sesión para acceder a tu perfil
                </Text>
              </VStack>

              <Button
                onPress={() => navigation.navigate('Login')}
                variant="solid"
                size="sm"
                bg="$white"
                borderRadius="$full"
                px="$4"
                style={{
                  shadowColor: "$black",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                <ButtonText color="$primary600" fontWeight="bold" fontSize="$sm">
                  Iniciar Sesión
                </ButtonText>
              </Button>
            </HStack>
          </Box>

        </VStack>
      </Center>

      {/* Modal de bienvenida - FUERA DEL ScrollView para que funcione correctamente */}
      <Modal
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
        size="lg"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">¡Cuenta creada exitosamente!</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <VStack space="lg" alignItems="center" py="$4">
              <Box
                bg="$success100"
                p="$4"
                borderRadius="$full"
                borderWidth={2}
                borderColor="$success300"
              >
                <Icon as={CheckCircle} size="xl" color="$success600" />
              </Box>

              <Text fontSize="$xl" fontWeight="bold" textAlign="center" color="$primary600">
                ¡Hola {formData.firstName}!
              </Text>

              <Text fontSize="$md" textAlign="center" color="$textDark500">
                Tu cuenta ha sido creada exitosamente
              </Text>

              <Text fontSize="$sm" textAlign="center" color="$textDark400">
                Serás redirigido automáticamente a la pantalla principal
              </Text>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="solid"
              action="primary"
              onPress={() => setShowWelcomeModal(false)}
              width="$full"
            >
              <ButtonText>Continuar</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ScrollView>
  );
};

export default RegisterScreen;