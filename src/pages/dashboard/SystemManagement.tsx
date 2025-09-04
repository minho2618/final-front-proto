import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Globe,
  Database,
  Shield,
  Mail,
  Bell,
  Palette,
  Server,
  Settings,
  Save,
  RefreshCw,
  Monitor,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SystemManagement = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // 시스템 설정 상태
  const [siteSettings, setSiteSettings] = useState({
    siteName: "신선마켓",
    siteDescription: "신선한 농산물 직거래 플랫폼",
    contactEmail: "contact@sinseonmarket.com",
    maintenanceMode: false,
    allowRegistration: true,
    enableNotifications: true,
    minOrderAmount: 10000,
    deliveryFee: 3000,
    freeDeliveryThreshold: 30000
  });

  const [systemStatus] = useState({
    database: { status: "healthy", responseTime: "45ms" },
    paymentGateway: { status: "healthy", responseTime: "120ms" },
    emailService: { status: "warning", responseTime: "350ms" },
    fileStorage: { status: "healthy", responseTime: "23ms" },
    apiServer: { status: "healthy", responseTime: "67ms" }
  });

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      // 여기에 실제 저장 로직 구현
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "설정 저장 완료",
        description: "시스템 설정이 성공적으로 저장되었습니다.",
      });
    } catch (error) {
      toast({
        title: "저장 실패",
        description: "설정 저장 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-700";
      case "warning":
        return "bg-yellow-100 text-yellow-700";
      case "error":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">시스템 관리</h1>
        <p className="text-muted-foreground mt-2">
          시스템 설정 및 상태 모니터링을 관리합니다.
        </p>
      </div>

      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="settings">기본 설정</TabsTrigger>
          <TabsTrigger value="status">시스템 상태</TabsTrigger>
          <TabsTrigger value="payment">결제 설정</TabsTrigger>
          <TabsTrigger value="maintenance">유지보수</TabsTrigger>
        </TabsList>

        {/* 기본 설정 탭 */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* 사이트 기본 설정 */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">사이트 기본 설정</h3>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">사이트명</Label>
                  <Input
                    id="siteName"
                    value={siteSettings.siteName}
                    onChange={(e) => setSiteSettings(prev => ({ ...prev, siteName: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">사이트 설명</Label>
                  <Textarea
                    id="siteDescription"
                    value={siteSettings.siteDescription}
                    onChange={(e) => setSiteSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">연락처 이메일</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={siteSettings.contactEmail}
                    onChange={(e) => setSiteSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                  />
                </div>
              </div>
            </Card>

            {/* 운영 설정 */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Settings className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">운영 설정</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>유지보수 모드</Label>
                    <p className="text-sm text-muted-foreground">사이트를 일시적으로 닫습니다</p>
                  </div>
                  <Switch
                    checked={siteSettings.maintenanceMode}
                    onCheckedChange={(checked) => setSiteSettings(prev => ({ ...prev, maintenanceMode: checked }))}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>회원가입 허용</Label>
                    <p className="text-sm text-muted-foreground">새로운 회원가입을 허용합니다</p>
                  </div>
                  <Switch
                    checked={siteSettings.allowRegistration}
                    onCheckedChange={(checked) => setSiteSettings(prev => ({ ...prev, allowRegistration: checked }))}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>알림 기능</Label>
                    <p className="text-sm text-muted-foreground">시스템 알림을 활성화합니다</p>
                  </div>
                  <Switch
                    checked={siteSettings.enableNotifications}
                    onCheckedChange={(checked) => setSiteSettings(prev => ({ ...prev, enableNotifications: checked }))}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* 주문/배송 설정 */}
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <CreditCard className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">주문/배송 설정</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minOrderAmount">최소 주문금액 (원)</Label>
                <Input
                  id="minOrderAmount"
                  type="number"
                  value={siteSettings.minOrderAmount}
                  onChange={(e) => setSiteSettings(prev => ({ ...prev, minOrderAmount: parseInt(e.target.value) }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deliveryFee">배송비 (원)</Label>
                <Input
                  id="deliveryFee"
                  type="number"
                  value={siteSettings.deliveryFee}
                  onChange={(e) => setSiteSettings(prev => ({ ...prev, deliveryFee: parseInt(e.target.value) }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="freeDeliveryThreshold">무료배송 기준금액 (원)</Label>
                <Input
                  id="freeDeliveryThreshold"
                  type="number"
                  value={siteSettings.freeDeliveryThreshold}
                  onChange={(e) => setSiteSettings(prev => ({ ...prev, freeDeliveryThreshold: parseInt(e.target.value) }))}
                />
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSaveSettings} disabled={loading}>
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  저장 중...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  설정 저장
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        {/* 시스템 상태 탭 */}
        <TabsContent value="status" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Monitor className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">시스템 상태 모니터링</h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(systemStatus).map(([service, data]) => (
                <Card key={service} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium capitalize">
                      {service === 'database' && '데이터베이스'}
                      {service === 'paymentGateway' && '결제 게이트웨이'}
                      {service === 'emailService' && '이메일 서비스'}
                      {service === 'fileStorage' && '파일 저장소'}
                      {service === 'apiServer' && 'API 서버'}
                    </h4>
                    {getStatusIcon(data.status)}
                  </div>
                  <div className="space-y-2">
                    <Badge className={getStatusColor(data.status)}>
                      {data.status === 'healthy' && '정상'}
                      {data.status === 'warning' && '주의'}
                      {data.status === 'error' && '오류'}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      응답시간: {data.responseTime}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Database className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">데이터베이스 상태</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">연결 상태</span>
                  <Badge className="bg-green-100 text-green-700">연결됨</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">활성 연결</span>
                  <span className="text-sm font-medium">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">저장소 사용량</span>
                  <span className="text-sm font-medium">67%</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Server className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">서버 리소스</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">CPU 사용률</span>
                  <span className="text-sm font-medium">32%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">메모리 사용률</span>
                  <span className="text-sm font-medium">58%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">디스크 사용률</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* 결제 설정 탭 */}
        <TabsContent value="payment" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <CreditCard className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">결제 시스템 설정</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">PG 업체 설정</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>토스페이먼츠</span>
                    <Badge className="bg-green-100 text-green-700">활성화</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>이니시스</span>
                    <Badge className="bg-gray-100 text-gray-700">비활성화</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>KG이니시스</span>
                    <Badge className="bg-gray-100 text-gray-700">비활성화</Badge>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">결제 수단</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center justify-between">
                    <span>신용카드</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>계좌이체</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>무통장입금</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>간편결제</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* 유지보수 탭 */}
        <TabsContent value="maintenance" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">백업 및 복원</h3>
              </div>
              
              <div className="space-y-4">
                <div className="p-3 bg-secondary/50 rounded-lg">
                  <p className="text-sm font-medium">마지막 백업</p>
                  <p className="text-sm text-muted-foreground">2024년 3월 15일 오전 2:00</p>
                </div>
                
                <div className="space-y-2">
                  <Button className="w-full">
                    <Database className="w-4 h-4 mr-2" />
                    수동 백업 실행
                  </Button>
                  <Button variant="outline" className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    백업 복원
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Bell className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">시스템 로그</h3>
              </div>
              
              <div className="space-y-3 max-h-48 overflow-y-auto">
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-green-600">[INFO] 시스템 정상 가동</span>
                    <span className="text-muted-foreground">14:23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600">[INFO] 사용자 로그인</span>
                    <span className="text-muted-foreground">14:20</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-600">[WARN] 이메일 서비스 응답 지연</span>
                    <span className="text-muted-foreground">14:15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-600">[INFO] 백업 완료</span>
                    <span className="text-muted-foreground">02:00</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  전체 로그 보기
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemManagement;