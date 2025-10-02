import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type StatusType = "PENDING" | "APPROVED" | "REJECTED"

interface StatusBadgeProps {
  status: StatusType
  className?: string
}

const statusConfig = {
  PENDING: { label: "대기중", className: "bg-status-pending text-warning-foreground" },
  APPROVED: { label: "승인됨", className: "bg-status-approved text-success-foreground" },
  REJECTED: { label: "거절됨", className: "bg-status-rejected text-destructive-foreground" },
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