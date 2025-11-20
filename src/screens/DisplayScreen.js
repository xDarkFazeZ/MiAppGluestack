// src/screens/DisplayScreen.js
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
    <Box flex={1} bg="$backgroundLight0">
      <ScrollView flex={1} contentContainerStyle={{ flexGrow: 1 }}>
        <VStack space="lg" p="$4" pb="$8">
          
          {/* Header con imagen */}
          <Box alignItems="center" mt="$4" mb="$2">
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=400&h=200&fit=crop',
              }}
              alt="Supermercado"
              width="100%"
              height={120}
              borderRadius="$lg"
              borderWidth={1}
              borderColor="$primary200"
            />
            <Text fontSize="$xl" fontWeight="$bold" color="$primary600" mt="$3" textAlign="center">
              ¡Bienvenido a SuperTienda!
            </Text>
            <Text color="$textDark500" textAlign="center" mt="$1" fontSize="$sm">
              Los mejores precios y productos de calidad
            </Text>
          </Box>

          {/* Botones de acción */}
          <HStack space="md" justifyContent="center" mb="$2">
            <Button 
              variant="solid" 
              action="primary"
              onPress={handleAddToCart}
              isDisabled={!selectedProduct}
              size="md"
              flex={1}
            >
              <ButtonText fontSize="$sm">Agregar al carrito</ButtonText>
            </Button>
            
            <Button 
              variant="outline" 
              action="secondary"
              onPress={handleWishlistButton}
              isDisabled={wishlistItems.length === 0}
              size="md"
              flex={1}
            >
              <ButtonText fontSize="$sm">
                {showWishlist ? 'Mostrar Todos' : 'Wishlist'}
              </ButtonText>
            </Button>
          </HStack>

          {/* Información del modo actual */}
          <Box bg="$primary50" p="$3" borderRadius="$lg" alignItems="center" mb="$2">
            <Text color="$primary700" fontWeight="$medium" fontSize="$sm" textAlign="center">
              {showWishlist 
                ? `📋 Mostrando productos de Wishlist (${wishlistItems.length} favoritos)`
                : '📋 Todos los productos disponibles'
              }
            </Text>
          </Box>

          {/* Información del producto seleccionado - AHORA ARRIBA DE LA TABLA */}
          {selectedProduct && (
            <Card p="$3" bg="$success50" borderWidth={1} borderColor="$success200" mb="$2">
              <VStack space="xs">
                <Text fontWeight="$bold" color="$success800" fontSize="$sm">
                  Producto seleccionado:
                </Text>
                <Text color="$success700" fontSize="$sm">
                  {selectedProduct.name} - {selectedProduct.size} - {selectedProduct.price}
                </Text>
                <Text color="$success600" fontSize="$xs">
                  Disponible: {selectedProduct.available} unidades
                </Text>
              </VStack>
            </Card>
          )}

          {/* Tabla de productos */}
          <Card p="$3" borderRadius="$lg" borderWidth={1} borderColor="$borderLight200" mb="$2">
            <VStack space="md">
              {/* Encabezados de tabla */}
              <HStack justifyContent="space-between" borderBottomWidth={1} borderBottomColor="$borderLight300" pb="$2">
                <Text fontWeight="$bold" width="20%" fontSize="$sm">Producto</Text>
                <Text fontWeight="$bold" width="20%" fontSize="$sm">Talla</Text>
                <Text fontWeight="$bold" width="20%" fontSize="$sm">Disp.</Text>
                <Text fontWeight="$bold" width="20%" fontSize="$sm">Estado</Text>
                <Text fontWeight="$bold" width="20%" fontSize="$sm" textAlign="center">Fav</Text>
              </HStack>

              {/* Mensaje cuando no hay productos en wishlist */}
              {showWishlist && wishlistProducts.length === 0 && (
                <Box py="$6" alignItems="center">
                  <Text color="$textDark500" textAlign="center" fontSize="$sm">
                    No hay productos en tu wishlist
                  </Text>
                  <Text color="$textDark400" textAlign="center" fontSize="$xs" mt="$1">
                    Toca las estrellas para agregar productos
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
                    py="$2" 
                    borderBottomWidth={1} 
                    borderBottomColor="$borderLight100"
                    bg={selectedProduct?.id === product.id ? "$primary50" : "transparent"}
                    borderRadius="$md"
                    px="$1"
                    alignItems="center"
                  >
                    <Text width="20%" fontWeight="$medium" fontSize="$sm">{product.name}</Text>
                    <Text width="20%" fontSize="$sm">{product.size}</Text>
                    <Text width="20%" fontSize="$sm">{product.available}</Text>
                    
                    {/* Columna Estado */}
                    <Box width="20%">
                      <HStack space="xs" alignItems="center">
                        {product.stock === 0 ? (
                          <Box bg="$red500" px="$1" py="$0.5" borderRadius="$xs">
                            <Text color="$white" fontSize="$xs" fontWeight="$bold">Agotado</Text>
                          </Box>
                        ) : isProductInCart(product.id) ? (
                          <Text fontSize="$sm">🛒</Text>
                        ) : (
                          <Text fontSize="$xs" color="$success600">Disponible</Text>
                        )}
                      </HStack>
                    </Box>

                    {/* Columna estrella */}
                    <Box width="20%" alignItems="center">
                      <Pressable onPress={() => toggleWishlist(product.id)} hitSlop={10}>
                        <Text fontSize="$lg">
                          {isProductInWishlist(product.id) ? '⭐' : '☆'}
                        </Text>
                      </Pressable>
                    </Box>
                  </HStack>
                </Pressable>
              ))}

              {/* Footer de la tabla */}
              <Text fontSize="$xs" color="$textDark500" textAlign="center" mt="$2">
                {showWishlist 
                  ? `Mostrando ${wishlistProducts.length} productos de tu wishlist`
                  : `Mostrando inventario • ${allProducts.length} productos`
                }
              </Text>
            </VStack>
          </Card>

          {/* Información del carrito */}
          {cartItems.length > 0 && (
            <Card p="$3" bg="$primary50" borderWidth={1} borderColor="$primary200" mb="$2">
              <HStack alignItems="center" space="sm" justifyContent="center">
                <Text>🛒</Text>
                <Text color="$primary700" fontWeight="$medium" fontSize="$sm">
                  {cartItems.length} producto(s) en el carrito
                </Text>
              </HStack>
            </Card>
          )}

          {/* Información de wishlist */}
          {wishlistItems.length > 0 && !showWishlist && (
            <Card p="$3" bg="$warning50" borderWidth={1} borderColor="$warning200">
              <HStack alignItems="center" space="sm" justifyContent="center">
                <Text>⭐</Text>
                <Text color="$warning700" fontWeight="$medium" fontSize="$sm">
                  {wishlistItems.length} producto(s) en wishlist
                </Text>
              </HStack>
            </Card>
          )}

          {/* Espacio extra al final para mejor scroll */}
          <Box height="$4" />

        </VStack>
      </ScrollView>
    </Box>
  );
};

export default DisplayScreen;