import { Page, Locator } from '@playwright/test'
import { RegisterPage } from './RegisterPage';
import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage';
import { SearchResultsPage } from './SearchResultsPage';
import { Logger } from '../utils/Logger';

export class MyAccount {

    private readonly page: Page;
    private readonly myAccountLink: Locator;
    private readonly logoutLink: Locator;
    private readonly continueBtn: Locator;
    private readonly searchBox: Locator;
    private readonly searchBtn: Locator;
    private readonly PAGE_NAME = 'MyAccount';

    constructor(page: Page) {
        this.page = page;
        this.myAccountLink = this.page.locator('span', { hasText: 'My Account' });
        this.logoutLink = this.page.getByRole('link', { name: 'Logout' });
        this.continueBtn = this.page.getByRole('button', { name: 'Continue', exact: true });
        this.searchBox = this.page.getByRole('textbox', { name: 'Search', exact: true });
        this.searchBtn = this.page.locator('#search button');
    }

    async titleHomePage(): Promise<string> {
        try {
            return await this.page.title();
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to get page title', error);
            throw error;
        }
    }

    async urlHomePage(): Promise<string> {
        try {
            return this.page.url();
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to get page URL', error);
            throw error;
        }
    }

    async clickMyAccount() {
        try {
            await this.myAccountLink.click();
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to click My Account link', error);
            throw error;
        }
    }

    async clickLogout(): Promise<HomePage> {
        try {
            await this.logoutLink.click();
            await this.continueBtn.click();
            return new HomePage(this.page);
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to perform logout', error);
            throw error;
        }
    }

    async enterProductName(name: string) {
        try {
            await this.searchBox.fill(name);
        } catch (error) {
            Logger.error(this.PAGE_NAME, `Failed to enter product name: "${name}"`, error);
            throw error;
        }
    }

    async clickSearchBtn() {
        try {
            await this.searchBtn.click();
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to click search button', error);
            throw error;
        }
    }

    async searchProduct(productName: string): Promise<SearchResultsPage> {
        Logger.info(this.PAGE_NAME, `Searching for product: "${productName}"`);
        try {
            await this.enterProductName(productName);
            await this.clickSearchBtn();
            return new SearchResultsPage(this.page);
        } catch (error) {
            Logger.error(this.PAGE_NAME, `Failed to search for product: "${productName}"`, error);
            throw error;
        }
    }
}
