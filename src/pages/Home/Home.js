import ImageTab from "../../components/ImageTab/ImageTab";
import VaryingTabsContainer from "../../components/VaryingTabsContainer/VaryingTabsContainer";
import {
  useExportContext,
  withExportContext,
} from "../../context/ExportContext";
import ExportWrapper from "../../wrappers/ExportWrapper";
import "./Home.scss";

function Home() {
  const { upsertWorkSpace, exportProject } = useExportContext();

  return (
    <div className="home-page-container">
      <ExportWrapper onExport={() => exportProject()}>
        <VaryingTabsContainer
          onAdd={upsertWorkSpace}
          Component={ImageTab}
          tabPrefix={"Workspace"}
        />
      </ExportWrapper>
    </div>
  );
}

export default withExportContext(Home);
