import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // npm install jwt-decode 필요

interface CustomJwtPayload {
    memberId: number; // Long 타입이 자바스크립트로 오면 Number로 인식
    name: string;
    username: string; // 이메일 (로그인 ID)
    role: string;
    address?: string; // JWT에 있다면 추가 (옵션이므로 ?)
    exp: number; // 만료 시간 (기본 포함)
    iat: number; // 발행 시간 (기본 포함)
}

function SocialLoginCallbackHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. URL 쿼리 파라미터에서 'token' 추출 (예: "Bearer eyJ...")
    const searchParams = new URLSearchParams(location.search);
    const jwtToken = searchParams.get('token');

    if (jwtToken) {
      try {
        // 2. localStorage에 Authorization 토큰 그대로 저장 (이미 'Bearer ' 포함)
        localStorage.setItem('Authorization', jwtToken); 

        // 3. JWT 디코딩을 위해 'Bearer ' 접두사 제거 (디코딩 라이브러리 요구사항)
        const tokenToDecode = jwtToken.startsWith('Bearer ')
          ? jwtToken.substring(7) 
          : jwtToken;
        
        // 4. 순수 JWT 문자열 디코딩
        const decodedToken = jwtDecode(tokenToDecode) as CustomJwtPayload;
        
        // 5. 일반 로그인과 동일한 항목을 추출하여 localStorage에 저장
        // decodedToken.memberId는 숫자이므로, String()으로 변환하여 저장합니다.


        
        localStorage.setItem("memberId", String(decodedToken.memberId)); // 💡 숫자 -> 문자열
        localStorage.setItem("name", String(decodedToken.name));
        localStorage.setItem("username", String(decodedToken.username)); // 이메일 저장
        
        // 🚨 일반 로그인에서 저장했던 address 항목:
        // 현재 JWT 클레임에 'address'가 포함되어 있다면 아래 코드를 사용합니다.
        // 포함되어 있지 않다면, 일반 로그인 후속 조치와 마찬가지로 API 호출이 필요합니다.
        if (decodedToken.address) {
            localStorage.setItem("address", String(decodedToken.address));
        }
        
        // 6. 성공 알림 및 메인 페이지로 이동
        console.log('✅ 소셜 로그인 성공! 사용자 정보:', decodedToken);
        navigate('/'); 

      } catch (error) {
        console.error("❌ JWT 디코딩 또는 저장 중 오류 발생:", error);
        // 에러 원인을 명확히 하기 위해 디버깅 정보 포함: console.log(jwtToken); console.log(decodedToken);
        alert('로그인 처리 중 오류가 발생했습니다. 다시 시도해 주세요.');
        navigate('/login');
      }
    } else {
      // 'token' 파라미터가 없는 경우
      console.error('❌ 소셜 로그인 실패: 토큰이 URL에 없습니다.');
      alert('소셜 로그인에 실패했습니다. 다시 시도해 주세요.');
      navigate('/login');
    }
  }, [location, navigate]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>로그인 처리 중...</h1>
      <p>인증이 완료되면 자동으로 이동합니다.</p>
    </div>
  );
}

export default SocialLoginCallbackHandler;