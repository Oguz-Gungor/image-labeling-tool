import { Button } from "antd";

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
          console.log(onExport());
        }}
      >
        Export
      </Button>
      {children}
    </div>
  );
}
