"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"

interface TransactionStatusProps {
  txStatus: {
    status: "idle" | "pending" | "success" | "error"
    message: string
    txHash?: string
  }
}

export function TransactionStatus({ txStatus }: TransactionStatusProps) {
  if (txStatus.status === "idle") {
    return null
  }

  const explorerUrl = txStatus.txHash ? `https://texplorer.snft.in/tx/${txStatus.txHash}` : null

  const variants = {
    pending: {
      className: "border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/50",
      titleClass: "text-yellow-800 dark:text-yellow-300",
      icon: <Loader2 className="h-4 w-4 text-yellow-600 dark:text-yellow-400 animate-spin" />,
    },
    success: {
      className: "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/50",
      titleClass: "text-green-800 dark:text-green-300",
      icon: <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />,
    },
    error: {
      className: "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/50",
      titleClass: "text-red-800 dark:text-red-300",
      icon: <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />,
    },
  }

  const variant = variants[txStatus.status]

  return (
    <Alert className={variant.className}>
      {variant.icon}
      <AlertTitle className={variant.titleClass}>
        {txStatus.status === "pending" ? "Processing" : txStatus.status === "success" ? "Success" : "Error"}
      </AlertTitle>
      <AlertDescription className="text-sm">
        {txStatus.message}
        {explorerUrl && (
          <div className="mt-2">
            <Link
              href={explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              View transaction on explorer
            </Link>
          </div>
        )}
      </AlertDescription>
    </Alert>
  )
}
