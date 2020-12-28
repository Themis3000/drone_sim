export class Physics {
    constructor(camera, getHidState, forcesScale) {
        this.camera = camera;
        this.getHidState = getHidState;
        this.forcesScale = forcesScale;
        this.motorPower = 4;
        //max rotations per second in radians
        this.rates = 2.7;
        //added camera angle in degrees
        this.camAngle = 14;
        this.camAngleRad = this.camAngle * (Math.PI/180);
        this.pitch = new Angle(0);
        this.roll = new Angle(0);
        this.yaw = new Angle(0);
    }

    runPhysicsStep(frameTimeDelta) {
        let hidState = this.getHidState();

        //end function if gamepad is not detected
        if (!hidState.online)
            return

        //translate throttle stick into force (feet per second)
        let systemForce = hidState.throttle * (9.8*this.motorPower);
        //translate pitch and roll stick into rotations
        this.pitch.value += (this.rates * hidState.pitch)/1000 * frameTimeDelta;
        this.roll.value += (this.rates * hidState.roll)/1000 * frameTimeDelta;
        this.yaw.value += (this.rates * hidState.yaw)/1000 * frameTimeDelta;
        //find amount of force in each axis
        let angleFromPlane = Math.atan(Math.sqrt(Math.tan(this.pitch.value)**2 + Math.tan(this.roll.value)**2));
        let zForce = (((1/(Math.PI/4))*Math.abs(angleFromPlane-(Math.PI/2))-1)*systemForce);
        let xyForce = systemForce - Math.abs(zForce);
        let xForce = Math.abs(this.pitch.value)/(this.roll.value+this.pitch.value)*xyForce*Math.sign(this.pitch.value);
        let yForce = (xyForce - Math.abs(xForce)) * Math.sign(this.pitch.value);
        //adjust forces for yaw
        //uc for unit circle
        let ucAngle = Math.atan(xForce/yForce);
        let ucHypotenuse = xForce/Math.sin(ucAngle);
        let adjXForce = ucHypotenuse*Math.sin(ucAngle+this.yaw.value);
        let adjYForce = ucHypotenuse*Math.cos(ucAngle+this.yaw.value);
        //apply forces to camera
        this.camera.position.y += (zForce-9.8)/1000 * frameTimeDelta;
        if (adjXForce > 0)
            this.camera.position.x += adjYForce/1000 * frameTimeDelta;
        if (adjYForce > 0)
            this.camera.position.z += adjXForce/1000 * frameTimeDelta;
        //apply rotations to camera
        this.camera.rotation.x = (this.pitch.value + this.camAngleRad);
        this.camera.rotation.y = this.yaw.value;
        this.camera.rotation.z = -this.roll.value;
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