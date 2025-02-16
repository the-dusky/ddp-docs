import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import type { DefaultTheme, UserConfig } from 'vitepress'

const config = defineConfig({
  cacheDir: '.vitepress/.cache',
  outDir: '.vitepress/dist',
  buildDir: '.vitepress/.temp',
  title: "Meme-App Factory",
  description: "AI-Driven Brand Creation and Management Platform",
  base: '/',
  lastUpdated: true,
  cleanUrls: true,
  head: [
    ['link', { rel: 'stylesheet', href: '/css/styles.css' }]
  ],

  mermaid: { // @ts-ignore -- Mermaid config using plain JS as per team guidelines
    theme: 'default',
    securityLevel: 'loose',
    maxTextSize: 50000,
    themeVariables: {
      nodeTextColor: '#000000',
      mainBkg: '#ffffff',
      textColor: '#000000',
      classFontColor: '#000000',
      labelTextColor: '#000000',
      stateLabelColor: '#000000',
      entityTextColor: '#000000',
      flowchartTextColor: '#000000'
    }
  },

  themeConfig: {
    logo: '/images/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Platform', link: '/platform/' },
      { text: 'Technology', link: '/technology/' },
      { text: 'Business', link: '/business/' }
    ],
    sidebar: {
      '/': [
        {
          text: 'Overview',
          items: [
            { text: 'Introduction', link: '/' },
            { text: 'Vision & Mission', link: '/vision' },
            { text: 'Market Opportunity', link: '/market' }
          ]
        },
        {
          text: 'Platform',
          items: [
            { text: 'Features', link: '/platform/features' },
            { text: 'Use Cases', link: '/platform/use-cases' },
            { text: 'Benefits', link: '/platform/benefits' }
          ]
        },
        {
          text: 'Technology',
          items: [
            { text: 'Architecture', link: '/technology/architecture' },
            { text: 'AI Systems', link: '/technology/ai-systems' },
            { text: 'Security', link: '/technology/security' }
          ]
        },
        {
          text: 'Business',
          items: [
            { text: 'Model', link: '/business/model' },
            { text: 'Token Economics', link: '/business/tokenomics' },
            { text: 'Roadmap', link: '/business/roadmap' }
          ]
        }
      ]
    }
  }
})

export default withMermaid(config)