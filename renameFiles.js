const fs = require("fs");
const path = require("path");

function renameFilesInDirectory(directoryPath, count) {
  // Read all files in the directory
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Unable to read directory:", err);
      return;
    }

    // console.log(files);
    // return;

    files.forEach((file) => {
      const oldFilePath = path.join(directoryPath, file);

      // Check if it's a file and not a directory
      fs.stat(oldFilePath, (err, stats) => {
        if (err) {
          console.error("Unable to get file stats:", err);
          return;
        }

        if (stats.isFile()) {
          // Get the file extension
          const fileExtension = path.extname(file);

          // New file name, starting from 100
          const newFileName = `${count}${fileExtension}`;
          const newFilePath = path.join(directoryPath, newFileName);

          // Rename the file
          fs.rename(oldFilePath, newFilePath, (err) => {
            if (err) {
              console.error("Error renaming file:", err);
            } else {
              console.log(`Renamed: ${file} -> ${newFileName}`);
            }
          });

          // Increment the count
          count++;
        }
      });
    });
  });
}

// Get directory from command-line argument
const directory = process.argv[2];

if (!directory) {
  console.error("Please provide a directory path as an argument.");
  process.exit(1); // Exit with error code
}

const count = parseInt(process.argv[3]);

function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
}

if (!count || !isNumber(count)) {
  console.error(
    "Please provide a valid starting number for file name like 100,101... so no ."
  );
  process.exit(1); // Exit with error code
}

renameFilesInDirectory(directory, count);

// node renameFiles.js C:\Users\user\Downloads\Avijit 427
