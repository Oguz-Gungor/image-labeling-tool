import { createContext, useContext, useState } from "react";

const TagContext = createContext();

export const useTagContext = () => {
  return useContext(TagContext);
};

export const useTag = (tag) => {
  const { tags } = useContext(TagContext);
  return tags[tag];
};

export const withTagContext = (Component) => {
  return (props) => {
    const [tags, setTags] = useState({});
    const [draft, setDraft] = useState(null);
    const addTag = (tag, attr) => {
      setTags((prev) => ({
        ...prev,
        [tag]: {
          ...attr,
          ...prev[tag],
          entities: [...(prev[tag]?.entities ?? []), { points: attr.points }],
        },
      }));
    };
    const removeTag = (tag) => {
      setTags((prev) => {
        delete prev[tag];
        return prev;
      });
    };
    const initDraft = (attr) => {
      setDraft(attr);
    };
    const removeDraft = () => {
      setDraft(null);
    };
    return (
      <TagContext.Provider
        value={{ addTag, removeTag, tags, draft, initDraft, removeDraft }}
      >
        <Component {...props} />
      </TagContext.Provider>
    );
  };
};
