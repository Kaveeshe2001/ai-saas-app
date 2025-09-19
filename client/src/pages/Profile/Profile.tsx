import { useSnapshot } from "valtio";
import { useAuth } from "../../context/useAuth"
import state from "../../store";
import Dashboard from "../Dashboard/Dashboard";
import WriteArticle from "../Dashboard/WriteArticle";
import GenerateImages from "../Dashboard/GenerateImages";
import RemoveBackground from "../Dashboard/RemoveBackground";
import RemoveObject from "../Dashboard/RemoveObject";
import ReviewResume from "../Dashboard/ReviewResume";
import Community from "../Dashboard/Community";
import { Container } from "react-bootstrap";
import './profile.css';
import DashboardSidebar from "../../components/Shared/Sidebars/DashboardSidebar";
import { UserDashboard } from "../../data/UserDashboard";

const Profile = () => {
  const { logout } = useAuth();
  const snap = useSnapshot(state);

  const handleLogout = () => {
    logout();
  };

  const renderComponent = () => {
    switch (snap.dashboardSelected) {
        case 'Dashboard':
            return <Dashboard />;
        case 'WriteArticle':
            return <WriteArticle />;
        case 'GenerateImages':
            return <GenerateImages />;
        case 'RemoveBackground':
            return <RemoveBackground />
        case 'RemoveObject':
            return <RemoveObject />
        case 'ReviewResume':
            return <ReviewResume />
        case 'Community':
            return <Community />
        case 'Logout':
            handleLogout();
            break;
        default:
            return <Dashboard />;
    }
  };

  return (
    <div className="dashboard-section mb-20 pt-90 mr-40">
      <Container>
        <div className="dashboard-wrapper">
            <DashboardSidebar links={UserDashboard} />
            <div className="dashboard-content-wrap ml-8">{renderComponent()}</div>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
