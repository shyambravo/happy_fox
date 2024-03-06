import { useRef } from 'react';

const Card = (props) => {
  const { person, editManager } = props;
  const ref = useRef();

  const onDragStart = (event) => {
    event.dataTransfer.setData('ID', ref.current.id);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    ref.current.classList.add('tree__card-active');
  };

  const onDragLeave = () => {
    ref.current.classList.remove('tree__card-active');
  };

  const onDrop = (event) => {
    event.preventDefault();
    ref.current.classList.remove('tree__card-active');

    const managerID = event.currentTarget.getAttribute('id');
    const draggedPersonID = event.dataTransfer.getData('ID');

    if (draggedPersonID === managerID) {
      return;
    }

    editManager(draggedPersonID, managerID);
  };

  return (
    <span
      className="tree__card"
      id={person.id}
      onDragStart={onDragStart}
      draggable={true}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      ref={ref}
    >
      <div className="card-name-container">
        <img src={person.img ? person.img : 'avatar_black.png'} alt={person.name} />
        <h4>{person.name}</h4>
      </div>

      <div className="card-content">
        <h5>{person.designation}</h5>
        <h5>{person.team}</h5>
      </div>
    </span>
  );
};

export { Card };
