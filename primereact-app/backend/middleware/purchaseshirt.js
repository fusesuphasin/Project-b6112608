let expressFunction = require("express");
const router = expressFunction.Router();
const purchaseShirt = require("../model/purchaseshirt");

const getPurchaseShirt = async () => {
  return new Promise((resolve, reject) => {
    purchaseShirt.find({}, (err, data) => {
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

const insertPurchaseShirt = async (data) => {
  return new Promise((resolve, reject) => {
    const new_purchaseShirt = new purchaseShirt(data);
    new_purchaseShirt.save((err, data) => {
      if (err) {
        reject(new Error("Cannot insert purchaseShirt to DB"));
      } else {
        resolve({ message: "PurchaseShirt added successfully." });
      }
    });
  });
};

const deletePurchaseShirt = async (id) => {
  return new Promise((resolve, reject) => {
    purchaseShirt.deleteOne({ _id: id }, (err, data) => {
      if (err) {
        reject(new Error("Cannot Delete Shirt Order"));
      } else {
        resolve({ message: "Shirt Order delete successfully." });
      }
    });
  });
};

//________________________________________________________________

router.route("/getOrder").get((req, res) => {
  getPurchaseShirt()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).send(String(err));
    });
});

router.route("/shirt").post((req, res) => {
  insertPurchaseShirt(req.body)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).send(String(err));
    });
});

router.route("/deleteOrder/:id").delete(
  /* authorization,  */ (req, res) => {
    console.log(req.params.id);
    deletePurchaseShirt(req.params.id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(404).send(String(err));
      });
  }
);

module.exports = router;
