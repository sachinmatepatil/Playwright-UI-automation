import {chromium, FullConfig} from '@playwright/test';
import dotenv from 'dotenv';
import { loadTestData } from './src/config/configReader';

async function globalSetup(config: FullConfig) {
    const envName = process.env.ENV || 'dev';
    dotenv.config({ path: `.env.${envName}` });

    // Load test data based on the environment
    const testData = loadTestData();
    const baseURL = process.env.BASE_URL || 'https://www.saucedemo.com';

    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto(baseURL);

    // login
    aqait page.getByPlaceholder('Username').fill(data.testUsers.standard.username);
    await page.getByPlaceholder('Password').fill(data.testUsers.standard.password);
    await page.getByRole('button', { name: 'Login' }).click();

    await page.waitForURL(/Invenotry/);

    await page.context().storageState({ path: 'auth/storageState.json' });
    await browser.close();
}

export default globalSetup;