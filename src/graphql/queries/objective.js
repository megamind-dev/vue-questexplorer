import gql from 'graphql-tag';
import objectiveFragment from '../fragments/objective';

export const fetchAllObjectiveQuery = gql`
  query allObjectives {
    allObjectives {
      ${objectiveFragment}
    }
  }
`;

export const filteredObjectiveQuery = gql`
  query allObjectives($parentQuest: ID) {
    allObjectives(filter: { parentQuest: { id: $parentQuest } }) {
      ${objectiveFragment}
    }
  }
`;
