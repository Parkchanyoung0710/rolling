import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>메인 페이지</h1>
      <button onClick={() => navigate("/list")}>구경해보기</button>
    </div>
  );
}

export default HomePage;
