import { useNavigate, useParams } from "react-router-dom";
import CardForm from "../../components/domain/rollingpaper/Card/CardForm";

function RollingPaperDetailPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>롤링페이퍼 상세 페이지</h1>
      <CardForm />
      <button onClick={() => navigate(`/post1/message`)}>+</button>
    </div>
  );
}

export default RollingPaperDetailPage;
