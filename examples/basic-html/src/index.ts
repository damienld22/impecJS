import { app, div, text } from "impecjs";
import { HelloWorld } from "./components/HelloWorld";

app()
	.addChild(div().style("border: 1px dashed").addChild(text("Hello, world")))
	.addChild(text("Hello world 2").style("color: red"))
	.addChild(
		div().addChild(
			div().addChild(text("Hello world inside 2 div").class("text-in-blue")),
		),
	)
	.addChild(div().style("border: 1px solid").addChild(HelloWorld()))
	.render();
