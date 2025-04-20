"use client"

import { useState } from "react"
import { ethers } from "ethers"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

// ABI for the faucet contract - update this with your actual ABI after deployment
const FAUCET_ABI = [
  "function requestTokens(address payable _recipient) external",
  "function lastAccessTime(address) external view returns (uint256)",
]

interface FaucetFormProps {
  userAddress: string
  setTxStatus: (status: {
    status: "idle" | "pending" | "success" | "error"
    message: string
    txHash?: string
  }) => void
}

export function FaucetForm({ userAddress, setTxStatus }: FaucetFormProps) {
  const [contractAddress] = useState("0xeBCc05954d56Cac09765A547971253b5c784bBc1") // Replace with your contract address
  const [privateKey] = useState("<your-private-key>") // Replace with your private key
  const [
    /* remove this line const [isPrivateKeyVisible, setIsPrivateKeyVisible] = useState(false) */
  ] = useState(false)

  const claimTokens = async () => {
    if (!contractAddress) {
      alert("Please enter the faucet contract address")
      return
    }

    if (!privateKey) {
      alert("Please enter the private key for gas fee coverage")
      return
    }

    if (!userAddress) {
      alert("Please connect your wallet first")
      return
    }

    setTxStatus({
      status: "pending",
      message: "Requesting tokens from faucet...",
    })

    try {
      // Create provider and wallet from private key
      const provider = new ethers.JsonRpcProvider("https://trpc.snft.in")
      const wallet = new ethers.Wallet(privateKey, provider)

      // Create contract instance
      const faucetContract = new ethers.Contract(contractAddress, FAUCET_ABI, wallet)

      // Check if user can request tokens (cooldown period)
      try {
        const lastAccess = await faucetContract.lastAccessTime(userAddress)
        const lastAccessTime = Number(lastAccess)
        const currentTime = Math.floor(Date.now() / 1000)

        if (lastAccessTime > 0 && currentTime - lastAccessTime < 24 * 60 * 60) {
          const timeLeft = 24 * 60 * 60 - (currentTime - lastAccessTime)
          const hoursLeft = Math.floor(timeLeft / 3600)
          const minutesLeft = Math.floor((timeLeft % 3600) / 60)

          setTxStatus({
            status: "error",
            message: `You need to wait ${hoursLeft}h ${minutesLeft}m before requesting again`,
          })
          return
        }
      } catch (error) {
        console.log("Error checking cooldown, proceeding with request")
      }

      // Call the requestTokens function
      const tx = await faucetContract.requestTokens(userAddress)

      setTxStatus({
        status: "pending",
        message: "Transaction submitted, waiting for confirmation...",
        txHash: tx.hash,
      })

      // Wait for transaction to be mined
      const receipt = await tx.wait()

      setTxStatus({
        status: "success",
        message: "Successfully claimed SNFT tokens!",
        txHash: receipt.hash,
      })
    } catch (error: any) {
      console.error("Error claiming tokens:", error)
      setTxStatus({
        status: "error",
        message: `Error: ${error.message || "Unknown error occurred"}`,
      })
    }
  }

  return (
    <Card>
      
      <CardContent className="space-y-4">
        

        <div className="space-y-2 pt-4">
          <Label htmlFor="contractAddress">Faucet Contract Address: 0xeBCc05954d56Cac09765A547971253b5c784bBc1</Label>
          
          <p className="text-sm text-gray-600 dark:text-gray-200">
            Gas fees for new wallets will be covered automatically by the faucet service.
          </p>
        </div>

        <Button onClick={claimTokens} className="w-full bg-green-600 hover:bg-green-700">
          Claim SNFT Tokens
        </Button>
      </CardContent>
    </Card>
  )
}
