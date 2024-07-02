import * as tf from "@tensorflow/tfjs";
import * as tfd from "@tensorflow/tfjs-data";

const recordButtons = document.getElementsByClassName("record-button");
const buttonContainer = document.getElementById("buttons-container");

const trainButton = document.getElementById("train");
const predictButton = document.getElementById("predict");
const statusElement = document.getElementById("status");

let webcam, initialModel, mouseDown, newModel;

const totals = [0, 0];
const labels = ["left", "right"];
const learningRate = 0.0001;
const batchSize = 0.4;
const epochs = 30;
const denseUnits = 100;

let isTraining = false;
let isPredicting = false;

const loadModel = async () => {
  const mobilenet = await tf.loadLayersModel(
    "https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json",
  );

  const layer = mobilenet.getLayer("conv_pw_13_relu");
  return tf.model({ inputs: mobilenet.inputs, outputs: layer.output });
};

const init = async () => {
  webcam = await tfd.webcam(document.getElementById("webcam"));

  initialModel = await loadModel();
  statusElement.style.display = "none";
  document.getElementById("controller").style.display = "block";
};

init();
