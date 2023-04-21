import { Router } from "express";
import { createAccess, getAllAccesses } from "./controller/AccessController";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getUniqueProduct,
  updateProduct,
} from "./controller/ProductController";
import {
  createSale,
  getAllSales,
  getAllSalesByBuyer,
  getAllSalesBySeller,
} from "./controller/SaleController";
import { signIn } from "./controller/SessionController";
import { createStore, getAllStore } from "./controller/StoreController";
import {
  createUser,
  deleteManyUsers,
  getAllUsers,
  getUniqueUser,
} from "./controller/UserController";
import { authMiddleware } from "./middleware/AuthMiddleware";

export const router = Router();

router.post("/create-user", createUser);
router.get("/get-all-users", authMiddleware(["Admin"]), getAllUsers);
router.get(
  "/get-unique-user",
  authMiddleware(["Admin", "Comprador", "Vendedor"]),
  getUniqueUser
);
router.delete("/delete-users", authMiddleware(["Admin"]), deleteManyUsers);

router.post("/create-access", authMiddleware(["Admin"]), createAccess);
router.get("/get-all-accesses", authMiddleware(["Admin"]), getAllAccesses);

router.post(
  "/create-store",
  authMiddleware(["Admin", "Vendedor"]),
  createStore
);
router.get("/get-all-stores", getAllStore);

router.post(
  "/create-product/:storeId",
  authMiddleware(["Admin", "Vendedor"]),
  createProduct
);
router.put(
  "/update-product/:productId",
  authMiddleware(["Admin", "Vendedor"]),
  updateProduct
);
router.get("/get-all-products", getAllProducts);
router.get("/get-product/:productId", getUniqueProduct);
router.delete(
  "/delete-product/:productId",
  authMiddleware(["Admin", "Vendedor"]),
  deleteProduct
);

router.post("/sign-in", signIn);

router.post(
  "/create-sale",
  authMiddleware(["Admin", "Vendedor", "Comprador"]),
  createSale
);
router.get("/get-all-sales", authMiddleware(["Admin"]), getAllSales);
router.get(
  "/get-all-sales-by-buyer",
  authMiddleware(["Admin", "Comprador"]),
  getAllSalesByBuyer
);
router.get(
  "/get-all-sales-by-seller",
  authMiddleware(["Admin", "Vendedor"]),
  getAllSalesBySeller
);
