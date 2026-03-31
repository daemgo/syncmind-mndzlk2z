// CRM Data Dictionary

export const INDUSTRIES = [
  "互联网/软件",
  "制造业",
  "金融服务",
  "医疗健康",
  "教育培训",
  "零售/电商",
  "物流运输",
  "房地产",
  "政府/公共事业",
  "其他",
] as const;

export const COMPANY_SCALES = [
  "微型企业 (1-20人)",
  "小型企业 (21-100人)",
  "中型企业 (101-500人)",
  "大型企业 (501-1000人)",
  "大型企业 (1000人以上)",
] as const;

export const SALES_STAGES = [
  { value: "线索", label: "线索" },
  { value: "验证", label: "需求验证" },
  { value: "方案", label: "方案制定" },
  { value: "报价", label: "报价中" },
  { value: "谈判", label: "商务谈判" },
  { value: "成交", label: "成交" },
] as const;

export const FOLLOWUP_TYPES = [
  { value: "拜访", label: "拜访" },
  { value: "电话", label: "电话" },
  { value: "会议", label: "会议" },
  { value: "线上沟通", label: "线上沟通" },
  { value: "邮件", label: "邮件" },
] as const;

export const OUTCOME_TYPES = [
  { value: "积极", label: "积极" },
  { value: "中性", label: "中性" },
  { value: "消极", label: "消极" },
] as const;

export const QUOTE_STATUSES = [
  { value: "草稿", label: "草稿" },
  { value: "已发送", label: "已发送" },
  { value: "已确认", label: "已确认" },
  { value: "已拒绝", label: "已拒绝" },
  { value: "已成交", label: "已成交" },
] as const;

export const CUSTOMER_STATUSES = [
  { value: "潜在客户", label: "潜在客户" },
  { value: "意向客户", label: "意向客户" },
  { value: "成交客户", label: "成交客户" },
  { value: "沉默客户", label: "沉默客户" },
] as const;
