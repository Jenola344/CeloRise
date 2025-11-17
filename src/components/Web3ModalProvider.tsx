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
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

export function Web3ModalProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
