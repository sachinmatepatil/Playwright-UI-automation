import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

const envName = process.env.ENV || 'qa';
dotenv.config({ path: `.env.${envName}` });

export default defineConfig({
    globalSetup: './global-setup.ts',
    use: {
        baseURL: process.env.BASE_URL || 'http://www.saucedemo.com',
        storageState: 'auth/storageState.json',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],

});