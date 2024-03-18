import {
  useImageContext,
  withImageContext,
} from "../../konva/context/ImageContext";
import LabelDraft from "../LabelDraft/LabelDraft";
import VaryingTabsContainer from "../VaryingTabsContainer/VaryingTabsContainer";
import "./ImageTab.scss";
import withTabContainer from "../../hocs/withTabContainer";
import { useExportContext } from "../../context/ExportContext";
import ExportWrapper from "../../wrappers/ExportWrapper";
import { useEffect } from "react";
import ImportPanel from "../ImportPanel/ImportPanel";

function ImageTab({ id }) {
  const { image, imageFile } = useImageContext();
  const { upsertMask, exportWorkspace, upsertWorkSpace } = useExportContext();
  useEffect(() => {
    upsertWorkSpace({ key: id, image: imageFile });
  }, [imageFile]);
  return (
    <div className="image-tab">
      {image ? (
        // <ExportWrapper onExport={() => exportWorkspace(id)}>
        <VaryingTabsContainer
          onAdd={(maskAttr) => upsertMask(id, { ...maskAttr, image })}
          Component={(props) => (
            <LabelDraft workspace={id} mask={props.id} {...props} />
          )}
          tabPrefix={"Mask"}
        />
      ) : (
        // </ExportWrapper>
        <ImportPanel />
      )}
    </div>
  );
}

export default withTabContainer(
  withImageContext(ImageTab),
  "Change Workspace Name"
);
