"use client"

import { useReports, deleteReport, exportReportsJSON } from "@/lib/storage"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Download, Printer, Trash2, Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ReportsPage() {
  const { reports, refresh } = useReports()

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this report?")) {
      deleteReport(id)
      refresh()
    }
  }

  return (
    <div className="container mx-auto px-4 py-10 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <FileText className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Scan Reports</h1>
            <p className="text-muted-foreground">View and manage your vulnerability scan results</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="font-mono bg-transparent" onClick={() => window.print()}>
            <Printer className="w-4 h-4 mr-2" />
            Print PDF
          </Button>
          <Button className="font-mono" onClick={() => exportReportsJSON(reports)}>
            <Download className="w-4 h-4 mr-2" />
            Export JSON
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report History</CardTitle>
          <CardDescription>{reports.length} reports found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Target URL</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Findings</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      No reports yet. Run your first scan from the Scanner page.
                    </TableCell>
                  </TableRow>
                ) : (
                  reports.map((r) => (
                    <TableRow key={r.id} className="animate-in fade-in-50">
                      <TableCell className="font-mono text-xs max-w-[200px] truncate">{r.url}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-mono">
                          {r.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono">{r.score}</TableCell>
                      <TableCell className="font-mono">{r.findings.length}</TableCell>
                      <TableCell className="text-muted-foreground text-xs">
                        {new Date(r.completedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
                              <DialogHeader>
                                <DialogTitle>Report Details</DialogTitle>
                                <DialogDescription>{r.url}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-3 gap-4">
                                  <div className="p-3 rounded-lg bg-secondary/20">
                                    <p className="text-xs text-muted-foreground">Score</p>
                                    <p className="text-2xl font-bold">{r.score}</p>
                                  </div>
                                  <div className="p-3 rounded-lg bg-secondary/20">
                                    <p className="text-xs text-muted-foreground">Findings</p>
                                    <p className="text-2xl font-bold">{r.findings.length}</p>
                                  </div>
                                  <div className="p-3 rounded-lg bg-secondary/20">
                                    <p className="text-xs text-muted-foreground">Status</p>
                                    <p className="text-2xl font-bold capitalize">{r.status}</p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Findings</h4>
                                  <div className="space-y-2">
                                    {r.findings.map((f) => (
                                      <div key={f.id} className="p-3 rounded-lg border">
                                        <div className="flex items-center justify-between">
                                          <p className="font-medium">{f.title}</p>
                                          <Badge variant={f.severity === "Critical" ? "destructive" : "secondary"}>
                                            {f.severity}
                                          </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">{f.description}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(r.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
