'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, Package } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface InventoryItem {
  id: string
  name: string
  category?: string
  currentStock: number
  dailyUsage: number
  daysRemaining: number
  status?: string
  supplier: string
  lastRestock: string
  unit?: string
  minimumStock?: number
}

const severityBadge = (days: number) => {
  if (days <= 3) return <Badge variant="destructive">Critical</Badge>
  if (days <= 7) return <Badge className="bg-amber-500 hover:bg-amber-600">Low</Badge>
  return <Badge className="bg-emerald-500 hover:bg-emerald-600">OK</Badge>
}

export function InventoryTable({
  items,
  filteredBy,
}: {
  items: InventoryItem[]
  filteredBy?: string
}) {
  const [search, setSearch] = useState('')
  const [severityFilter, setSeverityFilter] = useState('all')

  const filtered = useMemo(() => {
    let result = items

    if (filteredBy) {
      result = result.filter((i) => i.supplier === filteredBy)
    }

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) || i.supplier.toLowerCase().includes(q)
      )
    }

    if (severityFilter !== 'all') {
      result = result.filter((i) => {
        if (severityFilter === 'critical') return i.daysRemaining <= 3
        if (severityFilter === 'low') return i.daysRemaining > 3 && i.daysRemaining <= 7
        return i.daysRemaining > 7
      })
    }

    return result
  }, [items, search, severityFilter, filteredBy])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Inventory
        </CardTitle>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search medicines or suppliers..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={severityFilter} onValueChange={(v) => setSeverityFilter(v ?? '')}>
            <SelectTrigger className="w-full sm:w-[160px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="ok">OK</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medicine</TableHead>
                <TableHead className="text-right">Current Stock</TableHead>
                <TableHead className="text-right">Daily Usage</TableHead>
                <TableHead className="text-right">Days Remaining</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Last Restock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    No items found.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-right">{item.currentStock.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{item.dailyUsage}</TableCell>
                    <TableCell className="text-right">{item.daysRemaining}</TableCell>
                    <TableCell>{severityBadge(item.daysRemaining)}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>{item.lastRestock}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
