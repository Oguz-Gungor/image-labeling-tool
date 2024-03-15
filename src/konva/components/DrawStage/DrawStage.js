import { useRef, useState } from "react";
import { Stage } from "react-konva";
import PolygonLayer from "../PolygonLayer/PolygonLayer";
import { useTagContext } from "../../context/TagContext";
import { generateRandomColor } from "../../utils/helper";

export default function DrawStage({ children, color }) {
  const ref = useRef();
  const { addTag, tags, draft, initDraft, removeDraft } = useTagContext();
  const [points, setPoints] = useState([]);
  const currentTag = useRef(false);
  const isDrawing = useRef(false);
  const handleMouseDown = () => {
    if (draft) isDrawing.current = true;
  };

  const handleMouseUp = () => {
    if (!draft) return;
    isDrawing.current = false;
    addTag(draft.id, {
      points,
      color: draft.color,
    });
    setPoints([]);
  };

  const handleMouseMove = (e) => {
    if (!draft || !isDrawing.current) return;
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
