const model = require("../models");

async function getStudents(req, res) {
  const query = req.query;
  if (!query.text) {
    res.status(422).json({
      error: true,
      data: "Missing required parameter: text",
    });
    return;
  }
  try {
    const result = await model.getStudents(req.query);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: "Unknown error." });
  }
}

async function addStudent(req, res) {
  const body = req.body;
  if (!body.firstName || !body.lastName || !body.country || !body.city) {
    res.status(422).json({
      error: true,
      data: "Missing required parameter(s): 'body' or 'author'",
    });
    return;
  }
  try {
    const result = await model.insertNewStudent(
      body.firstName,
      body.lastName,
      body.country,
      body.city
    );
    res.json({
      success: true,
      data: {
        id: result.body._id,
        author: body.author,
        quote: body.quote,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Unknown error." });
  }
}
module.exports = {
  getStudents,
  addStudent,
};
