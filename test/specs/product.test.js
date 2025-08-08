import { expect } from 'chai';
import ProductPage from '../pages/ProductPage.js';
import { CustomAssertions } from '../utils/Assertions.js';
import { TestData } from '../data/TestData.js';

describe('Product Page Tests', () => {
    let productPage;

    beforeEach(async () => {
        productPage = new ProductPage();
        await productPage.open();
    });

    describe('Page Elements', () => {
        it('Title is visible', async () => {
            await CustomAssertions.assertElementDisplayed(productPage.title, 'Title should be displayed');
        });

        it('Title has correct text', async () => {
            const title = await productPage.title;
            await CustomAssertions.assertElementText(title, TestData.productsPageTitle, 'Title should have correct text');
        });
    });

    describe('Product functionality', () => {
        it('Search for products', async () => {
            await productPage.searchForProduct();
            await browser.pause(TestData.timeouts.short);
            
            const productCount = await productPage.getProductCount();
            expect(productCount).to.be.greaterThan(0);
        });

        it('Product grid is displayed', async () => {
            await CustomAssertions.assertElementDisplayed(productPage.productGrid, 'Product grid should be displayed');
        });

        it('Search input is displayed', async () => {
            await CustomAssertions.assertElementDisplayed(productPage.searchInput, 'Search input should be displayed');
        });

        it('Search button is displayed', async () => {
            await CustomAssertions.assertElementDisplayed(productPage.searchButton, 'Search button should be displayed');
        });
        
        it('Sort button is displayed', async () => {
            await CustomAssertions.assertElementDisplayed(productPage.sortButton, 'Sort button should be displayed');
        });

        it('Product images are displayed', async () => {
            await productPage.waitForPageLoad();
            const productImages = await productPage.productImages;
            await CustomAssertions.assertElementsDisplayed(productImages, 'Product images should be displayed');
        });

    });

    describe('Product details', () => {
        it('Product title matches details page title', async () => {
            const productName = await productPage.productNames[0].getText();
            await productPage.viewDetailsButtons[0].click();
            await browser.pause(TestData.timeouts.short);
            const detailsPageProductName = await productPage.detailsPageProductName;
            await CustomAssertions.assertElementTextContains(detailsPageProductName, productName, 'Product name should match details page title');
        });

        it('Product price matches details page price', async () => {
            const productPrice = await productPage.productPrices[0].getText();
            await productPage.viewDetailsButtons[0].click();
            await browser.pause(TestData.timeouts.short);
            const detailsPageProductPrice = await productPage.detailsPageProductPrice;
            await CustomAssertions.assertElementTextContains(detailsPageProductPrice, productPrice, 'Product price should match details page price');
        });

        it.only('Product rating matches details page rating', async () => {
            let productRating = await productPage.productRatings[0].getText();
            const productRatingNumber = productRating.replace('⭐ ', '');
            await productPage.viewDetailsButtons[0].click();
            await browser.pause(TestData.timeouts.short);
            const detailsPageProductRating = await productPage.detailsPageProductRating;
            await CustomAssertions.assertElementTextContains(detailsPageProductRating, productRating, 'Product rating should match details page rating');
        });
    });
});
