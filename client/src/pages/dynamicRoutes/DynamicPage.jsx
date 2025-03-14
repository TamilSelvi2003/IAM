import { useParams, useNavigate } from "react-router-dom";
import './route.css'

const DynamicPage = () => {
  const { pageName } = useParams();
  const navigate = useNavigate();

  const formattedPageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  return (
    <div className="cash">
      <h1>Welcome to {formattedPageName} Page</h1>
      <button className="cashbtn" onClick={() => navigate("/")}>
        Back
      </button>
    </div>
  );
};

export default DynamicPage;
