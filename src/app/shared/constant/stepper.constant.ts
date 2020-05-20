import { Stepper } from '../models/stepper.model';

export const stepperSteps: Array<Stepper> = [
    {
        name: 1, head: 'Basic Merchant Profile', desc: 'Who is Merchant? Their Name & Address', completedForm: false, formValid: false, activateStep: true,
        routeName: 'basic-merchant-profile'
    },
    {
        name: 2, head: 'Processing Profile', desc: 'Information about business type & Processing Type ', completedForm: false, formValid: false,
        activateStep: false, routeName: 'merchant-processing'
    },
    {
        name: 3, head: 'Account Features', desc: 'Lorem ipsum dolor sit amet, consectetur', completedForm: false, formValid: false, activateStep: false,
        routeName: 'account-features'
    },
    {
        name: 4, head: 'Equipment', desc: 'Lorem ipsum dolor sit amet, consectetur', completedForm: false, formValid: false, activateStep: false,
        routeName: 'equipment'
    },
    {
        name: 5, head: 'Pricing', desc: 'Lorem ipsum dolor sit amet, consectetur', completedForm: false, formValid: false, activateStep: false,
        routeName: 'pricing'
    },
    {
        name: 6, head: 'Summary', desc: 'Lorem ipsum dolor sit amet, consectetur', completedForm: false, formValid: false, activateStep: false,
        routeName: 'summary'
    },
    {
        name: 7, head: 'Proposal Document Page', desc: 'Lorem ipsum dolor sit amet, consectetur', completedForm: false, formValid: false, activateStep: false,
        routeName: 'proposal'
    }
];
