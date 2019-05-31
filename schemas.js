const schema = `
type Query {
    getOrders(__id: ID!): Order
    getUser(__id: ID!): User
}
type User {
    __id: ID,
    name: String,
    lastName: String,
    orders: [Order]
}
type Order {
    __id: ID,
    user: User
}`;