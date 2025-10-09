import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Gavel, TrendingUp, Users, Eye, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import noImage from "@/assets/no-image.png";


interface AuctionItem {
  id: string;
  title: string;
  description: string;
  image: string;
  currentPrice: number;
  startPrice: number;
  endTime: Date;
  bidCount: number;
  seller: {
    name: string;
    rating: number;
    avatar: string;
  };
  category: string;
  weight: string;
  origin: string;
  grade: string;
}

interface Bid {
  id: string;
  bidder: string;
  amount: number;
  time: Date;
}

const AuctionPage = () => {
  const [selectedAuction, setSelectedAuction] = useState<AuctionItem | null>(null);
  const [bidAmount, setBidAmount] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock data
  const auctionItems: AuctionItem[] = [
    {
      id: "1",
      title: "프리미엄 사과 10kg",
      description: "당도 높은 프리미엄 사과입니다. 농약 최소화 재배로 안전하고 맛있습니다.",
      image: "/src/assets/apples.jpg",
      currentPrice: 35000,
      startPrice: 25000,
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2시간 후
      bidCount: 15,
      seller: {
        name: "김농부",
        rating: 4.8,
        avatar: "/placeholder-avatar.jpg"
      },
      category: "과일",
      weight: "10kg",
      origin: "충주",
      grade: "특"
    },
    {
      id: "2",
      title: "유기농 당근 5kg",
      description: "화학비료 없이 자연 그대로 키운 유기농 당근입니다.",
      image: "/src/assets/carrots.jpg",
      currentPrice: 18000,
      startPrice: 12000,
      endTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4시간 후
      bidCount: 8,
      seller: {
        name: "이농장",
        rating: 4.9,
        avatar: "/placeholder-avatar.jpg"
      },
      category: "채소",
      weight: "5kg",
      origin: "제주",
      grade: "상"
    },
    {
      id: "3",
      title: "신선한 토마토 3kg",
      description: "방금 수확한 싱싱한 토마토입니다. 당도와 신선도 최고입니다.",
      image: "/src/assets/tomatoes.jpg",
      currentPrice: 22000,
      startPrice: 15000,
      endTime: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6시간 후
      bidCount: 12,
      seller: {
        name: "박농원",
        rating: 4.7,
        avatar: "/placeholder-avatar.jpg"
      },
      category: "채소",
      weight: "3kg",
      origin: "부여",
      grade: "특"
    }
  ];

  const mockBids: Bid[] = [
    { id: "1", bidder: "농산물마켓", amount: 35000, time: new Date(Date.now() - 5 * 60 * 1000) },
    { id: "2", bidder: "신선푸드", amount: 33000, time: new Date(Date.now() - 15 * 60 * 1000) },
    { id: "3", bidder: "팜투마트", amount: 31000, time: new Date(Date.now() - 25 * 60 * 1000) },
    { id: "4", bidder: "그린마켓", amount: 28000, time: new Date(Date.now() - 35 * 60 * 1000) },
  ];

  // 타이머 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // 남은 시간 계산
  const getTimeRemaining = (endTime: Date) => {
    const now = currentTime.getTime();
    const end = endTime.getTime();
    const diff = end - now;

    if (diff <= 0) return "경매 종료";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleBid = () => {
    if (!selectedAuction || !bidAmount) return;
    
    const amount = parseInt(bidAmount);
    if (amount <= selectedAuction.currentPrice) {
      alert("현재 입찰가보다 높은 금액을 입력해주세요.");
      return;
    }

    // 입찰 로직 (실제로는 API 호출)
    alert(`${amount.toLocaleString()}원으로 입찰되었습니다!`);
    setBidAmount("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">농산품 경매</h1>
          <p className="text-muted-foreground">신선한 농산물을 경매로 만나보세요</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 경매 목록 */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {auctionItems.map((item) => (
                <Card 
                  key={item.id} 
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedAuction?.id === item.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedAuction(item)}
                >
                  <CardHeader className="p-0">
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <img
                        src={item.image && item.image.trim().length > 0 ? item.image : noImage}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          // 무한 루프 방지: 이미 noImage면 다시 설정하지 않기
                          const fallback = new URL(noImage, window.location.origin).href;
                          if (e.currentTarget.src !== fallback) {
                            e.currentTarget.src = fallback;
                          }
                        }}
                      />

                      <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                        {item.category}
                      </Badge>
                      <Badge 
                        variant="secondary" 
                        className="absolute top-3 right-3 bg-card text-card-foreground"
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        {getTimeRemaining(item.endTime)}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm text-muted-foreground">현재가</p>
                        <p className="text-xl font-bold text-primary">
                          {item.currentPrice.toLocaleString()}원
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">입찰 수</p>
                        <p className="text-lg font-semibold">{item.bidCount}회</p>
                      </div>
                    </div>

                    <Separator className="my-3" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={item.seller.avatar} />
                          <AvatarFallback>{item.seller.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{item.seller.name}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <TrendingUp className="w-4 h-4" />
                        <span>{item.seller.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* 상세 정보 및 입찰 */}
          <div className="space-y-6">
            {selectedAuction ? (
              <>
                {/* 경매 상세 정보 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Gavel className="w-5 h-5" />
                      <span>경매 상세</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{selectedAuction.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {selectedAuction.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <Label className="text-muted-foreground">중량</Label>
                        <p className="font-medium">{selectedAuction.weight}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">등급</Label>
                        <p className="font-medium">{selectedAuction.grade}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">원산지</Label>
                        <p className="font-medium">{selectedAuction.origin}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">시작가</Label>
                        <p className="font-medium">{selectedAuction.startPrice.toLocaleString()}원</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">현재 최고가</p>
                      <p className="text-3xl font-bold text-primary mb-2">
                        {selectedAuction.currentPrice.toLocaleString()}원
                      </p>
                      <Badge variant="secondary" className="text-lg px-3 py-1">
                        <Clock className="w-4 h-4 mr-1" />
                        {getTimeRemaining(selectedAuction.endTime)}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* 입찰하기 */}
                <Card>
                  <CardHeader>
                    <CardTitle>입찰하기</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="bidAmount">입찰 금액</Label>
                      <Input
                        id="bidAmount"
                        type="number"
                        placeholder={`${selectedAuction.currentPrice + 1000} 이상`}
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <Button 
                      onClick={handleBid} 
                      className="w-full" 
                      size="lg"
                      disabled={!bidAmount || parseInt(bidAmount) <= selectedAuction.currentPrice}
                    >
                      <Gavel className="w-4 h-4 mr-2" />
                      입찰하기
                    </Button>
                  </CardContent>
                </Card>

                {/* 입찰 기록 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>입찰 기록</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockBids.map((bid) => (
                        <div key={bid.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{bid.bidder}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(bid.time).toLocaleTimeString()}
                            </p>
                          </div>
                          <p className="font-bold text-primary">
                            {bid.amount.toLocaleString()}원
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Eye className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">경매 상품을 선택해주세요</h3>
                  <p className="text-muted-foreground">
                    왼쪽에서 경매 상품을 클릭하시면 상세 정보를 확인할 수 있습니다.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AuctionPage;