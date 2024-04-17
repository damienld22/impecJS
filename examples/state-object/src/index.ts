import { app } from "impecjs";
import { TodoList } from "./components/TodoList";

app().addChild(TodoList()).render();
