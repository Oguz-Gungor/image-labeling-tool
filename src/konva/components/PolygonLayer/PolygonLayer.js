import { Layer } from "react-konva";
import PolygonItem from "../PolygonItem/PolygonItem";

export default function PolygonLayer({
  closed,
  entities,
  stroke,
  fill,
  name,
  invisible,
  highlight,
  dash,
}) {
  return (
    entities.length > 0 && (
      <Layer visible={!invisible}>
        {entities.map(({ points }, index) => (
          <PolygonItem
            {...{
              closed,
              points,
              stroke,
              fill,
              dash,
              name,
              highlight:
                highlight?.index != null
                  ? index === highlight.index
                  : highlight,
            }}
          />
        ))}
      </Layer>
    )
  );
}
