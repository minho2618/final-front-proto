// src/pages/WhatToEat.tsx
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Send, RefreshCw, Clock, Users, ChefHat, Sparkles } from "lucide-react";
import api from "@/api/axios";
import { Recipe } from "@/types";

// 👇 엔드포인트 경로 설정 주의!
// - axios baseURL이 "/api" 라면: ENDPOINT = "/gemini/recipe"
// - axios baseURL이 "http://localhost:9000" 라면: ENDPOINT = "/api/gemini/recipe"
const ENDPOINT = "/gemini/recipe";

type RecipePayload = { recipes: Recipe[] };

const WhatToEat = () => {
  const [ingredients, setIngredients] = useState("");
  const [recommendedRecipes, setRecommendedRecipes] = useState<Recipe[]>([]);
  const [randomDinnerSuggestion, setRandomDinnerSuggestion] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isHttpUrl = (s?: string) => !!s && /^https?:\/\//i.test(s);

  // 재료 기반 레시피 추천 (Gemini 호출)
  const getRecipeRecommendations = async () => {
    if (!ingredients.trim()) return;
    setIsLoading(true);
    setError("");
    try {
      const res = await api.post<RecipePayload>(ENDPOINT, { ingredients });
      const list = res.data?.recipes ?? [];
      setRecommendedRecipes(list.slice(0, 3));
      // setRandomDinnerSuggestion(null); // 필요 시 초기화
    } catch (e: any) {
      setError(e?.response?.data?.message || e?.message || "요청 실패");
      setRecommendedRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 랜덤 저녁메뉴 추천도 Gemini로 받기
  const getRandomDinnerSuggestion = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await api.post<RecipePayload>(ENDPOINT, {
        ingredients: "든든한 저녁 메인 요리, 20분 이상 조리",
      });
      const list = res.data?.recipes ?? [];
      const pick = list.length > 0 ? list[Math.floor(Math.random() * list.length)] : null;
      setRandomDinnerSuggestion(pick);
    } catch (e: any) {
      setRandomDinnerSuggestion(null);
      setError("랜덤 추천 실패");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getRecipeRecommendations();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-farm-light/10">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* 페이지 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            오늘의 요리는? 🍳
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            냉장고 속 재료를 알려주시면 맞춤 레시피를 추천해드려요.
            오늘 저녁 뭐 먹을지 고민이라면 랜덤 추천도 받아보세요!
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* 랜덤 저녁메뉴 추천 카드 */}
          <Card className="shadow-[var(--shadow-card)] border-primary/20">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b">
              <CardTitle className="flex items-center gap-2 text-primary">
                <Sparkles className="h-5 w-5" />
                오늘 저녁메뉴 추천
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {randomDinnerSuggestion ? (
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 break-words">
                      {randomDinnerSuggestion.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {randomDinnerSuggestion.tags?.slice(0, 4).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {randomDinnerSuggestion.timeMinutes}분
                      </div>
                      <div className="flex items-center gap-1">
                        <ChefHat className="h-4 w-4" />
                        {randomDinnerSuggestion.difficulty}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        2-3인분
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={getRandomDinnerSuggestion}
                    variant="outline"
                    size="sm"
                    disabled={isLoading}
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    {isLoading ? "불러오는 중..." : "다른 메뉴"}
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    오늘 저녁 뭐 먹을지 고민이신가요?
                  </p>
                  <Button
                    onClick={getRandomDinnerSuggestion}
                    className="bg-primary hover:bg-primary/90"
                    disabled={isLoading}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {isLoading ? "불러오는 중..." : "저녁메뉴 추천받기"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Separator />

          {/* 재료 기반 추천 */}
          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-primary" />
                재료로 레시피 찾기
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  placeholder="브로콜리, 닭가슴살, 마늘 등 재료를 입력하세요..."
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading || !ingredients.trim()}>
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>

              {/* 에러 메시지 */}
              {error && (
                <div className="text-sm text-red-500 whitespace-pre-wrap">
                  ⚠️ {error}
                </div>
              )}

              {/* 추천 레시피 결과 */}
              {recommendedRecipes.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary">추천 레시피</h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {recommendedRecipes.map((recipe) => (
                      <Card key={recipe.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                          {isHttpUrl(recipe.thumbnail) ? (
                            <img
                              src={recipe.thumbnail!}
                              alt={recipe.title}
                              className="w-full h-32 object-cover rounded-md"
                              loading="lazy"
                            />
                          ) : (
                            <div className="text-2xl mb-2">
                              {recipe.thumbnail || "🍽️"}
                            </div>
                          )}
                          <CardTitle className="text-base line-clamp-2 break-words">
                            {recipe.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex flex-wrap gap-1 mb-3">
                            {recipe.tags?.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {recipe.timeMinutes}분
                            </div>
                            <div className="flex items-center gap-1">
                              <ChefHat className="h-3 w-3" />
                              {recipe.difficulty}
                            </div>
                          </div>

                          {/* 재료 요약 */}
                          <div className="mt-3">
                            <p className="text-xs text-muted-foreground break-words">
                              주재료:{" "}
                              {recipe.ingredients?.slice(0, 3).map((ing) => ing.name).join(", ")}
                            </p>
                          </div>

                          {/* 만드는 법(요약) */}
                          {recipe.steps?.length ? (
                            <div className="mt-3">
                              <h4 className="text-sm font-semibold">만드는 법</h4>
                              <ol className="list-decimal pl-5 text-sm space-y-1">
                                {recipe.steps.slice(0, 3).map((s, i) => (
                                  <li key={i} className="break-words">{s}</li>
                                ))}
                              </ol>
                            </div>
                          ) : null}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* 검색했지만 결과가 없는 경우 */}
              {recommendedRecipes.length === 0 && ingredients && !isLoading && !error && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-2">
                    입력하신 재료로는 레시피를 찾을 수 없어요 😅
                  </p>
                  <p className="text-sm text-muted-foreground">
                    다른 재료를 입력해보시거나 위의 랜덤 추천을 이용해보세요!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WhatToEat;
