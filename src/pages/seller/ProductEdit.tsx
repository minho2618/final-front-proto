import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Image as ImageIcon, ArrowLeft } from "lucide-react";

const productSchema = z.object({
  name: z.string().min(1, "상품명을 입력해주세요"),
  price: z.string().min(1, "가격을 입력해주세요"),
  description: z.string().min(10, "상품 설명을 10자 이상 입력해주세요"),
  category: z.string().min(1, "카테고리를 선택해주세요"),
});

type ProductFormData = z.infer<typeof productSchema>;

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  images: string[];
}

export default function ProductEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      category: "",
    },
  });

  // Mock function to load product data
  useEffect(() => {
    const loadProduct = async () => {
      try {
        // This would be replaced with actual API call
        const mockProduct: Product = {
          id: id || "1",
          name: "유기농 토마토",
          price: "5000",
          description: "신선하고 맛있는 유기농 토마토입니다. 농약을 사용하지 않고 자연에서 키운 건강한 토마토로, 샐러드나 요리에 활용하기 좋습니다.",
          category: "VEGETABLE",
          images: ["/api/placeholder/200/200", "/api/placeholder/200/200"]
        };

        form.reset({
          name: mockProduct.name,
          price: mockProduct.price,
          description: mockProduct.description,
          category: mockProduct.category,
        });

        setExistingImages(mockProduct.images);
        setLoading(false);
      } catch (error) {
        toast({
          title: "오류",
          description: "상품 정보를 불러오는데 실패했습니다.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, form, toast]);

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

  const removeNewImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data: ProductFormData) => {
    console.log("Updated product data:", data);
    console.log("New images:", imageFiles);
    console.log("Remaining existing images:", existingImages);
    
    toast({
      title: "상품 수정 완료",
      description: `${data.name} 상품이 성공적으로 수정되었습니다.`,
      variant: "default",
    });

    // Navigate back to product list or detail page
    navigate("/seller/product/inventory");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-2">상품 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          돌아가기
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">상품 수정</h1>
          <p className="text-muted-foreground mt-2">상품 정보를 수정해보세요</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-primary" />
            상품 정보 수정
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
                
                {/* Existing Images */}
                {existingImages.length > 0 && (
                  <div>
                    <Label className="text-sm text-muted-foreground">기존 이미지</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                      {existingImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`기존 이미지 ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border"
                          />
                          <button
                            type="button"
                            onClick={() => removeExistingImage(index)}
                            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New Image Upload */}
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <div className="mt-4">
                      <Label htmlFor="image-upload" className="cursor-pointer">
                        <span className="text-primary hover:text-primary/90 font-medium">
                          새 이미지 추가
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

                {/* New Image Previews */}
                {imagePreviews.length > 0 && (
                  <div>
                    <Label className="text-sm text-muted-foreground">새로 추가된 이미지</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`새 이미지 ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border"
                          />
                          <button
                            type="button"
                            onClick={() => removeNewImage(index)}
                            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary-hover text-primary-foreground"
                >
                  상품 수정하기
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  취소
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
