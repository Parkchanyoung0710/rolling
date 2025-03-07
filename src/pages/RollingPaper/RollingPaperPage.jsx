import { useNavigate, useParams } from "react-router-dom";

function RollingPaperDetailPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>롤링페이퍼 상세 페이지</h1>
      <button onClick={() => navigate(`/post1/message`)}>+</button>
    </div>
  );
}

export default RollingPaperDetailPage;
