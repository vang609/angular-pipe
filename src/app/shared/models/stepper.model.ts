export interface Stepper {
    name: number;
    head: string;
    desc: string;
    initiated: boolean;
    completedForm: boolean;
    formValid: boolean;
    activateStep: boolean;
    routeName: string;
    footerLabel: string;
}