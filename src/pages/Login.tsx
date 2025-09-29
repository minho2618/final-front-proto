import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Eye,
  EyeOff,
  Leaf,
  Mail,
  Lock,
  Phone,
  User,
  MapPin,
  Building,
} from "lucide-react";
import Header from "@/components/Header";
import { signUp, createSeller } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const BACKEND_URL = 'http://localhost:9000'; 
const NAVER_LOGIN_URL = `${BACKEND_URL}/oauth2/authorization/naver`;
const GOOGLE_LOGIN_URL = `${BACKEND_URL}/oauth2/authorization/google`;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ 
    email: "", 
    password: "" 
  });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNum: "", // Changed from phone to phoneNum to match API
    address: "Default Address", // Added address field
    type: "buyer",
  });
  const [farmerData, setFarmerData] = useState({
    sellerName: "", // Changed from farmName
    sellerAddress: "", // Changed from address
    sellerIntro: "", // Changed from introduction
    sellerRegNo: "", // 사업자 등록번호 추가
    // experience is not in SellerReq, so I'm removing it for now
  });
  const [hasBusinessReg, setHasBusinessReg] = useState(false); // 사업자 등록번호 여부
  const [member, setMember] = useState({
    address: "",
    name: "",
    memberId: 0,
    username: ""
  })
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // // Mock login logic - in a real app, this would call an API
    // if (loginData.email && loginData.password) {
    //   // Store a mock auth token in localStorage
    //   localStorage.setItem('authToken', 'mock-auth-token');
    //   toast({
    //     title: "로그인 성공",
    //     description: "프로필 페이지로 이동합니다.",
    //   });
    //   // Navigate to profile page after successful login
    //   setTimeout(() => {
    //     navigate('/profile');
    //   }, 1000);
    // } else {
    //   toast({
    //     title: "로그인 실패",
    //     description: "이메일과 비밀번호를 입력해주세요.",
    //     variant: "destructive",
    //   });
    // }
    const formData = new FormData() // 폼전송으로 값 전달
    formData.append('username', loginData.email)
    formData.append('password', loginData.password)

    axios({
      method:'post',
      url:'http://localhost:9000/login',
      data:formData,
    })
    .then((res) => {
      console.log(res);
      // 로그인 성공하면 어떤 작업으로 연결해야할까?..LocalStorage에 담는다
      localStorage.setItem("memberId", res.data.memberId);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("address", res.data.address);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("Authorization", res.headers.authorization)

      // 로그인 인증되었다는 상태를 바꿔준다. Apps.jsx에 있는 isLoggedIn값을 변경
      // loginedCon.onLoggedChange(true)

      toast({
        title: "로그인 성공"
      });
      // Navigate to profile page after successful login
      // setTimeout(() => {
      //   navigate('/profile');
      // }, 1000);
      navigate('/');
    })
    .catch((err) => {
        toast({
        title: "로그인 실패",
        description: "이메일과 비밀번호를 입력해주세요.",
        variant: "destructive",
      });
    });

  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 새로운 API 형식에 맞는 payload 생성
    const payload = {
      memberSignUpInfo: {
        email: signupData.email,
        password: signupData.password,
        name: signupData.name,
        phoneNum: signupData.phoneNum,
        address: signupData.address
      },
      sellerSignUpInfo: signupData.type === "seller" ? {
        country: "한국",
        postalCode: "00000",
        sellerAddress: farmerData.sellerAddress,
        sellerIntro: farmerData.sellerIntro,
        sellerName: farmerData.sellerName,
        sellerRegNo: farmerData.sellerRegNo || "000-00-00000"
      } : null
    };


    // try {
    //   // JSON 형태로 API 호출
    //   const response = await fetch("http://localhost:9000/api/members/signup", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(payload)
    //   });

    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     throw new Error(errorData.message || "회원가입에 실패했습니다.");
    //   }

    //   toast({
    //     title: "회원가입 성공",
    //     description: "로그인 탭으로 이동하여 로그인해주세요.",
    //   });
    // } catch (err: any) {
    //   setError(err.message || "회원가입에 실패했습니다.");
    //   console.error(err);
    // } finally {
    //   setLoading(false);
    // }

    console.log(payload);

    axios({      
      method: "post",
      url: `http://localhost:9000/api/${signupData.type === "seller" ? "sellers" : "members"}`,
      data: payload
    })
    .then((res) => {
      toast({
        title: "회원가입 성공",
        description: "로그인 탭으로 이동하여 로그인해주세요.",
      });
      navigate("/")
    })
    .catch((err) => {
      // const errorData = await response.json();
      throw new Error(err.message || "회원가입에 실패했습니다.");
    })
  };
  const handleNaverLogin = () => {
        window.location.href = NAVER_LOGIN_URL;
    };
  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_LOGIN_URL;
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
            <h1 className="text-2xl font-bold mb-2">
              신선마켓에 오신 것을 환영합니다
            </h1>
            <p className="text-muted-foreground">신선한 농산물 직거래 플랫폼</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">로그인</TabsTrigger>
              <TabsTrigger value="signup">회원가입</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <Card className="p-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">이메일</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@email.com"
                        className="pl-10"
                        value={loginData.email}
                        onChange={(e) =>
                          setLoginData({ ...loginData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">비밀번호</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="비밀번호를 입력하세요"
                        className="pl-10 pr-10"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-0 h-auto"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span>로그인 상태 유지</span>
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-primary hover:underline"
                    >
                      비밀번호 찾기
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    variant="outline"
                    className="w-full text-black bg-gradient-fresh 
                    hover:shadow-fresh hover:text-white h-12"
                  >
                    로그인
                  </Button>
                </form>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-background px-2 text-muted-foreground">
                        또는
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <Button variant="outline" className="w-full" 
                    onClick={handleNaverLogin}>
                      네이버 로그인
                    </Button>
                    <Button variant="outline" className="w-full"
                    onClick={handleGoogleLogin}>
                      구글 로그인
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup">
              <Card className="p-6">
                <form onSubmit={handleSignup} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 rounded-lg">
                        <p className="text-sm text-red-800">{error}</p>
                    </div>
                  )}
                  {/* User Type Selection */}
                  <div className="space-y-2">
                    <Label>가입 유형</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        type="button"
                        variant={
                          signupData.type === "buyer" ? "default" : "outline"
                        }
                        onClick={() =>
                          setSignupData({ ...signupData, type: "buyer" })
                        }
                        className="h-12"
                      >
                        <User className="w-4 h-4 mr-2" />
                        구매자
                      </Button>
                      <Button
                        type="button"
                        variant={
                          signupData.type === "seller" ? "default" : "outline"
                        }
                        onClick={() =>
                          setSignupData({ ...signupData, type: "seller" })
                        }
                        className="h-12"
                      >
                        <Building className="w-4 h-4 mr-2" />
                        판매자(농가)
                      </Button>
                    </div>
                  </div>

                  {/* Basic Info */}
                  <div className="space-y-2">
                    <Label htmlFor="name">이름</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="name"
                        placeholder="이름을 입력하세요"
                        className="pl-10"
                        value={signupData.name}
                        onChange={(e) =>
                          setSignupData({ ...signupData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">이메일</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="example@email.com"
                        className="pl-10"
                        value={signupData.email}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">비밀번호</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="8자 이상 입력하세요"
                        className="pl-10"
                        value={signupData.password}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            password: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">전화번호</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="phone"
                        placeholder="010-1234-5678"
                        className="pl-10"
                        value={signupData.phoneNum}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            phoneNum: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  {/* Farmer Additional Info */}
                  {signupData.type === "seller" && (
                    <>
                      <Separator className="my-4" />
                      <div className="space-y-4">
                        <h3 className="font-semibold text-primary">
                          농장 정보
                        </h3>

                        <div className="space-y-2">
                          <Label htmlFor="farmName">농장명</Label>
                          <Input
                            id="farmName"
                            placeholder="예: 안동 햇살농장"
                            value={farmerData.sellerName}
                            onChange={(e) =>
                              setFarmerData({
                                ...farmerData,
                                sellerName: e.target.value,
                              })
                            }
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address">농장 주소</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              id="address"
                              placeholder="예: 경북 안동시 ○○면"
                              className="pl-10"
                              value={farmerData.sellerAddress}
                              onChange={(e) =>
                                setFarmerData({
                                  ...farmerData,
                                  sellerAddress: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="introduction">농장 소개</Label>
                          <textarea
                            id="introduction"
                            className="w-full min-h-[80px] px-3 py-2 border border-input rounded-md text-sm"
                            placeholder="농장의 특징이나 재배 방식을 간단히 소개해주세요"
                            value={farmerData.sellerIntro}
                            onChange={(e) =>
                              setFarmerData({
                                ...farmerData,
                                sellerIntro: e.target.value,
                              })
                            }
                          />
                        </div>

                        {/* 사업자 등록번호 여부 체크 */}
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              className="rounded"
                              checked={hasBusinessReg}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setHasBusinessReg(checked);
                                // 체크 해제 시 사업자 등록번호 초기화
                                if (!checked) {
                                  setFarmerData({
                                    ...farmerData,
                                    sellerRegNo: "",
                                  });
                                }
                              }}
                            />
                            <span>사업자 등록번호가 있습니다</span>
                          </label>
                        </div>

                        {/* 사업자 등록번호 입력 필드 */}
                        {hasBusinessReg && (
                          <div className="space-y-2">
                            <Label htmlFor="businessRegNo">사업자 등록번호</Label>
                            <Input
                              id="businessRegNo"
                              placeholder="000-00-00000"
                              value={farmerData.sellerRegNo}
                              onChange={(e) =>
                                setFarmerData({
                                  ...farmerData,
                                  sellerRegNo: e.target.value,
                                })
                              }
                              required={hasBusinessReg}
                            />
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer text-sm">
                      <input type="checkbox" className="rounded" required />
                      <span>
                        <Link
                          to="/terms"
                          className="text-primary hover:underline"
                        >
                          이용약관
                        </Link>{" "}
                        및{" "}
                        <Link
                          to="/privacy"
                          className="text-primary hover:underline"
                        >
                          개인정보처리방침
                        </Link>
                        에 동의합니다
                      </span>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    variant="outline"
                    className="w-full bg-gradient-fresh hover:shadow-fresh h-12"
                    disabled={loading}
                  >
                    {loading ? "가입 처리 중..." : signupData.type === "seller"
                      ? "농가 등록 신청"
                      : "회원가입"}
                  </Button>
                </form>

                {signupData.type === "seller" && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>안내:</strong> 농가 등록 신청 후 관리자 승인까지
                      1-2일 소요됩니다.
                    </p>
                  </div>
                )}
              </Card>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-6 text-sm text-muted-foreground">
            <p>
              신선마켓은 농가와 소비자를 직접 연결하여
              <br />
              더 신선하고 합리적인 농산물 거래를 지원합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;