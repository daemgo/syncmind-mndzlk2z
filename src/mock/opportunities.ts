// Mock data for Opportunity module

export interface Opportunity {
  id: string;
  name: string;
  customerId: string;
  customerName: string;
  amount: number;
  stage: "线索" | "需求确认" | "方案报价" | "合同谈判" | "成交" | "失败";
  expectedCloseDate: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export const opportunitiesMock: Opportunity[] = [
  {
    id: "O001",
    name: "CRM系统采购项目",
    customerId: "C001",
    customerName: "北京科技有限公司",
    amount: 500000,
    stage: "方案报价",
    expectedCloseDate: "2026-04-30",
    owner: "销售经理A",
    createdAt: "2026-01-20 09:00",
    updatedAt: "2026-03-25 15:30",
  },
  {
    id: "O002",
    name: "ERP系统升级",
    customerId: "C003",
    customerName: "深圳创新科技集团",
    amount: 800000,
    stage: "需求确认",
    expectedCloseDate: "2026-05-15",
    owner: "销售经理B",
    createdAt: "2026-02-25 10:15",
    updatedAt: "2026-03-28 11:20",
  },
  {
    id: "O003",
    name: "数据分析平台建设",
    customerId: "C005",
    customerName: "杭州网络科技有限公司",
    amount: 350000,
    stage: "合同谈判",
    expectedCloseDate: "2026-04-10",
    owner: "销售经理A",
    createdAt: "2026-01-10 14:00",
    updatedAt: "2026-03-26 16:45",
  },
  {
    id: "O004",
    name: "智能报表系统",
    customerId: "C007",
    customerName: "武汉光谷科技公司",
    amount: 200000,
    stage: "线索",
    expectedCloseDate: "2026-06-30",
    owner: "销售经理C",
    createdAt: "2026-03-20 08:30",
    updatedAt: "2026-03-20 08:30",
  },
  {
    id: "O005",
    name: "供应链管理系统",
    customerId: "C008",
    customerName: "南京工业自动化公司",
    amount: 600000,
    stage: "方案报价",
    expectedCloseDate: "2026-05-20",
    owner: "销售经理B",
    createdAt: "2026-02-15 11:00",
    updatedAt: "2026-03-27 10:15",
  },
  {
    id: "O006",
    name: "客服系统采购",
    customerId: "C004",
    customerName: "广州贸易有限公司",
    amount: 150000,
    stage: "需求确认",
    expectedCloseDate: "2026-04-25",
    owner: "销售经理A",
    createdAt: "2026-03-10 09:30",
    updatedAt: "2026-03-29 14:00",
  },
  {
    id: "O007",
    name: "营销自动化平台",
    customerId: "C001",
    customerName: "北京科技有限公司",
    amount: 420000,
    stage: "成交",
    expectedCloseDate: "2026-03-15",
    owner: "销售经理A",
    createdAt: "2025-12-20 10:00",
    updatedAt: "2026-03-15 17:30",
  },
  {
    id: "O008",
    name: "人力资源系统",
    customerId: "C006",
    customerName: "成都软件园企业",
    amount: 280000,
    stage: "成交",
    expectedCloseDate: "2026-02-28",
    owner: "销售经理C",
    createdAt: "2025-11-15 15:00",
    updatedAt: "2026-02-28 16:00",
  },
];
