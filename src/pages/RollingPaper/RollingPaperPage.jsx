import { useNavigate, useParams } from "react-router-dom";
import CardForm from "../../components/domain/rollingpaper/Card/CardForm";

function RollingPaperDetailPage() {
  const navigate = useNavigate();

  return (
    <div>
      <CardForm />
    </div>
  );
}

export default RollingPaperDetailPage;
