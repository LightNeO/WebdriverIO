import BasePage from './BasePage.js';
import { ProductLocators } from '../locators/ProductLocators.js';
import { TestData } from '../data/TestData.js';

export default class ProductPage extends BasePage {
    constructor() {
        super();
        this.url = TestData.productsUrl;
    }

    get title() {
        return $(ProductLocators.title);
    }

    get productGrid() {
        return $(ProductLocators.productGrid);
    }

    get productCards() {
        return $$(ProductLocators.productCards);
    }

    get searchInput() {
        return $(ProductLocators.searchInput);
    }

    get searchButton() {
        return $(ProductLocators.searchButton);
    }

    get sortButton() {
        return $(ProductLocators.sortButton);
    }

    get productImages() {
        return $$(ProductLocators.productImages);
    }

    get productNames() {
        return $$(ProductLocators.productNames);
    }

    get detailsPageProductName() {
        return $(ProductLocators.detailsPageProductName);
    }

    get productPrices() {
        return $$(ProductLocators.productPrices);
    }

    get detailsPageProductPrice() {
        return $(ProductLocators.detailsPageProductPrice);
    }

    get productRatings() {
        return $$(ProductLocators.productRatings);
    }

    get detailsPageProductRating() {
        return $(ProductLocators.detailsPageProductRating);
    }

    get viewDetailsButtons() {
        return $$(ProductLocators.viewDetailsButtons);
    }

    get productNameOnDetailsPage() {
        return $(ProductLocators.productNameOnDetailsPage);
    }
    
    async open() {
        await this.navigateTo(this.url);
    }

    async getProductCount() {
        const products = await this.productCards;
        return products.length;
    }

    async searchForProduct(searchTerm = TestData.products.searchTerms[0]) {
        await this.setValue(this.searchInput, searchTerm);
        await this.clickElement(this.searchButton);
    }

    async getTitleText() {
        return await this.getText(this.title);
    }

}
