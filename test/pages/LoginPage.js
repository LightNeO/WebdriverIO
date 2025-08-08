import BasePage from './BasePage.js';
import { LoginLocators } from '../locators/LoginLocators.js';
import { TestData } from '../data/TestData.js';

export default class LoginPage extends BasePage {
    constructor() {
        super();
        this.url = TestData.loginUrl;
    }

    get title() {
        return $(LoginLocators.title);
    }

    get usernameInput() {
        return $(LoginLocators.usernameInput);
    }

    get passwordInput() {
        return $(LoginLocators.passwordInput);
    }

    get loginButton() {
        return $(LoginLocators.loginButton);
    }

    get loginRedirectLink() {
        return $(LoginLocators.loginRedirectLink);
    }

    get errorMessage() {
        return $(LoginLocators.errorMessage);
    }

    get successMessage() {
        return $(LoginLocators.successMessage);
    }

    get registerLink() {
        return $(LoginLocators.registerLink);
    }

    get forgotPasswordLink() {
        return $(LoginLocators.forgotPasswordLink);
    }

    async open() {
        await this.navigateTo(this.url);
    }

    async loginWithValidCredentials() {
        await this.setValue(this.usernameInput, TestData.validUser.username);
        await this.setValue(this.passwordInput, TestData.validUser.password);
        await this.clickElement(this.loginButton);
    }

    async loginWithInvalidCredentials() {
        await this.setValue(this.usernameInput, TestData.invalidUser.username);
        await this.setValue(this.passwordInput, TestData.invalidUser.password);
        await this.clickElement(this.loginButton);
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
