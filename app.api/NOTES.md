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

* http://www.postgresqltutorial.com/postgresql-data-types/
* https://stackoverflow.com/questions/2486725/postgresql-join-with-array-type-with-array-elements-order-how-to-implement
* http://www.postgresqltutorial.com/postgresql-array/
* https://www.npmjs.com/package/graphql-union-input-type
* https://typeorm.io/#/migrations

* https://typeorm.io/#/separating-entity-definition

~~~~
// unify the format between a tables and entities:

// calculate diff:

// tables to be created
// // for each reference field create a connection table

// tables to be dropped
// // for each reference field - don't forget to drop the corresponding connection table

// tables to be updated (the most of fun is here)
// for each table to update:

// columns to be added
// // for each reference field create a connection table

// columns to be removed
// // for each reference field - don't forget to drop the corresponding connection table

// columns to be updated in terms of type
// // if the field was a reference field, but became something else - drop the connection table
// // if the field was something else, but became a reference field - add a connection table
// // if the field was a reference field, and stays the same, but gets connected to the other entity, then drop one connection table and create another (or should not we?)

// Thoughts:
// the field is not allowed to be renamed, because the field name is it's "unique" id. Besides, there is no typical case for renaming fields, only damn perfectionists do so.
// the name of the connection table shall be eg_ref_<entity-name>_<field-name>
// in postgres the maximum length of an identifier is 63, so we can allow <entity-name> and <field-name> to be no more than 27 characters long
// this is not good. we can replace these identifiers with hashes or meaningless aliases
// for the first version I guess I am not going to allow field type change
~~~~
