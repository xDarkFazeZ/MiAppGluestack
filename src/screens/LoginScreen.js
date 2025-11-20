// src/screens/LoginScreen.js
import {
  Alert,
  AlertText,
  Box,
  Button,
  ButtonText,
  Center,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Icon,
  Input,
  InputField,
  ScrollView,
  Text,
  VStack
} from '@gluestack-ui/themed';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { Lock, Mail, Shield, UserPlus } from 'lucide-react-native';
import { useState } from 'react';
import { auth, database } from '../firebase/firebaseConfig';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error en login:', error);
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    if (!email || !password) {
      setError('Por favor, ingresa email y contraseña');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 1. Crear usuario en Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Extraer firstname del email (parte antes del @)
      const firstname = email.split('@')[0];
      
      // 3. Generar IP aleatoria
      const generateRandomIP = () => {
        return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
      };

      // 4. Generar ID único basado en timestamp
      const id = Date.now();

      // 5. Datos del usuario para Realtime Database
      const userData = {
        id: id,
        first_name: firstname.charAt(0).toUpperCase() + firstname.slice(1), // Capitalizar
        last_name: "Usuario", // Valor por defecto
        email: email,
        gender: "Not specified", // Valor por defecto
        ip_address: generateRandomIP()
      };

      // 6. Guardar en Realtime Database
      await set(ref(database, 'users/' + user.uid), userData);
      
      console.log('Usuario creado exitosamente en Authentication y Realtime Database');
      
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
      case 'auth/user-disabled':
        return 'Usuario deshabilitado';
      case 'auth/user-not-found':
        return 'Usuario no encontrado';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta';
      case 'auth/email-already-in-use':
        return 'Este email ya está registrado';
      case 'auth/weak-password':
        return 'La contraseña es muy débil';
      default:
        return 'Error al crear la cuenta: ' + errorCode;
    }
  };

  return (
    <ScrollView flex={1} bg="$backgroundLight0">
      <Center flex={1} p="$4" minHeight="100%">
        <VStack space="xl" width="$full" maxWidth={400} alignItems="center">
          
          {/* Header moderno */}
          <Box alignItems="center" mt="$16" mb="$8">
            <Box 
              bg="$primary600"
              p="$6" 
              borderRadius="lg"
              style={{
                shadowColor: "$primary600",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <Icon as={Shield} size="xl" color="$white" />
            </Box>
            
            <VStack alignItems="center" mt="$8" space="md">
              <Text fontSize="$3xl" fontWeight="$bold" color="$textDark900" textAlign="center">
                Bienvenido
              </Text>
              <Text fontSize="$md" color="$textDark600" textAlign="center" lineHeight="$md">
                Inicia sesión en tu cuenta
              </Text>
            </VStack>
          </Box>

          {/* Tarjeta del formulario */}
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
            <VStack space="xl">
              
              {/* Formulario mejorado */}
              <VStack space="xl">
                <FormControl>
                  <FormControlLabel mb="$3">
                    <FormControlLabelText fontSize="$md" fontWeight="$medium" color="$textDark700">
                      Correo electrónico
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input 
                    size="lg" 
                    variant="outline"
                    borderColor="$borderLight300"
                    borderRadius="$md"
                    bg="$backgroundLight50"
                    height="$12"
                  >
                    <Box width="$10" justifyContent="center" alignItems="center">
                      <Icon as={Mail} size="md" color="$primary500" />
                    </Box>
                    <InputField 
                      placeholder="tu@email.com"
                      value={email}
                      onChangeText={setEmail}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      fontSize="$md"
                      flex={1}
                    />
                  </Input>
                </FormControl>

                <FormControl>
                  <FormControlLabel mb="$3">
                    <FormControlLabelText fontSize="$md" fontWeight="$medium" color="$textDark700">
                      Contraseña
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input 
                    size="lg" 
                    variant="outline"
                    borderColor="$borderLight300"
                    borderRadius="$md"
                    bg="$backgroundLight50"
                    height="$12"
                  >
                    <Box width="$10" justifyContent="center" alignItems="center">
                      <Icon as={Lock} size="md" color="$primary500" />
                    </Box>
                    <InputField 
                      placeholder="••••••••"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                      fontSize="$md"
                      flex={1}
                    />
                  </Input>
                </FormControl>

                {error ? (
                  <Alert action="error" variant="solid" borderRadius="$md">
                    <AlertText fontSize="$sm" fontWeight="$medium">
                      {error}
                    </AlertText>
                  </Alert>
                ) : null}

                {/* Botones de acción */}
                <VStack space="md" mt="$4">
                  <Button 
                    onPress={handleLogin} 
                    disabled={loading} 
                    size="lg"
                    action="primary"
                    borderRadius="$md"
                    height="$12"
                    style={{
                      backgroundColor: '$primary600',
                    }}
                  >
                    <ButtonText fontWeight="$bold" fontSize="$md">
                      {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </ButtonText>
                  </Button>
                  
                  <Button 
                    onPress={handleCreateAccount} 
                    disabled={loading} 
                    variant="outline" 
                    size="lg"
                    borderColor="$primary500"
                    borderRadius="$md"
                    height="$12"
                  >
                    <Icon as={UserPlus} size="md" mr="$3" color="$primary600" />
                    <ButtonText fontWeight="$semibold" color="$primary600" fontSize="$md">
                      {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                    </ButtonText>
                  </Button>
                </VStack>
              </VStack>
            </VStack>
          </Box>

          {/* Información adicional */}
          <VStack space="lg" alignItems="center" mt="$8" width="$full">
            
            {/* Términos y condiciones */}
            <Text color="$textDark500" fontSize="$sm" textAlign="center" lineHeight="$sm">
              Al crear una cuenta aceptas nuestros{' '}
              <Text color="$primary600" fontWeight="$medium" fontSize="$sm">
                Términos y Condiciones
              </Text>
            </Text>

            {/* Información de seguridad */}
            <Box 
              bg="$backgroundLight100" 
              p="$4" 
              borderRadius="$lg" 
              width="$full"
              borderWidth={1}
              borderColor="$borderLight200"
            >
              <HStack alignItems="center" space="sm" justifyContent="center">
                <Icon as={Shield} size="sm" color="$success500" />
                <Text color="$textDark600" fontSize="$sm" textAlign="center" flex={1}>
                  Tus datos están protegidos con encriptación avanzada
                </Text>
              </HStack>
            </Box>

            {/* Información adicional de ayuda */}
            <Box 
              bg="$primary50" 
              p="$4" 
              borderRadius="$lg" 
              width="$full"
              borderWidth={1}
              borderColor="$primary100"
            >
              <VStack space="xs" alignItems="center">
                <Text color="$primary700" fontWeight="$bold" fontSize="$sm" textAlign="center">
                  ¿Primera vez aquí?
                </Text>
                <Text color="$primary600" fontSize="$xs" textAlign="center">
                  Crea una cuenta gratuita para comenzar
                </Text>
              </VStack>
            </Box>

          </VStack>

        </VStack>
      </Center>
    </ScrollView>
  );
};

export default LoginScreen;