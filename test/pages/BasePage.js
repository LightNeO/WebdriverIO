import { TestData } from '../data/TestData.js';

export default class BasePage {
    constructor() {
        this.baseUrl = TestData.baseUrl;
    }

    async navigateTo(path = '') {
        await browser.url(`${this.baseUrl}${path}`);
    }

    async waitForPageLoad(timeout = TestData.timeouts.pageLoad) {
        // Wait for network to be idle (no pending requests)
        await browser.waitUntil(
            () => browser.execute(() => {
                // Check if there are any pending network requests
                if (typeof performance !== 'undefined' && performance.getEntriesByType) {
                    const navigationEntries = performance.getEntriesByType('navigation');
                    if (navigationEntries.length > 0) {
                        const navEntry = navigationEntries[0];
                        return navEntry.loadEventEnd > 0;
                    }
                }
                return true;
            }),
            { timeout, timeoutMsg: 'Network did not become idle' }
        );
    }

    async waitForElement(element, timeout = TestData.timeouts.elementWait) {
        await element.waitForDisplayed({ timeout });
    }

    async waitForClickable(element, timeout = TestData.timeouts.elementWait) {
        await element.waitForClickable({ timeout });
    }

    async clickElement(element) {
        await this.waitForClickable(element);
        await element.click();
    }

    async setValue(element, value) {
        await this.waitForElement(element);
        await element.setValue(value);
    }

    async getText(element) {
        await this.waitForElement(element);
        return await element.getText();
    }

    async isElementDisplayed(element) {
        try {
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    async isFieldValid(element) {
        return await browser.execute((el) => {
            if (el && typeof el.checkValidity === 'function') {
                return el.checkValidity();
            }
            return true;
        }, element);
    }

    async takeScreenshot(name) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        await browser.saveScreenshot(`${TestData.screenshots.directory}/${name}_${timestamp}.${TestData.screenshots.format}`);
    }
}
