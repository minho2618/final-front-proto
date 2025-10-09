import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import axios from "axios";

const productSchema = z.object({
  name: z.string().min(1, "상품명을 입력해주세요"),
  price: z.string().min(1, "가격을 입력해주세요"),
  description: z.string().min(10, "상품 설명을 10자 이상 입력해주세요"),
  category: z.string().min(1, "카테고리를 선택해주세요"),
});



type ProductFormData = z.infer<typeof productSchema>;

export default function ProductRegister() {
  const { toast } = useToast();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);



  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      category: "",
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setImageFiles(prev => [...prev, ...files]);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };


  
  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

const onSubmit = async (data: ProductFormData) => {
  const token = localStorage.getItem("Authorization");
  if (!token) {
    toast({ title: "인증 오류", description: "로그인 토큰이 없어 상품 등록을 진행할 수 없습니다.", variant: "destructive" });
    return;
  }

  // 1) 상품 생성
  const productReqData = {
    name: data.name,
    description: data.description,
    price: Number(data.price),
    category: data.category,
    discountValue: 0,
    isActive: true,
  };

  let productId: number;
  try {
    const response = await axios.post("/api/products", productReqData, {
      headers: { Authorization: token }, // ← 여기만 필요
    });
    productId = response.data.productId;
  } catch (error: any) {
    console.error("상품 정보 등록 Axios 에러:", error?.response?.data || error?.message);
    toast({ title: "상품 등록 실패", description: "상품 정보 전송에 실패했습니다.", variant: "destructive" });
    return;
  }

  // 2) 이미지 업로드
  if (imageFiles.length > 0) {
    const formData = new FormData();

    // ★ 서버가 기대하는 필드명으로 맞추세요: 'files' / 'file' / 'images'
    imageFiles.forEach((file) => formData.append("files", file));

    // ★ groupId(=productId)를 서버가 @RequestParam("groupId")로 받는다면:
    formData.append("groupId", String(productId));

    try {
      // (A) 현재 쓰는 엔드포인트를 유지하는 경우
      await axios.post("/api/products/images/upload", formData, {
        headers: { Authorization: token }, // ← multipart는 직접 지정하지 말기
        // params: { groupId: productId }, // ← 필요하면 유지 가능하지만 FormData로 넣는 게 안전
      });

      // (B) REST 형태라면 이렇게도 가능:
      // await axios.post(`/api/products/${productId}/images`, formData, {
      //   headers: { Authorization: token },
      // });

    } catch (error: any) {
      console.error("이미지 파일 전송 Axios 에러:", error?.response?.data || error?.message);
      toast({
        title: "경고: 이미지 처리 실패",
        description: "상품 정보는 등록되었으나, 이미지 파일 전송에 실패했습니다.",
      });
      // 실패 시 롤백이 필요하면 여기서 상품 삭제 API 호출 고려
    }
  }

  // 3) 성공 처리
  toast({
    title: "상품 등록 완료 🎉",
    description: `${productReqData.name} 상품 등록이 완료되었습니다.`,
  });
  form.reset();
  setImageFiles([]);
  setImagePreviews([]);
};


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">상품 등록</h1>
        <p className="text-muted-foreground mt-2">새로운 농산물 상품을 등록해보세요</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-primary" />
            상품 정보 입력
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>상품명 *</FormLabel>
                      <FormControl>
                        <Input placeholder="예: 유기농 토마토" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>가격 *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="원 단위로 입력"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>카테고리 *</FormLabel>
                    <FormControl>
                      <select 
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">카테고리를 선택하세요</option>
                        <option value="VEGETABLE">채소류</option>
                        <option value="FRUIT">과일류</option>
                        <option value="GRAIN">곡물류</option>
                        <option value="SEAFOOD">수산물</option>
                        <option value="ETC">기타</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>상품 설명 *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="상품의 특징, 재배 방법, 보관법 등을 자세히 설명해주세요."
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <Label>상품 이미지</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <div className="mt-4">
                      <Label htmlFor="image-upload" className="cursor-pointer">
                        <span className="text-primary hover:text-primary/90 font-medium">
                          이미지 업로드
                        </span>
                        <input
                          id="image-upload"
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        PNG, JPG 파일을 선택하세요
                      </p>
                    </div>
                  </div>
                </div>

                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary-hover text-primary-foreground"
                >
                  상품 등록하기
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    form.reset();
                    setImageFiles([]);
                    setImagePreviews([]);
                  }}
                >
                  초기화
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}