import React, { useState, useEffect } from 'react';

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

const DisplayFolder = ({
  folderObject,
  level,
  collapsed,
  changeCollapsed,
  srno,
}) => {
  return (
    <>
      <li
        data-testid="node"
        onClick={() => changeCollapsed(srno, !collapsed[srno])}
        style={{
          cursor: 'pointer',
          color: collapsed[folderObject.name] ? 'black' : 'blue',
          marginLeft: `${level * 20}px`,
        }}
      >
        <div
          data-testid="dir-expand"
          onClick={() => changeCollapsed(srno, !collapsed[srno])}
        >
          {folderObject.name}
        </div>
      </li>
      {console.log(` checking collap ${JSON.stringify(collapsed)}`)}

      {!collapsed[srno] &&
        folderObject.children &&
        folderObject.children.map((x, index) => {
          const newSrno = srno + (index + 1).toString();
          // changeCollapsed(newSrno, true);
          // console.log(newSrno);
          return (
            <div style={{ display: collapsed[srno] ? 'none' : 'block' }}>
              {
                <IdentifyAndDisplayObject
                  key={index}
                  obj={x}
                  level={level + 1}
                  collapsed={collapsed}
                  changeCollapsed={changeCollapsed}
                  srno={newSrno}
                />
              }
            </div>
          );
        })}
    </>
  );
};

const IdentifyAndDisplayObject = ({
  obj,
  level,
  collapsed,
  changeCollapsed,
  srno,
}) => {
  if (obj.type === 'dir') {
    return (
      <DisplayFolder
        folderObject={obj}
        level={level}
        collapsed={collapsed}
        changeCollapsed={changeCollapsed}
        srno={srno}
      />
    );
  } else if (obj.type === 'file') {
    return displayFile(obj, level);
  }
};

const DisplayFolderTree = ({
  dir,
  level,
  collapsed,
  changeCollapsed,
  srno,
}) => {
  return (
    <div>
      {IdentifyAndDisplayObject({
        obj: dir,
        level,
        collapsed,
        changeCollapsed,
        srno,
      })}
    </div>
  );
};

const FileTree = ({ root }) => {
  const [collapsed, setCollapsed] = useState({});
  const srno = '1';
  useEffect(() => {
    setCollapsed({ 1: true });
  }, []);
  const changeCollapsed = (updateSrno, statusCollapsed) => {
    const newCollapsed = { ...collapsed };
    // console.log('updateSrno', updateSrno);
    newCollapsed[updateSrno] = statusCollapsed;
    console.log(newCollapsed);
    setCollapsed({
      ...newCollapsed,
    });
  };
  return (
    <>
      {root && (
        <DisplayFolderTree
          dir={root}
          level={1}
          collapsed={collapsed}
          changeCollapsed={changeCollapsed}
          srno={srno}
        />
      )}
    </>
  );
};

export default FileTree;
