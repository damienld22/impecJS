import {
	button,
	component,
	div,
	element,
	loop,
	state,
	text,
} from "impec-js-lib";
import "./TodoList.css";

type Todo = {
	id: number;
	text: string;
	completed: boolean;
};

const cpt = component();

const [incomingTask, setIncomingTasks] = state("");
const [todos, setTodos] = state<Todo[]>([
	{
		id: 1,
		text: "Create base of the library",
		completed: true,
	},
	{
		id: 2,
		text: "Improve perfs",
		completed: false,
	},
	{
		id: 3,
		text: "Write better documentation",
		completed: false,
	},
]);

const onSubmitTask = () => {
	setTodos([
		...todos(),
		{ id: todos().length + 1, text: incomingTask(), completed: false },
	]);

	setIncomingTasks("");
};

const onChangeCompleted = (id: number) => {
	const updatedTodos = [...todos()];
	const updatedElementIndex = updatedTodos.findIndex((elt) => elt.id === id);
	updatedTodos[updatedElementIndex].completed =
		!updatedTodos[updatedElementIndex].completed;
	setTodos(updatedTodos);
};

export const TodoList = () => {
	cpt
		.addChild(text("To do list").class("title"))
		.addChild(
			loop(todos, (todo: Todo) => {
				return div()
					.addChild(
						element("input")
							.attribute("type", "checkbox")
							.attribute("checked", todo.completed)
							.addElementListener("click", () => onChangeCompleted(todo.id)),
					)
					.addChild(text(todo.text).class(todo.completed ? "completed" : ""));
			}).class("list"),
		)
		.addChild(
			div()
				.addChild(text("Add new task : "))
				.addChild(
					element("input")
						.value(incomingTask)
						.addElementListener("input", (e: any) =>
							setIncomingTasks(e.target.value),
						),
				)
				.addChild(button("Add").addElementListener("click", onSubmitTask)),
		);
	return cpt;
};
