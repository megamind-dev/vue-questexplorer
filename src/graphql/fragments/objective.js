import questFragment from './quest';

const objectiveFragment = `
  numComplete
  title
  id
  createdAt
  updatedAt
  image
  parentQuest {
    ${questFragment}
  }
`;

export default objectiveFragment;
