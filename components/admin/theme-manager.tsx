"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Upload, Eye, Crown, Zap } from "lucide-react"
import { themes, type ThemeConfig } from "@/lib/themes"

export function ThemeManager() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeConfig | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<ThemeConfig>>({})

  const getTierIcon = (tier: number) => {
    switch (tier) {
      case 1:
        return Crown
      case 2:
        return Zap
      default:
        return null
    }
  }

  const getTierLabel = (tier: number) => {
    switch (tier) {
      case 1:
        return "Premium+"
      case 2:
        return "Premium Lite"
      default:
        return "Free"
    }
  }

  const getTierColor = (tier: number) => {
    switch (tier) {
      case 1:
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
      case 2:
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
      default:
        return "bg-gray-200 text-gray-800"
    }
  }

  const handleEdit = (theme: ThemeConfig) => {
    setSelectedTheme(theme)
    setFormData(theme)
    setIsEditing(true)
  }

  const handleSave = () => {
    // In real app, this would save to database
    console.log("Saving theme:", formData)
    setIsEditing(false)
    setSelectedTheme(null)
    setFormData({})
  }

  const handleDelete = (themeId: string) => {
    // In real app, this would delete from database
    console.log("Deleting theme:", themeId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Theme Management</h2>
          <p className="text-muted-foreground">Manage themes, upload previews, and configure settings</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Theme
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Theme</DialogTitle>
              <DialogDescription>Create a new theme for the gallery</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Theme Name</Label>
                <Input id="name" placeholder="Enter theme name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tier">Tier</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">Free</SelectItem>
                    <SelectItem value="2">Premium Lite</SelectItem>
                    <SelectItem value="1">Premium+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="glass">Glass</SelectItem>
                    <SelectItem value="brutalist">Brutalist</SelectItem>
                    <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="preview">Preview Image</Label>
                <div className="flex gap-2">
                  <Input id="preview" placeholder="Upload preview" className="flex-1" />
                  <Button variant="outline" size="icon">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter theme description" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline">Cancel</Button>
              <Button>Create Theme</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Theme</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Exports</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {themes.map((theme) => {
                const TierIcon = getTierIcon(theme.tier)
                return (
                  <TableRow key={theme.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 rounded overflow-hidden bg-muted">
                          <img
                            src={theme.preview || "/placeholder.svg"}
                            alt={theme.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{theme.name}</p>
                          <p className="text-sm text-muted-foreground">{theme.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {theme.category.charAt(0).toUpperCase() + theme.category.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTierColor(theme.tier)}>
                        {TierIcon && <TierIcon className="w-3 h-3 mr-1" />}
                        {getTierLabel(theme.tier)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-medium">1,234</p>
                        <p className="text-muted-foreground">this month</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(theme)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(theme.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Theme Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Theme: {selectedTheme?.name}</DialogTitle>
            <DialogDescription>Modify theme settings and configuration</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Theme Name</Label>
              <Input
                id="edit-name"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-tier">Tier</Label>
              <Select
                value={formData.tier?.toString()}
                onValueChange={(value) => setFormData({ ...formData, tier: Number.parseInt(value) as 1 | 2 | 3 })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">Free</SelectItem>
                  <SelectItem value="2">Premium Lite</SelectItem>
                  <SelectItem value="1">Premium+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
