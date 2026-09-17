import { defineConfig, devices } from '@playwright/test';
import { url } from 'node:inspector';
import { userInfo } from 'node:os';
export default defineConfig({
  timeout: 30 * 1000, //30000 ms(30 secs)
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  forbidOnly: true, // Fail if test.only is used (prevents accidental commits)
  //retries: 2,
  metadata: {
    appUsername: '',
    appPassword: ''
  },
  reporter: [
    ['list'],                              // prints console output live to terminal
    ['html', { outputFolder: 'reports' }],
    ['allure-playwright'],
  ],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    //headless: false,
    viewport: { width: 1280, height: 720 }, // Set default viewport size for consistency
    ignoreHTTPSErrors: true, // Ignore SSL errors if necessary
    permissions: ['geolocation'], // Set necessary permissions for geolocation-based tests
  },
  //grep: /@master/,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ]
})