'use client'

import { createWeb3Modal } from '@web3modal/wagmi/react'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { celo, celoAlfajores } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

const queryClient = new QueryClient()

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = 'YOUR_PROJECT_ID' // TODO: Get from env

// 2. Create wagmiConfig
const metadata = {
  name: 'CeloRise',
  description: 'Invest in Impact, Grow the Future on Celo',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [celo, celoAlfajores] as const
const config = createConfig({
  chains,
  transports: {
    [celo.id]: http(),
    [celoAlfajores.id]: http()
  },
  ssr: true,
})

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  metadata,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  featuredWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // MetaMask
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0', // Trust Wallet
    'f2436c67184f158d1beda5df53298ee84abfc367581e4505134b5bcf5f46697d', // WalletConnect (Reown)
    '1ae92b26df02f0abca6304df07deb48179f9940a63ea91c3345d28e205421df7', // Rainbow
  ]
})

export function Web3ModalProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
