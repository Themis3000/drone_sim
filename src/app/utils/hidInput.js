//handles human interface device input

let controllers = {};
let selectedController = "";

//adds gamepad to index and sets it to active controller if no other controllers exist
window.addEventListener("gamepadconnected", function (e) {
    let gamepad = e.gamepad;
    controllers[gamepad.index] = gamepad;
    if (selectedController === "") {
        selectedController = gamepad.index;
    }
});

//removes gamepad from index when disconnected and sets selected controller to the next one connected if available
window.addEventListener("gamepaddisconnected", function (e) {
    let gamepad = e.gamepad;
    delete controllers[gamepad.index];
    if (selectedController === gamepad.index && controllers.length > 0) {
        selectedController = Object.keys(controllers)[0];
        return
    }
    selectedController = "";
});

export function getHidState() {
    if (selectedController !== "") {
        let controller = controllers[selectedController];
        console.log(controller);
        //temporarily hard-coded axes
        return {
            throttle: controller.axes[0],
            yaw: controller.axes[3],
            pitch: controller.axes[2],
            roll: controller.axes[1],
            online: true
        }
    }
    return {
        throttle: 0.0,
        yaw: 0.0,
        pitch: 0.0,
        roll: 0.0,
        online: false
    }
}
