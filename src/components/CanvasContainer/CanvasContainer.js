import DrawStage from "../../konva/components/DrawStage/DrawStage";
import ImageLayer from "../../konva/components/ImageLayer/ImageLayer";
import TagLayers from "../../konva/components/TagLayer.js/TagLayer";

export default function CanvasContainer() {
  return (
    <DrawStage>
      <ImageLayer />
      <TagLayers />
    </DrawStage>
  );
}
