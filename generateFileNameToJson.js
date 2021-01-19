/**
 * 만약 이미지를 추가한 경우
 * src/assets/images/... 경로에 이미지를 추가하고,
 * sortRule에 정렬하고 싶은 위치에 파일명을 입력하면 됩니다.
 *
 * 마지막으로 터미널에 `node generateFileNameToJson.js`를 입력해주세요.
 */

"use strict";

const fs = require("fs-extra");
const path = require("path");

/**
 * Utils
 */

// 첫 글자를 대문자로 변경
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// 폴더 경로 가져오기
const resolve = (dir) => path.resolve(__dirname, dir);

/**
 * Save skills file nmae to JSON
 */
(async function saveSkillsFileNmaeToJson() {
  const sortRule = [
    "git",
    "linux",
    "html5",
    "css3",
    "scss",
    "javascript",
    "typescript",
    "webpack",
    "react",
    "graphql",
    "nodejs",
    "express",
    "nestjs",
    "postgresql",
    "mongodb",
    "python",
    "selenium",
    "beautifulsoup",
    "scrapy",
  ];

  const importPath = resolve("src/assets/images/skills");
  const savePath = resolve("src/data/skills.json");

  await generateFileNameToJson(importPath, savePath, sortRule);
})();

/**
 * 폴더에 있는 파일들을 보기좋게 JSON으로 변환
 *
 * @param {*} importDirPath 폴더의 경로
 * @param {*} saveJsonPath JSON 저장 경로
 * @param {*} sortRule 정렬 규칙 (수작업 필요)
 */
async function generateFileNameToJson(importDirPath, saveJsonPath, sortRule) {
  let fileNameList = [];

  fileNameList = await getFileNameList(importDirPath);

  if (sortRule) {
    fileNameList = sortFileNameList(fileNameList, sortRule);
  }

  await convertDataToJson(fileNameList, saveJsonPath);
  console.log(`Saved complete to "${saveJsonPath}"`);
}

/**
 * 정의한 규칙대로 파일명 정렬
 */
function sortFileNameList(files, sortRule) {
  if (!sortRule) {
    return files;
  }

  const sortedList = [];

  sortRule.map((item) => {
    files.map((file) => {
      const filename = file.split(".")[0];

      if (item === filename) {
        sortedList.push({ name: capitalize(filename), file });
      }
    });
  });

  return sortedList;
}

/**
 * 폴더에 있는 파일명을 리스트로 반환
 */
async function getFileNameList(importPath) {
  if (!importPath) {
    console.error("Import path is required");
  }

  const fileNameList = [];

  // 이곳에 정의하지 않은 파일 확장자는 무시
  const FILE_FORMAT_REGEX = /.(png|jpe?g)$/;
  const files = await fs.readdir(importPath);

  files.map((file) => {
    if (!FILE_FORMAT_REGEX.exec(file)) return;

    fileNameList.push(file);
  });

  return fileNameList;
}

/**
 * 데이터를 JSON으로 변환 후 지정된 폴더에 저장
 */
async function convertDataToJson(data, savePath = "./test.json") {
  if (!data) {
    console.error("Data is required");
  }

  await fs.outputJSON(savePath, data);
}
