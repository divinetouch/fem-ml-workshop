const path = "./my-model";
const startButton = document.getElementById("start");

startButton.onclick = () => init();

let model, webcam;

const init = async () => {
  const modelPath = path + "model.json";
  const metadatapath = path + "metadata.json";

  // tmImage is in scope because of the cdn import in the index.html
  model = await tmImage.load(modelPath, metadatapath);

  let maxPredictions = model.getTotalClasses();

  webcam = new tmImage.Webcam(200, 200, false);

  await webcam.setup();
  await webcam.play();
  window.requestAnimationFrame(loop);

  document.getElementById("webcam-container").appendChild(webcam.canvas);
};

const loop = async () => {
  // update the webcam frame
  webcam.update();
  await predict();
};

const predict = async () => {
  const predictions = await model.predict(webcam.canvas);

  consoele.log(predictions);
};
