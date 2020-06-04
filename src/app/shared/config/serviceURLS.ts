import { ENDPOINT_URI } from './envAPIContext';

export const SERVICE_URLS = {
    fetchMerchantDetails: ENDPOINT_URI + '/api/MCCInquiry/V1/merchantcategorycode?',
    forMccFinder: ENDPOINT_URI + '/api/MCCInquiry/V1/merchantcategorycode?',
    saveProcessingProfile: ENDPOINT_URI + '/api/MCCInquiry/V1/SaveMerchantProcessing?',
    saveAccountFeatures: ENDPOINT_URI + '',
    saveEquipment: ENDPOINT_URI + '',
    savePricing: ENDPOINT_URI + '',
    saveSummary: ENDPOINT_URI + '',
    saveProposalDocumentPage: ENDPOINT_URI + '',
};