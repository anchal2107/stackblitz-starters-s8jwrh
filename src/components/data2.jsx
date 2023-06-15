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

const DisplayFolder = ({ folderObject, level }) => {
  const [collapsed, setCollapsed] = useState(true);

  const changeCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <li
        data-testid="node"
        onClick={changeCollapsed}
        style={{
          cursor: 'pointer',
          color: collapsed ? 'black' : 'blue',
          marginLeft: `${level * 20}px`,
        }}
      >
        <div data-testid="dir-expand" onClick={changeCollapsed}>
          {' '}
          {folderObject.name}
        </div>
      </li>
      <div style={{ display: collapsed ? 'none' : 'block' }}>
        {!collapsed &&
          folderObject.children &&
          folderObject.children.map((x, index) =>
            IdentifyAndDisplayObject(x, level + 1)
          )}
      </div>
    </>
  );
};

const IdentifyAndDisplayObject = (obj, level) => {
  if (obj.type === 'dir') {
    return <DisplayFolder folderObject={obj} level={level} />;
  } else if (obj.type === 'file') {
    return displayFile(obj, level);
  }
};

const DisplayFolderTree = ({ dir, level }) => {
  return <div>{IdentifyAndDisplayObject(dir, level)}</div>;
};

const FileTree = ({ root }) => {
  return <>{root && <DisplayFolderTree dir={root} level={1} />}</>;
};

export default FileTree;
