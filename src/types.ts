export interface Rule {
    id: number;
    divisor: number;
    text: string;
    isActive: boolean;
}

export interface ValueTransferModel {
    Value: number | null;
    Text: string | undefined;
}

export interface GameResultDto {
    value: number;
    userInput: string;
    expectedOutput: string;
    isCorrect: boolean;
    timestamp: Date;
}

export interface GameSessionResultDto {
    results: GameResultDto[];
    totalAttempts: number;
    correctAnswers: number;
    accuracyPercentage: number;
}

export interface GameResult {
    expectedOutput: string;
    isCorrect: boolean;
    timestamp: string;
    userInput: string;
    value: number;
}

export interface GameSessionResult {
    accuracyPercentage: number;
    correctAnswers: number;
    results: GameResult[];
    sessionId: string;
    totalAttempts: number;
}