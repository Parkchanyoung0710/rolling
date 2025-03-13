import { useNavigate } from "react-router-dom";

function RollingPaperListPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>롤링페이퍼 목록</h1>

      <div>
        <h3>생성된 카드</h3>
        <button onClick={() => navigate(`/post1/`)}>첫 번째 카드</button>
      </div>
      <button onClick={() => navigate(`/post`)}>나도 만들어보기</button>
    </div>
  );
}

export default RollingPaperListPage;
