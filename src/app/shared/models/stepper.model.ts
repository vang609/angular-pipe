export interface Stepper {
    name: number;
    head: string;
    desc: string;
    completedForm: boolean;
    formValid: boolean;
    activateStep: boolean;
    routeName: string;
}