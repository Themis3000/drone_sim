import {Physics} from "./utils/physics";
import {getHidState} from "./utils/hidInput";
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";

export function startGame() {
    let canvas = document.getElementById("game_canvas");
    let engine = new BABYLON.Engine(canvas, true);

    //scene creation
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3.White();

    const playerCamera = new BABYLON.UniversalCamera("main_cam", new BABYLON.Vector3(0, 10, 500), scene);
    playerCamera.noRotationConstraint = true;

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    BABYLON.SceneLoader.Append("/assets/maps/low poly city/", "Lowpoly_City_Free_Pack.obj", scene);

    const box1 = BABYLON.Mesh.CreateBox("Box", 4, scene);
    box1.position.z = 500;
    box1.position.y = 40;

    const box2 = BABYLON.Mesh.CreateBox("Box", 4, scene);
    box2.position.z = 500;
    box2.position.y = 0;

    let physics = new Physics(playerCamera, getHidState, 1);

    //start render loop
    engine.runRenderLoop(function () {
        physics.runPhysicsStep(engine.getDeltaTime());
        scene.render();
    });
}