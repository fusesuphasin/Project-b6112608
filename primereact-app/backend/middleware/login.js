let expressFunction = require("express");
const router = expressFunction.Router();
const User = require("../model/user");

router.get("/test", (req, res) => {
  console.log("test success");
  res.json(200);
});

router.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });
    console.log(user);

    const loginStatus = password == user.password;
    if (loginStatus /* && (await bcrypt.compare(password, user.password)) */) {
      // Create token
      /* const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;
      */
      // user
      // res.status(200).json(user);
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    res.status(404);
  }
  // Our register logic ends here
});

// ...

module.exports = router;
