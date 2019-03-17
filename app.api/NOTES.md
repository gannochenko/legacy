First version:
* Dynamic schema server-side
* Resolvers
* References of two types
* UI to update schema
* UI to add data
* Password-access users
* Dockerized

* http://www.postgresqltutorial.com/postgresql-data-types/
* https://stackoverflow.com/questions/2486725/postgresql-join-with-array-type-with-array-elements-order-how-to-implement
* http://www.postgresqltutorial.com/postgresql-array/
* https://www.npmjs.com/package/graphql-union-input-type
* https://typeorm.io/#/migrations

* https://typeorm.io/#/separating-entity-definition
* https://github.com/typeorm/typeorm/blob/master/test/functional/database-schema/column-types/postgres/entity/Post.ts
* http://support.sas.com/documentation/cdl/en/lrdict/64316/HTML/default/viewer.htm#a003169814.htm

Reference:
* DDL
    * single reference (add ref -> add field, remove ref -> remove field)
        * create index
    * multiple reference (add ref -> add table, remove ref -> remove table)
        * create index
    * should we add constraints?
* Querying
    * get/find - add items through resolvers
    * put - pass codes, not ids
    * delete
        * single reference - do noting, just remove the item itself
        * multiple reference - remove both item and all records in the ref table

Add:
~~~~
mutation {
  ImportantPersonPut(data: {
    full_name: "Sergei G"
    tags: ["one", "two"]
    birth_date: "2019-03-16T07:20:29.562Z"
    has_pets: true
    lucky_numbers: [123, 456]
  }) {
    errors {
      message
    }
    data {
      code
      full_name
      birth_date
      tags
      lucky_numbers
    }
  }
}
~~~~

~~~~
mutation {
  PetPut(data: {
    nickname: "Viva"
  }) {
    errors {
      message
    }
    data {
      code
      nickname
    }
  }
}
~~~~

Update:
~~~~
mutation {
  ImportantPersonPut(code: "6ff226af-10cf-4057-b693-5bac3299c8f9", data: {
    full_name: "Mr. Twister"
  }) {
    errors {
      code
      message
    }
    data {
      code
      full_name
      birth_date
      tags
      lucky_numbers
    }
  }
}
~~~~

Delete:
~~~~
mutation {
  ImportantPersonDelete(code: "b211af08-eca0-472d-b64c-b7a0a5a59ba0") {
    errors {
      message
      code
      subject
    }
  }
}
~~~~

Get
~~~~
query {
  ImportantPersonGet(code: "117acd7b-12e3-45ae-bea9-5b66504d4705") {
    errors {
      code
      message
    }
    data {
      code
      full_name
      birth_date
      tags
      lucky_numbers
    }
  }
}
~~~~

Find
~~~~
query {
  ImportantPersonGet(code: "d8a4b037-073e-4a7d-9ea2-1752426d5496") {
    errors {
      code
      message
    }
    data {
      code
      full_name
      birth_date
      tags
      lucky_numbers
      partner {
        full_name
        tags
        code
        partner {
          full_name
        }
      }
      pets(sort: {nickname: ASC}) {
        nickname
      }
    }
  }
}

~~~~

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
