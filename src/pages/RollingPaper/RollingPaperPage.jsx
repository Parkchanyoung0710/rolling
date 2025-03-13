import { useNavigate } from "react-router-dom";
import InformationBar from "../../components/common/InformationBar/InformationBar";

function RollingPaperDetailPage() {
  const navigate = useNavigate();

  return (
    <div>
      <InformationBar>
        <h1>롤링페이퍼 상세 페이지</h1>
      </InformationBar>
    </div>
  );
}

export default RollingPaperDetailPage;
