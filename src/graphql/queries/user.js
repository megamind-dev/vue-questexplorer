import gql from 'graphql-tag';
import userFragment from '../fragments/user';

export const getUserQuery = gql`
  query User($id: ID, $email: String, $username: String) {
    User(id: $id, email: $email, username: $username) {
      ${userFragment}
    }
  }
`;
