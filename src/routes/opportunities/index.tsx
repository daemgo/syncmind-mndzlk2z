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
import { opportunitiesMock } from "@/mock/opportunities";

const PAGE_SIZE = 10;

const stageColors: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  "成交": "default",
  "合同谈判": "secondary",
  "方案报价": "outline",
  "需求确认": "outline",
  "线索": "outline",
  "失败": "destructive",
};

export const Route = createFileRoute("/opportunities/")({
  component: OpportunitiesPage,
});

function OpportunitiesPage() {
  const [stageFilter, setStageFilter] = useState<string>("全部");
  const [ownerFilter, setOwnerFilter] = useState<string>("全部");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const owners = ["全部", ...Array.from(new Set(opportunitiesMock.map((o) => o.owner)))];
  const stages = ["全部", "线索", "需求确认", "方案报价", "合同谈判", "成交", "失败"];

  const filteredData = opportunitiesMock.filter((opp) => {
    const matchStage = stageFilter === "全部" || opp.stage === stageFilter;
    const matchOwner = ownerFilter === "全部" || opp.owner === ownerFilter;
    const matchKeyword = !searchKeyword || opp.name.includes(searchKeyword) || opp.customerName.includes(searchKeyword);
    return matchStage && matchOwner && matchKeyword;
  });

  const total = filteredData.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const paginatedData = filteredData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const totalAmount = filteredData.reduce((sum, o) => sum + o.amount, 0);

  const formatMoney = (amount: number) => {
    if (amount >= 10000) {
      return `¥${(amount / 10000).toFixed(1)}万`;
    }
    return `¥${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">商机管理</h1>
            <p className="text-sm text-muted-foreground">管理销售商机及跟进状态</p>
          </div>
          <Button>
            <Plus className="mr-1.5 h-4 w-4" />
            新建商机
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6 space-y-4">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <p className="text-sm font-medium text-muted-foreground">商机总数</p>
              <p className="mt-1 text-2xl font-bold">{opportunitiesMock.length}</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <p className="text-sm font-medium text-muted-foreground">进行中</p>
              <p className="mt-1 text-2xl font-bold">{opportunitiesMock.filter((o) => !["成交", "失败"].includes(o.stage)).length}</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <p className="text-sm font-medium text-muted-foreground">已成交</p>
              <p className="mt-1 text-2xl font-bold">{opportunitiesMock.filter((o) => o.stage === "成交").length}</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <p className="text-sm font-medium text-muted-foreground">商机总额</p>
              <p className="mt-1 text-2xl font-bold">{formatMoney(totalAmount)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter Bar */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索商机名称、客户..."
                  className="pl-9"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </div>
              <Select value={stageFilter} onValueChange={setStageFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="阶段筛选" />
                </SelectTrigger>
                <SelectContent>
                  {stages.map((stage) => (
                    <SelectItem key={stage} value={stage}>
                      {stage}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={ownerFilter} onValueChange={setOwnerFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="负责人" />
                </SelectTrigger>
                <SelectContent>
                  {owners.map((owner) => (
                    <SelectItem key={owner} value={owner}>
                      {owner}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => {
                setStageFilter("全部");
                setOwnerFilter("全部");
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
              商机列表
              <span className="ml-2 text-sm font-normal text-muted-foreground">共 {total} 条</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>商机ID</TableHead>
                  <TableHead>商机名称</TableHead>
                  <TableHead>客户</TableHead>
                  <TableHead className="text-right">预估金额</TableHead>
                  <TableHead>阶段</TableHead>
                  <TableHead>预计成交</TableHead>
                  <TableHead>负责人</TableHead>
                  <TableHead className="w-[50px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((opp) => (
                  <TableRow key={opp.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-mono text-sm font-medium">{opp.id}</TableCell>
                    <TableCell className="font-medium">{opp.name}</TableCell>
                    <TableCell className="text-muted-foreground">{opp.customerName}</TableCell>
                    <TableCell className="text-right font-medium">{formatMoney(opp.amount)}</TableCell>
                    <TableCell>
                      <Badge variant={stageColors[opp.stage] || "outline"}>
                        {opp.stage}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{opp.expectedCloseDate}</TableCell>
                    <TableCell>{opp.owner}</TableCell>
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
