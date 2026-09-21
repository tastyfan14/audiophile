import type { NextConfig } from 'next'
import { withSentryConfig } from '@sentry/nextjs/config'

const nextConfig: NextConfig = {}

export default withSentryConfig(nextConfig, {
  org: 'audiophile',
  project: 'audiophile-web',
})