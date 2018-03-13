import gql from 'graphql-tag';
import questFragment from '../fragments/quest';

export const fetchAllQuestQuery = gql`
  query allQuests {
    allQuests {
      ${questFragment}
    }
  }
`;
