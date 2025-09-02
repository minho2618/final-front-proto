import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: "increase" | "decrease"
  }
  description?: string
  icon?: React.ReactNode
  className?: string
}

export function StatCard({ title, value, change, description, icon, className }: StatCardProps) {
  return (
    <Card className={cn("bg-gradient-card shadow-card", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground mb-1">
          {typeof value === "number" ? value.toLocaleString() : value}
        </div>
        {change && (
          <div className={cn(
            "flex items-center text-sm",
            change.type === "increase" ? "text-success" : "text-destructive"
          )}>
            {change.type === "increase" ? (
              <TrendingUp className="w-3 h-3 mr-1" />
            ) : (
              <TrendingDown className="w-3 h-3 mr-1" />
            )}
            <span>
              {change.type === "increase" ? "+" : ""}{change.value}%
            </span>
            <span className="text-muted-foreground ml-1">지난 달 대비</span>
          </div>
        )}
        {description && !change && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}