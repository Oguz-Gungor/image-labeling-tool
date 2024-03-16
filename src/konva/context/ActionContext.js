import { createContext, useContext, useState } from "react";

const ActionContext = createContext();

export const useActionContext = () => {
  return useContext(ActionContext);
};

export const withActionContext = (Component) => {
  return (props) => {
    const [draft, setDraft] = useState(null);
    const [tool, setTool] = useState(null);
    const [highlight, setHightlight] = useState(null);
    const initDraft = (attr) => {
      setDraft(attr);
      deActivateTool();
    };
    const removeDraft = () => {
      setDraft(null);
      deActivateTool();
    };
    const activateTool = (tool) => {
      setTool(tool);
    };
    const deActivateTool = () => {
      setTool(null);
    };
    const highlightItem = (key, index) => {
      setHightlight({ key, index });
    };
    const removeHighlight = () => {
      setHightlight(null);
    };
    return (
      <ActionContext.Provider
        value={{
          tool,
          draft,
          initDraft,
          removeDraft,
          activateTool,
          deActivateTool,
          highlightItem,
          removeHighlight,
          highlight,
        }}
      >
        <Component {...props} />
      </ActionContext.Provider>
    );
  };
};
