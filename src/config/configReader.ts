import fs from 'fs';
import path from 'path';

export type TestData = {
    users: {
        valid : { username: string; password: string };
        invalid: { username: string; password: string };
    };
};

export function getEnvName(): string {
    return process.env.ENV || 'qa'; 
}

export function loadTestData(): TestData {
    const env = getEnvName();
    const filePath = path.join(process.cwd(), 'testData', `${env}.json`);
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as TestData;
}
