import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Search, MoreHorizontal, TrendingUp, Clock } from "lucide-react";

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
import { mockOpportunities } from "@/mock/crm";
import { SALES_STAGES } from "@/lib/crm-dict";

function stageVariant(stage: string) {
  switch (stage) {
    case "成交":
      return "default" as const;
    case "谈判":
    case "报价":
      return "default" as const;
    case "方案":
      return "secondary" as const;
    default:
      return "outline" as const;
  }
}

export const Route = createFileRoute("/crm/opportunities/")({
  component: OpportunitiesPage,
});

function OpportunitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("全部");

  const filteredOpportunities = mockOpportunities.filter((opp) => {
    const matchesSearch =
      opp.name.includes(searchTerm) ||
      opp.customerName.includes(searchTerm);
    const matchesStage = stageFilter === "全部" || opp.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const totalValue = mockOpportunities.reduce((sum, opp) => sum + opp.value, 0);
  const weightedValue = mockOpportunities.reduce(
    (sum, opp) => sum + opp.value * (opp.probability / 100),
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">商机追踪</h1>
              <p className="text-sm text-muted-foreground">管理销售管道与商机状态</p>
            </div>
            <Button>
              <Plus className="mr-1.5 h-4 w-4" />
              新建商机
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 text-blue-600 rounded-lg p-2">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">管道总额</p>
                  <p className="text-xl font-bold">¥{(totalValue / 10000).toFixed(0)}万</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-50 text-emerald-600 rounded-lg p-2">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">加权金额</p>
                  <p className="text-xl font-bold">¥{(weightedValue / 10000).toFixed(0)}万</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="bg-violet-50 text-violet-600 rounded-lg p-2">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">商机数量</p>
                  <p className="text-xl font-bold">{mockOpportunities.length}个</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="全部">
          <TabsList>
            <TabsTrigger value="全部">全部</TabsTrigger>
            {SALES_STAGES.map((s) => (
              <TabsTrigger key={s.value} value={s.value}>{s.label}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索商机名称..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={stageFilter} onValueChange={setStageFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="阶段筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="全部">全部阶段</SelectItem>
                  {SALES_STAGES.map((s) => (
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
                  <TableHead>商机名称</TableHead>
                  <TableHead>客户</TableHead>
                  <TableHead>金额</TableHead>
                  <TableHead>阶段</TableHead>
                  <TableHead>概率</TableHead>
                  <TableHead>预计成交</TableHead>
                  <TableHead>负责人</TableHead>
                  <TableHead className="w-[50px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOpportunities.map((opp) => (
                  <TableRow key={opp.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{opp.name}</TableCell>
                    <TableCell className="text-muted-foreground">{opp.customerName}</TableCell>
                    <TableCell className="font-medium">¥{(opp.value / 10000).toFixed(0)}万</TableCell>
                    <TableCell>
                      <Badge variant={stageVariant(opp.stage)}>{opp.stage}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{opp.probability}%</span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {opp.expectedCloseDate}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {opp.assignedSales}
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
                          <DropdownMenuItem>创建报价</DropdownMenuItem>
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
