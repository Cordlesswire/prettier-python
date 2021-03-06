"use strict";

const spawnSync = require("child_process").spawnSync;
const path = require("path");

function parseText(text, pythonExecutable) {
  const executionResult = spawnSync(
    pythonExecutable,
    [path.join(__dirname, "../vendor/python/astexport.py")],
    {
      input: text
    }
  );

  const error = executionResult.stderr.toString();

  if (error) {
    throw new Error(error);
  }

  return executionResult;
}

function parse(text, parsers, opts) {
  const pythonExectuable = `python${opts.pythonVersion == "2" ? "" : "3"}`;
  const executionResult = parseText(text, pythonExectuable);

  const ast = JSON.parse(executionResult.stdout.toString());

  // TODO: add comments

  ast.comments = [];
  return ast;
}

module.exports = parse;
