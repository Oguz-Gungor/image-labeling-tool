import { useActionContext } from "../../konva/context/ActionContext";
import { EditOutlined } from "@ant-design/icons";
import "./ToolContainer.scss";

export default function ToolContainer() {
  const { tool, activateTool, deActivateTool, draft } = useActionContext();

  return (
    draft && (
      <div className="tool-container">
        <div>{draft.id}</div>
        <div
          className="pen-button"
          onClick={() => (tool ? deActivateTool() : activateTool("pen"))}
          style={{
            background: tool === "pen" ? draft.color : "gray",
          }}
        >
          <EditOutlined size={24} />
        </div>
      </div>
    )
  );
}
