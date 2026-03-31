import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Search, MoreHorizontal, Clock, Phone, Mail, Users, Video, MessageSquare } from "lucide-react";

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
import { mockFollowups } from "@/mock/crm";
import { FOLLOWUP_TYPES, OUTCOME_TYPES } from "@/lib/crm-dict";

const typeIcons: Record<string, typeof Phone> = {
  拜访: Users,
  电话: Phone,
  会议: Video,
  线上沟通: MessageSquare,
  邮件: Mail,
};

function outcomeVariant(outcome: string) {
  switch (outcome) {
    case "积极":
      return "default" as const;
    case "消极":
      return "destructive" as const;
    default:
      return "secondary" as const;
  }
}

export const Route = createFileRoute("/crm/followups/")({
  component: FollowupsPage,
});

function FollowupsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("全部");
  const [outcomeFilter, setOutcomeFilter] = useState("全部");

  const filteredFollowups = mockFollowups.filter((followup) => {
    const matchesSearch =
      followup.customerName.includes(searchTerm) ||
      followup.content.includes(searchTerm);
    const matchesType = typeFilter === "全部" || followup.type === typeFilter;
    const matchesOutcome = outcomeFilter === "全部" || followup.outcome === outcomeFilter;
    return matchesSearch && matchesType && matchesOutcome;
  });

  const positiveCount = mockFollowups.filter((f) => f.outcome === "积极").length;
  const neutralCount = mockFollowups.filter((f) => f.outcome === "中性").length;
  const negativeCount = mockFollowups.filter((f) => f.outcome === "消极").length;

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">销售跟进</h1>
              <p className="text-sm text-muted-foreground">跟踪所有客户互动记录</p>
            </div>
            <Button>
              <Plus className="mr-1.5 h-4 w-4" />
              新建跟进
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
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">跟进总数</p>
                  <p className="text-xl font-bold">{mockFollowups.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-50 text-emerald-600 rounded-lg p-2">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">积极反馈</p>
                  <p className="text-xl font-bold">{positiveCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="bg-amber-50 text-amber-600 rounded-lg p-2">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">中性反馈</p>
                  <p className="text-xl font-bold">{neutralCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="bg-red-50 text-red-600 rounded-lg p-2">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">消极反馈</p>
                  <p className="text-xl font-bold">{negativeCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="全部">
          <TabsList>
            <TabsTrigger value="全部">全部</TabsTrigger>
            <TabsTrigger value="拜访">拜访</TabsTrigger>
            <TabsTrigger value="电话">电话</TabsTrigger>
            <TabsTrigger value="会议">会议</TabsTrigger>
            <TabsTrigger value="线上沟通">线上沟通</TabsTrigger>
            <TabsTrigger value="邮件">邮件</TabsTrigger>
          </TabsList>
        </Tabs>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索客户名称..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="类型筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="全部">全部类型</SelectItem>
                  {FOLLOWUP_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={outcomeFilter} onValueChange={setOutcomeFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="结果筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="全部">全部结果</SelectItem>
                  {OUTCOME_TYPES.map((o) => (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
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
                  <TableHead>客户</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead>跟进内容</TableHead>
                  <TableHead>参与人</TableHead>
                  <TableHead>结果</TableHead>
                  <TableHead>下次行动</TableHead>
                  <TableHead>日期</TableHead>
                  <TableHead className="w-[50px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFollowups.map((followup) => {
                  const TypeIcon = typeIcons[followup.type] || Phone;
                  return (
                    <TableRow key={followup.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">{followup.customerName}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <TypeIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{followup.type}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[250px]">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {followup.content}
                        </p>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {followup.attendee.join(", ")}
                      </TableCell>
                      <TableCell>
                        <Badge variant={outcomeVariant(followup.outcome)}>
                          {followup.outcome}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {followup.nextAction ? (
                          <div className="text-sm">
                            <p className="font-medium">{followup.nextAction}</p>
                            {followup.nextActionDate && (
                              <p className="text-xs text-muted-foreground">{followup.nextActionDate}</p>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {followup.date}
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
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
