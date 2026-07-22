'use client'

import { useState } from 'react'
import { AlertTriangle, Send } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'

interface CriticalItem {
  id: string
  name: string
  currentStock: number
}

interface DistressSignalProps {
  criticalItems?: CriticalItem[]
}

export function DistressSignal({ criticalItems = [] }: DistressSignalProps) {
  const [reason, setReason] = useState('')
  const [urgency, setUrgency] = useState('')
  const [notes, setNotes] = useState('')
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleSend = () => {
    console.log({ reason, urgency, notes, selectedItems })
  }

  return (
    <Dialog>
      <DialogTrigger render={<Button
          variant="destructive"
          size="lg"
          className="gap-2 text-base font-semibold shadow-lg shadow-red-500/25 hover:shadow-red-500/40"
        />}>
          <AlertTriangle className="h-5 w-5" />
          Send Distress Signal
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Emergency Distress Signal
          </DialogTitle>
          <DialogDescription>
            Notify authorities about critical supply shortages or emergencies.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Critical Inventory Items</label>
            <Card className="border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/30">
              <CardContent className="space-y-2 p-3">
                {criticalItems.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="flex items-center gap-2">
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => toggleItem(item.id)}
                      />
                      {item.name}
                    </span>
                    <Badge variant="destructive">
                      {item.currentStock} remaining
                    </Badge>
                  </label>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Reason</label>
            <Select value={reason} onValueChange={(v) => setReason(v ?? '')}>
              <SelectTrigger>
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stock-critical">Critical Stock Level</SelectItem>
                <SelectItem value="equipment-failure">Equipment Failure</SelectItem>
                <SelectItem value="power-outage">Power Outage</SelectItem>
                <SelectItem value="staffing">Staffing Emergency</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Urgency Level</label>
            <Select value={urgency} onValueChange={(v) => setUrgency(v ?? '')}>
              <SelectTrigger>
                <SelectValue placeholder="Select urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="critical">Critical - Immediate</SelectItem>
                <SelectItem value="high">High - Within 24 hours</SelectItem>
                <SelectItem value="medium">Medium - Within a week</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Additional Notes</label>
            <Textarea
              placeholder="Describe the situation..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <Button
            variant="destructive"
            className="w-full gap-2"
            onClick={handleSend}
          >
            <Send className="h-4 w-4" />
            Send Distress Signal
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
