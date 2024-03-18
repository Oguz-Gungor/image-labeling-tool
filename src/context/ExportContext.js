import { createContext, useContext, useState } from "react";

const ExportContext = createContext();

export const useExportContext = () => {
  return useContext(ExportContext);
};

const LABELING_DATA_LAYERS = {
  PROJECT: "project",
  WORKSPACE: "workspace",
  MASK: "mask",
};

export const withExportContext = (Component) => {
  return (props) => {
    const [workspaces, setWorkSpaces] = useState({});
    const upsertWorkSpace = ({ key, ...rest }) => {
      setWorkSpaces((prev) => ({
        ...prev,
        [key]: {
          ...(prev[key] ?? {}),
          key,
          ...rest,
        },
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

    const exportMask = async (workspaceId, maskId) => {
      const mask = workspaces[workspaceId]?.masks[maskId];
      const image = workspaces[workspaceId].image;
      const labeledImage = await mask?.loadImage();
      const jsonOutput = {
        image,
        label: mask.label,
        type: LABELING_DATA_LAYERS.MASK,
        tags: mask.loadTags(),
      };
      return { jsonOutput, image, labeledImage, name: mask.label };
    };

    const exportWorkspace = async (workspaceId) => {
      const image = workspaces[workspaceId].image;
      const labeledImages = {};
      const jsonOutput = {
        label: workspaces[workspaceId].label,
        image,
        type: LABELING_DATA_LAYERS.WORKSPACE,
        masks: (
          await Promise.all(
            Object.entries(workspaces[workspaceId]?.masks).map(
              ([key, mask]) =>
                new Promise((resolve) => {
                  exportMask(workspaceId, key).then(
                    ({ jsonOutput, labeledImage }) => {
                      labeledImages[mask.label] = labeledImage;
                      resolve({ [mask.label]: jsonOutput });
                    }
                  );
                })
            )
          )
        ).reduce((prev, attr) => ({ ...prev, ...attr }), {}),
      };
      return { jsonOutput, labeledImages, name: workspaces[workspaceId].label };
    };

    const exportProject = async () => {
      const labeledImages = {};
      const jsonOutput = {
        type: LABELING_DATA_LAYERS.PROJECT,
        workspaces: (
          await Promise.all(
            Object.éntries(workspaces).map(
              ([key, workspace]) =>
                new Promise((resolve) => {
                  exportWorkspace(key).then((attr) => {
                    labeledImages[workspace.label] = attr.labeledImages;
                    resolve({ [workspace.label]: attr.jsonOutput });
                  });
                })
            )
          )
        ).reduce((prev, attr) => ({ ...prev, ...attr }), {}),
      };
      return { jsonOutput, labeledImages, name: "Project" };
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
