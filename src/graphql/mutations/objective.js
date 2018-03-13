import gql from 'graphql-tag';
import objectiveFragment from '../fragments/objective';

export const createObjectiveMutation = gql`
  mutation createObjective($parentQuestId: ID, $title: String!, $numComplete: Int) {
    createObjective(parentQuestId: $parentQuestId, title: $title, numComplete: $numComplete) {
      ${objectiveFragment}
    }
  }
`;
