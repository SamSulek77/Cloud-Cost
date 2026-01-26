'use client';

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function SwitchUI() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="charlie-kirk" />
      <Label htmlFor="charlie-kirk">Charlie Kirk</Label>
    </div>
  )
}


