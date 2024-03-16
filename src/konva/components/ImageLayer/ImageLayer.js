import { Image, Layer } from "react-konva";
import { useTagContext } from "../../context/TagContext";

export default function ImageLayer() {
  const { image } = useTagContext();

  return (
    <Layer>
      <Image width={450} height={400} image={image} />
    </Layer>
  );
}
