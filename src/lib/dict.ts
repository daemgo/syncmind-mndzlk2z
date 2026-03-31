// Dictionary items from spec globalRules

export const dictionaries = {
  customer_level: [
    { label: "A类 - 重点客户", value: "A" },
    { label: "B类 - 普通客户", value: "B" },
    { label: "C类 - 潜在客户", value: "C" },
  ],
  followup_type: [
    { label: "拜访", value: "拜访" },
    { label: "电话", value: "电话" },
    { label: "会议", value: "会议" },
    { label: "线上沟通", value: "线上沟通" },
    { label: "其他", value: "其他" },
  ],
  opportunity_stage: [
    { label: "线索", value: "线索", color: "gray" },
    { label: "需求确认", value: "需求确认", color: "blue" },
    { label: "方案报价", value: "方案报价", color: "yellow" },
    { label: "合同谈判", value: "合同谈判", color: "purple" },
    { label: "成交", value: "成交", color: "green" },
    { label: "失败", value: "失败", color: "red" },
  ],
  customer_status: [
    { label: "潜在客户", value: "潜在", color: "gray" },
    { label: "跟进中", value: "跟进中", color: "blue" },
    { label: "已成交", value: "成交", color: "green" },
    { label: "已流失", value: "流失", color: "red" },
  ],
} as const;

// Helper: get options for a dictionary
export function getDictOptions(dictId: string) {
  return dictionaries[dictId as keyof typeof dictionaries] || [];
}

// Helper: get label for a value
export function getDictLabel(dictId: string, value: string): string {
  const options = getDictOptions(dictId);
  return options.find((o) => o.value === value)?.label || value;
}

// Helper: get color for a value
export function getDictColor(dictId: string, value: string): string | undefined {
  const options = getDictOptions(dictId);
  return options.find((o) => o.value === value)?.color;
}

// Helper: get badge variant from status color
export function getStatusVariant(color: string | undefined): "default" | "secondary" | "outline" | "destructive" {
  switch (color) {
    case "green":
      return "default";
    case "blue":
      return "secondary";
    case "red":
      return "destructive";
    case "gray":
    case "yellow":
    case "purple":
    default:
      return "outline";
  }
}
