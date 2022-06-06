const { esclient, index, type } = require("../elastic");

async function getStudents(req) {
  const query = {
    query: {
      match: {
        FirstName: {
          query: req.text,
          operator: "and",
          fuzziness: "auto",
        },
      },
    },
  };

  const {
    body: { hits },
  } = await esclient.search({
    from: req.page || 0,
    size: req.limit || 100,
    index: index,
    type: type,
    body: query,
  });

  const results = hits.total.value;
  const values = hits.hits.map((hit) => {
    return {
      id: hit.ID,
      FirstName: hit._source.FirstName,
      LastName: hit._source.LastName,
      City: hit._source.City,
      Country: hit._source.Country,
    };
  });

  return {
    results,
    values,
  };
}

async function insertNewStudent(firstName, lastName, country, city) {
  return esclient.index({
    index,
    type,
    body: {
      firstName,
      lastName,
      country,
      city,
    },
  });
}

module.exports = {
  getStudents,
  insertNewStudent,
};
