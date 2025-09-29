import { useState } from "react";
import api from "../api/axios"; // 백엔드 호출을 위한 axios 인스턴스 불러오기

function RecipeGenerator() {
  // 사용자가 입력하는 재료 문자열 상태 관리
  const [ingredients, setIngredients] = useState("");
  // 백엔드에서 받은 레시피 결과 상태 관리
  const [recipe, setRecipe] = useState("");
  // 서버 요청이 진행 중인지 표시하는 상태 관리
  const [loading, setLoading] = useState(false);
  // 에러 메시지 상태 관리
  const [error, setError] = useState("");

  // 폼 제출 시 실행되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();       // 기본 동작(페이지 새로고침)을 막음
    setError("");             // 이전 에러 메시지 초기화
    setRecipe("");            // 이전 결과 초기화

    // 입력값이 비었는지 확인
    if (!ingredients.trim()) {
      setError("재료를 입력해주세요. 예) 닭고기, 감자, 양파");
      return;                 // 비었으면 API 요청하지 않음
    }

    setLoading(true);         // 요청 시작 → 로딩 상태 true로 설정
    try {
      /**
       * 백엔드 REST API 호출
       * - 엔드포인트: /api/gemini/recipe
       * - 메서드: POST
       * - 요청 바디: { ingredients: "사용자 입력 값" }
       *   → 서버에서 RecipeRequest DTO로 매핑됨
       */
      const res = await api.post(
        "/api/gemini/recipe",  // 백엔드 컨트롤러의 @PostMapping URL
        { ingredients }        // JSON 요청 바디 (키 이름 DTO 필드와 일치해야 함)
      );

      /**
       * 서버 응답 형식(RecipeResponse DTO):
       * { recipe: "Gemini 모델이 생성한 레시피 텍스트" }
       */
      const { recipe: recipeText } = res.data || {}; // 응답에서 recipe 필드 추출
      if (recipeText) {
        setRecipe(recipeText);  // 결과 상태 업데이트 → 화면에 표시됨
      } else {
        setError("응답에 레시피가 없습니다."); // 예상치 못한 응답일 경우
      }
    } catch (err) {
      /**
       * API 요청 중 오류 발생 시 처리
       * - 네트워크 문제
       * - CORS 차단
       * - 4xx/5xx 서버 에러 등
       */
      const msg =
        err?.response?.data?.message   // 서버에서 내려준 에러 메시지
        || err?.message                // axios나 JS 에러 메시지
        || "요청 중 오류가 발생했습니다."; // 기본 메시지
      setError(msg);                   // 에러 상태 업데이트 → 화면에 표시됨
    } finally {
      setLoading(false);               // 성공/실패 관계없이 로딩 해제
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", padding: 16 }}>
      <h2>🍳 Gemini 레시피 생성기</h2>

      {/* 입력 폼: 사용자가 재료 입력 */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <label htmlFor="ingredients" style={{ display: "block", marginBottom: 8 }}>
          재료를 콤마(,)로 구분해서 입력하세요.
        </label>

        {/* textarea: 입력값은 ingredients 상태와 양방향 바인딩됨 */}
        <textarea
          id="ingredients"
          value={ingredients}                              // 상태값 표시
          onChange={(e) => setIngredients(e.target.value)} // 입력시 상태 업데이트
          rows={4}
          placeholder="예) 닭고기, 감자, 양파"
          style={{ width: "100%", padding: 12, fontSize: 16 }}
        />

        {/* 제출 버튼 */}
        <button
          type="submit"                   // 폼 제출 버튼
          disabled={loading}              // 로딩 중일 때 비활성화
          style={{
            marginTop: 12,
            padding: "10px 16px",
            fontSize: 16,
            cursor: loading ? "not-allowed" : "pointer", // 로딩 중일 땐 마우스 커서 변경
          }}
        >
          {loading ? "생성 중..." : "레시피 생성"} {/* 로딩 상태에 따라 버튼 문구 변경 */}
        </button>
      </form>

      {/* 에러 메시지 출력 */}
      {error && (
        <div style={{ color: "crimson", whiteSpace: "pre-wrap", marginBottom: 12 }}>
          ⚠️ {error}
        </div>
      )}

      {/* 레시피 결과 출력 */}
      {recipe && (
        <div
          style={{
            background: "#f7f7f9",
            border: "1px solid #eee",
            borderRadius: 8,
            padding: 16,
            whiteSpace: "pre-wrap", // 줄바꿈 유지
            lineHeight: 1.6,
          }}
        >
          {recipe}
        </div>
      )}
    </div>
  );
}

export default RecipeGenerator;
