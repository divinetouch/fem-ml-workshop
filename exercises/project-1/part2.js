import "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import { startWebcam } from "./utils";

const webcamButton = document.getElementById("webcam");
const captureButton = document.getElementById("pause");
const video = document.querySelector("video");

let model;

// const init = async () => {
//   model = await cocoSsd.load();
// };

webcamButton.onclick = () => startWebcam(video);
