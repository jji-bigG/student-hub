export const typeDefs = `#graphql
extend type Query{}

type Dorm {
    name: String!

    groups: [DormGroup]
}

type DormGroup {
    name: String!
    description: String
    
    
    members: [User]
}
`;

export const resolvers = {};
