const hostURL = 'https://mrdsservices-sit.wellsfargo.com/api/customer/search';

const URL = {
    MCCI_SRC: `${hostURL}/api/MCCInquiry/V1/merchantcategorycode?` // Param: mccDescription, transProcType
};

const APICONTEXT = {
    prod:               '/api',
    uiLocalTesting:     'https://localhost:44311',
    uiPersonalTesting:  hostURL

};

const ENDPOINT_MRDS = window.location.href.includes('localhost') ? APICONTEXT.uiPersonalTesting : APICONTEXT.prod;
const ENDPOINT_ASSETS = '../../../assets';

export { ENDPOINT_MRDS, URL, ENDPOINT_ASSETS };
