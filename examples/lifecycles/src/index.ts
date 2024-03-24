import { app } from "ts-render-lib";
import { HelloWorld } from "./components/HelloWorld";

app().addChild(HelloWorld()).render();
