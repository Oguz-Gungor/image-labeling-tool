import { useMemo, useState } from "react";
import { Group, Line, Text } from "react-konva";
import { useDimensionContext } from "../../context/DimensionContext";

export default function PolygonItem({
  closed,
  points,
  stroke,
  fill,
  name,
  highlight,
  dash,
}) {
  const { dimensions } = useDimensionContext();
  const { tagPosition, realPoints } = useMemo(() => {
    const labelPosition = { x: 0, y: 0 };
    const realPoints = points.map((point, index) => {
      if (index % 2 === 0) {
        const x = point * dimensions.width;
        labelPosition.x += x;
        return x;
      } else {
        const y = point * dimensions.height;
        labelPosition.y += y;
        return y;
      }
    });
    const noOfPoints = points.length / 2;

    return {
      realPoints,
      tagPosition: {
        x: labelPosition.x / noOfPoints,
        y: labelPosition.y / noOfPoints,
      },
    };
  }, [points, name, dimensions]);

  const [hover, setHover] = useState(false);
  return (
    <Group
      draggable
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Line
        lineJoin="round"
        points={realPoints}
        stroke={highlight || hover ? "black" : stroke}
        closed={closed}
        fill={fill}
        dash={dash}
      />
      {name && (hover || highlight) && (
        <Text
          text={name}
          fontSize={highlight || hover ? 24 : 14}
          x={tagPosition.x}
          y={tagPosition.y}
        />
      )}
    </Group>
  );
}
