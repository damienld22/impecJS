import { app } from "ts-render-lib";
import { TodoList } from "./components/TodoList";

app().addChild(TodoList()).render();
