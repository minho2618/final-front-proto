import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Users, ShoppingBag, AlertTriangle } from "lucide-react"

export default function Monitoring() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">실시간 모니터링</h1>
        <p className="text-muted-foreground">시스템 현황을 실시간으로 모니터링합니다</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="현재 접속자"
          value="1,247"
          description="지난 시간 대비 +12%"
          icon={<Users />}
        />
        <StatCard
          title="실시간 주문"
          value="89"
          description="처리 대기 중"
          icon={<ShoppingBag />}
        />
        <StatCard
          title="시스템 상태"
          value="정상"
          description="모든 서비스 운영 중"
          icon={<Activity />}
        />
        <StatCard
          title="긴급 알림"
          value="3"
          description="확인 필요"
          icon={<AlertTriangle />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>서버 상태</CardTitle>
            <CardDescription>실시간 서버 모니터링</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>웹 서버</span>
              <Badge variant="default">정상</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>데이터베이스</span>
              <Badge variant="default">정상</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>결제 시스템</span>
              <Badge variant="secondary">점검중</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>배송 API</span>
              <Badge variant="default">정상</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>실시간 활동</CardTitle>
            <CardDescription>최근 5분간 활동 내역</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">새 주문 접수 (#12847)</span>
                <span className="text-xs text-muted-foreground ml-auto">방금 전</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">신규 회원 가입</span>
                <span className="text-xs text-muted-foreground ml-auto">2분 전</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">상품 재고 부족 알림</span>
                <span className="text-xs text-muted-foreground ml-auto">5분 전</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}