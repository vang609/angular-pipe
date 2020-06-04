import { ENDPOINT_ASSETS } from './envAPIContextExternal';


export const SERVICE_ASSETS_PATH = {
    fetchMerchantDetails: ENDPOINT_ASSETS + '/json/basic-merchant.json',
    forMccFinder: ENDPOINT_ASSETS + '/json/mcc-data.json',
    forprocessingType: ENDPOINT_ASSETS + '/json/processingType.json',
    forprocessingOption: ENDPOINT_ASSETS + '/json/processingOption.json',
    saveProcessingProfile: ENDPOINT_ASSETS + '/json/SaveMerchantProcessing.json'
};
