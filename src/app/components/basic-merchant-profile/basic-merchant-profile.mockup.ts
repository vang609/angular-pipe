export const state = [
    {
        code: 'AA',
        name: 'Armed Forces America'
    },
    {
        code: 'AE',
        name: 'Armed Forces'
    },
    {
        code: 'AP',
        name: 'Armed Forces Pacific'
    },
    {
        code: 'AK',
        name: 'Alaska'
    },
    {
        code: 'AL',
        name: 'Alabama'
    },
    {
        code: 'AR',
        name: 'Arkansas'
    },
    {
        code: 'AZ',
        name: 'Arizona'
    },
    {
        code: 'CA',
        name: 'California'
    },
    {
        code: 'CO',
        name: 'Colorado'
    },
    {
        code: 'CT',
        name: 'Connecticut'
    },
    {
        code: 'DC ',
        name: 'Washington DC'
    },
    {
        code: 'DE',
        name: 'Delaware'
    },
    {
        code: 'FL',
        name: 'Florida'
    },
    {
        code: 'GA',
        name: 'Georgia'
    },
    {
        code: 'GU',
        name: 'Guam'
    },
    {
        code: 'HI',
        name: 'Hawaii'
    },
    {
        code: 'IA',
        name: 'Iowa'
    },
    {
        code: 'ID',
        name: 'Idaho'
    },
    {
        code: 'IL',
        name: 'Illinois'
    },
    {
        code: 'IN',
        name: 'Indiana'
    },
    {
        code: 'KS',
        name: 'Kansas'
    },
    {
        code: 'KY',
        name: 'Kentucky'
    },
    {
        code: 'LA',
        name: 'Louisiana'
    },
    {
        code: 'MA',
        name: 'Massachusetts'
    },
    {
        code: 'MD',
        name: 'Maryland'
    },
    {
        code: 'ME',
        name: 'Maine'
    },
    {
        code: 'MI',
        name: 'Michigan'
    },
    {
        code: 'MN',
        name: 'Minnesota'
    },
    {
        code: 'MO',
        name: 'Missouri'
    },
    {
        code: 'MS',
        name: 'Mississippi'
    },
    {
        code: 'MT',
        name: 'Montana'
    },
    {
        code: 'NC',
        name: 'North Carolina'
    },
    {
        code: 'ND',
        name: 'North Dakota'
    },
    {
        code: 'NE',
        name: 'Nebraska'
    },
    {
        code: 'NH',
        name: 'New Hampshire'
    },
    {
        code: 'NJ',
        name: 'New Jersey'
    },
    {
        code: 'NM',
        name: 'New Mexico'
    },
    {
        code: 'NV',
        name: 'Nevada'
    },
    {
        code: 'NY',
        name: 'New York'
    },
    {
        code: 'OH',
        name: 'Ohio'
    },
    {
        code: 'OK',
        name: 'Oklahoma'
    },
    {
        code: 'OR',
        name: 'Oregon'
    },
    {
        code: 'PA',
        name: 'Pennsylvania'
    },
    {
        code: 'PR',
        name: 'Puerto Rico'
    },
    {
        code: 'RI',
        name: 'Rhode Island'
    },
    {
        code: 'SC',
        name: 'South Carolina'
    },
    {
        code: 'SD',
        name: 'South Dakota'
    },
    {
        code: 'TN',
        name: 'Tennessee'
    },
    {
        code: 'TX',
        name: 'Texas'
    },
    {
        code: 'UT',
        name: 'Utah'
    },
    {
        code: 'VA',
        name: 'Virginia'
    },
    {
        code: 'VI',
        name: 'Virgin Islands'
    },
    {
        code: 'VT',
        name: 'Vermont'
    },
    {
        code: 'WA',
        name: 'Washington'
    },
    {
        code: 'WI',
        name: 'Wisconsin'
    },
    {
        code: 'WV',
        name: 'West Virginia'
    },
    {
        code: 'WY',
        name: 'Wyoming'
    }
];

export const merchantProfile = {
    statusInfo: [
        {
            type: 'ERROR',
            subType: 'APPL',
            code: 'Client.InvalidValue:KOEC0027',
            message: 'One or more elements in the request have an invalid value'
        }
    ],
    customers: [
        {
            name: 'awetest_072920119173230',
            number: '453689321',
            entityType: 'induvidual',
            dateOfBirth: '5/2/1981 12:00:00 AM',
            ssn: '678451234',
            sourceName: 'WCIS',
            addresses: [
                {
                    addressType: 'REGISTERED',
                    region: 'domestic',
                    country: 'US'
                },
                {
                    addressType: 'PHYSICAL',
                    region: 'domestic',
                    country: 'US'
                }
            ]
        }
    ]
};

export const merchantProfileElse = {
    send: {
        wellsCustomer: true,
        ssnOrein: true,
        ssn: '111111111',
        ein: '',
        name: 'awetest_072920119173230',
        mobilePhone: 9999999999,
        businessPhone: 1234567890,
        email: 'test@wells.com',
        address: '1800 BIG OAK RD, 71201 - 4624 APT 666',
        zipcode: 26209,
        city: 'MONROE',
        state: 'NC',
        dbaName: '* DBA TEST VALUE',
        ecn: 453689321,
        formType: {
            name: 1,
            head: 'Basic Merchant Profile',
            desc: 'Who is Merchant ? Their Name & Address',
            initiated: true,
            completedForm: true,
            formValid: true,
            activateStep: true,
            routeName: 'basic - merchant - profile'
        }
    },
    formType: {
        name: 1, head: 'Basic Merchant Profile', desc: 'Who is Merchant? Their Name & Address', initiated: true, completedForm: false, formValid: false, activateStep: true,
        routeName: 'basic-merchant-profile', footerLabel: '* Indicates an optional field'
    },
    ssnBackup: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    einBackup: [0, 0, 0, 0, 0, 0, 0, 0, 0]
};
