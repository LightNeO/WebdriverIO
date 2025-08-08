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

    describe('Search functionality', () => {
        it('Search for products', async () => {
            let productToSearch = TestData.products.searchTerms[Math.floor(Math.random() * TestData.products.searchTerms.length)];
            await productPage.searchForProduct(productToSearch);
            await browser.pause(TestData.timeouts.short);
            await CustomAssertions.assertElementTextContains(productPage.productNames[0], productToSearch, 'Search input should contain the product name');
        });

        it('Filter products by price low to high', async () => {
            await productPage.filterProductsLowToHigh();
            await browser.pause(TestData.timeouts.medium);
            const prices = await productPage.productPrices;
            await CustomAssertions.assertElementsTextSorted(prices, 'asc', 'Prices should be sorted low to high');
        });

        it('Filter products by price high to low', async () => {
            await productPage.filterProductsHighToLow();
            await browser.pause(TestData.timeouts.medium);
            const prices = await productPage.productPrices;
            await CustomAssertions.assertElementsTextSorted(prices, 'desc', 'Prices should be sorted high to low');
        });

        it('Filter products by rating', async () => {
            await productPage.filterProductsByRating();
            await browser.pause(TestData.timeouts.medium);
            const ratings = await productPage.productRatings;
            await CustomAssertions.assertElementsTextSorted(ratings, 'asc', 'Ratings should be sorted by rating');
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

        it('Product rating matches details page rating', async () => {
            let productRating = await productPage.productRatings[0].getText();
            const productRatingNumber = productRating.replace('⭐ ', '');
            await productPage.viewDetailsButtons[0].click();
            await browser.pause(TestData.timeouts.short);
            const detailsPageProductRating = await productPage.detailsPageProductRating;
            await CustomAssertions.assertElementTextContains(detailsPageProductRating, productRatingNumber, 'Product rating should match details page rating');
        });
    });
});
