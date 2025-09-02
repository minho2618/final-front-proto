import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type StatusType = "pending" | "approved" | "rejected" | "processing" | "completed" | "cancelled" | "in_progress"

interface StatusBadgeProps {
  status: StatusType
  className?: string
}

const statusConfig = {
  pending: { label: "대기중", className: "bg-status-pending text-warning-foreground" },
  approved: { label: "승인됨", className: "bg-status-approved text-success-foreground" },
  rejected: { label: "거절됨", className: "bg-status-rejected text-destructive-foreground" },
  processing: { label: "처리중", className: "bg-status-processing text-accent-foreground" },
  completed: { label: "완료", className: "bg-status-approved text-success-foreground" },
  cancelled: { label: "취소됨", className: "bg-muted text-muted-foreground" }
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  
  return (
    <Badge 
      className={cn(config.className, className)}
      variant="secondary"
    >
      {config.label}
    </Badge>
  )
}