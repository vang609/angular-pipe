export interface GridResponse {
    id: string;
    mccCode: string;
    sicCode: string;
    createdOn: string;
    modifiedOn: string;
    mccName: string;
    bVsC: string;
    cbRatio: number;
    chgBckRatio: number;
    crDays: number;
    crRatio: number;
    ecaCategory: string;
    keywords: string;
    markedforB2B: string;
    mccAmexType: string;
    mccAvgTktInd: number;
    mccDescription: string;
    mccType: string;
    ndxDays: number;
    ndxRatio: number;
    returnRatio: number;
    reversalRatio: number;
    riskLevel: string;
    validMAI: number;
    volumePercentAmex: number;
    mcAuthValue: number;
    isActive: boolean;
    similarMerchants: Array<SimilarMerchants>;
}

export interface SimilarMerchants {
    id: string;
    mccCode: string;
    mccName: string;
    mccDescription: string;
}

export interface SourceType {
    name: string;
    code: string;
    checked: boolean;
    disable: boolean;
}
