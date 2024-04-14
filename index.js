#! usr/bin/env node
import { Command } from "commander";
import inquirer from "inquirer";
import fs from "fs";

const program = new Command();
const questions = [
  {
    type: "list",
    message: "Which cource do you wanna apply to?",
    choices: ["HTML", "CSS", "JavaScript", "React js", "Node js"],
    name: "title",
  },
  {
    type: "list",
    message: "Select your prefer time?",
    choices: ["9:00 AM", "3:00 Pm", "9:00 PM"],
    name: "time",
  },
  {
    type: "confirm",
    message: "Are you willing to commit to this cource?",
    name: "commit",
  },
];
const path = "./cources.json";
program
  .name("cources-manager")
  .description("CLI to make new cources")
  .version("1.0.0");

program
  .command("add")
  .alias("a")
  .description("cources list")

  .action(() => {
    inquirer
      .prompt(questions)
      .then((answers) => {
        let courcesArray = [];

        // to check if this file exist
        if (fs.existsSync(path)) {
          fs.readFile(path, "utf-8", (error, data) => {
            if (error) {
              console.log("Error while reading file: ", error);
              process.exit();
            } else {
              courcesArray = JSON.parse(data);
              courcesArray.push(answers);
              fs.writeFile(
                path,
                JSON.stringify(courcesArray),
                "utf-8",
                (error, data) => {
                  if (error) {
                    console.log("Error while reading files");
                  }
                }
              );
            }
          });
        } else {
          courcesArray.push(answers);
          fs.writeFile(
            path,
            JSON.stringify(courcesArray),
            "utf-8",
            (error, data) => {
              if (error) {
                console.log("Error while reading files");
              }
            }
          );
        }
      })
      .catch((error) => {
        if (error.isTtyError) {
          console.log("error");
        }
      });
  });
program
  .command("list")
  .alias("l")
  .description("cources list")
  .action(() => {
    if (fs.existsSync(path)) {
      fs.readFile("./cources.json", "utf-8", (error, data) => {
        if (error) {
          console.log("Error whiel reading file");
          process.exit();
        } else {
          console.table(JSON.parse(data));
        }
      });
    } else {
      console.log("You dont't have data please add some cources first.");
    }
  });
program.parse(process.argv);
