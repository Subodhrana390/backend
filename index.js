"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const MyUserRoutes_1 = __importDefault(require("./routes/MyUserRoutes"));
const MyRestaurantRoute_1 = __importDefault(require("./routes/MyRestaurantRoute"));
const RestaurantRoute_1 = __importDefault(require("./routes/RestaurantRoute"));
const cloudinary_1 = require("cloudinary");
mongoose_1.default
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log("Connected to database!"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/my/user", MyUserRoutes_1.default);
app.use("/api/my/restaurant", MyRestaurantRoute_1.default);
app.use("/api/restaurant", RestaurantRoute_1.default);
app.get("/health", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({ message: "health OK!" });
}));
app.listen(7000, () => {
    console.log("server started on localhost:7000");
});
