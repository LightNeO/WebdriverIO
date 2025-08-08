import BasePage from './BasePage.js';
import { RegistrationLocators } from '../locators/RegistrationLocators.js';
import { TestData } from '../data/TestData.js';

export default class RegistrationPage extends BasePage {
    constructor() {
        super();
        this.url = TestData.registerUrl;
    }

    get title() {
        return $(RegistrationLocators.title);
    }

    get usernameInput() {
        return $(RegistrationLocators.usernameInput);
    }

    get emailInput() {
        return $(RegistrationLocators.emailInput);
    }

    get passwordInput() {
        return $(RegistrationLocators.passwordInput);
    }

    get registerButton() {
        return $(RegistrationLocators.registerButton);
    }

    get errorMessage() {
        return $(RegistrationLocators.errorMessage);
    }

    get successMessage() {
        return $(RegistrationLocators.successMessage);
    }

    get loginLink() {
        return $(RegistrationLocators.loginLink);
    }

    async open() {
        await this.navigateTo(this.url);
    }

    async registerWithValidData(userData = TestData.testUsers.randomUser) {
        await this.setValue(this.usernameInput, userData.username);
        await this.setValue(this.emailInput, userData.email);
        await this.setValue(this.passwordInput, userData.password);
        await this.clickElement(this.registerButton);
    }

    async getTitleText() {
        return await this.getText(this.title);
    }

    async getErrorMessageText() {
        return await this.getText(this.errorMessage);
    }

    async getSuccessMessageText() {
        return await this.getText(this.successMessage);
    }
}
