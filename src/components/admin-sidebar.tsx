import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { 
  BarChart3, 
  Users, 
  Package, 
  Truck, 
  MessageSquare, 
  TrendingUp, 
  Settings, 
  Heart,
  ChevronDown,
  LayoutDashboard,
  UserCheck,
  UserX,
  Shield,
  PackageCheck,
  Search,
  FolderTree,
  ClipboardList,
  Calculator,
  FileText,
  Megaphone,
  BarChart,
  PieChart,
  Globe,
  CreditCard,
  BookOpen,
  Sparkles
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
  SidebarTrigger,
  SidebarHeader
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

const menuGroups = [
  {
    title: "대시보드",
    items: [
      { title: "개요", url: "/", icon: LayoutDashboard },
      { title: "실시간 모니터링", url: "/monitoring", icon: BarChart3 },
    ]
  },
  {
    title: "회원 관리",
    items: [
      { title: "회원 정보", url: "/members", icon: Users },
      { title: "탈퇴 회원", url: "/members/withdrawn", icon: UserX },
      { title: "권한 설정", url: "/members/permissions", icon: Shield },
    ]
  },
  {
    title: "상품 관리",
    items: [
      { title: "상품 승인", url: "/products", icon: Package },
      { title: "상품 검사", url: "/products/inspection", icon: PackageCheck },
      { title: "카테고리", url: "/products/categories", icon: FolderTree },
    ]
  },
  {
    title: "주문/배송",
    items: [
      { title: "주문 내역", url: "/orders", icon: ClipboardList },
      { title: "배송 관리", url: "/delivery", icon: Truck },
      { title: "판매자 정산", url: "/settlements", icon: Calculator },
    ]
  },
  {
    title: "정산/통계",
    items: [
      { title: "종합 분석", url: "/analytics", icon: BarChart },
      { title: "실적 분석", url: "/performance", icon: PieChart },
      { title: "매출 통계", url: "/revenue", icon: TrendingUp },
    ]
  },
  {
    title: "시스템 관리",
    items: [
      { title: "사이트 콘텐츠", url: "/content", icon: Globe },
      { title: "결제 시스템", url: "/payment", icon: CreditCard },
      { title: "시스템 설정", url: "/system", icon: Settings },
    ]
  },
]

export function AdminSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const collapsed = state === "collapsed"
  const [openGroups, setOpenGroups] = useState<string[]>(() => {
    // Find which group contains the current route and keep it open
    const currentGroup = menuGroups.find(group => 
      group.items.some(item => item.url === location.pathname)
    )
    return currentGroup ? [currentGroup.title] : ["대시보드"]
  })

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups(prev => 
      prev.includes(groupTitle) 
        ? prev.filter(g => g !== groupTitle)
        : [...prev, groupTitle]
    )
  }

  const isActive = (url: string) => {
    if (url === "/") return location.pathname === "/"
    return location.pathname.startsWith(url)
  }

  return (
    <Sidebar className={cn("border-r border-border", collapsed ? "w-16" : "w-64")}>
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-semibold">Admin</h2>
              <p className="text-xs text-muted-foreground">관리자 대시보드</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        {menuGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <Collapsible 
              open={openGroups.includes(group.title)} 
              onOpenChange={() => toggleGroup(group.title)}
            >
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className={cn(
                  "flex items-center justify-between w-full px-2 py-2 text-sm font-medium rounded-md hover:bg-secondary transition-colors cursor-pointer",
                  collapsed && "justify-center"
                )}>
                  <span className={cn(collapsed && "sr-only")}>{group.title}</span>
                  {!collapsed && (
                    <ChevronDown 
                      className={cn(
                        "w-4 h-4 transition-transform", 
                        openGroups.includes(group.title) && "rotate-180"
                      )} 
                    />
                  )}
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.url}>
                        <SidebarMenuButton asChild>
                          <NavLink 
                            to={item.url} 
                            className={cn(
                              "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors text-sm",
                              isActive(item.url) 
                                ? "bg-primary text-primary-foreground font-medium" 
                                : "hover:bg-secondary text-foreground"
                            )}
                          >
                            <item.icon className="w-4 h-4 flex-shrink-0" />
                            {!collapsed && <span>{item.title}</span>}
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
