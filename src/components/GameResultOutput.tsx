import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Badge,
    Box,
    Card,
    CardBody,
    Container,
    Heading,
    HStack,
    Icon,
    Stat,
    StatGroup,
    StatLabel,
    StatNumber,
    Text,
    useColorMode,
    VStack
} from '@chakra-ui/react';
import { CheckCircleIcon, InfoIcon, TimeIcon, WarningIcon } from '@chakra-ui/icons';

// Interfaces
interface GameResult {
    expectedOutput: string;
    isCorrect: boolean;
    timestamp: string;
    userInput: string;
    value: number;
}

interface GameSessionResult {
    accuracyPercentage: number;
    correctAnswers: number;
    results: GameResult[];
    sessionId: string;
    totalAttempts: number;
}

const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
};

const getAccuracyColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
};

// This component displays the game statistics at the end of the game. For this it receives the game stats
// from the API as a GameSessionResult object and displays the various values.

const GameResultsDisplay = ({gameData}: { gameData?: GameSessionResult | null }) => {

    const {colorMode} = useColorMode();

    if (!gameData || gameData.totalAttempts === 0) {
        return (
            <Container maxW = "2xl" py = {8}>
        <Alert
            status = "info"
            variant = "subtle"
            flexDirection = "column"
            alignItems = "center"
            justifyContent = "center"
            textAlign = "center"
            height = "200px"
            borderRadius = "lg"
        >
          <AlertIcon boxSize = "40px" mr = {0} />
          <AlertTitle mt = {4} mb = {1} fontSize = "lg">
            No Game Results Yet
          </AlertTitle>
          <AlertDescription maxWidth = "sm">
            Start playing to see your results here!
          </AlertDescription>
        </Alert>
      </Container>
        );
    }

    return (
        <Container maxW = "4xl" py = {6}>
      <VStack spacing = {6} align = "stretch">
        {/* Header */} <Box>
          <Heading size = "lg" color = "gray.800" mb = {2} display = "flex" alignItems = "center" gap = {2}>
            <Icon as = {InfoIcon} color = "blue.500" />
            Game Results
          </Heading>
          <Text color = "gray.600" fontSize = "sm">
            Session: {gameData.sessionId.substring(0, 8)}...
          </Text>
        </Box>

          <Card>
          <CardBody>
            <StatGroup>
              <Stat textAlign = "center">
                <StatLabel>Total Attempts</StatLabel>
                <StatNumber color = "blue.500">{gameData.totalAttempts}</StatNumber>
              </Stat>

              <Stat textAlign = "center">
                <StatLabel>Correct</StatLabel>
                <StatNumber color = "green.500">{gameData.correctAnswers}</StatNumber>
              </Stat>

              <Stat textAlign = "center">
                <StatLabel>Incorrect</StatLabel>
                <StatNumber color = "red.500">
                  {gameData.totalAttempts - gameData.correctAnswers}
                </StatNumber>
              </Stat>

              <Stat textAlign = "center">
                <StatLabel>Accuracy</StatLabel>
                <StatNumber color = {`${getAccuracyColor(gameData.accuracyPercentage)}.500`}>
                  {gameData.accuracyPercentage.toFixed(1)}%
                </StatNumber>
              </Stat>
            </StatGroup>
          </CardBody>
        </Card>

          <Card>
          <CardBody>
            <Heading size = "md" mb = {4} color = {colorMode === 'dark' ? 'gray.200' : 'gray.300'}>
              Answer History
            </Heading>

            <VStack spacing = {3} align = "stretch">
              {gameData.results.map((result, index) => (
                  <Box key = {index}>
                  <Card
                      variant = "outline"
                      bg = {result.isCorrect ? "green.50" : "red.50"}
                      borderColor = {result.isCorrect ? "green.200" : "red.200"}
                  >
                    <CardBody py = {3}>
                      <HStack justify = "space-between" align = "center">
                        <HStack spacing = {4} align = "center">
                          <Icon
                              as = {result.isCorrect ? CheckCircleIcon : WarningIcon}
                              color = {result.isCorrect ? "green.500" : "red.500"}
                              boxSize = {5}
                          />

                          <VStack align = "start" spacing = {1}>
                            <HStack spacing = {4} align = "center">
                              <Text fontWeight = "semibold" color = "gray.800">
                                Value: {result.value}
                              </Text>
                              <HStack spacing = {1} color = "gray.500" fontSize = "sm">
                                <Icon as = {TimeIcon} boxSize = {3} />
                                <Text>{formatTimestamp(result.timestamp)}</Text>
                              </HStack>
                            </HStack>

                            <HStack spacing = {3} fontSize = "sm">
                              <Badge
                                  colorScheme = {result.isCorrect ? "green" : "red"}
                                  variant = "solid"
                              >
                                You: "{result.userInput}"
                              </Badge>
                              <Text color = "gray.400">→</Text>
                              <Badge colorScheme = {colorMode == 'dark' ? "#21262E" : "#21262E"} variant = "outline">
                                Expected: "{result.expectedOutput}"
                              </Badge>
                            </HStack>
                          </VStack>
                        </HStack>

                        <Badge
                            colorScheme = {result.isCorrect ? "green" : "red"}
                            variant = "solid"
                            fontSize = "xs"
                        >
                          {result.isCorrect ? 'Correct' : 'Incorrect'}
                        </Badge>
                      </HStack>
                    </CardBody>
                  </Card>
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Container>
    );
};

export default GameResultsDisplay;