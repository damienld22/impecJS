#!/usr/bin/env node

import prompts from "prompts";

// Asking the name of the project
const response = await prompts({
	type: "text",
	name: "name",
	message: "What is your project name?",
});

const projectName = response.name;

console.log(`Creating a new project called ${projectName}...`);
