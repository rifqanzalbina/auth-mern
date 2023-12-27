import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db
});

// Sync database agar generate model otomatis
// (async() => {
//     await db.sync();
// })(); 
// Matikan Sync ketika sudah dijalankan pertama kali


app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialize: true,
    store: store,
    cookie: {
        secure: 'auto',   // http = false, https = true
    }
}))

app.use(cors({
    credentials: true, // Frontend dapat mengirimkan kredentials
    origin: "http://localhost:3000" // hanya endpoint ini yang dapat mengakses api backend
}));
app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);

// store.sync(); // Matikan setelah membuat tabel session di db

app.listen(process.env.APP_PORT, () => {
    console.log("Server Running...");
});