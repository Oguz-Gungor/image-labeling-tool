import { Tabs } from "antd";
import { useLayoutEffect, useRef, useState } from "react";
import "./VaryingTabsContainer.scss";

export default function VaryingTabsContainer({ Component, tabPrefix, onAdd }) {
  const [activeKey, setActiveKey] = useState(1);
  const changeTabName = (itemKey) => (itemName) => {
    onAdd({ key: itemKey, label: itemName });
    setItems((prevState) =>
      prevState.map(({ key, label, ...attr }) => ({
        key,
        label: key === itemKey ? itemName : label,
        ...attr,
      }))
    );
  };
  const firstItemLabel = `${tabPrefix ?? "Tab"} 1`;
  const [items, setItems] = useState([
    {
      key: 1,
      label: firstItemLabel,
      children: <Component changeTabName={changeTabName(1)} id={1} />,
    },
  ]);
  useLayoutEffect(() => {
    onAdd({
      key: 1,
      label: firstItemLabel,
    });
  }, []);

  const newTabIndex = useRef(items.length);

  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };
  const add = () => {
    const newTabKey = ++newTabIndex.current;
    const newItemLabel = `${tabPrefix ?? "Tab"} ${newTabIndex.current}`;
    const newTab = {
      label: newItemLabel,
      key: newTabKey,
    };
    setItems([
      ...items,
      {
        ...newTab,
        children: (
          <Component changeTabName={changeTabName(newTabKey)} id={newTabKey} />
        ),
      },
    ]);
    onAdd(newTab);
    setActiveKey(newTabKey);
  };

  const remove = (targetKey) => {
    let newActiveKey = activeKey;
    const lastIndex = items.reduce((prev, item, i) => {
      if (item.key === targetKey) {
        prev = i - 1;
      }
      return prev;
    }, -1);
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };
  const onEdit = (targetKey, action) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };
  return (
    <div className="varying-tabs-container">
      <Tabs
        className="tab-container"
        activeKey={activeKey}
        onEdit={onEdit}
        type="editable-card"
        onChange={onChange}
        items={items}
      />
    </div>
  );
}
