import React, { useState } from 'react';

const getNodeIcon = (node) => {
  if (node.type === 'dir') {
    return '📁'; // Folder icon
  } else if (node.type === 'file') {
    return '📄'; // File icon
  }
  return null;
};

const displayFile = (fileObject, level) => {
  return (
    <li
      data-testid="node"
      style={{
        marginLeft: `${level * 20}px`,
      }}
    >
      {fileObject.name}
    </li>
  );
};

const DisplayFolder = ({ folderObject, level, collapsed, setCollapsed }) => {
  const changeCollapsed = () => {
    setCollapsed({
      ...collapsed,
      [folderObject.name]: !collapsed[folderObject.name],
    });
  };

  return (
    <>
      <li
        data-testid="node"
        onClick={changeCollapsed}
        style={{
          cursor: 'pointer',
          color: collapsed[folderObject.name] ? 'black' : 'blue',
          marginLeft: `${level * 20}px`,
        }}
      >
        <div data-testid="dir-expand" onClick={changeCollapsed}>
          {folderObject.name}
        </div>
      </li>
      <div style={{ display: collapsed[folderObject.name] ? 'none' : 'block' }}>
        {!collapsed[folderObject.name] &&
          folderObject.children &&
          folderObject.children.map((x, index) => (
            <IdentifyAndDisplayObject
              key={index}
              obj={x}
              level={level + 1}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
            />
          ))}
      </div>
    </>
  );
};

const IdentifyAndDisplayObject = ({ obj, level, collapsed, setCollapsed }) => {
  if (obj.type === 'dir') {
    return (
      <DisplayFolder
        folderObject={obj}
        level={level}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
    );
  } else if (obj.type === 'file') {
    return displayFile(obj, level);
  }
};

const DisplayFolderTree = ({ dir, level }) => {
  const [collapsed, setCollapsed] = useState({});

  return (
    <div>
      {IdentifyAndDisplayObject({ obj: dir, level, collapsed, setCollapsed })}
    </div>
  );
};

const FileTree = ({ root }) => {
  return <>{root && <DisplayFolderTree dir={root} level={1} />}</>;
};

export default FileTree;
