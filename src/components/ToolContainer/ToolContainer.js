import { useActionContext } from "../../konva/context/ActionContext";
import { EditOutlined } from "@ant-design/icons";
import "./ToolContainer.scss";

export default function ToolContainer() {
  const { tool, activateTool, deActivateTool, draft } = useActionContext();

  return (
    draft && (
      <div className="tool-container">
        <div className="tool-container-label-container" style={{backgroundColor:draft.color}}>
          <div className="tool-container-label">{draft?.id}</div>
        </div>
        <div className="tool-container-items" style={{backgroundColor:draft.color}}>
          <div className="tool-item">
            <div
              className="pen-button"
              onClick={() => (tool ? deActivateTool() : activateTool("pen"))}
              style={{
                background: tool === "pen" ? "#001529" : "unset",
                color: tool === "pen" ? "white" : "unset",
              }}
            >
              <EditOutlined size={24} />
            </div>
          </div>
        </div>
      </div>
    )
  );
}
