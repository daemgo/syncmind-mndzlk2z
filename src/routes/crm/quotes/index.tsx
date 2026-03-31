import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Search, MoreHorizontal, FileText, Send, Check, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockQuotes } from "@/mock/crm";
import { QUOTE_STATUSES } from "@/lib/crm-dict";

function statusVariant(status: string) {
  switch (status) {
    case "已成交":
      return "default" as const;
    case "已确认":
      return "default" as const;
    case "已发送":
      return "secondary" as const;
    case "已拒绝":
      return "destructive" as const;
    default:
      return "outline" as const;
  }
}

export const Route = createFileRoute("/crm/quotes/")({
  component: QuotesPage,
});

function QuotesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("全部");

  const filteredQuotes = mockQuotes.filter((quote) => {
    const matchesSearch =
      quote.quoteNumber.includes(searchTerm) ||
      quote.customerName.includes(searchTerm);
    const matchesStatus = statusFilter === "全部" || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalAmount = mockQuotes.reduce((sum, q) => sum + q.totalAmount, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">报价管理</h1>
              <p className="text-sm text-muted-foreground">管理报价单与合同</p>
            </div>
            <Button>
              <Plus className="mr-1.5 h-4 w-4" />
              新建报价
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 text-blue-600 rounded-lg p-2">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">报价总额</p>
                  <p className="text-xl font-bold">¥{(totalAmount / 10000).toFixed(0)}万</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-50 text-emerald-600 rounded-lg p-2">
                  <Send className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">已发送</p>
                  <p className="text-xl font-bold">
                    {mockQuotes.filter((q) => q.status === "已发送").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="bg-violet-50 text-violet-600 rounded-lg p-2">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">已确认</p>
                  <p className="text-xl font-bold">
                    {mockQuotes.filter((q) => q.status === "已确认").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="bg-amber-50 text-amber-600 rounded-lg p-2">
                  <X className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">已拒绝</p>
                  <p className="text-xl font-bold">
                    {mockQuotes.filter((q) => q.status === "已拒绝").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="全部">
          <TabsList>
            <TabsTrigger value="全部">全部</TabsTrigger>
            <TabsTrigger value="草稿">草稿</TabsTrigger>
            <TabsTrigger value="已发送">已发送</TabsTrigger>
            <TabsTrigger value="已确认">已确认</TabsTrigger>
            <TabsTrigger value="已成交">已成交</TabsTrigger>
            <TabsTrigger value="已拒绝">已拒绝</TabsTrigger>
          </TabsList>
        </Tabs>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索报价单号..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="状态筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="全部">全部状态</SelectItem>
                  {QUOTE_STATUSES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                重置
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>报价单号</TableHead>
                  <TableHead>客户</TableHead>
                  <TableHead>产品</TableHead>
                  <TableHead className="text-right">金额</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>有效期至</TableHead>
                  <TableHead>创建日期</TableHead>
                  <TableHead className="w-[50px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotes.map((quote) => (
                  <TableRow key={quote.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-mono text-sm font-medium">
                      {quote.quoteNumber}
                    </TableCell>
                    <TableCell>{quote.customerName}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                      {quote.items.map((item) => item.product).join(", ")}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ¥{(quote.totalAmount / 10000).toFixed(1)}万
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(quote.status)}>{quote.status}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {quote.validUntil}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {quote.createdAt}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>查看详情</DropdownMenuItem>
                          <DropdownMenuItem>编辑</DropdownMenuItem>
                          <DropdownMenuItem>发送报价</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">删除</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
