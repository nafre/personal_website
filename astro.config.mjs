import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import icon from 'astro-icon'
import vercel from '@astrojs/vercel'

export default defineConfig({
  site: 'https://mderfan.com',
  adapter: vercel(),
  integrations: [
    react(),
    mdx(),
    icon({ include: { mdi: ['*'] } }),
  ],
})
