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
import { GameSessionResult, Rule, ValueTransferModel } from "@/types.ts";
import RulesDisplay from "@/components/RulesDisplay.tsx";
import { withMessageFailureToast } from "@/utils/toastTypes.ts";
import GameResultOutput from "@/components/GameResultOutput.tsx";

const Home = () => {

    // First, we get the current color mode from the ChakraProvider to set the correct colors for the theme.
    const {colorMode} = useColorMode();
    const toast = useToast();

    // Here we set the colors for the input field of the form.
    const inputFieldBackground = colorMode === 'dark' ? 'brand.600' : 'brand.300';
    const inputFieldText = colorMode === 'dark' ? 'brand.100' : 'brand.900';

    const answerRef = useRef<HTMLInputElement>(null);

    // Here, we use the useState hook to set the required state variables for this component.
    const [value, setValue] = useState<number | null>(0);
    const [rules, setRules] = useState<Rule[] | null>([]);
    const [result, setResult] = useState<boolean | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [hasEnded, setHasEnded] = useState<boolean>(false);
    const [results, setResults] = useState<GameSessionResult | null>(null);

    // The getRules() function contacts the /api/game/active endpoint to receive the currently active rules.
    useEffect(() => {
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

        getRules()
            .then(r => console.log(r));
    }, [toast])

    // The handleSubmit function submits the user's response to the API to check.
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const transferModel: ValueTransferModel = {
            Value: value,
            Text: answerRef.current?.value,
        };

        console.log('Transfer Model:', transferModel);

        await axios.post('http://localhost:5165/api/game/verify', transferModel, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                console.log(res.data);
                setResult(res.data);
            })
            .catch((err) => {
                console.log(err.response?.data.message);
                const message = err.response.data.message;
                toast(withMessageFailureToast(message));
            })

        console.log(result);
    }

    // Start the game, receive a new number from the API.
    const startGame = async () => {
        setIsPlaying(true);
        await getNewNumber();
    };

    // Stop the game, receive the game statistics from the API.
    const stopGame = async () => {
        await axios.get<GameSessionResult>('http://localhost:5165/api/game/end-game')
            .then((res) => {
                console.log(res.data);
                setResults(res.data);
                setHasEnded(true);
            })
            .catch((err) => {
                console.error("Error fetching results listing: ", err);
                toast(withMessageFailureToast('Failed to fetch results listing.'));
            });
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
            toast(withMessageFailureToast('Failed to fetch a number.'));
        }
    };

    // To conditionally display the game outcome (correct or wrong), we use the getResultMessage function, which
    // displays a message depending on the correctness of the guess.
    const getResultMessage = () => {
        if (!isPlaying || result === null) return null;

        return (
            <Box
                bg = {result ? '#4cff02' : '#d36e6e'}
                color = {result ? 'black' : 'white'}
                maxW = '100%'
                width = '80%'
                borderRadius = {10}
                marginBottom = {8}
                marginTop = {8}
                padding = {2}
            >
            {result
                ? <p className = 'result-message'>Correct</p>
                : <p className = 'result-message'>Wrong guess, try again!</p>
            }
        </Box>
        );
    };

    return (
        <div>
            <Heading className = 'headingStyle'>Welcome to the FizzBuzz Game</Heading>
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
                        <div className = 'rules-container'>
                            <Text
                                fontSize = '2xl'
                                color = 'cyan'
                                marginBottom = {8}
                            >
                                The Rules!
                            </Text> {rules !== null ?
                            rules.map((rule) => (<RulesDisplay item = {rule} key = {rule.id} />)) :
                            <p>Loading...</p>
                        } <Text
                            textAlign = 'center'
                            fontStyle = 'italic'
                        >
                            If all rules match, combine the words without spaces, just keep it in the order of the Rules. If no rule matches, just type the number itself in the field.
                        </Text>
                        </div>
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
                            <form
                                className = 'form'
                                onSubmit = {handleSubmit}
                            >
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
                                    <FormControl width = 'sm'>
                                        <FormLabel
                                            htmlFor = "answer"
                                        >
                                           Enter the rules that apply.
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

            {hasEnded ? (
                <GameResultOutput gameData = {results} />
            ) : null}

        </div>
    );
};

export default Home;