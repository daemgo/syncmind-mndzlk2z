// B2B CRM Type Definitions

export interface Customer {
  id: string;
  companyName: string;
  shortName: string;
  industry: string;
  scale: string;
  rating: CustomerRating;
  status: CustomerStatus;
  contact: Contact;
  assignedSales: string;
  createdAt: string;
  updatedAt: string;
}

export type CustomerRating = "A" | "B" | "C" | "D";
export type CustomerStatus = "潜在客户" | "意向客户" | "成交客户" | "沉默客户";

export interface Contact {
  name: string;
  role: string;
  phone: string;
  email: string;
  wechat?: string;
}

export interface SalesFollowup {
  id: string;
  customerId: string;
  customerName: string;
  type: FollowupType;
  date: string;
  content: string;
  attendee: string[];
  nextAction?: string;
  nextActionDate?: string;
  outcome: FollowupOutcome;
}

export type FollowupType = "拜访" | "电话" | "会议" | "线上沟通" | "邮件";
export type FollowupOutcome = "积极" | "中性" | "消极";

export interface Opportunity {
  id: string;
  name: string;
  customerId: string;
  customerName: string;
  value: number;
  stage: OpportunityStage;
  probability: number;
  expectedCloseDate: string;
  products: string[];
  assignedSales: string;
  createdAt: string;
  updatedAt: string;
}

export type OpportunityStage =
  | "线索"
  | "验证"
  | "方案"
  | "报价"
  | "谈判"
  | "成交";

export interface Quote {
  id: string;
  quoteNumber: string;
  customerId: string;
  customerName: string;
  opportunityId?: string;
  items: QuoteItem[];
  totalAmount: number;
  discount: number;
  status: QuoteStatus;
  validUntil: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuoteItem {
  product: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export type QuoteStatus = "草稿" | "已发送" | "已确认" | "已拒绝" | "已成交";

// Dashboard Stats
export interface DashboardStats {
  totalCustomers: number;
  newCustomersThisMonth: number;
  totalOpportunities: number;
  pipelineValue: number;
  quotesSentThisMonth: number;
  winRate: number;
}

// Status flow for opportunities
export const OPPORTUNITY_STAGES: { stage: OpportunityStage; label: string; color: string }[] = [
  { stage: "线索", label: "线索", color: "outline" },
  { stage: "验证", label: "验证", color: "secondary" },
  { stage: "方案", label: "方案", color: "secondary" },
  { stage: "报价", label: "报价", color: "default" },
  { stage: "谈判", label: "谈判", color: "default" },
  { stage: "成交", label: "成交", color: "default" },
];

export const CUSTOMER_STATUS_CONFIG: { status: CustomerStatus; label: string; color: string }[] = [
  { status: "潜在客户", label: "潜在客户", color: "outline" },
  { status: "意向客户", label: "意向客户", color: "secondary" },
  { status: "成交客户", label: "成交客户", color: "default" },
  { status: "沉默客户", label: "沉默客户", color: "destructive" },
];

export const QUOTE_STATUS_CONFIG: { status: QuoteStatus; label: string; color: string }[] = [
  { status: "草稿", label: "草稿", color: "outline" },
  { status: "已发送", label: "已发送", color: "secondary" },
  { status: "已确认", label: "已确认", color: "default" },
  { status: "已拒绝", label: "已拒绝", color: "destructive" },
  { status: "已成交", label: "已成交", color: "default" },
];
