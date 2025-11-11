import { Box, HStack, Icon, Pressable, Text, VStack } from '@gluestack-ui/themed';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Home, Menu, Settings, ShoppingBag, Star, User } from 'lucide-react-native';

// Importar pantallas
import CustomComponentScreen from '../screens/CustomComponentScreen';
import DisplayScreen from '../screens/DisplayScreen';
import FormsScreen from '../screens/FormsScreen';
import MainScreen from '../screens/MainScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Drawer = createDrawerNavigator();

// Custom Header Component con ícono de menú
const CustomHeader = ({ title, navigation }) => (
  <Box
    bg="$primary600"
    pt="$12" // Padding top para evitar la barra de notificaciones
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
      {title} - Juan Iram Gámez
    </Text>
  </Box>
);

// Custom Drawer Content
const CustomDrawerContent = (props) => {
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
            Juan Iram Gámez
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
    <NavigationContainer>
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
    </NavigationContainer>
  );
};

export default AppNavigator;