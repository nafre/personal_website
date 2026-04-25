import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import icon from 'astro-icon'

export default defineConfig({
  site: 'https://erfan.dev',
  integrations: [
    react(),
    mdx(),
    icon({ include: { mdi: ['*'] } }),
  ],
})
