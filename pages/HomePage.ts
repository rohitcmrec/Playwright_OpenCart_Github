import { Page, Locator } from '@playwright/test'
import { RegisterPage } from './RegisterPage';
import { LoginPage } from './LoginPage';
import { Logger } from '../utils/Logger';

export class HomePage {

    private readonly page: Page;
    private readonly myAccountLink: Locator;
    private readonly loginLink: Locator;
    private readonly registerLink: Locator;
    private readonly searchBox: Locator;
    private readonly searchBtn: Locator;
    private readonly PAGE_NAME = 'HomePage';

    constructor(page: Page) {
        this.page = page;
        this.myAccountLink = this.page.locator('span', { hasText: 'My Account' });
        this.loginLink = this.page.getByRole('link', { name: 'Login' });
        this.registerLink = this.page.getByRole('link', { name: 'Register', exact: true });
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

    async clickLogin(): Promise<LoginPage> {
        try {
            await this.loginLink.click();
            return new LoginPage(this.page);
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to click Login link', error);
            throw error;
        }
    }

    async clickRegister(): Promise<RegisterPage> {
        try {
            await this.registerLink.click();
            return new RegisterPage(this.page);
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to click Register link', error);
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
}
