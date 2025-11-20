// src/navigation/AppNavigator.js
import { Box, HStack, Icon, Pressable, Text, VStack } from '@gluestack-ui/themed';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { signOut } from 'firebase/auth';
import { Home, LogOut, Menu, Settings, ShoppingBag, Star, User } from 'lucide-react-native';
import { auth } from '../firebase/firebaseConfig';

// Importar pantallas
import CustomComponentScreen from '../screens/CustomComponentScreen';
import DisplayScreen from '../screens/DisplayScreen';
import FormsScreen from '../screens/FormsScreen';
import MainScreen from '../screens/MainScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Drawer = createDrawerNavigator();

// Custom Header Component con ícono de menú
const CustomHeader = ({ title, navigation }) => {
  const user = auth.currentUser;
  
  // Función para obtener nombre del usuario
  const getUserDisplayName = () => {
    if (!user) return 'Usuario';
    if (user.displayName) return user.displayName;
    if (user.email) {
      const emailParts = user.email.split('@');
      const username = emailParts[0];
      return username.charAt(0).toUpperCase() + username.slice(1);
    }
    return 'Usuario';
  };

  return (
    <Box
      bg="$primary600"
      pt="$12"
      pb="$3"
      px="$3"
      alignItems="center"
      justifyContent="center"
      flexDirection="row"
    >
      {/* Ícono del menú a la izquierda */}
      <Pressable 
        onPress={() => navigation.openDrawer()}
        position="absolute"
        left="$3"
        top="$12"
        p="$2"
      >
        <Icon as={Menu} size="xl" color="$white" />
      </Pressable>
      
      <Text color="$white" fontWeight="bold" size="lg">
        {title} - {getUserDisplayName()}
      </Text>
    </Box>
  );
};

// Custom Drawer Content
const CustomDrawerContent = (props) => {
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Función para obtener nombre amigable
  const getUserDisplayName = () => {
    if (!user) return 'Usuario';
    if (user.displayName) return user.displayName;
    if (user.email) {
      const emailParts = user.email.split('@');
      const username = emailParts[0];
      return username.charAt(0).toUpperCase() + username.slice(1);
    }
    return 'Usuario';
  };

  const menuItems = [
    { label: 'Inicio', icon: Home, screen: 'Inicio' },
    { label: 'Display', icon: ShoppingBag, screen: 'Display' },
    { label: 'Perfil', icon: User, screen: 'Perfil' },
    { label: 'Formularios', icon: Settings, screen: 'Formularios' },
    { label: 'Curiosidades', icon: Star, screen: 'Curiosidades' },
  ];

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <VStack space="md" py="$4" flex={1}>
        {/* Drawer Header */}
        <Box px="$4" pb="$4" borderBottomWidth={1} borderBottomColor="$borderLight300">
          <Text fontWeight="bold" size="xl" color="$textDark800">
            Mi App Gluestack
          </Text>
          <Text color="$textDark500">
            {getUserDisplayName()}
          </Text>
          <Text color="$textDark400" size="sm">
            {user?.email}
          </Text>
        </Box>

        {/* Menu Items */}
        <VStack space="sm" flex={1}>
          {menuItems.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => props.navigation.navigate(item.screen)}
              bg={props.state.index === index ? "$primary100" : "transparent"}
              mx="$2"
              borderRadius="$md"
            >
              <HStack 
                space="md" 
                alignItems="center" 
                p="$3"
              >
                <Icon 
                  as={item.icon} 
                  size="lg" 
                  color={props.state.index === index ? "$primary600" : "$textDark600"} 
                />
                <Text 
                  color={props.state.index === index ? "$primary600" : "$textDark600"}
                  fontWeight={props.state.index === index ? "bold" : "normal"}
                >
                  {item.label}
                </Text>
              </HStack>
            </Pressable>
          ))}
        </VStack>

        {/* Botón de logout en el drawer */}
        <Pressable
          onPress={handleLogout}
          mx="$2"
          borderRadius="$md"
          bg="$red100"
          mt="$4"
        >
          <HStack space="md" alignItems="center" p="$3">
            <Icon as={LogOut} size="lg" color="$red600" />
            <Text color="$red600" fontWeight="bold">
              Cerrar Sesión
            </Text>
          </HStack>
        </Pressable>

        {/* Footer del Drawer */}
        <Box px="$4" pt="$4" borderTopWidth={1} borderTopColor="$borderLight300">
          <Text color="$textDark500" size="sm" textAlign="center">
            App desarrollada con React Native & Gluestack UI
          </Text>
        </Box>
      </VStack>
    </DrawerContentScrollView>
  );
};

const AppNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation, route }) => ({
        header: () => <CustomHeader title={route.name} navigation={navigation} />,
        drawerActiveTintColor: '#6366f1',
        drawerInactiveTintColor: '#6b7280',
        drawerStyle: {
          width: 280,
        },
        swipeEnabled: true,
        gestureEnabled: true,
      })}
    >
      <Drawer.Screen name="Inicio" component={MainScreen} />
      <Drawer.Screen name="Display" component={DisplayScreen} />
      <Drawer.Screen name="Perfil" component={ProfileScreen} />
      <Drawer.Screen name="Formularios" component={FormsScreen} />
      <Drawer.Screen name="Curiosidades" component={CustomComponentScreen} />
    </Drawer.Navigator>
  );
};

export default AppNavigator;