import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Save, 
  Shield,
  Store,
  Bell,
  CreditCard
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function Profile() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isSeller, setIsSeller] = useState(false)
  const [formData, setFormData] = useState({
    name: "김농부",
    email: "farmer@example.com",
    phone: "010-1234-5678",
    birthDate: "1990-01-01",
    address: "서울시 강남구 역삼동 123-45",
    detailAddress: "농산물 아파트 101호",
    zipCode: "06234",
    bio: "신선한 농산물을 재배하는 농부입니다.",
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    sellerInfo: {
      businessNumber: "",
      farmName: "",
      farmAddress: "",
      mainProducts: ""
    }
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNotificationChange = (type: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value
      }
    }))
  }

  const handleSellerInfoChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      sellerInfo: {
        ...prev.sellerInfo,
        [field]: value
      }
    }))
  }

  const handleSave = () => {
    toast({
      title: "프로필이 업데이트되었습니다",
      description: "변경사항이 성공적으로 저장되었습니다."
    })
    setIsEditing(false)
  }

  const handleSellerRegistration = () => {
    if (!isSeller) {
      setIsSeller(true)
      toast({
        title: "판매자 등록",
        description: "판매자 정보를 입력해주세요."
      })
    } else {
      toast({
        title: "판매자 정보가 업데이트되었습니다",
        description: "판매자 등록 정보가 저장되었습니다."
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 프로필 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">내 프로필</h1>
            <p className="text-muted-foreground">
              개인정보를 관리하고 판매자로 등록할 수 있습니다
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={isSeller ? "default" : "secondary"} className="flex items-center gap-1">
              <Store className="w-3 h-3" />
              {isSeller ? "판매자" : "일반회원"}
            </Badge>
          </div>
        </div>

        <div className="grid gap-6">
          {/* 프로필 이미지 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                프로필 이미지
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/avatars/user.jpg" />
                  <AvatarFallback className="text-lg">{formData.name[0]}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  <Camera className="w-4 h-4 mr-2" />
                  이미지 변경
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 기본 정보 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  기본 정보
                </CardTitle>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "취소" : "수정"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">이름</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">전화번호</Label>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">생년월일</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange("birthDate", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">자기소개</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  disabled={!isEditing}
                  placeholder="자신을 소개해주세요..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* 주소 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                주소 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zipCode">우편번호</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      disabled={!isEditing}
                    />
                    <Button variant="outline" size="sm" disabled={!isEditing}>
                      검색
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">주소</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="detailAddress">상세주소</Label>
                <Input
                  id="detailAddress"
                  value={formData.detailAddress}
                  onChange={(e) => handleInputChange("detailAddress", e.target.value)}
                  disabled={!isEditing}
                  placeholder="상세주소를 입력해주세요"
                />
              </div>
            </CardContent>
          </Card>

          {/* 알림 설정 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                알림 설정
              </CardTitle>
              <CardDescription>
                받고 싶은 알림 방식을 선택해주세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>이메일 알림</Label>
                  <p className="text-sm text-muted-foreground">주문, 배송 관련 이메일을 받습니다</p>
                </div>
                <Switch
                  checked={formData.notifications.email}
                  onCheckedChange={(value) => handleNotificationChange("email", value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS 알림</Label>
                  <p className="text-sm text-muted-foreground">배송 알림을 문자로 받습니다</p>
                </div>
                <Switch
                  checked={formData.notifications.sms}
                  onCheckedChange={(value) => handleNotificationChange("sms", value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>푸시 알림</Label>
                  <p className="text-sm text-muted-foreground">앱 푸시 알림을 받습니다</p>
                </div>
                <Switch
                  checked={formData.notifications.push}
                  onCheckedChange={(value) => handleNotificationChange("push", value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* 판매자 등록 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="w-5 h-5" />
                판매자 등록
              </CardTitle>
              <CardDescription>
                농산물 판매자로 등록하여 상품을 판매할 수 있습니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium">판매자 계정</h4>
                  <p className="text-sm text-muted-foreground">
                    {isSeller ? "판매자로 등록되어 있습니다" : "일반 회원 계정입니다"}
                  </p>
                </div>
                <Button
                  variant={isSeller ? "secondary" : "default"}
                  onClick={() => setIsSeller(!isSeller)}
                >
                  {isSeller ? "판매자 해제" : "판매자 등록"}
                </Button>
              </div>

              {isSeller && (
                <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
                  <h4 className="font-medium flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    판매자 정보
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessNumber">사업자등록번호</Label>
                      <Input
                        id="businessNumber"
                        value={formData.sellerInfo.businessNumber}
                        onChange={(e) => handleSellerInfoChange("businessNumber", e.target.value)}
                        placeholder="000-00-00000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="farmName">농장명</Label>
                      <Input
                        id="farmName"
                        value={formData.sellerInfo.farmName}
                        onChange={(e) => handleSellerInfoChange("farmName", e.target.value)}
                        placeholder="농장 이름을 입력해주세요"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="farmAddress">농장 주소</Label>
                    <Input
                      id="farmAddress"
                      value={formData.sellerInfo.farmAddress}
                      onChange={(e) => handleSellerInfoChange("farmAddress", e.target.value)}
                      placeholder="농장 위치를 입력해주세요"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mainProducts">주요 취급 상품</Label>
                    <Textarea
                      id="mainProducts"
                      value={formData.sellerInfo.mainProducts}
                      onChange={(e) => handleSellerInfoChange("mainProducts", e.target.value)}
                      placeholder="주로 재배하는 농산물을 입력해주세요"
                      rows={3}
                    />
                  </div>
                  <Button onClick={handleSellerRegistration} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    판매자 정보 저장
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 저장 버튼 */}
          {isEditing && (
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                취소
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                변경사항 저장
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}