
import { HStack, Text, useColorMode, Switch } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

// A simple component that allows the user to switch between light and dark mode.

const ColorModeSwitch = () => {

    const { toggleColorMode, colorMode } = useColorMode();

    return (
        <HStack alignContent='center' justifyContent='space-between'>
            <Switch
                isChecked={colorMode === 'dark'}
                onChange={toggleColorMode}
                colorScheme="blue"
                size="lg"
            />
            <Text whiteSpace='nowrap' color={colorMode === 'dark' ? '#FFFFFF' : '#000000'} >
                {colorMode === 'dark' ? <MoonIcon color='#fff' /> : <SunIcon color='#000' />}
            </Text>
        </HStack>
    );
};

export default ColorModeSwitch;