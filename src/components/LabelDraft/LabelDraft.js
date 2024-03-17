import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import {
  useActionContext,
  withActionContext,
} from "../../konva/context/ActionContext";
import { withTagContext } from "../../konva/context/TagContext";
import CanvasContainer from "../CanvasContainer/CanvasContainer";
import TagContainer from "../TagContainer/TagContainer";
import ToolContainer from "../ToolContainer/ToolContainer";
import "./LabelDraft.scss";
import withTabContainer from "../../hocs/withTabContainer";

function LabelDraft() {
  const { draft } = useActionContext();

  return (
    <div className="label-draft-container">
      <div className="tag-container-item">
        <TagContainer />
      </div>
      <div
        className="image-container-item"
        style={{ borderColor: draft?.color }}
      >
        <CanvasContainer />
      </div>
      <div className="tool-container-item">
        <ToolContainer />
      </div>
    </div>
  );
}

export default withTabContainer(withActionContext(withTagContext(LabelDraft)),"Change Mask Name");
