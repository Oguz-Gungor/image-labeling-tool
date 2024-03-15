import { useTagContext } from "../../context/TagContext";
import PolygonLayer from "../PolygonLayer/PolygonLayer";

export default function TagLayers() {
  const { tags } = useTagContext();
  return (
    <>
      {Object.entries(tags).map(([key, { entities, color }]) => (
        <PolygonLayer
          entities={entities}
          closed={true}
          fill={color}
          name={key}
        />
      ))}
    </>
  );
}
