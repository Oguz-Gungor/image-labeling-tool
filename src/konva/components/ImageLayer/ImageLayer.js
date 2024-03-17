import { Image, Layer } from "react-konva";
import { useDimensionContext } from "../../context/DimensionContext";
import { useImageContext } from "../../context/ImageContext";

export default function ImageLayer() {
  const { dimensions } = useDimensionContext();
  const { image } = useImageContext();

  return (
    <Layer>
      <Image
        width={dimensions?.width}
        height={dimensions?.height}
        image={image}
      />
    </Layer>
  );
}
