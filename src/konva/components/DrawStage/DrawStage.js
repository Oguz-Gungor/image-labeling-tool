import { useRef, useState } from "react";
import { Stage } from "react-konva";
import PolygonLayer from "../PolygonLayer/PolygonLayer";
import { useTagContext } from "../../context/TagContext";
import { useActionContext } from "../../context/ActionContext";

export default function DrawStage({ children, color }) {
  const ref = useRef();
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
    setPoints((prevState) => [...prevState, point.x, point.y]);
  };

  const exportFunc = () => {
    console.log(ref.current.toDataURL());
    window.open(ref.current.toDataURL());
  };
  return (
    <>
      <Stage
        ref={ref}
        width={450}
        height={400}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {children}
        <PolygonLayer
          entities={[{ points }]}
          stroke={isDrawing.current && "black"}
          closed={!isDrawing.current}
          fill={"#88888866"}
        />
      </Stage>
      {/*<button
        onClick={() =>
          draft
            ? removeDraft()
            : initDraft({
                id: Math.random().toString(),
                color:
                  color ??
                  getColor(Object.values(tags).map(({ color }) => color)),
              })
        }
      >
        pen
      </button>*/}
      {/*<button onClick={exportFunc}>export</button>*/}
    </>
  );
}
