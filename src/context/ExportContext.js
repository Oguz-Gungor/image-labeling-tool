import { createContext, useContext, useState } from "react";

const ExportContext = createContext();

export const useExportContext = () => {
  return useContext(ExportContext);
};

export const withExportContext = (Component) => {
  return (props) => {
    const [workspaces, setWorkSpaces] = useState({});
    const upsertWorkSpace = ({ key, ...rest }) => {
      setWorkSpaces((prev) => ({
        ...prev,
        [key]: { ...(prev[key] ?? {}), key, ...rest },
      }));
    };
    const removeWorkSpace = (id) => {
      setWorkSpaces((prev) => {
        delete prev[id];
        return { ...prev };
      });
    };

    const upsertMask = (workspaceId, { key, ...rest }) => {
      setWorkSpaces((prev) => ({
        ...prev,
        [workspaceId]: {
          ...prev[workspaceId],
          masks: {
            ...(prev[workspaceId]?.masks ?? {}),
            [key]: {
              ...((prev[workspaceId]?.masks ?? {})[key] ?? {}),
              key,
              ...rest,
            },
          },
        },
      }));
    };
    const removeMask = (workspaceId, maskId) => {
      setWorkSpaces((prev) => {
        delete prev[workspaceId][maskId];
        return { ...prev };
      });
    };

    const exportWorkspace = (workspaceId) => {
      const image = workspaces[workspaceId].image;
      const jsonOutput = {
        label: workspaces[workspaceId].label,
        image,
        masks: Object.values(workspaces[workspaceId]?.masks).reduce(
          (prev, mask) => ({
            ...prev,
            [mask.label]: {
              image,
              label: mask.label,
              tags: mask.load(),
            },
          }),
          {}
        ),
      };
      return jsonOutput;
    };

    const exportMask = (workspaceId, maskId) => {
      const mask = workspaces[workspaceId]?.masks[maskId];
      const image = workspaces[workspaceId].image;
      const jsonOutput = {
        image,
        label: mask.label,
        tags: mask.load(),
      };
      return jsonOutput;
    };

    const exportProject = () => {
      const jsonOutput = Object.values(workspaces).reduce(
        (prev, workspace) => ({
          ...prev,
          [workspace.label]: {
            label: workspace.label,
            image: workspace.image,
            masks: Object.values(workspace?.masks).reduce(
              (prev, mask) => ({
                ...prev,
                [mask.label]: {
                  image: workspace.image,
                  label: mask.label,
                  tags: mask.load(),
                },
              }),
              {}
            ),
          },
        }),
        {}
      );
      return jsonOutput;
    };
    return (
      <ExportContext.Provider
        value={{
          upsertWorkSpace,
          removeWorkSpace,
          upsertMask,
          removeMask,
          exportMask,
          exportWorkspace,
          exportProject,
        }}
      >
        <Component {...props} />
      </ExportContext.Provider>
    );
  };
};
