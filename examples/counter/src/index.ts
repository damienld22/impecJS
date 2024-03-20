import { app } from "ts-render-lib";
import { Counter } from "./components/Counter";

app.addChild(Counter()).render();
