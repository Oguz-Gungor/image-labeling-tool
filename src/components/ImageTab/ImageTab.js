import Dragger from "antd/es/upload/Dragger";
import {
  useImageContext,
  withImageContext,
} from "../../konva/context/ImageContext";
import { InboxOutlined } from "@ant-design/icons";
import LabelDraft from "../LabelDraft/LabelDraft";
import VaryingTabsContainer from "../VaryingTabsContainer/VaryingTabsContainer";
import "./ImageTab.scss";
import withTabContainer from "../../hocs/withTabContainer";

function ImageTab() {
  const { image, setImage } = useImageContext();

  return (
    <div className="image-tab">
      {image ? (
        <VaryingTabsContainer Component={LabelDraft} tabPrefix={"Mask"} />
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

export default withTabContainer(
  withImageContext(ImageTab),
  "Change Workspace Name"
);