import { chromium, type FullConfig } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { loadTestData } from './src/config/configReader';

async function globalSetup(config: FullConfig) {
  const envName = process.env.ENV || 'dev';
  dotenv.config({ path: `.env.${envName}` });

  const testData = loadTestData();
  const baseURL = process.env.BASE_URL || 'https://www.saucedemo.com';

  // Ensure auth folder exists
  const authDir = path.join(process.cwd(), 'auth');
  fs.mkdirSync(authDir, { recursive: true });
  const statePath = path.join(authDir, 'storageState.json');

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(baseURL);

  // login (using our TestData structure)
  await page.getByPlaceholder('Username').fill(testData.users.valid.username);
  await page.getByPlaceholder('Password').fill(testData.users.valid.password);
  await page.getByRole('button', { name: 'Login' }).click();

  // SauceDemo redirects to inventory page
  await page.waitForURL(/inventory/);

  // Save storage state
  await context.storageState({ path: statePath });

  await browser.close();

  // Validate JSON is not empty/corrupt
  const raw = fs.readFileSync(statePath, 'utf-8');
  JSON.parse(raw);
}

export default globalSetup;