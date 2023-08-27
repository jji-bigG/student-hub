export const typeDefs = `#graphql
extend type Query {

}

extend type Mutation {
  
}

type User {
  id: String
  firstName: String
  lastName: String

  email: String
}

type Student {
  user: User
  
  college: String
  class: Int
  dorm: Dorm
}
`;

export const resolvers = {
  Query: {},
};
