import { Button, Input, Tree } from "antd";
import { useTagContext } from "../../konva/context/TagContext";
import { useMemo, useState } from "react";
import { getColor } from "../../konva/utils/helper";
import { useActionContext } from "../../konva/context/ActionContext";
import "./TagContainer.scss";
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import TextInput from "../TextInput/TextInput";

export default function TagContainer() {
  const { tags, addTag, removeTag, removeEntity } = useTagContext();
  const { initDraft, highlightItem, removeHighlight } = useActionContext();
  const treeData = useMemo(
    () =>
      Object.entries(tags).map(([key, attr]) => ({
        title: (
          <div
            className="label-node"
            onClick={() => {
              initDraft({
                id: key,
                ...attr,
              });
            }}
            onMouseEnter={() => {
              highlightItem(key);
            }}
            onMouseLeave={() => {
              removeHighlight();
            }}
          >
            {key}
            <div className="node-action-buttons">
              <div
                onClick={() => {
                  addTag(key, { invisible: !attr.invisible });
                }}
              >
                {attr.invisible ? (
                  <EyeInvisibleOutlined size={24} />
                ) : (
                  <EyeOutlined size={24} />
                )}
              </div>
              <DeleteOutlined
                onClick={() => {
                  removeTag(key);
                }}
                size={24}
              />
            </div>
          </div>
        ),
        children: (attr?.entities ?? []).map((_, index) => ({
          title: (
            <div
              onMouseEnter={() => {
                highlightItem(key, index);
              }}
              onMouseLeave={() => {
                removeHighlight();
              }}
              className="label-entity"
            >
              {index}
              <div className="node-action-buttons">
                <DeleteOutlined
                  onClick={() => {
                    removeEntity(key, index);
                  }}
                  size={24}
                />
              </div>
            </div>
          ),
        })),
      })),
    [tags]
  );
  return (
    <div className="tag-container">
      <span className="tag-container-header">Tags</span>
      <div className="tag-tree-container">
        <Tree treeData={treeData} />
      </div>
      <div className="add-row">
        <TextInput
          onClick={(text) => {
            const newTag = {
              color: getColor(Object.values(tags).map(({ color }) => color)),
            };
            addTag(text, newTag);
            initDraft({
              ...newTag,
              id: text,
            });
          }}
        />
      </div>
    </div>
  );
}
