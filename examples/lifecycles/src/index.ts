import { app } from "ts-render-lib";
import { HelloWorld } from "./components/HelloWorld";
import { Counter } from "./components/Counter";

app().addChild(Counter()).addChild(HelloWorld()).render();
