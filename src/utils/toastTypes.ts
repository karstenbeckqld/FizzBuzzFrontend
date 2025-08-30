import { ToastPosition, UseToastOptions } from "@chakra-ui/react";

// Define the interface for toast options, aligned with Chakra UI's expectations
interface ToastTypes extends UseToastOptions {
    id?: string;
    title?: string;
    description?: string;
    status?: "error" | "info" | "warning" | "success";
    duration: number;
    position: ToastPosition;// Removed "loading" and undefined for standard use
}

// Success Toast with message
export const withMessageSuccessToast = (errorMessage: string): ToastTypes => ({
    title: 'Task executed.',
    description: errorMessage,
    status: 'success',
    duration: 5000,
    isClosable: true,
    position: 'top',
});

// Failure Toast with message
export const withMessageFailureToast = (errorMessage: string): ToastTypes => ({
    title: 'Something went wrong',
    description: errorMessage,
    status: 'error',
    duration: 5000,
    isClosable: true,
    position: 'top',
});