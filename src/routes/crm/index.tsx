import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUp,
  ArrowDown,
  Users,
  TrendingUp,
  Target,
  Clock,
  CheckCircle,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  mockDashboardStats,
  monthlyRevenueData,
  pipelineStageData,
  mockOpportunities,
  mockFollowups,
} from "@/mock/crm";

const revenueChartConfig: ChartConfig = {
  revenue: { label: "收入", color: "var(--color-chart-1)" },
  opportunities: { label: "商机数", color: "var(--color-chart-2)" },
};

const pipelineChartConfig: ChartConfig = {
  amount: { label: "金额", color: "var(--color-chart-1)" },
};

const stageColors = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

export const Route = createFileRoute("/crm/")({
  component: CRMDashboard,
});

function CRMDashboard() {
  const stats = [
    {
      title: "客户总数",
      value: mockDashboardStats.totalCustomers.toLocaleString(),
      change: "+" + mockDashboardStats.newCustomersThisMonth,
      trend: "up" as const,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "商机数量",
      value: mockDashboardStats.totalOpportunities.toString(),
      change: "+5",
      trend: "up" as const,
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "管道金额",
      value: "¥" + (mockDashboardStats.pipelineValue / 10000).toFixed(0) + "万",
      change: "+12.3%",
      trend: "up" as const,
      icon: Target,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      title: "赢单率",
      value: mockDashboardStats.winRate + "%",
      change: "+3.2%",
      trend: "up" as const,
      icon: CheckCircle,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  const recentFollowups = mockFollowups.slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-semibold tracking-tight">工作台</h1>
          <p className="text-sm text-muted-foreground">B2B销售数据概览与业务动态</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
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

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">月度收入与商机趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={revenueChartConfig} className="h-[280px] w-full">
                <LineChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" tick={{ fill: "var(--color-muted-foreground)" }} />
                  <YAxis className="text-xs" tick={{ fill: "var(--color-muted-foreground)" }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-chart-1)"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "var(--color-chart-1)" }}
                    activeDot={{ r: 6 }}
                    name="收入"
                  />
                  <Bar dataKey="opportunities" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} opacity={0.3} name="商机" />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">商机阶段分布</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={pipelineChartConfig} className="h-[220px] w-full">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Pie
                    data={pipelineStageData}
                    dataKey="value"
                    nameKey="stage"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    strokeWidth={2}
                    stroke="var(--color-background)"
                  >
                    {pipelineStageData.map((_, index) => (
                      <Cell key={index} fill={stageColors[index % stageColors.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
              <div className="mt-2 space-y-1">
                {pipelineStageData.map((item, index) => (
                  <div key={item.stage} className="flex items-center gap-2 text-xs">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: stageColors[index] }} />
                    <span className="text-muted-foreground">{item.stage}</span>
                    <span className="ml-auto font-medium">{item.value}个</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-medium">最近跟进</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs">查看全部</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentFollowups.map((followup) => (
                  <div key={followup.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-2 w-2 rounded-full mt-1.5 ${
                          followup.outcome === "积极"
                            ? "bg-emerald-500"
                            : followup.outcome === "消极"
                            ? "bg-red-500"
                            : "bg-amber-500"
                        }`}
                      />
                      <div className="w-px flex-1 bg-border mt-1" />
                    </div>
                    <div className="pb-4 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{followup.customerName}</span>
                        <Badge variant="outline" className="text-xs">{followup.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{followup.content}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{followup.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-medium">重点商机</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs">查看全部</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>商机名称</TableHead>
                    <TableHead>金额</TableHead>
                    <TableHead>阶段</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOpportunities.map((opp) => (
                    <TableRow key={opp.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <div>
                          <p className="text-sm">{opp.name}</p>
                          <p className="text-xs text-muted-foreground">{opp.customerName}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        ¥{(opp.value / 10000).toFixed(0)}万
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{opp.stage}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
