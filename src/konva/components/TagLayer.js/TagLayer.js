import { useActionContext } from "../../context/ActionContext";
import { useTagContext } from "../../context/TagContext";
import PolygonLayer from "../PolygonLayer/PolygonLayer";

export default function TagLayers() {
  const { tags } = useTagContext();
  const { highlight } = useActionContext();
  return (
    <>
      {Object.entries(tags).map(([key, { entities, color, invisible }]) => (
        <PolygonLayer
          entities={entities}
          closed={true}
          fill={color}
          name={key}
          invisible={invisible}
          highlight={highlight?.key === key ? highlight : null}
        />
      ))}
    </>
  );
}
