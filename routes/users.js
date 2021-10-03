const express = require('express');
const router = express.Router();

const UserController = require("../controllers/userController");

router.get("/", (req, res) => {
  return res.status(200).json({
    status: "Api em funcionamento"
  });
});

router.post("/", async function (req, res) {
  const { name, surname, username, email, password, dateOfBirth } = req.body;

  try {
    const newUser = await UserController.store({ name, surname, username, email, password, dateOfBirth });

    return res.status(201).json(newUser);

  } catch (e) {
    // console.log(e);
    // if (e.name === "SequelizeConnectionRefusedError") {
    //   return res.status(500).json({
    //     error: true,
    //     msg: "Sem conexão com o banco de dados, tente novamente!",
    //   });
    // }
    // if (e.name === "SequelizeUniqueConstraintError") {
    //   return res.status(400).json(e.parent.sqlMessage);
    // }
    return res.status(400).json({
      error: e.msg,
    });
  }
});

module.exports = router;
