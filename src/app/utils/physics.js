export class Physics {
    constructor(camera, getHidState, forcesScale) {
        this.camera = camera;
        this.getHidState = getHidState;
        this.forcesScale = forcesScale;
        this.camAngle = 14;
        this.pitch = new Angle(0);
        this.roll = new Angle(0);
        this.yaw = new Angle(0);
    }

    runPhysicsStep(frameTimeDelta) {
        //let hidState = this.getHidState();
        this.pitch.value += Math.PI/(60*4);

        //apply to the actual camera
        this.camera.rotation.x = this.pitch.value;
        this.camera.rotation.y = this.yaw.value;
        //this.roll = math.PI flips rotation
        if (this.pitch.value > (Math.PI / 2) && this.pitch.value < (1.5 * Math.PI)) {
            console.log("flip");
            this.camera.rotation.z = this.roll.value + Math.PI;
        } else {
            this.camera.rotation.z = this.roll.value;
        }
        console.log(this.camera.rotation);
    }
}

class Angle {
    constructor(rotation) {
        this.rotation = rotation;
    }

    get value() {
        return this.rotation;
    }

    set value(num) {
        this.rotation = Angle.simplifyAngle(num);
    }

    //Simplifies an angle (in radians) to be the smallest number possible while still representing the same angle
    //e.g. 3pi represents the same angle as pi, so this function would simplify 3pi down to pi
    static simplifyAngle(angle) {
        return angle % (2*Math.PI);
    }
}