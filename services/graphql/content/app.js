const express = require("express")
const {graphqlHTTP} = require('express-graphql');
const app = express();
const cors = require("cors")
const schema = require("./schema/schema")

app.use(cors())

schema.getSchema()
    .then((s) => {
        app.use("/graphql", graphqlHTTP({
            schema: s,
            graphiql: true
        }))
    })

app.listen(80, () => {
    console.log('GraphQL running...');
});