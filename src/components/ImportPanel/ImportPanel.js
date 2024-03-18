import Dragger from "antd/es/upload/Dragger";
import JSZip from "jszip";
import { useImageContext } from "../../konva/context/ImageContext";
import { InboxOutlined } from "@ant-design/icons";
import "./ImportPanel.scss";

export default function ImportPanel() {
  const { setImage } = useImageContext();

  const importImage = (file) => {
    const newImage = new window.Image();
    newImage.src = URL.createObjectURL(file);
    setImage({ image: newImage, imageFile: file });
  };

  const resolveCompressedImageContent = (raw) => {
    return new Promise((resolve) => {
      raw.async("blob").then((data) => {
        const newImage = new window.Image();
        newImage.src = URL.createObjectURL(data);
        resolve({ image: newImage, imageFile: data });
      });
    });
  };

  const resolveCompressedJsonContent = (raw) => {
    return new Promise((resolve) => {
      raw.async("string").then((data) => {
        resolve({ labelFile: JSON.parse(data) });
      });
    });
  };

  const importZip = (file) => {
    JSZip.loadAsync(file).then((content) => {
      Promise.all(
        Object.values(content.files).map((data) => {
          if (data.name.match(/([/|.|\w|\s])*\.(jpeg|jpg|png)/)) {
            return resolveCompressedImageContent(data);
          } else if (data.name.match(/([/|.|\w|\s])*\.json/)) {
            return resolveCompressedJsonContent(data);
          }
          return null;
        }, {})
      ).then((data) => {
        const { image, labelFile, imageFile } = data.reduce(
          (prev, attr) => ({ ...prev, ...(attr ?? {}) }),
          {}
        );
        setImage({ image, imageFile });
      });
    });
  };

  const fileImport = (file) => {
    if (file.type.match(/image\/*/)) {
      importImage(file);
    }
    if (file.type === "application/x-zip-compressed") {
      importZip(file);
    }
    return false;
  };

  return (
    <div className="image-upload-panel">
      <Dragger accept=".zip,image/*" beforeUpload={fileImport}>
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
  );
}
