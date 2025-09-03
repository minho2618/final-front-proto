import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "@/components/admin-layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CategoryPage from "./pages/CategoryPage";
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
// import Revenue from "./pages/dashboard/Revenue";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* User */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/register" element={<Register />} />
          {/* Shopping Mall */}
          <Route path="/" element={<Index />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
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
          {/* <Route path="/dashboard/revenue" element={<Revenue />} /> */}
      
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
