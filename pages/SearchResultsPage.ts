import { Page, Locator } from '@playwright/test'
import { ProductPage } from './ProductPage';
import { Logger } from '../utils/Logger';

export class SearchResultsPage {

    private readonly page: Page;
    private readonly searchResultsHeading: Locator;
    private readonly productLinks: Locator;
    private readonly addToCartButtons: Locator;
    private readonly PAGE_NAME = 'SearchResultsPage';

    constructor(page: Page) {
        this.page = page;
        this.searchResultsHeading = this.page.locator('h1');
        this.productLinks = this.page.locator('h4 a');
        this.addToCartButtons = this.page.getByRole('button', { name: 'Add to Cart' });
    }

    async getPageTitle(): Promise<string> {
        try {
            return await this.page.title();
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to get page title', error);
            throw error;
        }
    }

    async getPageUrl(): Promise<string> {
        try {
            return this.page.url();
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to get page URL', error);
            throw error;
        }
    }

    async getSearchResultsHeading(): Promise<string> {
        try {
            return await this.searchResultsHeading.textContent() || '';
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to get search results heading', error);
            throw error;
        }
    }

    async clickProductByName(productName: string): Promise<ProductPage> {
        Logger.info(this.PAGE_NAME, `Clicking product: "${productName}"`);
        try {
            await this.page.locator('h4').getByRole('link', { name: productName }).click();
            return new ProductPage(this.page);
        } catch (error) {
            Logger.error(this.PAGE_NAME, `Failed to click product "${productName}"`, error);
            throw error;
        }
    }

    async getProductCount(): Promise<number> {
        try {
            return await this.productLinks.count();
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to get product count', error);
            throw error;
        }
    }

    async isProductDisplayed(productName: string): Promise<boolean> {
        Logger.info(this.PAGE_NAME, `Checking if product "${productName}" is displayed`);
        try {
            const product = this.page.locator('h4').getByRole('link', { name: productName });
            const isVisible = await product.isVisible();
            if (!isVisible) {
                Logger.warn(this.PAGE_NAME, `Product "${productName}" is NOT displayed`);
            }
            return isVisible;
        } catch (error) {
            Logger.error(this.PAGE_NAME, `Error checking if product "${productName}" is displayed`, error);
            return false;
        }
    }
}
