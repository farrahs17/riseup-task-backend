const Question = require("../Models/Question");
const Workshop = require("../Models/Workshop");

exports.getQuestions = questionId => {
  // let username = req.username;

  // const workshopId = req.params.id;
  Question.find({ _id: questionId })
    .then(questions => {
      res.json({
        questions: questions
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
      console.log(questions);
      Workshop.update(
        { _id: workshopId },
        {
          $set: {
            questions: questions
          }
        }
      )
        .then(result => {
          console.log(result);
          res.status(200).json({ msg: "success" });
        })
        .catch(err => {
          console.log(err);
          res.status(401).json({ msg: "failed" });
        });
    })
    .catch(err => console.log(err));
};
