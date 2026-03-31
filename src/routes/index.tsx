"use client";

import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowUp,
  ArrowDown,
  Users,
  TrendingUp,
  DollarSign,
  Target,
  Plus,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, XAxis, YAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { customersMock } from "@/mock/customers";
import { opportunitiesMock } from "@/mock/opportunities";
import { followupsMock } from "@/mock/followups";
import { getDictLabel } from "@/lib/dict";

// Stats data
const statsData = [
  {
    title: "客户总数",
    value: customersMock.length,
    change: "+12%",
    trend: "up" as const,
    icon: Users,
    bg: "bg-blue-50",
    color: "text-blue-600",
  },
  {
    title: "活跃商机",
    value: opportunitiesMock.filter((o) => !["成交", "失败"].includes(o.stage)).length,
    change: "+8%",
    trend: "up" as const,
    icon: TrendingUp,
    bg: "bg-emerald-50",
    color: "text-emerald-600",
  },
  {
    title: "本月成交金额",
    value: "¥280,000",
    change: "-5%",
    trend: "down" as const,
    icon: DollarSign,
    bg: "bg-violet-50",
    color: "text-violet-600",
  },
  {
    title: "转化率",
    value: "32%",
    change: "+3%",
    trend: "up" as const,
    icon: Target,
    bg: "bg-amber-50",
    color: "text-amber-600",
  },
];

// Trend chart data
const trendData = [
  { month: "1月", opportunities: 4, revenue: 18600 },
  { month: "2月", opportunities: 6, revenue: 42000 },
  { month: "3月", opportunities: 8, revenue: 55000 },
  { month: "4月", opportunities: 5, revenue: 38000 },
  { month: "5月", opportunities: 7, revenue: 62000 },
  { month: "6月", opportunities: 9, revenue: 78000 },
  { month: "7月", opportunities: 6, revenue: 45000 },
];

// Stage distribution data
const stageData = [
  { name: "线索", value: 1, fill: "var(--color-chart-1)" },
  { name: "需求确认", value: 2, fill: "var(--color-chart-2)" },
  { name: "方案报价", value: 2, fill: "var(--color-chart-3)" },
  { name: "合同谈判", value: 1, fill: "var(--color-chart-4)" },
  { name: "成交", value: 2, fill: "var(--color-chart-5)" },
];

// Recent followups
const recentFollowups = followupsMock.slice(0, 5);

// Activity data
const activities = [
  { time: "14:30", text: "新跟进记录 - 北京科技公司", type: "info" },
  { time: "11:15", text: "商机阶段更新 - 杭州网络科技", type: "success" },
  { time: "10:00", text: "新客户创建 - 武汉光谷科技", type: "info" },
  { time: "09:30", text: "新跟进记录 - 广州贸易公司", type: "info" },
  { time: "昨日", text: "商机成交 - 上海智能制造", type: "success" },
];

const trendChartConfig: ChartConfig = {
  opportunities: { label: "商机数", color: "var(--color-chart-1)" },
  revenue: { label: "成交额", color: "var(--color-chart-2)" },
};

const stageChartConfig: ChartConfig = {
  value: { label: "商机数" },
};

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-semibold tracking-tight">仪表盘</h1>
          <p className="text-sm text-muted-foreground">B2B 销售管理数据概览</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat) => (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <div className={`${stat.bg} ${stat.color} rounded-lg p-2`}>
                    <stat.icon className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                <div className="mt-1 flex items-center gap-1 text-xs">
                  {stat.trend === "up" ? (
                    <ArrowUp className="h-3 w-3 text-emerald-600" />
                  ) : (
                    <ArrowDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={stat.trend === "up" ? "text-emerald-600" : "text-red-500"}>
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground">较上月</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Trend Chart */}
          <Card className="lg:col-span-2 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">月度趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={trendChartConfig} className="h-[280px] w-full">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" tick={{ fill: "var(--color-muted-foreground)" }} />
                  <YAxis className="text-xs" tick={{ fill: "var(--color-muted-foreground)" }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="opportunities" stroke="var(--color-chart-1)" strokeWidth={2}
                    dot={{ r: 4, fill: "var(--color-chart-1)" }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="revenue" stroke="var(--color-chart-2)" strokeWidth={2}
                    dot={{ r: 4, fill: "var(--color-chart-2)" }} activeDot={{ r: 6 }} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Stage Distribution */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">商机阶段分布</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={stageChartConfig} className="h-[220px] w-full">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Pie data={stageData} dataKey="value" nameKey="name"
                    cx="50%" cy="50%" innerRadius={50} outerRadius={80}
                    strokeWidth={2} stroke="var(--color-background)">
                    {stageData.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {stageData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-xs">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.fill }} />
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className="ml-auto font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Data Row */}
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Recent Followups */}
          <Card className="lg:col-span-2 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-medium">
                最近跟进
                <span className="ml-2 text-sm font-normal text-muted-foreground">共 {followupsMock.length} 条</span>
              </CardTitle>
              <Link to="/followups" className="text-sm text-primary hover:underline">
                查看全部
              </Link>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>客户</TableHead>
                    <TableHead>跟进方式</TableHead>
                    <TableHead>内容摘要</TableHead>
                    <TableHead>时间</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentFollowups.map((item) => (
                    <TableRow key={item.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">{item.customerName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.type}</Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{item.content}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{item.createdAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">最近动态</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="relative flex flex-col items-center">
                      <div className={`h-2 w-2 rounded-full mt-1.5 ${
                        activity.type === "success" ? "bg-emerald-500" : "bg-blue-500"
                      }`} />
                      {i < activities.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm leading-snug">{activity.text}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
