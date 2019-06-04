// const schema = buildSchema(`
// type Query {
//     getOrder(id: ID!): Order
//     getUser(id: ID!): User
// }
// type User {
//     id: ID,
//     name: String,
//     lastName: String,
//     orders: [Order]
// }
// type Order {
//     id: ID,
//     user: User
// }`);
// app.use('/graphql', express_graphql({
//     schema: schema,
//     rootValue: root,
//     graphiql: true
// }));

// const resolvers = {
//     Query: {
//         getOrder: async (root, {id}) => {
//             return await Order.findById(id)
//         },
//         getUser: async (root, {id}) => {
//             return await User.findById(id)
//         }
//     }
// }

// var root = {
//     resolvers
// };