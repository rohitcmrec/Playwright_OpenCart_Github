import { Page, Locator } from '@playwright/test'
import { RegisterPage } from './RegisterPage';
import { HomePage } from './HomePage';
import { MyAccount } from './MyAccount';
import { Logger } from '../utils/Logger';

export class LoginPage {

    private readonly page: Page;
    private readonly usernameBox: Locator;
    private readonly passwordBox: Locator;
    private readonly loginBtn: Locator;
    private readonly forgotPasswordLink: Locator;
    private readonly registerLink: Locator;
    private readonly PAGE_NAME = 'LoginPage';

    constructor(page: Page) {
        this.page = page;
        this.usernameBox = this.page.getByRole('textbox', { name: 'E-Mail Address', exact: true });
        this.passwordBox = this.page.getByRole('textbox', { name: 'Password', exact: true });
        this.loginBtn = this.page.getByRole('button', { name: 'Login', exact: true });
        this.forgotPasswordLink = this.page.getByRole('link', { name: 'Forgotten Password', exact: true });
        this.registerLink = this.page.getByRole('link', { name: 'Register', exact: true });
    }

    async titleLoginPage(): Promise<string> {
        try {
            return await this.page.title();
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to get login page title', error);
            throw error;
        }
    }

    async urlLoginPage(): Promise<string> {
        try {
            return this.page.url();
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to get login page URL', error);
            throw error;
        }
    }

    async clickRegisterLink(): Promise<RegisterPage> {
        try {
            await this.registerLink.click();
            return new RegisterPage(this.page);
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to click register link', error);
            throw error;
        }
    }

    async performLogin(uname: string, pword: string): Promise<MyAccount> {
        Logger.info(this.PAGE_NAME, `Performing login for user: ${uname}`);
        try {
            await this.usernameBox.fill(uname);
            await this.passwordBox.fill(pword);
            await this.loginBtn.click();
            return new MyAccount(this.page);
        } catch (error) {
            Logger.error(this.PAGE_NAME, `Failed to perform login for user: ${uname}`, error);
            throw error;
        }
    }
}
