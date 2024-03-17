import { createContext, useContext, useState } from "react";

const TagContext = createContext();

export const useTagContext = () => {
  return useContext(TagContext);
};

export const withTagContext = (Component) => {
  return (props) => {
    const [tags, setTags] = useState({});
    const addTag = (tag, { points, ...attr }) => {
      setTags((prev) => ({
        ...prev,
        [tag]: {
          ...prev[tag],
          ...attr,
          entities: [
            ...(prev[tag]?.entities ?? []),
            ...(points ? [{ points: points }] : []),
          ],
        },
      }));
    };
    const removeTag = (tag) => {
      setTags((prev) => {
        delete prev[tag];
        return { ...prev };
      });
    };
    const removeEntity = (key, index) => {
      setTags((prev) => {
        prev[key].entities.splice(index, 1);
        return { ...prev };
      });
    };

    return (
      <TagContext.Provider value={{ addTag, removeTag, tags, removeEntity }}>
        <Component {...props} />
      </TagContext.Provider>
    );
  };
};
