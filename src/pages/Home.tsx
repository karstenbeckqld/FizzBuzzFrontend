import { SyntheticEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Text,
    useColorMode,
    useToast,
    VStack
} from "@chakra-ui/react";
import { Rule, ValueTransferModel } from "@/types.ts";
import RulesDisplay from "../components/RulesDisplay.tsx";
import { withMessageFailureToast } from "../utils/toastTypes.ts";

const Home = () => {

    // First, we get the current color mode from the ChakraProvider to set the correct colors for the theme.
    const {colorMode} = useColorMode();
    const toast = useToast();

    // Here we set the colors for the input field of the form.
    const inputFieldBackground = colorMode === 'dark' ? 'brand.600' : 'brand.300';
    const inputFieldText = colorMode === 'dark' ? 'brand.100' : 'brand.900';

    const answerRef = useRef<HTMLInputElement>(null);

    // Here, we use the useState hook to set the number received from the server and the active rules.
    const [value, setValue] = useState<number | null>(0);
    const [rules, setRules] = useState<Rule[] | null>([]);
    const [result, setResult] = useState<boolean | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);

    // const [error, setError] = useState<string | null>(null);
    // const [answer, setAnswer] = useState<string>("");

    // The getRules() function contacts the /api/game/active endpoint to receive the currently active rules.
    const getRules = async () => {

        try {
            const result = await axios.get<Rule[] | null>('http://localhost:5165/api/rules/active');
            setRules(result.data);
            console.log(result.data);
        } catch (error) {
            console.error("Error fetching rules: ", error);
            toast(withMessageFailureToast('Failed to fetch rules.'));
        }
    }

    useEffect(() => {
        getRules();
    }, [])

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const transferModel: ValueTransferModel = {
            Value: value,
            Text: answerRef.current?.value,
        };

        console.log('Transfer Model:', transferModel);

        const res = await axios.post('http://localhost:5165/api/game/verify', transferModel, {
            headers: {
                'Content-Type': 'application/json',
            }
        })

        console.log(res.data);
        setResult(res.data);

        console.log(result);
    }

    const startGame = async () => {
        setIsPlaying(true);
        await getNewNumber();
    };

    const stopGame = () => {
        setIsPlaying(false);
        setValue(null);
    };

    const getNewNumber = async () => {
        try {
            const result = await axios.get<number>('http://localhost:5165/api/game/random');
            setValue(result.data);
            setResult(null);
            console.log(result.data);
        } catch (error) {
            console.error("Error fetching value: ", error);
            toast(withMessageFailureToast('Failed to fetch data.'));
        }
    };

    // To conditionally display the game result, we use the getResultMessage function, which displays a message
    // depending on the correctness of the guess.
    const getResultMessage = () => {
        if (!isPlaying || result === null) return null;

        return (
            <Box
                maxW = 'lg'
                className = {colorMode === 'dark' ? 'text-slate-50' : 'text-black'}
                marginBottom = {8}
                marginTop = {8}
            >
            {result
                ? <p className = 'result-message correct'>Correct</p>
                : <p className = 'result-message wrong'>Wrong guess, try again!</p>
            }
        </Box>
        );
    };

    return (
        <div>
            <Heading className = 'headingStyle'>Welcome to the FizzBuzz Game</Heading>

            <div className = 'rules-container'>
                <Text>The Rules!</Text> {rules !== null ?
                rules.map((rule) => (<RulesDisplay item = {rule} key = {rule.id} />)) :
                <p>Loading...</p>
            } <Text textAlign = 'center'>If all rules match, combine the words with spaces.</Text>
                <Text textAlign = 'center'>If no rule matches, just type the number itself in the field.</Text>
            </div>

            <div className = 'game-container'>
                {!isPlaying ? (
                    <Button
                        colorScheme = 'green'
                        onClick = {startGame}
                    >
                        Start Game
                    </Button>
                ) : (
                    <>
                        <HStack spacing = {2}>
                            <Button
                                colorScheme = 'red'
                                onClick = {stopGame}
                            >
                                Stop Game
                            </Button>
                            <Button
                                colorScheme = 'yellow'
                                onClick = {getNewNumber}
                            >
                                New Number
                            </Button>
                        </HStack>

                        <Heading className = 'headingStyle headingTextAccent'>
                            {value !== 0 ? <p>Number: {value}</p> : <p>Loading...</p>}
                        </Heading>

                        {value && (
                            <form onSubmit = {handleSubmit}>
                                <VStack>
                                <Box
                                    width = '100%'
                                    height = '80px'
                                >
                                    <Heading
                                        colorScheme = "brand"
                                        textAlign = 'center'
                                    >
                                        Your Answer
                                    </Heading>
                                </Box>
                                <Box
                                    width = '100%'
                                    height = '100px'
                                    marginBottom = {6}
                                >
                                    <FormControl>
                                        <FormLabel
                                            htmlFor = "answer"
                                        >
                                            Enter: {rules?.map(rule => rule.text + ' or ')} the number displayed, when no answer fits.
                                        </FormLabel>
                                        <Input
                                            placeholder = 'Enter your Answer here.'
                                            type = 'text'
                                            id = "answer"
                                            name = "answer"
                                            backgroundColor = {inputFieldBackground}
                                            _placeholder = {{color: inputFieldText}}
                                            ref = {answerRef}
                                        />
                                    </FormControl>
                                </Box>

                                <Button
                                    colorScheme = 'brand'
                                    w = '100%'
                                    type = 'submit'
                                >Submit
                                </Button>
                                </VStack>
                            </form>
                        )}
                    </>
                )} {getResultMessage()}
            </div>
        </div>
    );
};

export default Home;