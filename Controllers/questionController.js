const Question = require("../Models/Question");
const Workshop = require("../Models/Workshop");

exports.getQuestions = (req, res, next) => {
  // let username = req.username;

  const workshopId = req.params.id;
  Workshop.find({ _id: workshopId })
    .then(workshop => {
      res.json({
        questions: workshop
        // username: username
      });
    })
    .catch(err => {
      console.log(err);
      res.json({ msg: "failed" });
    });
};

exports.addQuestion = (questions, workshopId) => {
  // const text = req.body.text;
  // const workshopId = req.body.workshopId;
  //   let username = req.username;
  // const userId = req.userId;

  Question.create({
    text: questions,
    workshopId: workshopId
  })
    .then(question => {
      Workshop.update(
        { _id: workshopId },
        {
          $push: {
            questions: questions
          }
        }
      )
        .then(result => {
          res.status(200).json({ msg: "success" });
          console.log("Created question");
        })
        .catch(err => {
          console.log(err);
          res.status(401).json({ msg: "failed" });
        });
    })
    .catch(err => console.log(err));
};
