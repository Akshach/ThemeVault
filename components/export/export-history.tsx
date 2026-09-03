"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Download, Trash2, Copy, Check, FileText, Calendar, Package } from "lucide-react"
import { useExport } from "@/hooks/use-export"
import { cn } from "@/lib/utils"

interface ExportHistoryProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ExportHistory({ open, onOpenChange }: ExportHistoryProps) {
  const { exports, deleteExport, clearExports } = useExport()
  const [copied, setCopied] = useState<string | null>(null)

  const handleDownload = (exportItem: any) => {
    const element = document.createElement("a")
    element.setAttribute("href", exportItem.downloadUrl)
    element.setAttribute("download", exportItem.name)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleCopy = async (exportItem: any) => {
    try {
      await navigator.clipboard.writeText(exportItem.content)
      setCopied(exportItem.id)
      setTimeout(() => setCopied(null), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "zip":
        return Package
      default:
        return FileText
    }
  }

  const getFormatColor = (format: string) => {
    switch (format) {
      case "tailwind":
        return "bg-blue-100 text-blue-800"
      case "css":
        return "bg-purple-100 text-purple-800"
      case "react":
        return "bg-cyan-100 text-cyan-800"
      case "figma":
        return "bg-pink-100 text-pink-800"
      case "zip":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Export History</DialogTitle>
          <DialogDescription>Manage your theme exports and downloads</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {exports.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No exports yet</h3>
              <p className="text-muted-foreground">Export your first theme to see it here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {exports.map((exportItem) => {
                const FormatIcon = getFormatIcon(exportItem.format)

                return (
                  <Card key={exportItem.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FormatIcon className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{exportItem.name}</p>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(exportItem.createdAt).toLocaleDateString()}</span>
                              <span>•</span>
                              <span>{exportItem.size}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Badge className={cn("text-xs", getFormatColor(exportItem.format))}>
                            {exportItem.format.toUpperCase()}
                          </Badge>

                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="sm" onClick={() => handleDownload(exportItem)}>
                              <Download className="w-4 h-4" />
                            </Button>

                            <Button variant="ghost" size="sm" onClick={() => handleCopy(exportItem)}>
                              {copied === exportItem.id ? (
                                <Check className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>

                            <Button variant="ghost" size="sm" onClick={() => deleteExport(exportItem.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>

        {exports.length > 0 && (
          <div className="flex justify-between pt-4 border-t">
            <Button variant="outline" onClick={clearExports}>
              Clear All
            </Button>
            <p className="text-sm text-muted-foreground self-center">
              {exports.length} export{exports.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
