import userFragment from './user';
// import objectiveFragment from './objective';

const questFragment = `
  description
  id
  numComplete
  numObjectives
  numSave
  title
  createdAt
  updatedAt
  owner {
    ${userFragment}
  }
  containObjectives {
    numComplete
    title
    id
    createdAt
    updatedAt
    image
  }
`;

export default questFragment;
