const elastic = require("../elastic");
const students = require("./students.json");

const esAction = {
  index: {
    _index: elastic.index,
    _type: elastic.type,
  },
};

async function populateDatabase() {
  const docs = [];
  for (const student of students) {
    docs.push(esAction);
    docs.push(student);
  }
  return elastic.esclient.bulk({ body: docs });
}

module.exports = {
  populateDatabase,
  esAction,
};
