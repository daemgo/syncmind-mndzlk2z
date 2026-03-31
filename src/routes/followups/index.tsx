"use client";

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Search, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { followupsMock } from "@/mock/followups";

const PAGE_SIZE = 10;

const typeColors: Record<string, "default" | "secondary" | "outline"> = {
  "拜访": "default",
  "电话": "secondary",
  "会议": "outline",
  "线上沟通": "outline",
  "其他": "outline",
};

export const Route = createFileRoute("/followups/")({
  component: FollowupsPage,
});

function FollowupsPage() {
  const [typeFilter, setTypeFilter] = useState<string>("全部");
  const [customerFilter, setCustomerFilter] = useState<string>("全部");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const customers = ["全部", ...Array.from(new Set(followupsMock.map((f) => f.customerName)))];
  const types = ["全部", "拜访", "电话", "会议", "线上沟通", "其他"];

  const filteredData = followupsMock.filter((followup) => {
    const matchType = typeFilter === "全部" || followup.type === typeFilter;
    const matchCustomer = customerFilter === "全部" || followup.customerName === customerFilter;
    const matchKeyword = !searchKeyword || followup.customerName.includes(searchKeyword) || followup.content.includes(searchKeyword);
    return matchType && matchCustomer && matchKeyword;
  });

  const total = filteredData.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const paginatedData = filteredData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">销售跟进</h1>
            <p className="text-sm text-muted-foreground">记录和查看客户跟进情况</p>
          </div>
          <Button>
            <Plus className="mr-1.5 h-4 w-4" />
            新建跟进
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6 space-y-4">
        {/* Filter Bar */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索客户名称、跟进内容..."
                  className="pl-9"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="方式筛选" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={customerFilter} onValueChange={setCustomerFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="客户筛选" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer} value={customer}>
                      {customer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => {
                setTypeFilter("全部");
                setCustomerFilter("全部");
                setSearchKeyword("");
                setCurrentPage(1);
              }}>
                重置
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium">
              跟进列表
              <span className="ml-2 text-sm font-normal text-muted-foreground">共 {total} 条</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>跟进ID</TableHead>
                  <TableHead>客户</TableHead>
                  <TableHead>关联商机</TableHead>
                  <TableHead>方式</TableHead>
                  <TableHead>跟进内容</TableHead>
                  <TableHead>跟进人</TableHead>
                  <TableHead>时间</TableHead>
                  <TableHead className="w-[50px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((followup) => (
                  <TableRow key={followup.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-mono text-sm font-medium">{followup.id}</TableCell>
                    <TableCell className="font-medium">{followup.customerName}</TableCell>
                    <TableCell className="text-muted-foreground">{followup.opportunityName || "-"}</TableCell>
                    <TableCell>
                      <Badge variant={typeColors[followup.type] || "outline"}>
                        {followup.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">{followup.content}</TableCell>
                    <TableCell>{followup.createdBy}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{followup.createdAt}</TableCell>
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
                          <DropdownMenuItem className="text-destructive">删除</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                显示 {(currentPage - 1) * PAGE_SIZE + 1}-{Math.min(currentPage * PAGE_SIZE, total)} 条，共 {total} 条
              </p>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
