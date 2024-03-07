import { TEST_IDS } from '../enums/test-id.js';

const ListComponent = (props) => {
  const { person } = props;

  return (
    <li className="list-item" key={person.id} data-testid={TEST_IDS.LIST_ITEM}>
      <img src="avatar.png" alt="profile" className="list-image" />
      <div className="list-description">
        <h3>{person.name}</h3>
        <p>{person.designation}</p>
      </div>
    </li>
  );
};

export { ListComponent };
