import { useLayoutEffect, useRef } from "react";
import {
  useDimensionContext,
  withDimensionContext,
} from "../../context/DimensionContext";
import { useTagContext } from "../../context/TagContext";
import DrawStage from "../DrawStage/DrawStage";
import ImageLayer from "../ImageLayer/ImageLayer";
import TagLayers from "../TagLayer.js/TagLayer";
import "./DrawContainer.scss";

function DrawContainer() {
  const { setDimensions } = useDimensionContext();
  const { image } = useTagContext();
  const containerRef = useRef();

  const onResize = () => {
    const widthRatio = containerRef.current.offsetWidth / image.width;
    const heightRatio = containerRef.current.offsetHeight / image.height;
    const minRatio = Math.min(widthRatio, heightRatio);
    setDimensions({
      width: image.width * minRatio,
      height: image.height * minRatio,
    });
  };
  useLayoutEffect(() => {
    if (image?.width && image?.height) {
      onResize();
    }
  }, [image?.width, image?.height]);
  useLayoutEffect(() => {
    if (containerRef) {
      const observer = new ResizeObserver(() => {
        onResize();
      });
      onResize();
      observer.observe(containerRef.current);
      return () => {
        observer.unobserve(containerRef.current);
      };
    }
  }, [image]);
  return (
    <div ref={containerRef} className="draw-container">
      <DrawStage>
        <ImageLayer/>
        <TagLayers />
      </DrawStage>
    </div>
  );
}

export default withDimensionContext(DrawContainer);
