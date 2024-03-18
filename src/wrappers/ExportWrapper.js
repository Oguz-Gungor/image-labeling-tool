import { Button } from "antd";
import FileSaver from "file-saver";
import JSZip from "jszip";

export default function ExportWrapper({ children, onExport }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Button
        className="export-button"
        onClick={() => {
          onExport().then(
            ({ jsonOutput, image, labeledImage, labeledImages, name }) => {
              const zip = new JSZip();
              zip.file("image.png", image, { binary: true });
              zip.file(`${name}.json`, JSON.stringify(jsonOutput));
              zip.folder("out");
              zip.file(`out/${name}.png`, labeledImage, { binary: true });
              zip.generateAsync({ type: "blob" }).then((content) => {
                FileSaver.saveAs(content, `${name}.zip`);
              });
            }
          );
        }}
      >
        Export
      </Button>
      {children}
    </div>
  );
}
