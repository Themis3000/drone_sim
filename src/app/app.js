const BABYLON = require("babylonjs");

document.addEventListener('DOMContentLoaded', function() {
    let canvas = document.getElementById("game_canvas");
    let engine = new BABYLON.Engine(canvas, true);

    let createScene = function () {
        let scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4.White();

        let camera = new BABYLON.FreeCamera("main_cam", new BABYLON.Vector3(0, 0, -10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());

        //BABYLON.SceneLoader.Append("models/", "LowPolyCITY.obj", scene, function (meshes) {
        //    scene.createDefaultCameraOrLight(true, true, true);
        //    scene.createDefaultEnvironment();
        //});

        let box = BABYLON.Mesh.CreateBox("Box", 4.0, scene);

        return scene
    }

    let scene = createScene();
    engine.runRenderLoop(function () {
        scene.render();
    });

}, false);
