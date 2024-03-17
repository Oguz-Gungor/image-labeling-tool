import {
  useActionContext,
  withActionContext,
} from "../../konva/context/ActionContext";
import { useTagContext, withTagContext } from "../../konva/context/TagContext";
import CanvasContainer from "../CanvasContainer/CanvasContainer";
import TagContainer from "../TagContainer/TagContainer";
import ToolContainer from "../ToolContainer/ToolContainer";
import "./LabelDraft.scss";
import withTabContainer from "../../hocs/withTabContainer";
import { useExportContext } from "../../context/ExportContext";
import { useEffect } from "react";
import ExportWrapper from "../../wrappers/ExportWrapper";

function LabelDraft({ workspace, mask }) {
  const { draft } = useActionContext();
  const { upsertMask, exportMask } = useExportContext();
  const { tags } = useTagContext();
  useEffect(() => {
    upsertMask(workspace, { key: mask, loadTags: () => tags });
  }, [tags]);

  return (
    <ExportWrapper onExport={() => exportMask(workspace, mask)}>
      <div className="label-draft-container">
        <div className="tag-container-item">
          <TagContainer />
        </div>
        <div
          className="image-container-item"
          style={{ borderColor: draft?.color }}
        >
          <CanvasContainer
            setLoadFunction={(loadImage) =>
              upsertMask(workspace, { key: mask, loadImage })
            }
          />
        </div>
        <div className="tool-container-item">
          <ToolContainer />
        </div>
      </div>
    </ExportWrapper>
  );
}

export default withTabContainer(
  withActionContext(withTagContext(LabelDraft)),
  "Change Mask Name"
);
