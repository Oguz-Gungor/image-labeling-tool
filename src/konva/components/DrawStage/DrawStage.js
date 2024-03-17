import { useEffect, useRef, useState } from "react";
import { Stage } from "react-konva";
import PolygonLayer from "../PolygonLayer/PolygonLayer";
import { useTagContext } from "../../context/TagContext";
import { useActionContext } from "../../context/ActionContext";
import { useDimensionContext } from "../../context/DimensionContext";

export default function DrawStage({ children, setLoadFunction }) {
  const ref = useRef();
  const { dimensions } = useDimensionContext();
  const { addTag } = useTagContext();
  const { draft, tool } = useActionContext();

  const [points, setPoints] = useState([]);
  const isDrawing = useRef(false);
  const handleMouseDown = () => {
    if (tool) isDrawing.current = true;
  };

  const loadImageUrl = () => {
    if (ref.current) return ref.current.toDataURL();
    return null;
    /*const a = document.createElement("a");
    a.download = "test.png";
    a.href = ref.current.toDataURL();
    a.click();*/
  };
  useEffect(() => {
    setLoadFunction(loadImageUrl);
  }, [ref.current]);

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
