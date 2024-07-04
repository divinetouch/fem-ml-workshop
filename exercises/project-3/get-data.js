const tf = require("@tensorflow/tfjs-node-gpu");
const fs = require("fs");
const path = require("Path");

const trainImagesDir = "./data/train";
const testImagesDir = "./data/test";

let trainData, testData;

const loadImages = (dataDir) => {
  const images = [];
  const labels = [];

  let files = fs.readdirSync(dataDir);
  for (let i = 0; i < files.length; i++) {
    let filePath = path.join(dataDir, files[i]);

    let buffer = fs.readFileSync(filePath);
    // console.log(buffer);
    let imageTensor = tf.node
      .decodeImage(buffer)
      .resizeNearestNeighbor([28, 28])
      .expandDims();

    images.push(imageTensor);

    const circle = files[i].toLowerCase().endsWith("circle.png");
    const triangle = files[i].toLowerCase().endsWith("triangle.png");

    if (circle === true) {
      labels.push(0);
    } else if (triangle === true) {
      labels.push(1);
    }
  }

  return [images, labels];
};

const loadData = () => {
  console.log("Loading images....");
  trainData = loadImages(trainImagesDir);
  testData = loadImages(testImagesDir);
  console.log("Images loaded successfully");
};

const getTrainData = () => {
  return {
    images: tf.concat(trainData),
    labels: tf.oneHot(tf.tensor1d(trainData[1], "int32"), 2),
  };
};

const getTestData = () => {
  return {
    images: tf.concat(testData),
    labels: tf.oneHot(tf.tensor1d(testData[1], "int32"), 2),
  };
};

module.exports = { loadData, getTestData, getTrainData };
