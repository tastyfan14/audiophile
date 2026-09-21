import { ROUTES } from '@/shared/config/constants'
import { expect, type Page } from '@playwright/test'

export async function addProductAndOpenCheckout(page: Page) {
        await page.goto(ROUTES.home.route)

        await page
            .getByRole('navigation', { name: /product categories/i })
            .getByRole('link', { name: /headphones/i })
            .click()

        await expect(page).toHaveURL(ROUTES.headphones.route)

        await page
            .getByRole('link', { name: /see xx99 mark ii headphones product/i })
            .click()

        await expect(page).toHaveURL(`${ROUTES.headphones.route}/xx99-mark-two`)

        await page
            .getByRole('button', { name: /add to cart/i })
            .click()

        await page.getByLabel(/open cart/i).click()

        await expect(page.getByRole('dialog').getByText(/xx99 mk ii/i)).toBeVisible()

        await page.getByRole('link', { name: /checkout/i }).click()

        await expect(page).toHaveURL(ROUTES.checkout.route)

        await expect(page.getByRole('heading', { name: /checkout/i })).toBeVisible()
}