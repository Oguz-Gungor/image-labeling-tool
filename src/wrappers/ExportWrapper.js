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
          onExport().then(({ jsonOutput, image, labeledImage, name }) => {
            const zip = new JSZip();
            zip.file(`${name}.png`, labeledImage, { binary: true });
            zip.file(`${name}.json`, JSON.stringify(jsonOutput));
            zip.generateAsync({ type: "blob" }).then((content) => {
              FileSaver.saveAs(content, `${name}.zip`);
            });
          });
        }}
      >
        Export
      </Button>
      {children}
    </div>
  );
}
