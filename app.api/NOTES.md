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
