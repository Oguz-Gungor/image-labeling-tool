import { useTagContext, withTagContext } from "../../konva/context/TagContext";
import { getColor } from "../../konva/utils/helper";
import CanvasContainer from "../CanvasContainer/CanvasContainer";
import "./LabelDraft.scss";
function LabelDraft() {
  const { addTag, tags, draft, initDraft, removeDraft } = useTagContext();

  return (
    <div className="label-draft-container">
      <div className="tag-container"> tags</div>
      <div className="image-container">
        <CanvasContainer />
      </div>
      <div className="tool-container">
        <span>tools</span>
        <button
          onClick={() =>
            draft
              ? removeDraft()
              : initDraft({
                  id: Math.random().toString(),
                  color: getColor(
                    Object.values(tags).map(({ color }) => color)
                  ),
                })
          }
        >
          pen
        </button>
      </div>
    </div>
  );
}

export default withTagContext(LabelDraft);
