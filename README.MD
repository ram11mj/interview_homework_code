
🚀 How to Run This Project

1️⃣ Install Dependencies

Make sure Node.js ≥ 20 OR ≥ 22.

npm install


⸻

2️⃣ Start the GraphQL Server

npm start

Server starts at:

👉 http://localhost:4000/graphql

⸻

3️⃣ Required Headers

Every request MUST include:

client: test-client

Example curl:

curl -H "client: myapp" \
-d '{"query":"{ address(username:\"jack\"){city} }"}' \
http://localhost:4000/graphql


⸻

📘 GraphQL API

Query

address(username: String!): Address

Mutation

createAddress(username: String!, address: AddressInput!): Address!

Address Types

type Address {
street: String!
city: String!
state: String!
zipcode: String!
}


⸻

🧪 Running Tests (Ticket 7)

npm test

Tests include:
•	Query success/failure
•	Mutation success/failure
•	Required header validation
•	Response metadata
•	Logger binding

