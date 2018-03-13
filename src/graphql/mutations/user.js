import gql from 'graphql-tag';
import userFragment from '../fragments/user';

export const loginUserMutation = gql`
  mutation signinUser ($email: AUTH_PROVIDER_EMAIL) {
    signinUser(email: $email) {
      token
      user {
        ${userFragment}
      }
    }
  }
`;

export const createUserMutation = gql`
  mutation createUser($username: String!, $fullName: String, $authProvider: AuthProviderSignupData!) {
    createUser(username: $username, fullName: $fullName, authProvider: $authProvider) {
      ${userFragment}
    }
  }
`;

export const updateUserMutation = gql`
  mutation updateUser($id: ID!, $avatar: String, $bio: String, $fullName: String, $numFollowers: Int, $numFollowing: Int, $numObjectives: Int, $numQuests: Int, $username: String, $permissionLevel: Int) {
    updateUser(id: $id, avatar: $avatar, bio: $bio, fullName: $fullName, numFollowers: $numFollowers, numFollowing: $numFollowing, numObjectives: $numObjectives, numQuests: $numQuests, username: $username, permissionLevel: $permissionLevel) {
      ${userFragment}
    }
  }
`;
