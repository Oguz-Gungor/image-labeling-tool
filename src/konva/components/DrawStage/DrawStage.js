import { useRef, useState } from "react";
import { Stage } from "react-konva";
import PolygonLayer from "../PolygonLayer/PolygonLayer";
import { useTagContext } from "../../context/TagContext";
import { useActionContext } from "../../context/ActionContext";
import { useDimensionContext } from "../../context/DimensionContext";

export default function DrawStage({ children }) {
  const ref = useRef();
  const { dimensions } = useDimensionContext();
  const { addTag } = useTagContext();
  const { draft, tool } = useActionContext();

  const [points, setPoints] = useState([]);
  const isDrawing = useRef(false);
  const handleMouseDown = () => {
    if (tool) isDrawing.current = true;
  };

  const handleMouseUp = () => {
    if (!tool) return;
    isDrawing.current = false;
    addTag(draft.id, {
      points,
      color: draft.color,
    });
    setPoints([]);
  };

  const handleMouseMove = (e) => {
    if (!tool || !isDrawing.current) return;
    const point = e.target.getStage().getPointerPosition();
    setPoints((prevState) => [
      ...prevState,
      point.x / dimensions.width,
      point.y / dimensions.height,
    ]);
  };

  const exportFunc = () => {
    console.log(ref.current.toDataURL());
    window.open(ref.current.toDataURL());
  };
  return (
    <>
      <Stage
        ref={ref}
        width={dimensions?.width}
        height={dimensions?.height}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchMove={handleMouseMove}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {children}
        <PolygonLayer
          entities={[{ points }]}
          stroke={isDrawing.current && "black"}
          closed={true}
          fill={draft?.color ?? "#ff000066"}
          dash={isDrawing.current && [5, 10]}
        />
      </Stage>
    </>
  );
}
