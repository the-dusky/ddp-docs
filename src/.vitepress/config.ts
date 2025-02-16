import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import type { DefaultTheme, UserConfig } from 'vitepress'

const config = defineConfig({
  cacheDir: '.vitepress/.cache',
  outDir: '.vitepress/dist',
  buildDir: '.vitepress/.temp',
  title: "DDP",
  description: "Decentralized Digital Presence - AI-Driven Brand Creation and Management Platform",
  base: '/',
  lastUpdated: true,
  cleanUrls: true,
  head: [
    ['link', { rel: 'stylesheet', href: '/css/styles.css' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  // Search
  search: {
    provider: 'local'
  },

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
    
    // Social links
    socialLinks: [
      { icon: 'github', link: 'https://github.com/the-dusky/ddp-web3' }
    ],

    // Footer
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present DDP'
    },
    nav: [
      { text: 'About', link: '/about/' },
      { text: 'Contracts', link: '/contracts/' },
      { text: 'DARYL', link: '/daryl/' }
    ],
    sidebar: {
      '/about/': [
        {
          text: 'About DDP',
          items: [
            { text: 'Introduction', link: '/about/' },
            { text: 'Vision & Mission', link: '/about/vision' },
            { text: 'Market Opportunity', link: '/about/market' }
          ]
        },
        {
          text: 'Technology',
          items: [
            { text: 'Overview', link: '/about/technology/' },
            { text: 'Architecture', link: '/about/technology/architecture' },
            { text: 'Security', link: '/about/technology/security' }
          ]
        }
      ],
      '/contracts/': [
        {
          text: 'Smart Contracts',
          items: [
            { text: 'Overview', link: '/contracts/' },
            { text: 'Architecture', link: '/contracts/architecture' }
          ]
        },
        {
          text: 'Solana',
          items: [
            { text: 'Overview', link: '/contracts/solana/' }
          ]
        }
      ],
      '/daryl/': [
        {
          text: 'DARYL AI System',
          items: [
            { text: 'Overview', link: '/daryl/' },
            { text: 'Components', link: '/daryl/components' },
            { text: 'Integration', link: '/daryl/integration' }
          ]
        }
      ]
    }
  }
})

export default withMermaid(config)