#!/usr/bin/env node

import prompts from "prompts";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const renameFiles: Record<string, string | undefined> = {
	_gitignore: ".gitignore",
};

function copy(src: string, dest: string) {
	const stat = fs.statSync(src);
	if (stat.isDirectory()) {
		copyDir(src, dest);
	} else {
		fs.copyFileSync(src, dest);
	}
}

function isEmpty(path: string) {
	const files = fs.readdirSync(path);
	return files.length === 0 || (files.length === 1 && files[0] === ".git");
}

function formatTargetDir(targetDir: string | undefined) {
	return targetDir?.trim().replace(/\/+$/g, "");
}

function isValidPackageName(projectName: string) {
	return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
		projectName,
	);
}

function copyDir(srcDir: string, destDir: string) {
	fs.mkdirSync(destDir, { recursive: true });
	for (const file of fs.readdirSync(srcDir)) {
		const srcFile = path.resolve(srcDir, file);
		const destFile = path.resolve(destDir, file);
		copy(srcFile, destFile);
	}
}

async function main() {
	// Asking the name of the project
	const response = await prompts({
		type: "text",
		name: "name",
		message: "What is your project name?",
	});

	const projectName = response.name;

	if (!isValidPackageName(projectName)) {
		throw new Error("Invalid project name");
	}

	console.log(`Creating a new project called ${projectName}...`);

	const targetDir = formatTargetDir(projectName);

	if (!targetDir) {
		throw new Error("Bad target dir");
	}

	if (fs.existsSync(targetDir) && !isEmpty(targetDir)) {
		throw new Error("The target directory is not empty");
	}

	const root = path.join(process.cwd(), targetDir);

	const templateDir = path.resolve(
		fileURLToPath(import.meta.url),
		"../..",
		"template-basic",
	);

	// Copying the template to the new project
	fs.mkdirSync(root, { recursive: true });

	const write = (file: string, content?: string) => {
		const targetPath = path.join(root, renameFiles[file] ?? file);
		if (content) {
			fs.writeFileSync(targetPath, content);
		} else {
			copy(path.join(templateDir, file), targetPath);
		}
	};

	const files = fs.readdirSync(templateDir);
	for (const file of files.filter((f) => f !== "package.json")) {
		write(file);
	}

	const pkg = JSON.parse(
		fs.readFileSync(path.join(templateDir, "package.json"), "utf-8"),
	);

	pkg.name = projectName;

	write("package.json", `${JSON.stringify(pkg, null, 2)}\n`);

	console.log(`The project ${projectName} has been created!`);
	console.log(`You can now run 'cd ${targetDir}' and 'npm install' to start!`);
}

main();
