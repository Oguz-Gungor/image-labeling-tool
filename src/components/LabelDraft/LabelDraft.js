import { withActionContext } from "../../konva/context/ActionContext";
import { withTagContext } from "../../konva/context/TagContext";
import CanvasContainer from "../CanvasContainer/CanvasContainer";
import TagContainer from "../TagContainer/TagContainer";
import ToolContainer from "../ToolContainer/ToolContainer";
import "./LabelDraft.scss";
function LabelDraft() {
  return (
    <div className="label-draft-container">
      <div className="tag-container-item">
        <TagContainer />
      </div>
      <div className="image-container-item">
        <CanvasContainer />
      </div>
      <div className="tool-container-item">
        <ToolContainer />
      </div>
    </div>
  );
}

export default withActionContext(withTagContext(LabelDraft));
