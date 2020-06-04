export const sendObj = {
    send:
    {
        DBANAME: '*DBA TEST VALUE',
        ECN: '999999999',
        IsMultipleLocation: false,
        LocationCount: 1,
        ProcessingProfiles: [
            {
                PrimaryLocation: 'Y',
                B2B: 95,
                B2C: 5,
                MccId: '3008',
                AverageTicket: 45,
                CardPresent: 6,
                CardNotPresent: 94,
                ProcessingType: 'B',
                ProcessingOption: '013',
                CommunicationMethod: 'Dial (A)',
                VisaOrMasterCard: 567,
                Discover: 17.009999999999998,
                AmericanExpress: 85.05,
                PinDebitVolume: 888,
                TotalAnnualVolume: 1557.06,
                AcceptAmericanExpress: false,
                TransactionSource: false
            }
        ]
    },
    formType:
    {
        name: 2,
        head: 'Processing Profile',
        desc: 'Information about business type & Processing Type ',
        initiated: true,
        completedForm: false,
        formValid: true,
        activateStep: true,
        routeName: 'merchant-processing'
    },
    numeric: 1,
    mccCodeContent: '3008 - 3008 - LUFTHAN(I)',
    isConfirm: true,
    AcceptAmericanExpress: false,
    location: true,
    VolumePercentAmex: 0.15
};

export const patchObj = {
    PrimaryLocation: 'Y',
    B2B: 95,
    B2C: 5,
    MccId: '3008',
    AverageTicket: 45,
    CardPresent: 6,
    CardNotPresent: 94,
    ProcessingType: 'B',
    ProcessingOption: '013',
    CommunicationMethod: 'Dial (A)',
    VisaOrMasterCard: 567,
    Discover: 17.009999999999998,
    AmericanExpress: 85.05,
    PinDebitVolume: 888,
    TotalAnnualVolume: 1557.06,
    AcceptAmericanExpress: false,
    TransactionSource: false,
    numeric: 1,
    mccCodeContent: '3008 - 3008 - LUFTHAN(I)',
    isConfirm: true,
    location: true,
    VolumePercentAmex: 0.15
};

