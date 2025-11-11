import {
    Box,
    Button,
    ButtonText,
    Checkbox,
    CheckboxGroup,
    CheckboxIcon,
    CheckboxIndicator,
    CheckboxLabel,
    CheckIcon,
    ChevronDownIcon,
    CircleIcon,
    FormControl,
    FormControlLabel,
    FormControlLabelText,
    HStack,
    Icon,
    Link,
    LinkText,
    MoonIcon,
    Pressable,
    Radio,
    RadioGroup,
    RadioIcon,
    RadioIndicator,
    RadioLabel,
    ScrollView,
    Select,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicator,
    SelectDragIndicatorWrapper,
    SelectIcon,
    SelectInput,
    SelectItem,
    SelectPortal,
    SelectTrigger,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    SunIcon,
    Switch,
    Text,
    Textarea,
    TextareaInput,
    Toast,
    ToastDescription,
    useToast,
    VStack
} from '@gluestack-ui/themed';
import { useState } from 'react';

const FormsScreen = () => {
  const [switchValue, setSwitchValue] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [checkboxValues, setCheckboxValues] = useState(['react']);
  const [radioValue, setRadioValue] = useState('option1');
  const [selectValue, setSelectValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toast = useToast();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSubmit = () => {
    // Mostrar notificación de formulario enviado
    toast.show({
      placement: "top",
      render: ({ id }) => {
        return (
          <Toast nativeID={id} variant="accent" action="success">
            <ToastDescription>
              ✅ Formulario Enviado Correctamente
            </ToastDescription>
          </Toast>
        );
      },
    });

    // Opcional: Resetear formulario después de enviar
    setTimeout(() => {
      setCheckboxValues(['react']);
      setRadioValue('option1');
      setSelectValue('');
      setSliderValue(50);
      setSwitchValue(false);
      setTextAreaValue('');
    }, 1000);
  };

  // Colores según el modo
  const backgroundColor = isDarkMode ? "$backgroundDark900" : "$backgroundLight0";
  const textColor = isDarkMode ? "$textLight0" : "$textDark800";
  const cardBackground = isDarkMode ? "$backgroundDark800" : "$backgroundLight50";
  const borderColor = isDarkMode ? "$borderDark800" : "$borderLight200";

  return (
    <ScrollView 
      flex={1} 
      bg={backgroundColor}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <VStack space="xl" p="$4" pb="$8">
        
        {/* Botón de Modo Oscuro/Claro */}
        <Box alignItems="flex-end">
          <Pressable
            onPress={toggleDarkMode}
            bg={isDarkMode ? "$primary800" : "$primary100"}
            p="$3"
            borderRadius="$full"
            alignItems="center"
            justifyContent="center"
            width="$12"
            height="$12"
          >
            <Icon 
              as={isDarkMode ? SunIcon : MoonIcon} 
              size="lg" 
              color={isDarkMode ? "$warning500" : "$primary600"} 
            />
          </Pressable>
          <Text size="xs" color={textColor} mt="$1" textAlign="center">
            {isDarkMode ? "Modo Claro" : "Modo Oscuro"}
          </Text>
        </Box>

        {/* Checkbox Group */}
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText fontWeight="bold" color={textColor}>
              Tecnologías favoritas (CheckboxGroup)
            </FormControlLabelText>
          </FormControlLabel>
          <CheckboxGroup
            value={checkboxValues}
            onChange={setCheckboxValues}
          >
            <VStack space="sm">
              <Checkbox value="react" aria-label="React">
                <CheckboxIndicator mr="$2">
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
                <CheckboxLabel color={textColor}>React Native</CheckboxLabel>
              </Checkbox>
              <Checkbox value="vue" aria-label="Vue">
                <CheckboxIndicator mr="$2">
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
                <CheckboxLabel color={textColor}>Vue.js</CheckboxLabel>
              </Checkbox>
              <Checkbox value="angular" aria-label="Angular">
                <CheckboxIndicator mr="$2">
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
                <CheckboxLabel color={textColor}>Angular</CheckboxLabel>
              </Checkbox>
            </VStack>
          </CheckboxGroup>
        </FormControl>

        {/* Link con Icon */}
        <Box>
          <Link href="https://gluestack.io" isExternal>
            <HStack alignItems="center" space="sm">
              <Icon as={CircleIcon} size="sm" color="$primary600" />
              <LinkText color="$primary600" fontWeight="bold">
                Visitar Gluestack UI
              </LinkText>
            </HStack>
          </Link>
        </Box>

        {/* Pressable con cambio de color */}
        <Box bg={cardBackground} p="$3" borderRadius="$lg" borderWidth={1} borderColor={borderColor}>
          <Text fontWeight="bold" mb="$2" color={textColor}>Pressable con efecto</Text>
          <Pressable
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            bg={isPressed ? "$primary500" : "$primary200"}
            p="$3"
            borderRadius="$md"
            alignItems="center"
          >
            <Text 
              color={isPressed ? "$white" : "$textDark800"}
              fontWeight={isPressed ? "bold" : "normal"}
            >
              {isPressed ? "¡Presionado!" : "Presióname"}
            </Text>
          </Pressable>
        </Box>

        {/* Radio Group con Form Control */}
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText fontWeight="bold" color={textColor}>
              Campo de desarrollo preferido (RadioGroup)
            </FormControlLabelText>
          </FormControlLabel>
          <RadioGroup value={radioValue} onChange={setRadioValue}>
            <VStack space="sm">
              <Radio value="option1" aria-label="Opción 1">
                <RadioIndicator mr="$2">
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel color={textColor}>Backend</RadioLabel>
              </Radio>
              <Radio value="option2" aria-label="Opción 2">
                <RadioIndicator mr="$2">
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel color={textColor}>Frontend</RadioLabel>
              </Radio>
              <Radio value="option3" aria-label="Opción 3">
                <RadioIndicator mr="$2">
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel color={textColor}>Ambos</RadioLabel>
              </Radio>
            </VStack>
          </RadioGroup>
        </FormControl>

        {/* Select con Form Control */}
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText fontWeight="bold" color={textColor}>
              Selecciona el país donde vives
            </FormControlLabelText>
          </FormControlLabel>
          <Select selectedValue={selectValue} onValueChange={setSelectValue}>
            <SelectTrigger>
              <SelectInput 
                placeholder="Selecciona una opción" 
                color={textColor}
              />
              <SelectIcon mr="$3">
                <Icon as={ChevronDownIcon} color={textColor} />
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem label="México" value="mx" />
                <SelectItem label="Estados Unidos" value="us" />
                <SelectItem label="España" value="es" />
                <SelectItem label="Colombia" value="co" />
              </SelectContent>
            </SelectPortal>
          </Select>
        </FormControl>

        {/* Slider con valores Min/Max */}
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText fontWeight="bold" color={textColor}>
              Experiencia en el lenguaje de programación: {sliderValue}%
            </FormControlLabelText>
          </FormControlLabel>
          <Slider
            value={sliderValue}
            onChange={setSliderValue}
            minValue={0}
            maxValue={100}
            step={5}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <HStack justifyContent="space-between">
            <Text size="sm" color={textColor}>0%</Text>
            <Text size="sm" color={textColor}>100%</Text>
          </HStack>
        </FormControl>

        {/* Switch con estado */}
        <FormControl>
          <HStack alignItems="center" space="md">
            <Switch
              value={switchValue}
              onValueChange={setSwitchValue}
            />
            <Text fontWeight="bold" color={textColor}>
              Notificaciones: {switchValue ? 'Activadas' : 'Desactivadas'}
            </Text>
          </HStack>
        </FormControl>

        {/* TextArea con Form Control */}
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText fontWeight="bold" color={textColor}>
              Comentarios
            </FormControlLabelText>
          </FormControlLabel>
          <Textarea>
            <TextareaInput
              placeholder="Escribe aqui tus ultimos puestos de trabajo..."
              placeholderTextColor={isDarkMode ? "$textLight400" : "$textDark400"}
              value={textAreaValue}
              onChangeText={setTextAreaValue}
              color={textColor}
            />
          </Textarea>
        </FormControl>

        {/* Botón de envío - Mejorado para adaptabilidad */}
        <Button 
          mt="$4" 
          mb="$8"
          onPress={handleSubmit}
          size="lg"
        >
          <ButtonText>Enviar Formulario</ButtonText>
        </Button>

      </VStack>
    </ScrollView>
  );
};

export default FormsScreen;