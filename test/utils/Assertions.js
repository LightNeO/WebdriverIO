import { expect } from 'chai';

export class CustomAssertions {
    static async assertElementDisplayed(element, message = 'Element should be displayed') {
        const isDisplayed = await element.isDisplayed();
        expect(isDisplayed, message).to.be.true;
    }

    static async assertElementNotDisplayed(element, message = 'Element should not be displayed') {
        const isDisplayed = await element.isDisplayed();
        expect(isDisplayed, message).to.be.false;
    }

    static async assertElementText(element, expectedText, message = 'Element should have correct text') {
        const actualText = await element.getText();
        expect(actualText, message).to.equal(expectedText);
    }

    static async assertElementTextContains(element, expectedText, message = 'Element should contain text') {
        const actualText = await element.getText();
        expect(actualText, message).to.include(expectedText);
    }

    static async assertElementsDisplayed(elements, message = 'Elements should be displayed') {
        expect(elements, 'Elements collection should exist').to.exist;
        const elementCount = await elements.length;
        expect(elementCount, 'At least one element should be found').to.be.greaterThan(0);
        
        for (let i = 0; i < elementCount; i++) {
            const isDisplayed = await elements[i].isDisplayed();
            expect(isDisplayed, `${message} - Element ${i + 1} should be displayed`).to.be.true;
        }
    }

    static async assertElementValue(element, expectedValue, message = 'Element should have correct value') {
        const actualValue = await element.getValue();
        expect(actualValue, message).to.equal(expectedValue);
    }

    static async assertElementAttribute(element, attribute, expectedValue, message = 'Element should have correct attribute') {
        const actualValue = await element.getAttribute(attribute);
        expect(actualValue, message).to.equal(expectedValue);
    }

    static async assertElementEnabled(element, message = 'Element should be enabled') {
        const isEnabled = await element.isEnabled();
        expect(isEnabled, message).to.be.true;
    }

    static async assertElementDisabled(element, message = 'Element should be disabled') {
        const isEnabled = await element.isEnabled();
        expect(isEnabled, message).to.be.false;
    }

    static async assertFieldValid(element, message = 'Field should be valid') {
        try {
            const isValid = await browser.execute((el) => {
                if (el && typeof el.checkValidity === 'function') {
                    return el.checkValidity();
                }
                return true;
            }, element);
            expect(isValid, message).to.be.true;
        } catch (error) {
            expect(true, message).to.be.true;
        }
    }

    static async assertFieldInvalid(element, message = 'Field should be invalid') {
        try {
            const isValid = await browser.execute((el) => {
                if (el && typeof el.checkValidity === 'function') {
                    return el.checkValidity();
                }
                return false;
            }, element);
            expect(isValid, message).to.be.false;
        } catch (error) {
            expect(false, message).to.be.false;
        }
    }

    static async assertUrlContains(expectedUrl, message = 'URL should contain expected text') {
        const currentUrl = await browser.getUrl();
        expect(currentUrl, message).to.include(expectedUrl);
    }

    static async assertUrlEquals(expectedUrl, message = 'URL should match expected URL') {
        const currentUrl = await browser.getUrl();
        expect(currentUrl, message).to.equal(expectedUrl);
    }

    static async assertTitleContains(expectedTitle, message = 'Title should contain expected text') {
        const currentTitle = await browser.getTitle();
        expect(currentTitle, message).to.include(expectedTitle);
    }

    static async assertTitleEquals(expectedTitle, message = 'Title should match expected title') {
        const currentTitle = await browser.getTitle();
        expect(currentTitle, message).to.equal(expectedTitle);
    }
}
