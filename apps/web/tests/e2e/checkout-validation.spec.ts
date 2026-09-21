import { test, expect } from '@playwright/test'
import { addProductAndOpenCheckout } from './helpers/checkout'

test.describe('Checkout Validation', () => {
    test('shows validation errors on empty checkout', async ({ page }) => {
        await addProductAndOpenCheckout(page)
        
        await page.getByRole('button', { name: /continue & pay/i }).click()

        await expect(page.getByText(/name is required/i)).toBeVisible()

        await expect(page.getByText(/enter a valid email address/i)).toBeVisible()
    })
})