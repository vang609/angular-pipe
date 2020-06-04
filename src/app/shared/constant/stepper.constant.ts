import { Stepper } from '../models/stepper.model';

export const stepperSteps: Array<Stepper> = [
    {
        name: 1, head: 'Basic Merchant Profile', desc: 'Who is Merchant? Their Name & Address', initiated: true, completedForm: false, formValid: false, activateStep: true,
        routeName: 'basic-merchant-profile', footerLabel: '* Indicates an optional field'
    },
    {
        name: 2, head: 'Processing Profile', desc: 'Information about business type & Processing Type ', initiated: false, completedForm: false, formValid: false,
        activateStep: false, routeName: 'merchant-processing', footerLabel: 'All are required fields'
    },
    {
        name: 3, head: 'Account Features', desc: 'Lorem ipsum dolor sit amet, consectetur', initiated: false, completedForm: false, formValid: false, activateStep: false,
        routeName: 'account-features', footerLabel: '* Indicates an optional field'
    },
    {
        name: 4, head: 'Equipment', desc: 'Lorem ipsum dolor sit amet, consectetur', initiated: false, completedForm: false, formValid: false, activateStep: false,
        routeName: 'equipment', footerLabel: '* Indicates an optional field'
    },
    {
        name: 5, head: 'Pricing', desc: 'Lorem ipsum dolor sit amet, consectetur', initiated: false, completedForm: false, formValid: false, activateStep: false,
        routeName: 'pricing', footerLabel: '* Indicates an optional field'
    },
    {
        name: 6, head: 'Summary', desc: 'Lorem ipsum dolor sit amet, consectetur', initiated: false, completedForm: false, formValid: false, activateStep: false,
        routeName: 'summary', footerLabel: '* Indicates an optional field'
    },
    {
        name: 7, head: 'Proposal Document Page', desc: 'Lorem ipsum dolor sit amet, consectetur', initiated: false, completedForm: false, formValid: false, activateStep: false,
        routeName: 'proposal', footerLabel: '* Indicates an optional field'
    }
];
