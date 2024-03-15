import { Image, Layer } from "react-konva";
import logo from "../../traffic.jpg";

const image = new window.Image();
image.src = logo;
export default function ImageLayer() {
  return (
    <Layer>
      <Image width={450} height={400} image={image} />
    </Layer> 
  );
}
