import { Image, Layer } from "react-konva";
import { useDimensionContext } from "../../context/DimensionContext";
import { useTagContext } from "../../context/TagContext";

export default function ImageLayer() {
  const { dimensions } = useDimensionContext();

  const { image } = useTagContext();

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
