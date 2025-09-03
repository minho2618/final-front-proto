import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Calendar, Download, TrendingUp, AlertCircle } from "lucide-react";

interface Settlement {
  id: string;
  period: string;
  salesAmount: number;
  commission: number;
  tax: number;
  settlementAmount: number;
  status: "대기" | "정산완료" | "지급완료";
  settlementDate: string;
  paymentDate?: string;
}

const mockSettlements: Settlement[] = [
  {
    id: "SET-202401",
    period: "2024년 1월",
    salesAmount: 2450000,
    commission: 147000,
    tax: 24500,
    settlementAmount: 2278500,
    status: "지급완료",
    settlementDate: "2024-02-05",
    paymentDate: "2024-02-07"
  },
  {
    id: "SET-202312",
    period: "2023년 12월", 
    salesAmount: 1980000,
    commission: 118800,
    tax: 19800,
    settlementAmount: 1841400,
    status: "지급완료",
    settlementDate: "2024-01-05",
    paymentDate: "2024-01-07"
  },
  {
    id: "SET-202311",
    period: "2023년 11월",
    salesAmount: 3200000,
    commission: 192000,
    tax: 32000,
    settlementAmount: 2976000,
    status: "정산완료",
    settlementDate: "2023-12-05",
    paymentDate: undefined
  },
  {
    id: "SET-202310",
    period: "2023년 10월",
    salesAmount: 1750000,
    commission: 105000,
    tax: 17500,
    settlementAmount: 1627500,
    status: "대기",
    settlementDate: "2023-11-05",
    paymentDate: undefined
  }
];

export default function AnalyticsSettlement() {
  const [settlements] = useState<Settlement[]>(mockSettlements);
  const [periodFilter, setPeriodFilter] = useState<string>("전체");

  const getStatusBadge = (status: Settlement["status"]) => {
    switch (status) {
      case "대기":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><AlertCircle className="w-3 h-3 mr-1" />대기</Badge>;
      case "정산완료":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800"><Calendar className="w-3 h-3 mr-1" />정산완료</Badge>;
      case "지급완료":
        return <Badge variant="default" className="bg-green-100 text-green-800"><DollarSign className="w-3 h-3 mr-1" />지급완료</Badge>;
      default:
        return null;
    }
  };

  const filteredSettlements = periodFilter === "전체" 
    ? settlements 
    : settlements.filter(settlement => settlement.period.includes(periodFilter));

  const totalSales = settlements.reduce((sum, s) => sum + s.salesAmount, 0);
  const totalCommission = settlements.reduce((sum, s) => sum + s.commission, 0);
  const totalSettlement = settlements.reduce((sum, s) => sum + s.settlementAmount, 0);
  const pendingAmount = settlements
    .filter(s => s.status === "대기" || s.status === "정산완료")
    .reduce((sum, s) => sum + s.settlementAmount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">판매 대금 정산 확인</h1>
          <p className="text-muted-foreground mt-2">월별 정산 내역과 지급 현황을 확인하세요</p>
        </div>
        <div className="flex gap-2">
          <Select value={periodFilter} onValueChange={setPeriodFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="전체">전체</SelectItem>
              <SelectItem value="2024">2024년</SelectItem>
              <SelectItem value="2023">2023년</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            내역 다운로드
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 매출액</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSales.toLocaleString()}원</div>
            <p className="text-xs text-muted-foreground">전체 기간</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 수수료</CardTitle>
            <DollarSign className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{totalCommission.toLocaleString()}원</div>
            <p className="text-xs text-muted-foreground">플랫폼 수수료 6%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 정산액</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalSettlement.toLocaleString()}원</div>
            <p className="text-xs text-muted-foreground">수수료 및 세금 공제 후</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">대기 중인 정산액</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingAmount.toLocaleString()}원</div>
            <p className="text-xs text-muted-foreground">정산 대기 및 지급 대기</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>정산 내역</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>정산 ID</TableHead>
                <TableHead>기간</TableHead>
                <TableHead>매출액</TableHead>
                <TableHead>수수료 (6%)</TableHead>
                <TableHead>세금 (1%)</TableHead>
                <TableHead>정산액</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>정산일</TableHead>
                <TableHead>지급일</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSettlements.map((settlement) => (
                <TableRow key={settlement.id}>
                  <TableCell className="font-medium">{settlement.id}</TableCell>
                  <TableCell>{settlement.period}</TableCell>
                  <TableCell className="font-medium">{settlement.salesAmount.toLocaleString()}원</TableCell>
                  <TableCell className="text-red-600">-{settlement.commission.toLocaleString()}원</TableCell>
                  <TableCell className="text-red-600">-{settlement.tax.toLocaleString()}원</TableCell>
                  <TableCell className="font-bold text-blue-600">{settlement.settlementAmount.toLocaleString()}원</TableCell>
                  <TableCell>{getStatusBadge(settlement.status)}</TableCell>
                  <TableCell>{settlement.settlementDate}</TableCell>
                  <TableCell>{settlement.paymentDate || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>정산 안내</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3">
            <Calendar className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-semibold">정산 주기</h4>
              <p className="text-sm text-muted-foreground">매월 5일에 전월 매출에 대한 정산이 진행됩니다.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <DollarSign className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="font-semibold">지급 일정</h4>
              <p className="text-sm text-muted-foreground">정산 완료 후 영업일 기준 2-3일 내에 등록된 계좌로 입금됩니다.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div>
              <h4 className="font-semibold">수수료 및 세금</h4>
              <p className="text-sm text-muted-foreground">플랫폼 수수료 6%, 세금 1%가 공제된 후 정산됩니다.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}