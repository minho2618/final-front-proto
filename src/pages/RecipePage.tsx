import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

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
  const [dishName, setDishName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState('');

  const generateRecipe = async () => {
    if (!dishName.trim()) {
      setError('요리 이름을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // TODO: 실제 API 엔드포인트로 변경 필요
      // const response = await fetch('/api/generate-recipe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ dishName }),
      // });
      // const data = await response.json();

      // 임시 더미 데이터
      await new Promise(resolve => setTimeout(resolve, 1000));
      const dummyData: Recipe = {
        title: `${dishName} 레시피`,
        description: `맛있는 ${dishName}를/을 만드는 방법을 알려드립니다.`,
        ingredients: [
          { name: '주재료 1', amount: '적당량' },
          { name: '주재료 2', amount: '1개' },
          { name: '양념 1', amount: '1큰술' },
          { name: '양념 2', amount: '1작은술' },
        ],
        instructions: [
          '1. 재료를 준비합니다.',
          '2. 냄비에 물을 끓입니다.',
          `3. ${dishName}의 주재료를 넣고 익힙니다.`,
          '4. 양념을 넣고 간을 맞춥니다.',
          '5. 완성하여 그릇에 담아냅니다.',
        ],
        cookingTime: '30분',
        difficulty: '중급',
      };

      setRecipe(dummyData);
    } catch (err) {
      setError('레시피 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
      console.error('Error generating recipe:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">AI 레시피 생성기</h1>
      
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="만들고 싶은 요리 이름을 입력하세요 (예: 김치찌개, 파스타...)"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && generateRecipe()}
          />
          <Button 
            onClick={generateRecipe}
            disabled={isLoading}
            className="min-w-[100px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                생성 중...
              </>
            ) : '생성하기'}
          </Button>
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>

      {recipe && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{recipe.title}</CardTitle>
              <p className="text-gray-600">{recipe.description}</p>
              <div className="flex gap-4 text-sm text-gray-500 mt-2">
                <span>조리시간: {recipe.cookingTime}</span>
                <span>난이도: {recipe.difficulty}</span>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-lg mb-2">재료</h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{ingredient.name}</span>
                    <span className="text-gray-600">{ingredient.amount}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">조리 방법</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="font-semibold text-primary">{index + 1}.</span>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
