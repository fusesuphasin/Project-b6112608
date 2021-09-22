let expressFunction = require("express");
const router = expressFunction.Router();
const SportShirt = require("../model/sportshirt");

const getProducts = async () => {
  return new Promise((resolve, reject) => {
    SportShirt.find({}, (err, data) => {
      if (err) {
        reject(new Error("Cannot get Products"));
      } else {
        if (data.length != 0) {
          resolve(data);
        } else {
          reject(new Error("Cannot get Products"));
        }
      }
    });
    /* .populate("gender_id")
      .populate("typeproduct_id")
      .populate("quantity.size_id"); */
  });
};

const insertProduct = async (data) => {
  return new Promise((resolve, reject) => {
    const new_product = new SportShirt(data);
    new_product.save((err, data) => {
      if (err) {
        reject(new Error("Cannot insert Product to DB"));
      } else {
        resolve({ message: "Product added successfully." });
      }
    });
  });
};

router.route("/getProduct").get((req, res) => {
  getProducts()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).send(String(err));
    });
});

router.route("/addProduct").post((req, res) => {
  insertProduct(req.body)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).send(String(err));
    });
});

module.exports = router;
