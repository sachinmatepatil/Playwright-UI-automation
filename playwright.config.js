import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

const envName = process.env.ENV_NAME || 'qa';
dotenv.config({ path: `.env.${envName}` });

export default defineConfig({
    use: {
        baseURL: process.env.BASE_URL || 'http://www.saucedemo.com',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    }
});