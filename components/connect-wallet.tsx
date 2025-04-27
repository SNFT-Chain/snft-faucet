"use client"

import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ConnectWalletProps {
  userAddress: string
  setUserAddress: (address: string) => void
  isConnected: boolean
  setIsConnected: (connected: boolean) => void
}

export function ConnectWallet({ userAddress, setUserAddress, isConnected, setIsConnected }: ConnectWalletProps) {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      setProvider(provider)
    }
  }, [])

  const connectWallet = async () => {
    if (!provider) {
      alert("Please install MetaMask or another Web3 wallet")
      return
    }

    try {
      // Request account access
      const accounts = await provider.send("eth_requestAccounts", [])
      const address = accounts[0]
      setUserAddress(address)
      setIsConnected(true)

      // Check if we're on the correct network
      const network = await provider.getNetwork()
      if (network.chainId !== BigInt(98889)) {
        try {
          // Try to switch to SNFT testnet
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x18249" }], // 0x182a9 is hex for 98889
          })
        } catch (switchError: any) {
          // This error code indicates that the chain has not been added to MetaMask
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x182a9",
                    chainName: "SNFT Testnet",
                    nativeCurrency: {
                      name: "SNFT",
                      symbol: "SNFT",
                      decimals: 18,
                    },
                    rpcUrls: ["https://trpc.snft.in"],
                    blockExplorerUrls: ["https://texplorer.snft.in"],
                  },
                ],
              })
            } catch (addError) {
              console.error("Error adding SNFT network:", addError)
            }
          }
        }
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
    }
  }

  const disconnectWallet = () => {
    setUserAddress("")
    setIsConnected(false)
  }

  return (
    <Card>
      <CardContent className="p-4">
        {!isConnected ? (
          <Button onClick={connectWallet} className="w-full">
            Connect Wallet
          </Button>
        ) : (
          <div className="space-y-2">
            <p className="text-sm font-medium">Connected Address:</p>
            <p className="text-xs bg-muted p-2 rounded break-all">{userAddress}</p>
            <Button onClick={disconnectWallet} variant="outline" className="w-full">
              Disconnect
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
