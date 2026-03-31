// Mock data for Followup module

export interface Followup {
  id: string;
  customerId: string;
  customerName: string;
  opportunityId?: string;
  opportunityName?: string;
  type: "拜访" | "电话" | "会议" | "线上沟通" | "其他";
  content: string;
  attendees: string;
  nextStep: string;
  createdAt: string;
  createdBy: string;
}

export const followupsMock: Followup[] = [
  {
    id: "F001",
    customerId: "C001",
    customerName: "北京科技有限公司",
    opportunityId: "O001",
    opportunityName: "CRM系统采购项目",
    type: "会议",
    content:
      "与张经理进行了深入的需求沟通，对方关注系统的集成能力和数据分析功能。演示了demo，效果良好。",
    attendees: "张经理、技术总监、IT负责人",
    nextStep: "发送详细方案文档，下周电话回访确认需求",
    createdAt: "2026-03-25 14:30",
    createdBy: "销售经理A",
  },
  {
    id: "F002",
    customerId: "C003",
    customerName: "深圳创新科技集团",
    opportunityId: "O002",
    opportunityName: "ERP系统升级",
    type: "拜访",
    content:
      "上门拜访王总，了解其公司数字化转型规划。客户已有明确的时间节点要求，希望Q2完成选型。",
    attendees: "王总、采购经理",
    nextStep: "准备针对性方案，约下次技术交流",
    createdAt: "2026-03-28 10:00",
    createdBy: "销售经理B",
  },
  {
    id: "F003",
    customerId: "C005",
    customerName: "杭州网络科技有限公司",
    opportunityId: "O003",
    opportunityName: "数据分析平台建设",
    type: "电话",
    content:
      "电话沟通了合同细节，包括付款方式和实施周期。双方达成初步一致，待内部审批。",
    attendees: "刘总、财务总监",
    nextStep: "等待客户内部审批结果，预计3-5个工作日",
    createdAt: "2026-03-26 16:45",
    createdBy: "销售经理A",
  },
  {
    id: "F004",
    customerId: "C008",
    customerName: "南京工业自动化公司",
    opportunityId: "O005",
    opportunityName: "供应链管理系统",
    type: "线上沟通",
    content:
      "进行了线上产品演示，展示了系统的自动化功能和报表能力。客户反馈积极。",
    attendees: "周经理、生产部主管",
    nextStep: "发送报价单，安排现场演示",
    createdAt: "2026-03-27 15:20",
    createdBy: "销售经理B",
  },
  {
    id: "F005",
    customerId: "C004",
    customerName: "广州贸易有限公司",
    opportunityId: "O006",
    opportunityName: "客服系统采购",
    type: "拜访",
    content:
      "首次拜访陈经理，了解其客服系统现状和痛点。客户表示现有系统操作复杂，期望更换。",
    attendees: "陈经理、客服主管",
    nextStep: "发送产品介绍资料，安排下次演示",
    createdAt: "2026-03-29 09:30",
    createdBy: "销售经理A",
  },
  {
    id: "F006",
    customerId: "C007",
    customerName: "武汉光谷科技公司",
    opportunityId: "O004",
    opportunityName: "智能报表系统",
    type: "电话",
    content:
      "初次电话沟通，孙总表达了对我司产品的兴趣，邀请下周拜访详谈。",
    attendees: "孙总",
    nextStep: "预约下周拜访时间，准备相关资料",
    createdAt: "2026-03-28 11:15",
    createdBy: "销售经理C",
  },
  {
    id: "F007",
    customerId: "C002",
    customerName: "上海智能制造有限公司",
    type: "会议",
    content:
      "项目已上线，进行了使用培训。客户对系统运行情况表示满意，提出了几点优化建议。",
    attendees: "李总监、实施顾问",
    nextStep: "收集优化需求，列入下版本计划",
    createdAt: "2026-03-15 14:00",
    createdBy: "销售经理A",
  },
  {
    id: "F008",
    customerId: "C006",
    customerName: "成都软件园企业",
    type: "线上沟通",
    content:
      "进行了系统使用回访，了解使用中的问题。赵经理对系统稳定性表示认可。",
    attendees: "赵经理",
    nextStep: "发送使用手册更新版本",
    createdAt: "2026-03-10 10:30",
    createdBy: "销售经理C",
  },
];
