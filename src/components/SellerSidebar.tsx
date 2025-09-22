import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Package, ShoppingCart, TrendingUp, Plus, DollarSign, Truck, Bell,
  PieChart, BarChart3, Settings, ChevronDown, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarTrigger, useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const menuItems = [
  {
    title: "상품관리",
    icon: Package,
    items: [
      { title: "상품 등록", url: "/admin/products/register", icon: Plus },
      { title: "가격 및 할인 설정", url: "/admin/products/pricing", icon: DollarSign },
      { title: "재고 관리 및 품질처리", url: "/admin/products/inventory", icon: Settings },
    ],
  },
  {
    title: "주문관리",
    icon: ShoppingCart,
    items: [
      { title: "신규 주문 알림", url: "/admin/orders/notifications", icon: Bell },
      { title: "배송지 및 운송장 관리", url: "/admin/orders/delivery", icon: Truck },
    ],
  },
  {
    title: "정산/통계",
    icon: TrendingUp,
    items: [
      { title: "판매 대금 정산 확인", url: "/admin/analytics/settlement", icon: DollarSign },
      { title: "매출 통계 분석", url: "/admin/analytics/sales", icon: BarChart3 },
      { title: "인기 상품/재고 분석", url: "/admin/analytics/products", icon: PieChart },
    ],
  },
];

export function SellerSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const [openGroups, setOpenGroups] = useState<string[]>(["상품관리"]);

  const isCollapsed = state === "collapsed";
  const isPathActive = (path: string) => location.pathname.startsWith(path);
  const isGroupActive = (items: any[]) => items.some(item => isPathActive(item.url));

  return (
    <Sidebar className="border-r" collapsible="icon">
      <div className="p-4 border-b">
        <SidebarTrigger className="mb-4" />
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">판매자 관리</h2>
              <p className="text-sm text-muted-foreground">농산물 마켓</p>
            </div>
          </div>
        )}
      </div>

      <SidebarContent>
        <div className="px-3 py-2">
          {menuItems.map((group) => {
            const opened = openGroups.includes(group.title);
            const groupActive = isGroupActive(group.items);

            return (
              <Collapsible
                key={group.title}
                open={opened}
                onOpenChange={(open) =>
                  setOpenGroups(prev => open
                    ? [...prev, group.title]
                    : prev.filter(t => t !== group.title))
                }
              >
                {/* 그룹 헤더: 버튼 유지, 호버는 은은하게 */}
                <CollapsibleTrigger asChild>
                  <button
                    className={cn(
                      "w-full flex items-center justify-between mb-2 h-12 rounded-md px-3 transition-colors",
                      "bg-transparent",                       // 기본 투명
                      "hover:bg-muted/40",                    // 헤더 호버시 살짝
                      opened && "bg-muted/50",                // 펼쳐졌을 때 표시
                      groupActive && "bg-primary/10 text-primary" // 현재 경로가 하위에 있으면 강조
                    )}
                  >
                    <div className="flex items-center">
                      <group.icon className="w-5 h-5 mr-3" />
                      {!isCollapsed && <span className="font-medium">{group.title}</span>}
                    </div>
                    {!isCollapsed && (
                      opened ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                </CollapsibleTrigger>

                {/* 하위 메뉴: NavLink만 사용 (이중 호버 제거) */}
                <CollapsibleContent className="space-y-1">
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <NavLink
                          to={item.url}
                          className={({ isActive }) =>
                            cn(
                              "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
                              "bg-transparent",                                 // 기본 투명
                              isActive
                                ? "bg-primary/10 text-primary hover:bg-primary/20"  // 활성 + 호버 시 살짝 더 진하게
                                : "hover:bg-muted/50"                               // 비활성 호버만 색
                            )
                          }
                        >
                          <item.icon className="w-4 h-4" />
                          {!isCollapsed && <span>{item.title}</span>}
                        </NavLink>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
