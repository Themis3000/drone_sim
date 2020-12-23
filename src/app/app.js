const BABYLON = require("babylonjs");
require("babylonjs-loaders");

export function startGame() {
    let canvas = document.getElementById("game_canvas");
    let engine = new BABYLON.Engine(canvas, true);

    //scene creation
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3.White();
    scene.createDefaultEnvironment();

    const camera = new BABYLON.FreeCamera("main_cam", new BABYLON.Vector3(0, 0, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    BABYLON.SceneLoader.Append("/assets/", "LowPolyCITY.obj", scene, function (meshes) {
        meshes[0].scaling = new BABYLON.Vector3(20, 20, 20);
    });

    const box = BABYLON.Mesh.CreateBox("Box", 4, scene);
    box.position.z = 10;

    //start render loop
    engine.runRenderLoop(function () {
        scene.render();
    });

}
