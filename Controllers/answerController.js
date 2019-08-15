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
  const answers = req.body.answers;
  const workshopId = req.body.workshopId;
  const userId = req.userId;
  console.log(req.body);
  Answer.create({
    answer: answers,
    workshopId: workshopId,
    userId: userId
  })
    .then(answer => {
      User.update(
        { _id: userId },
        {
          $set: {
            answers: answers
          }
        }
      )
        .then(result => {
          console.log(result);
          res.status(200).json({ msg: "success" });
          console.log("Created answer");
        })
        .catch(err => {
          console.log(err);
          res.status(404).json({ msg: "failed" });
        });
    })
    .catch(err => console.log(err));
};
