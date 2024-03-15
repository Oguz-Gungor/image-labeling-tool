import { Layer } from "react-konva";
import PolygonItem from "../PolygonItem/PolygonItem";

export default function PolygonLayer({ closed, entities, stroke, fill, name }) {
  return (
    entities.length > 0 && (
      <Layer>
        {entities.map(({ points }) => (
          <PolygonItem {...{ closed, points, stroke, fill, name }} />
        ))}
      </Layer>
    )
  );
}
