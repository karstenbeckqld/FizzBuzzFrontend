export interface Rule {
    id:number;
    divisor: number;
    text: string;
    isActive: boolean;
}

export interface ValueTransferModel {
    Value: number | null;
    Text: string | undefined;
}