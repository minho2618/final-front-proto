import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AdminLayout } from "@/components/admin-layout";
import { SellerLayout } from "@/components/SellerLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import CategoryPage from "./pages/CategoryPage";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Dashboard from "./pages/dashboard/Dashboard";
import Members from "./pages/dashboard/Members";
import Products from "./pages/dashboard/Products";
import NotFound from "./pages/NotFound";
import Monitoring from "./pages/dashboard/Monitoring";
import WithdrawnMembers from "./pages/dashboard/WithdrawnMembers";
import Permissions from "./pages/dashboard/Permissions";
import ProductInspection from "./pages/dashboard/ProductInspection";
import Categories from "./pages/dashboard/Categories";
import Orders from "./pages/dashboard/Orders";
import Delivery from "./pages/dashboard/Delivery";
import Settlements from "./pages/dashboard/Settlements";  
import Support from "./pages/dashboard/Support";
import FAQ from "./pages/dashboard/FAQ";
import Announcements from "./pages/dashboard/Announcements";
import Analytics from "./pages/dashboard/Analytics";
import Performance from "./pages/dashboard/Performance";
import SystemManagement from "./pages/dashboard/SystemManagement";
import RecipePage from "./pages/RecipePage";
import Profile from "./pages/Profile";
// Seller
import SellerDashboard from "./pages/seller/Dashboard";
import AnalyticsProducts from "./pages/seller/AnalyticsProducts";
import AnalyticsSales from "./pages/seller/AnalyticsSales";
import AnalyticsSettlement from "./pages/seller/AnalyticsSettlement";
import OrderDelivery from "./pages/seller/OrderDelivery";
import OrderNotifications from "./pages/seller/OrderNotifications";
import ProductInventory from "./pages/seller/ProductInventory";
import ProductPricing from "./pages/seller/ProductPricing";
import ProductRegister from "./pages/seller/ProductRegister";
import ProductEdit from "./pages/seller/ProductEdit";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          {/* User */}
          <Route path="/login" element={<Login />} />
          {/* Shopping Mall */}
          <Route path="/" element={<Index />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/recipe" element={<RecipePage />} />
          <Route path="/profile" element={<Profile />} />
          {/* DashBoard */}
          <Route path="dashboard/dashboard" element={<AdminLayout><Monitoring /></AdminLayout>} />
          <Route path="dashboard/monitoring" element={<AdminLayout><Monitoring /></AdminLayout>} />
          <Route path="dashboard/members" element={<AdminLayout><Members /></AdminLayout>} />
          <Route path="dashboard/members/withdrawn" element={<AdminLayout><WithdrawnMembers /></AdminLayout>} />
          <Route path="dashboard/members/permissions" element={<AdminLayout><Permissions /></AdminLayout>} />
          <Route path="dashboard/products" element={<AdminLayout><Products /></AdminLayout>} />
          <Route path="dashboard/products/inspection" element={<AdminLayout><ProductInspection /></AdminLayout>} />
          <Route path="dashboard/products/categories" element={<AdminLayout><Categories /></AdminLayout>} />
          <Route path="dashboard/orders" element={<AdminLayout><Orders /></AdminLayout>} />
          <Route path="dashboard/delivery" element={<AdminLayout><Delivery /></AdminLayout>} />
          <Route path="dashboard/settlements" element={<AdminLayout><Settlements /></AdminLayout>} />
          <Route path="dashboard/support" element={<AdminLayout><Support /></AdminLayout>} />
          <Route path="dashboard/faq" element={<AdminLayout><FAQ /></AdminLayout>} />
          <Route path="dashboard/announcements" element={<AdminLayout><Announcements /></AdminLayout>} />
           <Route path="dashboard/analytics" element={<AdminLayout><Analytics /></AdminLayout>} />
           <Route path="dashboard/performance" element={<AdminLayout><Performance /></AdminLayout>} />
           <Route path="dashboard/system" element={<AdminLayout><SystemManagement /></AdminLayout>} />
          {/* Seller */}
          <Route path="seller/dashboard" element={<SellerLayout><SellerDashboard /></SellerLayout>} />
          <Route path="seller/analytics" element={<SellerLayout><Analytics /></SellerLayout>} />
          <Route path="seller/analytics/products" element={<SellerLayout><AnalyticsProducts /></SellerLayout>} />
          <Route path="seller/analytics/sales" element={<SellerLayout><AnalyticsSales /></SellerLayout>} />
          <Route path="seller/analytics/settlement" element={<SellerLayout><AnalyticsSettlement /></SellerLayout>} />
          <Route path="seller/order/delivery" element={<SellerLayout><OrderDelivery /></SellerLayout>} />
          <Route path="seller/order/notifications" element={<SellerLayout><OrderNotifications /></SellerLayout>} />
          <Route path="seller/product/inventory" element={<SellerLayout><ProductInventory /></SellerLayout>} />
          <Route path="seller/product/pricing" element={<SellerLayout><ProductPricing /></SellerLayout>} />
          <Route path="seller/product/register" element={<SellerLayout><ProductRegister /></SellerLayout>} />
          <Route path="seller/product/edit/:id" element={<SellerLayout><ProductEdit /></SellerLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
