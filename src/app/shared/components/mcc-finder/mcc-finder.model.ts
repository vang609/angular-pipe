export interface GridResponse {
    '_id': string;
    'MCCCode': string;
    'SICCode': string;
    'Statecode': number;
    'StatusCode': number;
    'MCCName': string;
    'ActiveInd': boolean;
    'BVsC': string;
    'CBRatio': number;
    'ChgBckRatio': number;
    'CRDays': number;
    'CRRatio': number;
    'DerivedMCC': string;
    'DiscoverEASIRestrict': string;
    'ECACategory': string;
    'InactiveInd': boolean;
    'Keyword': string;
    'Keywords': string;
    'MarkedforB2B': string;
    'MCCCodeId': string;
    'MCCAmexType': string;
    'MCCAvgTktInd': number;
    'MCCCreditType': string;
    'MCCDescription': string;
    'MCCType': string;
    'NDXDays': number;
    'NDXRatio': number;
    'ProductServiceType': string;
    'ReturnRatio': number;
    'ReversalRatio': number;
    'RiskLevel': string;
    'RiskLevelB2B': number;
    'RiskLevelInternet': string;
    'ValidMAI': number;
    'ValidMerlin': number;
    'VolumePercentAmex': number;
    'MCAuthValue': number;
    'IsActive': boolean;
    'SimilarMerchants': Array<SimilarMerchants>;
}

export interface SimilarMerchants {
    '_id': string;
    'MCCCode': string;
    'MCCName': string;
    'MCCDescription': string;
}

export interface SourceType {
    'name': string;
    'code': string;
    'checked': boolean;
    'disable': boolean;
}