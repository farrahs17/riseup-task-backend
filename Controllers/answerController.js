const Answer = require("../Models/Answer");
const User = require("../Models/User");

exports.getAnswers = (req, res, next) => {
  // let username = req.username;

  const workshopId = req.params.id;
  Workshop.find({ _id: workshopId })
    .then(workshop => {
      res.json({
        answers: workshop
        // username: username
      });
    })
    .catch(err => {
      console.log(err);
      res.json({ msg: "failed" });
    });
};

exports.addAnswer = (req, res, next) => {
  const answer = req.body.answer;
  const workshopId = req.body.workshopId;
  const questionId = req.body.questionId;
  // let username = req.username;
  const userId = req.userId;
  console.log(req);
  Answer.create({
    answer: answer,
    workshopId: workshopId,
    questionId: questionId,
    userId: userId
  })
    .then(answer => {
      User.update(
        { _id: userId },
        {
          $push: {
            answers: answer
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
