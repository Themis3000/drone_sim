export class Physics {
    constructor(camera, getHidState, forcesScale) {
        this.camera = camera;
        this.getHidState = getHidState;
        this.forcesScale = forcesScale;
    }

    runPhysicsStep(frameTimeDelta) {
        //console.log(this.getHidState());
    }
}