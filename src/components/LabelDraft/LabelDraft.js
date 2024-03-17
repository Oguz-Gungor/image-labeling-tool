import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { useActionContext, withActionContext } from "../../konva/context/ActionContext";
import { useTagContext, withTagContext } from "../../konva/context/TagContext";
import CanvasContainer from "../CanvasContainer/CanvasContainer";
import TagContainer from "../TagContainer/TagContainer";
import ToolContainer from "../ToolContainer/ToolContainer";
import "./LabelDraft.scss";
import Dragger from "antd/es/upload/Dragger";

function LabelDraft() {
  const { image, setImage } = useTagContext();
  const { draft } = useActionContext();

  return (
    <div className="label-draft-container">
      {image ? (
        <>
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
        </>
      ) : (
        <div className="image-upload-panel">
          <Dragger
            beforeUpload={(file) => {
              const newImage = new window.Image();
              newImage.src = URL.createObjectURL(file);
              setImage(newImage);
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
        </div>
      )}
    </div>
  );
}

export default withActionContext(withTagContext(LabelDraft));
