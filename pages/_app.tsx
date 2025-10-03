import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Micro Investment Game - Learn Trading with Virtual Money</title>
        <meta name="description" content="A gamified investment simulation platform where users can learn trading with virtual money, level up their skills, and compete on leaderboards." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' style='stop-color:%2310b981;stop-opacity:1' /><stop offset='100%25' style='stop-color:%2306b6d4;stop-opacity:1' /></linearGradient></defs><circle cx='50' cy='50' r='45' fill='url(%23grad)'/><path d='M30 60 L45 45 L55 55 L70 40' stroke='white' stroke-width='4' fill='none' stroke-linecap='round' stroke-linejoin='round'/><circle cx='45' cy='45' r='3' fill='white'/><circle cx='55' cy='55' r='3' fill='white'/><circle cx='70' cy='40' r='3' fill='white'/><text x='50' y='80' text-anchor='middle' fill='white' font-family='Arial, sans-serif' font-size='12' font-weight='bold'>$</text></svg>" />
        <meta name="theme-color" content="#10b981" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}