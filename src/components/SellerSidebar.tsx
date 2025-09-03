import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Package,
  ShoppingCart,
  TrendingUp,
  Plus,
  DollarSign,
  Truck,
  Bell,
  PieChart,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
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

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups(prev =>
      prev.includes(groupTitle)
        ? prev.filter(title => title !== groupTitle)
        : [...prev, groupTitle]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isGroupActive = (items: any[]) => items.some(item => isActive(item.url));

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
          {menuItems.map((group) => (
            <Collapsible
              key={group.title}
              open={openGroups.includes(group.title)}
              onOpenChange={(open) => {
                if (open) {
                  setOpenGroups(prev => [...prev, group.title]);
                } else {
                  setOpenGroups(prev => prev.filter(title => title !== group.title));
                }
              }}
            >
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  className={cn(
                    "w-full justify-between mb-2 h-12",
                    isGroupActive(group.items) && "bg-primary/10 text-primary"
                  )}
                >
                  <div className="flex items-center">
                    <group.icon className="w-5 h-5 mr-3" />
                    {!isCollapsed && <span className="font-medium">{group.title}</span>}
                  </div>
                  {!isCollapsed && (
                    openGroups.includes(group.title) ? 
                      <ChevronDown className="w-4 h-4" /> : 
                      <ChevronRight className="w-4 h-4" />
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="space-y-1">
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors",
                            "hover:bg-muted/50",
                            isActive && "bg-primary text-primary-foreground hover:bg-primary/90"
                          )
                        }
                      >
                        <item.icon className="w-4 h-4" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}