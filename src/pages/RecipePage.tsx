import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Loader2, ChefHat, Clock, Users, Star } from 'lucide-react';
import { toast } from 'sonner';

type Ingredient = {
  name: string;
  amount: string;
};

type Recipe = {
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  cookingTime: string;
  difficulty: string;
};

export default function RecipePage() {
  const [ingredients, setIngredients] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [servings, setServings] = useState('4');
  const [difficulty, setDifficulty] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const generateRecipe = async () => {
    if (!ingredients.trim()) {
      toast.error('재료를 입력해주세요.');
      return;
    }

    if (!apiKey.trim()) {
      toast.error('OpenAI API 키를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    
    try {
      const prompt = `다음 조건에 맞는 레시피를 JSON 형식으로 만들어주세요:

재료: ${ingredients}
${cuisine ? `요리 스타일: ${cuisine}` : ''}
${servings ? `인분: ${servings}인분` : ''}
${difficulty ? `난이도: ${difficulty}` : ''}
${cookingTime ? `조리시간: ${cookingTime}` : ''}
${dietaryRestrictions ? `식단 제한: ${dietaryRestrictions}` : ''}

다음 JSON 형식으로 응답해주세요:
{
  "title": "요리 이름",
  "description": "요리에 대한 간단한 설명",
  "ingredients": [
    {"name": "재료명", "amount": "분량"}
  ],
  "instructions": ["조리 단계별 설명"],
  "cookingTime": "총 조리시간",
  "difficulty": "난이도"
}

모든 텍스트는 한국어로 작성해주세요.`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: '당신은 전문 요리사입니다. 주어진 재료와 조건에 맞는 맛있고 실용적인 레시피를 만들어주세요.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        throw new Error(`API 오류: ${response.status}`);
      }

      const data = await response.json();
      const recipeText = data.choices[0].message.content;
      
      // JSON 파싱
      const jsonMatch = recipeText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const recipeData = JSON.parse(jsonMatch[0]);
        setRecipe(recipeData);
        toast.success('레시피가 생성되었습니다!');
      } else {
        throw new Error('올바른 JSON 형식을 받지 못했습니다.');
      }
    } catch (err) {
      console.error('Error generating recipe:', err);
      toast.error('레시피 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <ChefHat className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">AI 레시피 생성기</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          가지고 있는 재료를 입력하면 AI가 맞춤형 레시피를 만들어드립니다
        </p>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-2">
        {/* 입력 폼 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              레시피 조건 입력
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* API 키 입력 */}
            <div className="space-y-2">
              <label className="text-sm font-medium">OpenAI API 키</label>
              <Input
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                API 키는 저장되지 않으며 레시피 생성에만 사용됩니다
              </p>
            </div>

            <Separator />

            {/* 재료 입력 */}
            <div className="space-y-2">
              <label className="text-sm font-medium">보유 재료 *</label>
              <Textarea
                placeholder="예: 양파, 당근, 감자, 돼지고기, 간장, 마늘..."
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                rows={3}
              />
            </div>

            {/* 옵션들 */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">요리 스타일</label>
                <Select value={cuisine} onValueChange={setCuisine}>
                  <SelectTrigger>
                    <SelectValue placeholder="선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="korean">한식</SelectItem>
                    <SelectItem value="western">양식</SelectItem>
                    <SelectItem value="chinese">중식</SelectItem>
                    <SelectItem value="japanese">일식</SelectItem>
                    <SelectItem value="indian">인도요리</SelectItem>
                    <SelectItem value="thai">태국요리</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">인분</label>
                <Select value={servings} onValueChange={setServings}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1인분</SelectItem>
                    <SelectItem value="2">2인분</SelectItem>
                    <SelectItem value="4">4인분</SelectItem>
                    <SelectItem value="6">6인분</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">난이도</label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="초급">초급</SelectItem>
                    <SelectItem value="중급">중급</SelectItem>
                    <SelectItem value="고급">고급</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">조리시간</label>
                <Select value={cookingTime} onValueChange={setCookingTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15분 이내">15분 이내</SelectItem>
                    <SelectItem value="30분 이내">30분 이내</SelectItem>
                    <SelectItem value="1시간 이내">1시간 이내</SelectItem>
                    <SelectItem value="1시간 이상">1시간 이상</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">식단 제한사항</label>
              <Input
                placeholder="예: 비건, 글루텐프리, 저염식..."
                value={dietaryRestrictions}
                onChange={(e) => setDietaryRestrictions(e.target.value)}
              />
            </div>

            <Button 
              onClick={generateRecipe}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  AI가 레시피를 생성하는 중...
                </>
              ) : (
                <>
                  <ChefHat className="mr-2 h-4 w-4" />
                  레시피 생성하기
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* 생성된 레시피 */}
        {recipe && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <ChefHat className="w-6 h-6 text-primary" />
                  {recipe.title}
                </CardTitle>
                <p className="text-muted-foreground">{recipe.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {recipe.cookingTime}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {recipe.difficulty}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {servings}인분
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      📋 재료 목록
                    </h3>
                    <div className="space-y-3">
                      {recipe.ingredients.map((ingredient, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <span className="font-medium">{ingredient.name}</span>
                          <Badge variant="outline">{ingredient.amount}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      👨‍🍳 조리 순서
                    </h3>
                    <div className="space-y-4">
                      {recipe.instructions.map((step, index) => (
                        <div key={index} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <p className="flex-1 text-sm leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
