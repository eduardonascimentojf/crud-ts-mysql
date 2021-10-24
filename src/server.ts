import express, { Router } from "express";
import { userRoute } from "./router//userRoute";
const app = express();
app.use(express.json());
userRoute(app);

app.listen(process.env.PORT, () => {
  console.log(`${process.env.STARTING_SERVER} na porta ${process.env.PORT}`);
});
