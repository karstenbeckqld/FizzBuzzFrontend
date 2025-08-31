import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from "@chakra-ui/react";
import theme from './theme.ts';

// We use Chakra UI in this app, hence we added the ChakraProvider to the main file.

createRoot(document.getElementById('root')!)
    .render(
        <StrictMode>
            <ChakraProvider theme={theme}>
                <App />
            </ChakraProvider>
        </StrictMode>,
    )
