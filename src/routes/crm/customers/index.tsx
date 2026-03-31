import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Search, MoreHorizontal, Star } from "lucide-react";

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
import { mockCustomers } from "@/mock/crm";
import { INDUSTRIES, CUSTOMER_STATUSES } from "@/lib/crm-dict";

function statusVariant(status: string) {
  switch (status) {
    case "成交客户":
      return "default" as const;
    case "意向客户":
      return "secondary" as const;
    case "沉默客户":
      return "destructive" as const;
    default:
      return "outline" as const;
  }
}

function ratingVariant(rating: string) {
  switch (rating) {
    case "A":
      return "default" as const;
    case "B":
      return "secondary" as const;
    case "C":
      return "outline" as const;
    default:
      return "outline" as const;
  }
}

export const Route = createFileRoute("/crm/customers/")({
  component: CustomersPage,
});

function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("全部");

  const filteredCustomers = mockCustomers.filter((customer) => {
    const matchesSearch =
      customer.companyName.includes(searchTerm) ||
      customer.shortName.includes(searchTerm) ||
      customer.contact.name.includes(searchTerm);
    const matchesStatus = statusFilter === "全部" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">客户管理</h1>
              <p className="text-sm text-muted-foreground">管理所有客户信息与联系人</p>
            </div>
            <Button>
              <Plus className="mr-1.5 h-4 w-4" />
              新建客户
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6 space-y-6">
        <Tabs defaultValue="全部">
          <TabsList>
            <TabsTrigger value="全部">全部</TabsTrigger>
            <TabsTrigger value="潜在客户">潜在客户</TabsTrigger>
            <TabsTrigger value="意向客户">意向客户</TabsTrigger>
            <TabsTrigger value="成交客户">成交客户</TabsTrigger>
            <TabsTrigger value="沉默客户">沉默客户</TabsTrigger>
          </TabsList>
        </Tabs>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索客户名称、联系人..."
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
                  {CUSTOMER_STATUSES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="行业筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部行业</SelectItem>
                  {INDUSTRIES.map((ind) => (
                    <SelectItem key={ind} value={ind}>{ind}</SelectItem>
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
                  <TableHead>客户名称</TableHead>
                  <TableHead>联系人</TableHead>
                  <TableHead>行业</TableHead>
                  <TableHead>规模</TableHead>
                  <TableHead>评级</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>负责人</TableHead>
                  <TableHead className="w-[50px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <p className="font-medium">{customer.shortName}</p>
                        <p className="text-xs text-muted-foreground">{customer.companyName}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{customer.contact.name}</p>
                        <p className="text-xs text-muted-foreground">{customer.contact.role}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {customer.industry}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {customer.scale.split(" ")[0]}
                    </TableCell>
                    <TableCell>
                      <Badge variant={ratingVariant(customer.rating)}>
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        {customer.rating}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(customer.status)}>{customer.status}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {customer.assignedSales}
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
                          <DropdownMenuItem>新建跟进</DropdownMenuItem>
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
