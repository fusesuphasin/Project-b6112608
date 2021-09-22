let expressFunction = require("express");
const router = expressFunction.Router();
const User = require("../model/user");

router.get("/test", (req, res) => {
  console.log("test success");
});

router.post("/register", async (req, res) => {
  //console.log(req.body);
  // Our register logic starts here
  try {
    // Get user input
    const { Name, Email, Password, Birthday, Address, Phone } = req.body;
    // Validate user input
    if (!(Name && Email && Password && Birthday && Address && Phone)) {
      res.status(400).send("All input is required");
    }

    let email = req.body.Email;

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });
    console.log(oldUser);
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    /* //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10); */

    // Create user in our database

    const user = await User.create({
      name: Name,
      email: Email.toLowerCase(), // sanitize: convert email to lowercase
      password: Password /* : encryptedPassword */,
      birthday: Birthday,
      address: Address,
      phone: Phone,
    });

    // Create token
    /* const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token; */

    // return new user
    console.log("555555");

    const new_user = new User(user);
    new_user.save((err, data) => {
      if (err) {
        PromiseRejectionEvent(new Error("Cannot Register"));
      } else {
        /* resolve({ message: "Signup Successfully" }); */
        console.log("Register Successfully");
      }
    });
    res.status(201).json(user);
  } catch (err) {
    console.log("What " + err);
  }
  // Our register logic ends here
});

module.exports = router;
