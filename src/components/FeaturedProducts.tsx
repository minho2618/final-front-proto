import { useState, useEffect } from 'react';
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/lib/api";
import tomatoesImage from "@/assets/tomatoes.jpg"; // Placeholder
import { useNavigate } from 'react-router-dom';
import { Product } from '@/api/axios';
import noImage from "@/assets/no-image.png"; 
// Define the Product type based on the API response


const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigator = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        // The API returns a single object with a 'content' array of products.
        // Or it might be a direct array. Let's check the actual response structure.
        // For now, I'll assume data is the array.
        if (Array.isArray(data)) {
            setProducts(data);
        } else if (data && Array.isArray(data.content)) {
            // Handle paginated response
            setProducts(data.content);
        } else {
            console.error("Unexpected API response structure:", data);
            setProducts([]); // Set to empty array if structure is not as expected
        }
      } catch (err) {
        setError("상품을 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ 제품 객체에서 안전하게 대표 이미지 고르기
  const pickImage = (p: any): string => {
    const candidates = [
      p?.imageUrl,
      p?.image,
      p?.thumbnailUrl,
      Array.isArray(p?.images) ? p.images[0]?.url : undefined,
    ];
    const found = candidates.find(
      (u) => typeof u === "string" && u.trim().length > 0
    );
    return found ?? noImage;
  };
  
  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-8 text-center">
          <p>인기 농산물을 불러오는 중...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-8 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              인기 농산물
            </h2>
            <p className="text-lg text-muted-foreground">
              고객들이 가장 많이 찾는 신선한 농산물들을 만나보세요
            </p>
          </div>
          <Button
            variant="outline"
            className="hidden md:flex border-primary text-primary hover:bg-primary hover:text-primary-foreground smooth-transition"
            onClick={() => navigator('/products')}
          >
            전체보기
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const img = pickImage(product);

            return(
            <ProductCard
              key={product.productId}
              productId={product.productId}
              name={product.name}
              price={product.price}
              originalPrice={product.price + product.discountValue}
              image={img} // 
              rating={4.5} // Placeholder
              reviewCount={0} // Placeholder
              //farm={product.seller.sellerName}
              isOrganic={false} // Placeholder
                // ⬇️ 0이면 undefined로 넘겨서 "0" 텍스트 렌더링 방지
              discount={
                product.discountValue > 0
                  ? Math.round((product.discountValue / (product.price + product.discountValue)) * 100)
                  : undefined
              }
            />
          );
          })}
        </div>

        {/* Mobile View More Button */}
        <div className="text-center mt-8 md:hidden">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground smooth-transition"
          >
            더 많은 상품 보기
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;