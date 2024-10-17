const express = require("express");
const router = express.Router();
//-----------------------------------------------------------------------------------------
const { authenticateUser } = require("../middlewares/userAuthentication");
const { authorizeUser } = require("../middlewares/userAuthorization");
//-----------------------------------------------------------------------------------------
const userControllers = require("../app/controllers/userControllers");
const companyControllers = require("../app/controllers/companyControllers");
const productsControllers = require("../app/controllers/productControllers");
const clientControllers = require("../app/controllers/clientControllers");
const contactControllers = require("../app/controllers/contactControllers");
const enquiryControllers = require("../app/controllers/enquiryControllers");
const quotationControllers = require("../app/controllers/quotationControllers");
const orderControllers = require("../app/controllers/orderControllers");
const taskControllers = require("../app/controllers/taskControllers");
//-----------------------------------------------------------------------------------------

// router.get('/', (req, res) => res.send('CRM app base url'))

//-----------------------------------------------------------------------------------------

//user
//router.get('/users/signup/:id', userControllers.show)
router.get("/api/users/status", userControllers.isNew);
router.post("/api/users/admin/signup", userControllers.adminRegistration);
router.post(
  "/api/users/employee/signup",
  authenticateUser,
  authorizeUser,
  userControllers.employeeRegistration
);
router.post("/api/users/login", userControllers.login);
router.get("/api/users/account", authenticateUser, userControllers.account);
router.put(
  "/api/users/update-account",
  authenticateUser,
  userControllers.updateDetails
);
router.put(
  "/api/users/change-password",
  authenticateUser,
  userControllers.changePassword
);

//company details
router.get("/api/company", authenticateUser, companyControllers.details);
router.post(
  "/api/company",
  authenticateUser,
  authorizeUser,
  companyControllers.create
);
router.put(
  "/api/company/:id",
  authenticateUser,
  authorizeUser,
  companyControllers.update
);
router.delete(
  "/api/company/:id",
  authenticateUser,
  authorizeUser,
  companyControllers.destroy
);

//products
router.get("/api/products", authenticateUser, productsControllers.list);
router.get("/api/products/:id", authenticateUser, productsControllers.show);
router.post(
  "/api/products",
  authenticateUser,
  authorizeUser,
  productsControllers.create
);
router.put(
  "/api/products/:id",
  authenticateUser,
  authorizeUser,
  productsControllers.update
);
router.delete(
  "/api/products/:id",
  authenticateUser,
  authorizeUser,
  productsControllers.destory
);

//client
router.get("/api/clients", authenticateUser, clientControllers.list);
router.get("/api/clients/:id", authenticateUser, clientControllers.show);
router.post("/api/clients", authenticateUser, clientControllers.create);
router.put("/api/clients/:id", authenticateUser, clientControllers.update);
router.delete(
  "/api/clients/:id",
  authenticateUser,
  authorizeUser,
  clientControllers.destroy
);

//contact
router.get("/api/contacts", authenticateUser, contactControllers.list);
router.get("/api/contacts/:id", authenticateUser, contactControllers.show);
router.post("/api/contacts", authenticateUser, contactControllers.create);
router.put("/api/contacts/:id", authenticateUser, contactControllers.update);
router.delete(
  "/api/contacts/:id",
  authenticateUser,
  authorizeUser,
  contactControllers.destroy
);

//enquiry
router.get("/api/enquiries", authenticateUser, enquiryControllers.list);
router.get(
  "/api/enquiries/all",
  authenticateUser,
  authorizeUser,
  enquiryControllers.listAll
);
router.get("/api/enquiries/:id", authenticateUser, enquiryControllers.show);
router.post("/api/enquiries", authenticateUser, enquiryControllers.create);
router.put("/api/enquiries/:id", authenticateUser, enquiryControllers.update);
router.delete(
  "/api/enquiries/:id",
  authenticateUser,
  authorizeUser,
  enquiryControllers.destroy
);

//quotation
router.get("/api/quotations", authenticateUser, quotationControllers.list);
router.get(
  "/api/quotations/all",
  authenticateUser,
  authorizeUser,
  quotationControllers.listAll
);
router.get("/api/quotations/:id", authenticateUser, quotationControllers.show);
router.post("/api/quotations", authenticateUser, quotationControllers.create);
router.delete(
  "/api/quotations/:id",
  authenticateUser,
  authorizeUser,
  quotationControllers.destroy
);

//order
router.get("/api/orders", authenticateUser, orderControllers.list);
router.get(
  "/api/orders/all",
  authenticateUser,
  authorizeUser,
  orderControllers.listAll
);
router.get("/api/orders/:id", authenticateUser, orderControllers.show);
router.post("/api/orders", authenticateUser, orderControllers.create);
router.put("/api/orders/:id", authenticateUser, orderControllers.update);
router.delete(
  "/api/orders/:id",
  authenticateUser,
  authorizeUser,
  orderControllers.destroy
);

//tasks
router.get("/api/tasks", authenticateUser, taskControllers.list);
router.get("/api/tasks/:id", authenticateUser, taskControllers.show);
router.post("/api/tasks", authenticateUser, taskControllers.create);
router.put("/api/tasks/:id", authenticateUser, taskControllers.update);
router.delete(
  "/api/tasks/:id",
  authenticateUser,
  authorizeUser,
  taskControllers.destroy
);

module.exports = router;
