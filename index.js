const nodemon = require("nodemon");
const chokidar = require("chokidar");
const { exec } = require("child_process");

// sass resources/assets/sass/automation-management.scss ./public/css/automation-management.css

function fileNameWithoutExt(fileName) {
  return fileName.split(".")[0];
}

function compileScss(fileName, watchedPath, outputDir) {
  console.log(`sass ${watchedPath}/${fileName} .${outputDir}/${fileNameWithoutExt(fileName)}.css`);
  exec(`sass ${watchedPath}/${fileName} ${outputDir}/${fileNameWithoutExt(fileName)}.css`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`, error, stderr);
  });
}

function getFileName(filePath) {
  let dir = filePath.split("/");
  return dir[dir.length - 1];
}

// เปลี่ยนตั้งแต่ /Users/a21023/wisesight/warroom-setup/ เป็นของเครื่องตัวเอง
let outputDir = "/Users/a21023/wisesight/warroom-setup/warroom-cbc/public/css";
let watchedPath = "/Users/a21023/wisesight/warroom-setup/warroom-cbc/resources/assets/sass";
let obj = {};
obj.watch = [];
obj.watch.push(watchedPath);
obj.exec = "echo 'Watching for changes...'";
obj.ext = "scss";
obj.verbose = true;

chokidar.watch(obj.watch).on("change", (path) => {
  const fileName = getFileName(path);
  compileScss(fileName, watchedPath, outputDir);
});

nodemon(obj);
    