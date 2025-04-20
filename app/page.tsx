"use client"

import { useState } from "react"
import { ConnectWallet } from "@/components/connect-wallet"
import { FaucetForm } from "@/components/faucet-form"
import { TransactionStatus } from "@/components/transaction-status"
import { ThemeToggle } from "@/components/theme-toggle"
import { Footer } from "@/components/footer"

export default function Home() {
  const [userAddress, setUserAddress] = useState<string>("")
  const [isConnected, setIsConnected] = useState(false)
  const [txStatus, setTxStatus] = useState<{
    status: "idle" | "pending" | "success" | "error"
    message: string
    txHash?: string
  }>({
    status: "idle",
    message: "",
  })

  return (
    <div className="mt-24 flex flex-col bg-background">
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="flex justify-end mb-4">
            
          </div>

          <div className="p-2 bg-card text-card-foreground rounded-lg shadow-xl border">
          <ThemeToggle />
            <h1 className="text-3xl font-bold text-center mb-6">SNFT Faucet</h1>
            <p className="text-lg font-bold text-center mb-6">Claim 1 SNFT Tokens / 24h</p>

            <div className="space-y-6">
              <ConnectWallet
                userAddress={userAddress}
                setUserAddress={setUserAddress}
                isConnected={isConnected}
                setIsConnected={setIsConnected}
              />

              {isConnected && <FaucetForm userAddress={userAddress} setTxStatus={setTxStatus} />}

              <TransactionStatus txStatus={txStatus} />

              <div className="text-sm text-gray-800 dark:text-gray-400 p-2 ">
                <p>Chain ID: 98889</p>
                <p>RPC: https://trpc.snft.in</p>
                <p>Explorer: https://texplorer.snft.in </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
