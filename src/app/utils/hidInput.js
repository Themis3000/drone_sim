//handles human interface device input

export function getHidState() {
    let gamepad = navigator.getGamepads()[0];
    if (gamepad !== undefined && gamepad !== null) {
        return {
            throttle: gamepad.axes[0],
            yaw: gamepad.axes[3],
            pitch: gamepad.axes[2],
            roll: gamepad.axes[1],
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
