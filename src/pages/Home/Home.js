import ImageTab from "../../components/ImageTab/ImageTab";
import VaryingTabsContainer from "../../components/VaryingTabsContainer/VaryingTabsContainer";
import "./Home.scss";

export default function Home() {
  return (
    <div className="home-page-container">
      <VaryingTabsContainer Component={ImageTab} tabPrefix={"Workspace"} />
    </div>
  );
}
