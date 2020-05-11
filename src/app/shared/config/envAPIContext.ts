const hostURL = 'https://localhost:44311';

const URL = {
    MCCI_SRC: `${hostURL}/api/MCCInquiry/V1/merchantcategorycode?` // Param: mccDescription, transProcType
};

const APICONTEXT = {
    prod:               '/api',
    uiLocalTesting:     'https://localhost:44311',
    uiPersonalTesting:  hostURL

};

const ENDPOINT_URI = window.location.href.includes('localhost') ? APICONTEXT.uiPersonalTesting : APICONTEXT.prod;

export { APICONTEXT, ENDPOINT_URI, URL };
