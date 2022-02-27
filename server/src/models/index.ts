import resolvers from '../resolvers/users/user.resolvers';

const schema = `
  directive @auth(
    requires: Role = ADMIN,
  ) on OBJECT | FIELD_DEFINITION

  enum Role {
    ADMIN
    REVIEWER
    USER
    UNKNOWN
  }

  type User {
    id: Int
    name: String
    email: String
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }

  type Query {
    users: [User]!
  }
`;

export { schema, resolvers };
export default { schema, resolvers };
