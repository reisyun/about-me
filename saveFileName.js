const { promises: fs } = require("fs");

const skillSort = [
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
  "scrapy",
  // "photoshop",
  // "ilustrator",
  // "figma",
];

async function main() {
  const findDirPath = "./src/assets/images/skills";
  const savedfilePath = "./skills.json";

  const data = await findFilesName(findDirPath);

  const infos = [];

  // skillSort의 순서대로 정렬
  skillSort.map((skill) => {
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

  console.log(infos);

  await convertDataToJson(infos, savedfilePath);
}

main();

/**
 * 디렉토리 내 파일 이름을 정리해 배열로 반환
 * @param {string} dirPath
 * @param {*} encoding
 */
async function findFilesName(dirPath, encoding = "utf-8") {
  if (!dirPath || typeof dirPath !== "string") {
    console.error("dirPath required");
  }

  try {
    const files = await fs.readdir(dirPath, { encoding });
    // 가져올 파일 확장자 지정
    const formatRe = /.(png|jpe?g)$/;
    files.map((file) => {
      if (!formatRe.exec(file)) return;
    });

    return files;
  } catch (err) {
    throw new Erorr(err);
  }
}

/**
 * 데이터를 Json형식으로 저장
 * @param {Object} data
 * @param {string} filePath
 */
async function convertDataToJson(data, filePath = "./test.json") {
  if (!data) return;
  if (!filePath || typeof filePath !== "string") {
    console.error("filePath required");
  }

  try {
    fs.writeFile(filePath, JSON.stringify(data));
  } catch (err) {
    throw new Erorr(err);
  }
}
