import LabelDraft from "../../components/LabelDraft/LabelDraft";
import VaryingTabsContainer from "../../components/VaryingTabsContainer/VaryingTabsContainer";
import "./Home.scss";

export default function Home() {
  return (
    <div className="home-page-container">
      <VaryingTabsContainer>
        <LabelDraft />
      </VaryingTabsContainer>
    </div>
  );
}
