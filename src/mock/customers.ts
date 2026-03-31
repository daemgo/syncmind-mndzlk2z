// Mock data for Customer module

export interface Customer {
  id: string;
  name: string;
  industry: string;
  scale: "A" | "B" | "C";
  contact: string;
  phone: string;
  email: string;
  address: string;
  status: "潜在" | "跟进中" | "成交" | "流失";
  createdAt: string;
  updatedAt: string;
}

export const customersMock: Customer[] = [
  {
    id: "C001",
    name: "北京科技有限公司",
    industry: "互联网",
    scale: "A",
    contact: "张经理",
    phone: "138-0013-8000",
    email: "zhang@c01.com",
    address: "北京市朝阳区建国路88号",
    status: "跟进中",
    createdAt: "2026-01-15 10:30",
    updatedAt: "2026-03-20 14:22",
  },
  {
    id: "C002",
    name: "上海智能制造有限公司",
    industry: "制造业",
    scale: "A",
    contact: "李总监",
    phone: "139-1739-1739",
    email: "li@c02.com",
    address: "上海市浦东新区张江高科技园区",
    status: "成交",
    createdAt: "2025-11-08 09:15",
    updatedAt: "2026-03-15 16:45",
  },
  {
    id: "C003",
    name: "深圳创新科技集团",
    industry: "科技",
    scale: "B",
    contact: "王总",
    phone: "135-1035-1035",
    email: "wang@c03.com",
    address: "深圳市南山区科技园南区",
    status: "需求确认",
    createdAt: "2026-02-20 11:00",
    updatedAt: "2026-03-25 10:30",
  },
  {
    id: "C004",
    name: "广州贸易有限公司",
    industry: "贸易",
    scale: "B",
    contact: "陈经理",
    phone: "136-2036-2036",
    email: "chen@c04.com",
    address: "广州市天河区珠江新城",
    status: "潜在",
    createdAt: "2026-03-10 15:20",
    updatedAt: "2026-03-10 15:20",
  },
  {
    id: "C005",
    name: "杭州网络科技有限公司",
    industry: "互联网",
    scale: "C",
    contact: "刘总",
    phone: "137-1537-1537",
    email: "liu@c05.com",
    address: "杭州市滨江区阿里巴巴园区",
    status: "跟进中",
    createdAt: "2026-01-25 08:45",
    updatedAt: "2026-03-28 09:15",
  },
  {
    id: "C006",
    name: "成都软件园企业",
    industry: "软件",
    scale: "B",
    contact: "赵经理",
    phone: "138-2838-2838",
    email: "zhao@c06.com",
    address: "成都市高新区天府软件园",
    status: "成交",
    createdAt: "2025-12-01 10:00",
    updatedAt: "2026-02-18 14:30",
  },
  {
    id: "C007",
    name: "武汉光谷科技公司",
    industry: "光电",
    scale: "C",
    contact: "孙总",
    phone: "139-2939-2939",
    email: "sun@c07.com",
    address: "武汉市东湖高新区光谷大道",
    status: "潜在",
    createdAt: "2026-03-20 16:00",
    updatedAt: "2026-03-20 16:00",
  },
  {
    id: "C008",
    name: "南京工业自动化公司",
    industry: "自动化",
    scale: "A",
    contact: "周经理",
    phone: "135-2535-2535",
    email: "zhou@c08.com",
    address: "南京市江宁区百家湖科技园",
    status: "跟进中",
    createdAt: "2026-02-05 13:30",
    updatedAt: "2026-03-22 11:45",
  },
];
