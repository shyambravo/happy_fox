import '../styles/tree.css';
import { Card } from './Card';

const Tree = (props) => {
  // Recursively render the children
  const { parent, getChildren, editManager } = props;

  const children = getChildren(parent.id);

  if (!children.length) {
    return <></>;
  }

  return (
    <ul>
      {children.map((child) => (
        <li key={child.id}>
          <Card person={child} editManager={editManager} />
          <Tree parent={child} getChildren={getChildren} editManager={editManager} />
        </li>
      ))}
    </ul>
  );
};

const TreeContainer = (props) => {
  const { employeeList, editManager } = props;

  const parents = employeeList.filter((employee) => {
    if (employee.manager === null) {
      return true;
    }

    if (
      employeeList.find((obj) => {
        return obj.id === employee.manager;
      }) === undefined
    ) {
      return true;
    }
    return false;
  });

  const getChildrenForParent = (parentID) => {
    const children = employeeList.filter((employee) => {
      return employee.manager === parentID;
    });

    return children;
  };

  return (
    // Since root nodes have no parents rendering them separately
    <ul className="tree">
      {parents.map((parent) => {
        return (
          <li key={parent.id}>
            <Card person={parent} editManager={editManager} />
            <Tree parent={parent} getChildren={getChildrenForParent} editManager={editManager} />
          </li>
        );
      })}
    </ul>
  );
};

export { TreeContainer };
