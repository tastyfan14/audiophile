import test, { expect } from '@playwright/test'
import { addProductAndOpenCheckout } from './helpers/checkout'

test.describe('Checkout Error', () => {
    test('shows error when order creation fails', async ({ page }) => {
        await addProductAndOpenCheckout(page)

        await page.route('**/api/checkout/create', async (route) => {
            await route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({ message: 'Failed to create order' }),
            })
        })

        await page.getByRole('textbox', { name: /name/i }).fill('John Doe')

        await page.getByRole('textbox', { name: /email address/i }).fill('Gt1tD@example.com')

        await page.getByRole('textbox', { name: /phone number/i }).fill('+79923452678')

        await page.getByRole('textbox', { name: /your address/i }).fill('123 Main St')

        await page.getByRole('textbox', { name: /zip code/i }).fill('12345')

        await page.getByRole('textbox', { name: /city/i }).fill('New York')

        await page.getByRole('textbox', { name: /country/i }).fill('United States')

        await page.getByText(/cash on delivery/i, { exact: true }).click()

        await page.getByRole('button', { name: /continue & pay/i }).click()

        await expect(page.getByRole('alertdialog')).toBeVisible()

        await expect(page.getByRole('heading', { name: /500/i })).toBeVisible()

        await expect(page.getByRole('button', { name: /try again/i })).toBeVisible()

        await expect(page.getByRole('link', { name: /back to home/i })).toBeVisible()
    })
})
