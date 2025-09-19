import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Mail, ArrowLeft, Leaf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: 백엔드 비밀번호 재설정 요청 API가 준비되면 아래 호출을 교체하세요.
      // 예) await apiClient.post('/auth/forgot-password', { email })
      await new Promise((res) => setTimeout(res, 800));

      toast({
        title: "이메일 전송 완료",
        description: "비밀번호 재설정 링크를 이메일로 발송했습니다.",
      });
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      toast({
        title: "요청 실패",
        description: "잠시 후 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-fresh rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2">비밀번호 찾기</h1>
            <p className="text-muted-foreground">
              가입 시 사용한 이메일로 재설정 링크를 보내드립니다.
            </p>
          </div>

          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-fresh hover:shadow-fresh h-12"
                disabled={loading}
              >
                {loading ? "처리 중..." : "재설정 링크 보내기"}
              </Button>

              <div className="flex items-center justify-center">
                <Link to="/login" className="inline-flex items-center text-sm text-primary hover:underline">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  로그인으로 돌아가기
                </Link>
              </div>

              <div className="mt-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs text-muted-foreground">
                    <span className="bg-background px-2">
                      이메일이 기억나지 않나요? 관리자에게 문의하세요.
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
