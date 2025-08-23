"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, TrendingDown, Search, Filter, Star, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

interface CoinData {
  id: string
  rank: number
  name: string
  symbol: string
  logo: string
  price: number
  change24h: number
  change7d: number
  marketCap: number
  volume24h: number
  supply: number
  category: string
  isWatchlisted?: boolean
}

const mockCoinsData: CoinData[] = [
  {
    id: "bitcoin",
    rank: 1,
    name: "Bitcoin",
    symbol: "BTC",
    logo: "/crypto-logos/btc.svg",
    price: 67420.50,
    change24h: 2.34,
    change7d: -1.23,
    marketCap: 1330000000000,
    volume24h: 28500000000,
    supply: 19750000,
    category: "Layer 1"
  },
  {
    id: "ethereum",
    rank: 2,
    name: "Ethereum",
    symbol: "ETH",
    logo: "/crypto-logos/eth.svg",
    price: 3845.20,
    change24h: 4.67,
    change7d: 8.91,
    marketCap: 462000000000,
    volume24h: 15200000000,
    supply: 120280000,
    category: "Smart Contract"
  },
  {
    id: "solana",
    rank: 3,
    name: "Solana",
    symbol: "SOL",
    logo: "/crypto-logos/sol.svg",
    price: 198.45,
    change24h: -2.15,
    change7d: 12.34,
    marketCap: 94500000000,
    volume24h: 3400000000,
    supply: 476000000,
    category: "Layer 1"
  },
  {
    id: "cardano",
    rank: 4,
    name: "Cardano",
    symbol: "ADA",
    logo: "/crypto-logos/ada.svg",
    price: 1.23,
    change24h: 6.78,
    change7d: -3.45,
    marketCap: 43200000000,
    volume24h: 890000000,
    supply: 35100000000,
    category: "Smart Contract"
  },
  {
    id: "polygon",
    rank: 5,
    name: "Polygon",
    symbol: "MATIC",
    logo: "/crypto-logos/matic.svg",
    price: 0.89,
    change24h: -1.23,
    change7d: 5.67,
    marketCap: 8900000000,
    volume24h: 450000000,
    supply: 10000000000,
    category: "Layer 2"
  }
]

const formatNumber = (num: number, decimals = 2) => {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(decimals)}T`
  if (num >= 1e9) return `$${(num / 1e9).toFixed(decimals)}B`
  if (num >= 1e6) return `$${(num / 1e6).toFixed(decimals)}M`
  if (num >= 1e3) return `$${(num / 1e3).toFixed(decimals)}K`
  return `$${num.toFixed(decimals)}`
}

const formatSupply = (num: number) => {
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`
  if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`
  return num.toLocaleString()
}

export default function ResearchAllCoinsTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("rank")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set())

  const toggleWatchlist = (coinId: string) => {
    const newWatchlist = new Set(watchlist)
    if (newWatchlist.has(coinId)) {
      newWatchlist.delete(coinId)
    } else {
      newWatchlist.add(coinId)
    }
    setWatchlist(newWatchlist)
  }

  const filteredCoins = mockCoinsData.filter(coin => {
    const matchesSearch = coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || coin.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <Card className="border-0 shadow-sm bg-white dark:bg-slate-900">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">
              All Coins
            </CardTitle>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Complete cryptocurrency market data
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search coins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Layer 1">Layer 1</SelectItem>
                <SelectItem value="Smart Contract">Smart Contract</SelectItem>
                <SelectItem value="Layer 2">Layer 2</SelectItem>
                <SelectItem value="DeFi">DeFi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 dark:border-slate-800">
                <TableHead className="w-12">#</TableHead>
                <TableHead className="w-12"></TableHead>
                <TableHead className="min-w-[200px]">Name</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">24h %</TableHead>
                <TableHead className="text-right">7d %</TableHead>
                <TableHead className="text-right">Market Cap</TableHead>
                <TableHead className="text-right">Volume (24h)</TableHead>
                <TableHead className="text-right">Circulating Supply</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCoins.map((coin, index) => (
                <motion.tr
                  key={coin.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <TableCell className="font-medium text-slate-600 dark:text-slate-400">
                    {coin.rank}
                  </TableCell>
                  
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleWatchlist(coin.id)}
                      className="p-1 h-auto"
                    >
                      <Star className={cn(
                        "h-4 w-4",
                        watchlist.has(coin.id) 
                          ? "fill-yellow-400 text-yellow-400" 
                          : "text-slate-400 hover:text-yellow-400"
                      )} />
                    </Button>
                  </TableCell>
                  
                  <TableCell>
                    <Link href={`/research/coin/${coin.id}`} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                          {coin.symbol.slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">
                          {coin.name}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-500">
                          {coin.symbol}
                        </div>
                      </div>
                    </Link>
                  </TableCell>
                  
                  <TableCell className="text-right font-medium text-slate-900 dark:text-slate-100">
                    ${coin.price.toLocaleString()}
                  </TableCell>
                  
                  <TableCell className="text-right">
                    <div className={cn(
                      "flex items-center justify-end space-x-1",
                      coin.change24h >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    )}>
                      {coin.change24h >= 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      <span className="font-medium">
                        {coin.change24h >= 0 ? "+" : ""}{coin.change24h.toFixed(2)}%
                      </span>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-right">
                    <div className={cn(
                      "flex items-center justify-end space-x-1",
                      coin.change7d >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    )}>
                      {coin.change7d >= 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      <span className="font-medium">
                        {coin.change7d >= 0 ? "+" : ""}{coin.change7d.toFixed(2)}%
                      </span>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-right font-medium text-slate-900 dark:text-slate-100">
                    {formatNumber(coin.marketCap)}
                  </TableCell>
                  
                  <TableCell className="text-right text-slate-600 dark:text-slate-400">
                    {formatNumber(coin.volume24h)}
                  </TableCell>
                  
                  <TableCell className="text-right text-slate-600 dark:text-slate-400">
                    {formatSupply(coin.supply)} {coin.symbol}
                  </TableCell>
                  
                  <TableCell>
                    <Link href={`/research/coin/${coin.id}`}>
                      <Button variant="ghost" size="sm" className="p-1 h-auto">
                        <ExternalLink className="h-4 w-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" />
                      </Button>
                    </Link>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
            <span>Showing {filteredCoins.length} of {mockCoinsData.length} coins</span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
                1
              </span>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}