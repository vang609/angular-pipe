export interface ProcessingTypeOption {
 B2B: string;
 B2C: string;
 MccCode: string;
 AverageTicket: string;
 CardPresent: string;
 CardNotPresent: string;
 ProcessingType: string;
 TransactionSource: boolean; 
}

export interface ProcessingProfile {
    PrimaryLocation: string;
    B2B: string;
    B2C: string;
    MccId: string;
    AverageTicket: number;
    CardPresent: number;
    CardNotPresent: number;
    ProcessingType: string;
    ProcessingOption: string;
    CommunicationMethod: string;
    VisaOrMasterCard: number;
    Discover: number;
    AmericanExpress: number;
    PinDebitVolume: number;
    TotalAnnualVolume: number;
    TransactionSource: boolean;
    AcceptAmericanExpress: boolean;
}

export interface FormSubmit {
  ECN: string;
  DBANAME: string;
  IsMultipleLocation: boolean;
  LocationCount: number;
  ProcessingProfiles: any;
}

