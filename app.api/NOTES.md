~~~~

query {
  personGet(code: "asdffd") {
    code
    full_name
    medals
    birth_date
    has_pets
  }
}

query {
  personFind(limit: 5) {
    errors
    data {
      code
      full_name
      medals
      birth_date
      has_pets
    }
    limit
  }
}

mutation {
  personPut(code: "9085719d934c", data: {
    code: "sadfsfds"
    full_name: "Darth Vader"
  }) {
    errors
    data {
      code
      full_name
      birth_date
    }
  }
}

mutation {
  personDelete(code: "9085719d934c") {
    errors
    data {
      code
      full_name
      birth_date
    }
  }
}

~~~~


~~~~
type PersonResult {
    errors: [String]
    code: String!
    data: Person!
}

type PersonSearchResult {
    errors: [String]
    data: [Person]!
    limit: Int!
    offset: Int!
    count: Int
}

type Person {
    code: String
    full_name: String
    medals: Int
    birth_date: String
    has_pets: Boolean
}

input IPerson {
    code: String!
    full_name: String!
    medals: Int
    birth_date: String
    has_pets: Boolean
}

type Query {
    personGet(code: String!): Person
    personFind(
        filter: String
        sort: String
        select: [String]
        limit: Int
        offset: Int
        count: Boolean
    ): PersonSearchResult
}

type Mutation {
    personDelete(code: String!): PersonResult
    personPut(code: String, data: IPerson!): PersonResult
}

~~~~

https://stackoverflow.com/questions/2486725/postgresql-join-with-array-type-with-array-elements-order-how-to-implement
https://www.npmjs.com/package/graphql-union-input-type
