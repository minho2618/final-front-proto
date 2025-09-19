import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, Camera, Save, Store } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getMemberById, updateMember } from "@/lib/api";

interface Member {
  memberId: number;
  email: string;
  phoneNum: string;
  address: string;
  name: string;
  role: string;
}

export default function Profile() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [formData, setFormData] = useState<Partial<Member>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hardcoded memberId for now, will be replaced by auth context
  const memberId = Number(localStorage.getItem("memberId"));

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const data = await getMemberById(memberId);
        setFormData(data);
        setIsSeller(data.role === "ROLE_SELLER" || data.role === "ROLE_ADMIN");
      } catch (err) {
        setError("프로필 정보를 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMemberData();
  }, [memberId]);

  const handleInputChange = (field: keyof Member, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
        if (!formData.name || !formData.phoneNum || !formData.address) {
            toast({ title: "오류", description: "이름, 전화번호, 주소는 필수입니다.", variant: "destructive" });
            return;
        }
      await updateMember(memberId, { 
          name: formData.name, 
          phoneNum: formData.phoneNum, 
          address: formData.address 
        });
      toast({
        title: "프로필이 업데이트되었습니다",
        description: "변경사항이 성공적으로 저장되었습니다.",
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "업데이트 실패",
        description: "프로필 업데이트 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
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
                  <AvatarFallback className="text-lg">{formData.name?.[0]}</AvatarFallback>
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
                    value={formData.name || ""}
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
                      value={formData.email || ""}
                      disabled // Email is not editable
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">전화번호</Label>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={formData.phoneNum || ""}
                      onChange={(e) => handleInputChange("phoneNum", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
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
              <div className="space-y-2">
                <Label htmlFor="address">주소</Label>
                <Input
                  id="address"
                  value={formData.address || ""}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
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
          
          {/* 로그아웃 버튼 */}
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              onClick={() => {
                localStorage.removeItem('Authorization');
                window.location.href = '/';
              }}
            >
              로그아웃
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}