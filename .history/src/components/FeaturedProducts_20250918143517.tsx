import { useState, useEffect } from 'react';
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/api";
import tomatoesImage from "@/assets/tomatoes.jpg"; // Placeholder

// Define the Product type based on the API response
interface Product {
  productId: number;
  name: string;
  price: number;
  description: string;
  category: string;
  discountValue: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  seller: {
    memberId: number;
    sellerName: string;
    sellerIntro: string;
  };
}

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
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
          >
            전체보기
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.productId}
              id={String(product.productId)}
              name={product.name}
              price={product.price}
              originalPrice={product.price + product.discountValue}
              image={tomatoesImage} // Using placeholder
              rating={4.5} // Placeholder
              reviewCount={0} // Placeholder
              farm={product.seller.sellerName}
              isOrganic={false} // Placeholder
              discount={product.discountValue > 0 ? Math.round((product.discountValue / (product.price + product.discountValue)) * 100) : 0}
            />
          ))}
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