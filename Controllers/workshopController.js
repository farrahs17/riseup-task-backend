const Workshop = require("../Models/Workshop");
const { addQuestion } = require("./questionController");
exports.getAllWorkshops = (req, res, next) => {
  Workshop.find()
    .then(workshop => {
      console.log(workshop);
      res.status(200).json({
        workshop: workshop
      });
    })
    .catch(err => {
      console.log(err);
      res.json({ msg: "failed" });
    });
};

exports.addWorkshop = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const location = req.body.location;
  const questions = req.body.questions;
  let time = req.body.time;
  const userId = req.userId;
  console.log(req);
  Workshop.create({
    title: title,
    description: description,
    location: location,
    time: time
  })
    .then(result => {
      res.status(200).json({ msg: "success" });
      addQuestion(questions, result._id);
      console.log(result);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ msg: "failed" });
    });
};

exports.getWorkshopById = (req, res, next) => {
  console.log(req.params.id);
  const workshopId = req.params.id;
  Workshop.findOne({ _id: workshopId })
    .then(workshop => {
      console.log(workshop);
      res.status(200).json({
        workshop: workshop
      });
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({ msg: "failed" });
    });
};
