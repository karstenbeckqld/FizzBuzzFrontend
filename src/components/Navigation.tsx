import { Image, Box, HStack, useColorMode, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ColorModeSwitch from "../components/ColorModeSwitch.tsx";
import logoLight from '../assets/kb-logo-light.svg';
import logoDark from '../assets/kb-logo-dark.svg';

const Navigation = () => {

    const { colorMode } = useColorMode();

    return (
        <Box>
            <HStack
                backgroundColor={colorMode === 'dark' ? '#21262f' : '#fff'}
                width='100%'
                height='80px'
                justifyContent='space-between'
                alignItems='center'
                padding='0 20px'
                margin='0 auto'
                position='fixed' // Ensure header stays fixed
                top='0'
                zIndex='1000' >
                <HStack gap={8}>
                    <Link to='/'>
                        <Image src={colorMode === 'dark' ? logoLight : logoDark} alt="Logo" height={10} />
                    </Link>
                    <Text color={colorMode === 'dark' ? '#ffffff' : '#000000'}>Karsten's FizzBuzz Game</Text>
                </HStack>
                <HStack
                    gap='20px' >
                    <Link to='/'>Game</Link>
                    <Link to='admin'>Admin</Link>
                    <ColorModeSwitch />
                </HStack>
            </HStack>
        </Box>
    );
};

export default Navigation;