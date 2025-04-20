import Link from "next/link"
import { Github, Twitter, Linkedin, FileText } from "lucide-react"

export function Footer() {
  return (
    <footer className="flex flex-col md:flex-row md:space-x-20 justify-between items-center px-4 md:px-20 py-4 
    bg-movie-300 text-gray-100 w-full mt-60 mb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} SNFT. All rights reserved.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="https://docs.snft.pro/snft-chain" target="_blank" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span>Docs</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <Link
              href="https://www.linkedin.com/company/snft/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://x.com/snftchain"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://github.com/SNFT-Chain/snft-faucet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            
           
          </div>
        </div>
      </div>
    </footer>
  )
}
