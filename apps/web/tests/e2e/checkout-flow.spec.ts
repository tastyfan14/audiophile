import { ROUTES } from '@/shared/config/constants'
import { test, expect } from '@playwright/test'
import { addProductAndOpenCheckout } from './helpers/checkout'

test.describe('Checkout Flow', () => {
    test('user can successfully place an order', async ({ page }) => {
        await addProductAndOpenCheckout(page)

        await page.getByRole('textbox', { name: /name/i }).fill('John Doe')

        await page.getByRole('textbox', { name: /email address/i }).fill('Gt1tD@example.com')

        await page.getByRole('textbox', { name: /phone number/i }).fill('+79923452678')

        await page.getByRole('textbox', { name: /your address/i }).fill('123 Main St')

        await page.getByRole('textbox', { name: /zip code/i }).fill('12345')

        await page.getByRole('textbox', { name: /city/i }).fill('New York')

        await page.getByRole('textbox', { name: /country/i }).fill('United States')

        await expect(page.getByText(/payment details/i)).toBeVisible()

        await page.getByText(/e-money/i, { exact: true }).click()

        await page.getByRole('textbox', { name: /e-money number/i }).fill('123456789')

        await page.getByRole('textbox', { name: /e-money pin/i }).fill('1234')

        await expect(page.getByRole('button', { name: /continue & pay/i })).toBeVisible()

        await page.getByRole('button', { name: /continue & pay/i }).click()

        await expect(page.getByRole('heading', { name: /thank you for your order/i })).toBeVisible()

        await expect(page.getByRole('link', { name: /back to home/i })).toBeVisible()

        await page.getByRole('link', { name: /back to home/i }).click()

        await expect(page).toHaveURL(ROUTES.home.route)
    })
})