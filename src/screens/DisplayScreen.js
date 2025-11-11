import {
  Box,
  Button,
  ButtonText,
  Card,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  Toast,
  ToastDescription,
  useToast,
  VStack
} from '@gluestack-ui/themed';
import { useState } from 'react';

const DisplayScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showWishlist, setShowWishlist] = useState(false);
  const toast = useToast();

  // Productos normales
  const allProducts = [
    { id: 1, name: 'Dress', size: 'Medium', available: 12, stock: 5, price: '$45.99' },
    { id: 2, name: 'Earring', size: 'Large', available: 90, stock: 90, price: '$25.50' },
    { id: 3, name: 'Shirt', size: 'Small', available: 0, stock: 0, price: '$35.00' },
    { id: 4, name: 'Jeans', size: 'Large', available: 15, stock: 15, price: '$59.99' },
    { id: 5, name: 'Shoes', size: 'Medium', available: 8, stock: 8, price: '$79.99' },
    { id: 6, name: 'Hat', size: 'One Size', available: 25, stock: 25, price: '$19.99' },
  ];

  // Productos para wishlist (solo aparecen si están en wishlistItems)
  const wishlistProducts = allProducts.filter(product => 
    wishlistItems.includes(product.id)
  );

  const productsToShow = showWishlist ? wishlistProducts : allProducts;

  const handleAddToCart = () => {
    if (!selectedProduct) return;

    if (selectedProduct.stock === 0) {
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast nativeID={id} variant="accent" action="error">
            <ToastDescription>Producto agotado</ToastDescription>
          </Toast>
        ),
      });
      return;
    }

    setCartItems(prev => [...prev, selectedProduct]);
    
    // Mostrar carrito y toast al mismo tiempo
    toast.show({
      placement: "top",
      render: ({ id }) => (
        <Toast nativeID={id} variant="accent" action="success">
          <ToastDescription>
            ✅ Tu producto esta siendo procesado, gracias por comprar con nosotros
          </ToastDescription>
        </Toast>
      ),
    });
  };

  const toggleWishlist = (productId) => {
    setWishlistItems(prev => {
      const isInWishlist = prev.includes(productId);
      if (isInWishlist) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleWishlistButton = () => {
    if (wishlistItems.length === 0) {
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast nativeID={id} variant="accent" action="info">
            <ToastDescription>Agrega productos a tu wishlist primero</ToastDescription>
          </Toast>
        ),
      });
      return;
    }
    setShowWishlist(!showWishlist);
  };

  const isProductInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  const isProductInWishlist = (productId) => {
    return wishlistItems.includes(productId);
  };

  return (
    <ScrollView flex={1} bg="$backgroundLight0" pt="$16">
      <VStack space="lg" p="$4">
        
        {/* Imagen rectangular tipo supermercado */}
        <Box alignItems="center" mb="$4">
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=400&h=200&fit=crop',
            }}
            alt="Supermercado"
            width={350}
            height={150}
            borderRadius="$lg"
            borderWidth={2}
            borderColor="$primary200"
          />
          <Text size="xl" fontWeight="bold" color="$primary600" mt="$2">
            ¡Bienvenido a SuperTienda!
          </Text>
          <Text color="$textDark500" textAlign="center" mt="$1">
            Los mejores precios y productos de calidad
          </Text>
        </Box>

        {/* Botones */}
        <HStack space="md" justifyContent="center">
          <Button 
            variant="solid" 
            action="primary"
            onPress={handleAddToCart}
            isDisabled={!selectedProduct}
          >
            <ButtonText>Add to cart</ButtonText>
          </Button>
          
          <Button 
            variant="outline" 
            action="secondary"
            onPress={handleWishlistButton}
            isDisabled={wishlistItems.length === 0}
          >
            <ButtonText>
              {showWishlist ? 'Mostrar Todos' : 'Wishlist'}
            </ButtonText>
          </Button>
        </HStack>

        {/* Información del modo actual */}
        <Box bg="$primary50" p="$3" borderRadius="$lg" alignItems="center">
          <Text color="$primary700" fontWeight="medium">
            {showWishlist 
              ? <Text>📋 Mostrando productos de Wishlist ({wishlistItems.length} favoritos)</Text>
              : <Text>📋 Todos los productos disponibles</Text>
            }
          </Text>
        </Box>

        {/* Tabla de productos */}
        <Card p="$4" borderRadius="$lg" borderWidth={1} borderColor="$borderLight200">
          <VStack space="md">
            {/* Encabezados de tabla */}
            <HStack justifyContent="space-between" borderBottomWidth={1} borderBottomColor="$borderLight300" pb="$2">
              <Text fontWeight="bold" width="20%">Pro</Text>
              <Text fontWeight="bold" width="20%">Size</Text>
              <Text fontWeight="bold" width="20%">Ava</Text>
              <Text fontWeight="bold" width="20%">ST</Text>
              <Text fontWeight="bold" width="20%"></Text> {/* Columna estrella */}
            </HStack>

            {/* Mensaje cuando no hay productos en wishlist */}
            {showWishlist && wishlistProducts.length === 0 && (
              <Box py="$8" alignItems="center">
                <Text color="$textDark500" textAlign="center">
                  No hay productos en tu wishlist{'\n'}
                  <Text size="sm">Toca las estrellas para agregar productos</Text>
                </Text>
              </Box>
            )}

            {/* Filas de productos */}
            {productsToShow.map((product) => (
              <Pressable 
                key={product.id} 
                onPress={() => setSelectedProduct(product)}
              >
                <HStack 
                  justifyContent="space-between" 
                  py="$3" 
                  borderBottomWidth={1} 
                  borderBottomColor="$borderLight100"
                  bg={selectedProduct?.id === product.id ? "$primary50" : "transparent"}
                  borderRadius="$md"
                  px="$2"
                >
                  <Text width="20%" fontWeight="medium">{product.name}</Text>
                  <Text width="20%">{product.size}</Text>
                  <Text width="20%">{product.available}</Text>
                  
                  {/* Columna ST - Solo soldout y carrito */}
                  <Box width="20%">
                    <HStack space="sm" alignItems="center">
                      {product.stock === 0 && (
                        <Box bg="$red500" px="$2" py="$1" borderRadius="$sm">
                          <Text color="$white" size="xs" fontWeight="bold">Soldout</Text>
                        </Box>
                      )}
                      {isProductInCart(product.id) && (
                        <Text>🛒</Text>
                      )}
                    </HStack>
                  </Box>

                  {/* Columna estrella */}
                  <Box width="20%" alignItems="center">
                    <Pressable onPress={() => toggleWishlist(product.id)}>
                      <Text size="xl">
                        {isProductInWishlist(product.id) ? '⭐' : '☆'}
                      </Text>
                    </Pressable>
                  </Box>
                </HStack>
              </Pressable>
            ))}

            <Text size="sm" color="$textDark500" textAlign="center" mt="$2">
              {showWishlist 
                ? `Mostrando ${wishlistProducts.length} productos de tu wishlist`
                : `Showing recent inventory • ${allProducts.length} products`
              }
            </Text>
          </VStack>
        </Card>

        {/* Información del producto seleccionado */}
        {selectedProduct && (
          <Card p="$4" bg="$success50" borderWidth={1} borderColor="$success200">
            <VStack space="sm">
              <Text fontWeight="bold" color="$success800">
                Producto seleccionado:
              </Text>
              <Text color="$success700">
                {selectedProduct.name} - {selectedProduct.size} - {selectedProduct.price}
              </Text>
              <Text color="$success600" size="sm">
                Disponible: {selectedProduct.available} unidades
              </Text>
            </VStack>
          </Card>
        )}

        {/* Información del carrito */}
        {cartItems.length > 0 && (
          <Card p="$4" bg="$primary50" borderWidth={1} borderColor="$primary200">
            <HStack alignItems="center" space="sm" justifyContent="center">
              <Text>🛒</Text>
              <Text color="$primary700" fontWeight="medium">
                {cartItems.length} producto(s) en el carrito
              </Text>
            </HStack>
          </Card>
        )}

        {/* Información de wishlist */}
        {wishlistItems.length > 0 && !showWishlist && (
          <Card p="$4" bg="$warning50" borderWidth={1} borderColor="$warning200">
            <HStack alignItems="center" space="sm" justifyContent="center">
              <Text>⭐</Text>
              <Text color="$warning700" fontWeight="medium">
                {wishlistItems.length} producto(s) en wishlist
              </Text>
            </HStack>
          </Card>
        )}

      </VStack>
    </ScrollView>
  );
};

export default DisplayScreen;