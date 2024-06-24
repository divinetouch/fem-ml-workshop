import "@tensorflow/tfjs";
import * as ccoSsd from "@tensorflow-models/coco-ssd";
import { handleFilePicker, showResult } from "./utils";

let model;

const init = async () => {
  console.log("init function loaded");
  model = await ccoSsd.load();
  handleFilePicker(predict);
};

const predict = async (img) => {
  const predictions = await model.detect(img);

  console.log(predictions);

  showResult(predictions);
};

init();
