import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 회사 정보 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">농</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">팜마켓</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              농부가 직접 재배한 신선하고 건강한 농산물을 
              소비자에게 직접 전달하는 온라인 농산물 전문 쇼핑몰입니다.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="hover:bg-primary hover:text-primary-foreground smooth-transition">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary hover:text-primary-foreground smooth-transition">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary hover:text-primary-foreground smooth-transition">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* 쇼핑 정보 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">쇼핑정보</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary smooth-transition">채소</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary smooth-transition">과일</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary smooth-transition">곡물·견과</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary smooth-transition">지역특산품</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary smooth-transition">허브·양념</a></li>
            </ul>
          </div>

          {/* 고객지원 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">고객지원</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary smooth-transition">공지사항</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary smooth-transition">자주묻는질문</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary smooth-transition">배송·반품</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary smooth-transition">이용약관</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary smooth-transition">개인정보처리방침</a></li>
            </ul>
            
            {/* 연락처 정보 */}
            <div className="space-y-2 pt-4">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span className="text-sm">1588-1234</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span className="text-sm">help@farmmarket.co.kr</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">서울시 강남구 농업로 123</span>
              </div>
            </div>
          </div>

          {/* 뉴스레터 구독 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">뉴스레터 구독</h4>
            <p className="text-muted-foreground text-sm">
              신선한 농산물 소식과 특가 정보를 
              가장 먼저 받아보세요!
            </p>
            <div className="space-y-2">
              <Input 
                placeholder="이메일 주소를 입력하세요"
                className="bg-background"
              />
              <Button 
                className="w-full bg-primary hover:bg-primary-hover text-primary-foreground smooth-transition"
              >
                구독하기
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              구독을 통해 개인정보 처리방침에 동의합니다.
            </p>
          </div>
        </div>

        {/* 하단 정보 */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 팜마켓. All rights reserved.
            </div>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <span>사업자등록번호: 123-45-67890</span>
              <span>통신판매업신고: 2024-서울강남-1234</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;