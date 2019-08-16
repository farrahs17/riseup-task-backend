const Workshop = require("../Models/Workshop");
const Admin = require("../Models/Admin");
const { addQuestion, getQuestions } = require("./questionController");
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

  Admin.findOne({ _id: userId })
    .then(admin => {
      if (!admin) {
        return res
          .status(401)
          .json({ msg: "You must be admin to add workshop" });
      }
      Workshop.create({
        title: title,
        description: description,
        location: location,
        time: time
      })
        .then(result => {
          addQuestion(questions, result._id);
          res.status(200).json({ msg: "success" });
        })
        .catch(err => {
          console.log(err);
          res.status(400).json({ msg: "failed" });
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getWorkshopById = (req, res, next) => {
  console.log(req.params.id);
  const workshopId = req.params.id;
  Workshop.findOne({ _id: workshopId })
    .then(workshop => {
      console.log(workshop);
      getQuestions(workshop);
      res.status(200).json({
        workshop: workshop
      });
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({ msg: "failed" });
    });
};
