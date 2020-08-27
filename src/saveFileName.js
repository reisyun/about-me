"use strict";

const fs = require("fs-extra");
const path = require("path");

const sortSkill = [
  "git",
  "linux",
  "html5",
  "css3",
  "scss",
  "javascript",
  "typescript",
  "webpack",
  "react",
  "redux",
  "apollo",
  "graphql",
  "nodejs",
  "express",
  "postgresql",
  "mongodb",
  "python",
  "selenium",
  "beautifulsoup",
  "scrapy",
  // "photoshop",
  // "ilustrator",
  // "figma",
];

async function main() {
  const FIND_DIR_PATH = path.join(__dirname, "assets/images/skills");
  const SAVED_FILE_PATH = path.join(__dirname, "data/skills.json");

  try {
    const data = await findFilesName(FIND_DIR_PATH);
    const infos = [];

    // sortSkill에 적힌 순서대로 정렬
    sortSkill.map((skill) => {
      data.map((file) => {
        // "file.png" => "file"
        const filename = file.split(".")[0];
        if (skill === filename) {
          const info = {
            // 첫글자 대문자로
            name: filename[0].toUpperCase() + filename.slice(1),
            file,
          };
          infos.push(info);
        }
      });
    });

    await convertDataToJson(infos, SAVED_FILE_PATH);

    console.log(`Saved complete to "${SAVED_FILE_PATH}"`);
  } catch (err) {
    console.error(err);
  }
}

main();

async function findFilesName(dirPath) {
  if (!dirPath) {
    console.error("dirPath required");
  }

  try {
    const files = await fs.readdir(dirPath);
    // 가져올 파일 확장자 지정
    const formatRegex = /.(png|jpe?g)$/;
    files.map((file) => {
      if (!formatRegex.exec(file)) return;
      return file;
    });

    return files;
  } catch (err) {
    console.error(err);
  }
}

async function convertDataToJson(data, filePath = "./test.json") {
  if (!filePath) {
    console.error("filePath required");
  }

  try {
    await fs.outputJSON(filePath, data);
  } catch (err) {
    console.error(err);
  }
}
