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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Chrome, Lock, Mail, Shield, UserPlus } from 'lucide-react-native';
import { useState } from 'react';
import { useGoogleAuthSimple } from '../../hooks/useGoogleAuthSimple';
import { auth } from '../firebase/firebaseConfig';

  const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Usar el hook de Google Auth
    const {
      signInWithGoogle,
      loading: googleLoading,
      error: googleError
    } = useGoogleAuthSimple(navigation);

    // Combinar errores
    const displayError = error || googleError;

    const handleLogin = async () => {
      if (!email || !password) {
        setError('Por favor, completa todos los campos');
        return;
      }

      setLoading(true);
      setError('');

      try {
        await signInWithEmailAndPassword(auth, email, password);
        // El listener en App.js se encargará de redirigir al MainScreen
      } catch (error) {
        console.error('Error en login:', error);
        setError(getErrorMessage(error.code));
      } finally {
        setLoading(false);
      }
    };

    const navigateToCreateAccount = () => {
      navigation.navigate('Register');
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
        case 'auth/network-request-failed':
          return 'Error de conexión. Verifica tu internet';
        case 'auth/too-many-requests':
          return 'Demasiados intentos. Intenta más tarde';
        default:
          return 'Error: ' + errorCode;
      }
    };

    // Estado de carga combinado
    const isLoading = loading || googleLoading;

    return (
      <ScrollView flex={1} bg="$backgroundLight0" contentContainerStyle={{ flexGrow: 1 }}>
        <Center flex={1} p="$4" minHeight="100%">
          <VStack space="xl" width="$full" maxWidth={400} alignItems="center">

            {/* Header */}
            <Box alignItems="center" mt="$12" mb="$6">
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

              <VStack alignItems="center" mt="$6" space="md">
                <Text fontSize="$2xl" fontWeight="$bold" color="$textDark900" textAlign="center">
                  Bienvenido
                </Text>
                <Text fontSize="$sm" color="$textDark600" textAlign="center" lineHeight="$md">
                  Inicia sesión en tu cuenta
                </Text>
              </VStack>
            </Box>

            {/* Tarjeta del formulario */}
            <Box
              width="$full"
              bg="$white"
              p="$5"
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

                {/* Botón de Google */}
                <Button
                  onPress={signInWithGoogle}
                  disabled={isLoading}
                  variant="outline"
                  size="lg"
                  borderColor="$borderLight300"
                  borderRadius="$md"
                  height="$12"
                >
                  <Icon as={Chrome} size="md" mr="$2" color="$red500" />
                  <ButtonText fontWeight="$semibold" color="$textDark700" fontSize="$md">
                    {googleLoading ? 'Conectando con Google...' : 'Continuar con Google'}
                  </ButtonText>
                </Button>

                {/* Línea divisoria con texto */}
                <Box
                  width="$full"
                  alignItems="center"
                  my="$2"
                >
                  <Box
                    width="$full"
                    height="$px"
                    bg="$borderLight300"
                    position="absolute"
                    top="50%"
                  />
                  <Box bg="$white" px="$2">
                    <Text color="$textDark400" fontSize="$xs">
                      o ingresa con email
                    </Text>
                  </Box>
                </Box>

                {/* Formulario de email/contraseña */}
                <VStack space="lg">
                  <FormControl>
                    <FormControlLabel mb="$2">
                      <FormControlLabelText fontSize="$sm" fontWeight="$medium" color="$textDark700">
                        Correo electrónico
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input
                      size="md"
                      variant="outline"
                      borderColor="$borderLight300"
                      borderRadius="$md"
                      bg="$backgroundLight50"
                      height="$11"
                    >
                      <Box width="$8" justifyContent="center" alignItems="center">
                        <Icon as={Mail} size="sm" color="$primary500" />
                      </Box>
                      <InputField
                        placeholder="tu@email.com"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        fontSize="$sm"
                        flex={1}
                      />
                    </Input>
                  </FormControl>

                  <FormControl>
                    <FormControlLabel mb="$2">
                      <FormControlLabelText fontSize="$sm" fontWeight="$medium" color="$textDark700">
                        Contraseña
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input
                      size="md"
                      variant="outline"
                      borderColor="$borderLight300"
                      borderRadius="$md"
                      bg="$backgroundLight50"
                      height="$11"
                    >
                      <Box width="$8" justifyContent="center" alignItems="center">
                        <Icon as={Lock} size="sm" color="$primary500" />
                      </Box>
                      <InputField
                        placeholder="••••••••"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        fontSize="$sm"
                        flex={1}
                      />
                    </Input>
                  </FormControl>

                  {displayError ? (
                    <Alert action="error" variant="solid" borderRadius="$md" mt="$2">
                      <AlertText fontSize="$xs" fontWeight="$medium">
                        {displayError}
                      </AlertText>
                    </Alert>
                  ) : null}

                  {/* Botones de acción */}
                  <VStack space="sm" mt="$3">
                    <Button
                      onPress={handleLogin}
                      disabled={isLoading}
                      size="md"
                      action="primary"
                      borderRadius="$md"
                      height="$11"
                    >
                      <ButtonText fontWeight="$bold" fontSize="$sm">
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                      </ButtonText>
                    </Button>

                    <Button
                      onPress={navigateToCreateAccount}
                      disabled={isLoading}
                      variant="outline"
                      size="md"
                      borderColor="$primary500"
                      borderRadius="$md"
                      height="$11"
                    >
                      <Icon as={UserPlus} size="sm" mr="$2" color="$primary600" />
                      <ButtonText fontWeight="$semibold" color="$primary600" fontSize="$sm">
                        Crear Cuenta Nueva
                      </ButtonText>
                    </Button>
                  </VStack>
                </VStack>
              </VStack>
            </Box>

            {/* Información adicional */}
            <VStack space="md" alignItems="center" mt="$4" width="$full">
              <Text color="$textDark500" fontSize="$xs" textAlign="center" lineHeight="$sm">
                Al crear una cuenta aceptas nuestros{' '}
                <Text color="$primary600" fontWeight="$medium" fontSize="$xs">
                  Términos y Condiciones
                </Text>
              </Text>

              <Box
                bg="$backgroundLight100"
                p="$3"
                borderRadius="$lg"
                width="$full"
                borderWidth={1}
                borderColor="$borderLight200"
              >
                <HStack alignItems="center" space="sm" justifyContent="center">
                  <Icon as={Shield} size="xs" color="$success500" />
                  <Text color="$textDark600" fontSize="$xs" textAlign="center" flex={1}>
                    Tus datos están protegidos con encriptación
                  </Text>
                </HStack>
              </Box>

              {/* Footer moderno - ¿Ya tienes cuenta? */}
              <Box
                mt="$4"
                p="$4"
                bg="$primary50"
                borderRadius="$lg"
                width="$full"
                borderWidth={1}
                borderColor="$primary100"
              >
                <HStack alignItems="center" justifyContent="center" space="sm">
                  <Text color="$primary700" fontSize="$sm" fontWeight="medium">
                    ¿No tienes cuenta?
                  </Text>
                  <Button
                    variant="link"
                    onPress={() => navigation.navigate('Register')}
                    p="$1"
                  >
                    <ButtonText
                      color="$primary600"
                      fontSize="$sm"
                      fontWeight="bold"
                      textDecorationLine="underline"
                    >
                      Regístrate aquí
                    </ButtonText>
                  </Button>
                </HStack>
              </Box>
            </VStack>
          </VStack>
        </Center>
      </ScrollView>
    );
  };

  export default LoginScreen;