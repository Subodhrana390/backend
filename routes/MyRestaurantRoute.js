"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
const MyRestaurentController_1 = __importDefault(require("../controller/MyRestaurentController"));
const auth_1 = require("../middlewares/auth");
const validation_1 = require("../controller/validation");
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});
//  /api/my/restaurent
router.post("/", upload.single("imageFile"), validation_1.validateMyRestaurantRequest, auth_1.jwtCheck, auth_1.jwtParse, MyRestaurentController_1.default.createMyRestaurant);
router.put("/", upload.single("imageFile"), validation_1.validateMyRestaurantRequest, auth_1.jwtCheck, auth_1.jwtParse, MyRestaurentController_1.default.updateMyRestaurant);
router.get("/", auth_1.jwtCheck, auth_1.jwtParse, MyRestaurentController_1.default.getMyRestaurant);
exports.default = router;
