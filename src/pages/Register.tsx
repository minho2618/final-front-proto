import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
};

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      // TODO: 실제 회원가입 API 호출로 대체
      console.log('Register data:', data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // 회원가입 성공 시 로그인 페이지로 이동
      navigate('/login');
    } catch (error) {
      console.error('Register error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const password = watch('password');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">회원가입</CardTitle>
          <CardDescription className="text-center">
            회원 정보를 입력해주세요
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                placeholder="홍길동"
                {...register('name', {
                  required: '이름을 입력해주세요',
                })}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                {...register('email', {
                  required: '이메일을 입력해주세요',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: '유효한 이메일 주소를 입력해주세요',
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                {...register('password', {
                  required: '비밀번호를 입력해주세요',
                  minLength: {
                    value: 8,
                    message: '비밀번호는 최소 8자 이상이어야 합니다',
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">비밀번호 확인</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword', {
                  required: '비밀번호를 다시 입력해주세요',
                  validate: (value) =>
                    value === password || '비밀번호가 일치하지 않습니다',
                })}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">전화번호</Label>
              <Input
                id="phone"
                placeholder="010-1234-5678"
                {...register('phone', {
                  required: '전화번호를 입력해주세요',
                  pattern: {
                    value: /^01[0-9]-\d{3,4}-\d{4}$/,
                    message: '유효한 전화번호 형식이 아닙니다 (예: 010-1234-5678)',
                  },
                })}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">주소</Label>
              <Input
                id="address"
                placeholder="서울시 강남구 테헤란로 123"
                {...register('address', {
                  required: '주소를 입력해주세요',
                })}
              />
              {errors.address && (
                <p className="text-sm text-red-500">{errors.address.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? '가입 중...' : '회원가입'}
            </Button>
            <div className="text-center text-sm">
              이미 계정이 있으신가요?{' '}
              <a href="/login" className="text-blue-600 hover:underline">
                로그인
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}