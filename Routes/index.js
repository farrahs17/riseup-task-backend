const express = require("express");
const router = express.Router();

const workshopController = require("../Controllers/workshopController");
const userController = require("../Controllers/userController");
const adminController = require("../Controllers/adminController");
const questionController = require("../Controllers/questionController");
const answerController = require("../Controllers/answerController");

const isAuth = require("../middleware/is-auth");

router.get("/", workshopController.getAllWorkshops);
router.post("/add-workshop", workshopController.addWorkshop);
router.get("/workshop/:id", workshopController.getWorkshopById);

router.get("/workshop-questions/:id", questionController.getQuestions);
router.post("/add-questions", isAuth, questionController.addQuestion);

router.post("/signup", userController.addNewUser);
router.post("/login", userController.logIn);

router.post("/add-answer", isAuth, answerController.addAnswer);

router.post("/admin/signup", adminController.addNewAdmin);
router.post("/admin/login", adminController.logIn);
router.post("/admin/get-answers", answerController.getAnswers);

module.exports = router;
