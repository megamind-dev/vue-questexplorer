import gql from 'graphql-tag';
import questFragment from '../fragments/quest';

export const createQuestMutation = gql`
  mutation createQuest($title: String!, $ownerId: ID, $description: String!, $numComplete: Int, $numObjectives: Int, $numSave: Int ) {
    createQuest(title: $title, ownerId: $ownerId, description: $description, numComplete: $numComplete, numObjectives: $numObjectives, numSave: $numSave,) {
      ${questFragment}
    }
  }
`;
