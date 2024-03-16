import { useMemo, useState } from "react";
import { Group, Line, Text } from "react-konva";

export default function PolygonItem({
  closed,
  points,
  stroke,
  fill,
  name,
  highlight,
  dash,
}) {
  const tagPosition = useMemo(() => {
    if (!name) return;
    const { x, y } = points.reduce(
      (prev, val, index) => {
        if (index % 2 === 0) {
          prev.x += val;
        } else {
          prev.y += val;
        }
        return prev;
      },
      { x: 0, y: 0 }
    );
    const noOfPoints = points.length / 2;
    return {
      x: x / noOfPoints,
      y: y / noOfPoints,
    };
  }, [points, name]);
  const [hover, setHover] = useState(false);
  return (
    <Group
      draggable
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Line
        lineJoin="round"
        points={points}
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
