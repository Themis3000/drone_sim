export class Physics {
    constructor(camera, getHidState, forcesScale) {
        this.camera = camera;
        this.getHidState = getHidState;
        this.forcesScale = forcesScale;
        this.motorPower = 4;
        //max rotations per second in radians
        this.rates = 3;
        //added camera angle in degrees
        this.camAngle = 14;
        this.pitch = new Angle(0);
        this.roll = new Angle(0);
        this.yaw = new Angle(0);
    }

    set camAngle(angle) {
        this.camAngleRad = angle * (Math.PI/180);
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
        let angleFromPlane = Math.atan(Math.sqrt((Math.tan(this.pitch.value)**2) + (Math.tan(this.roll.value)**2)));
        let yForce = ((1/(Math.PI/2))*Math.abs(angleFromPlane-Math.PI)-1)*systemForce;
        let xzForce = systemForce - Math.abs(yForce);
        let xForce = Math.abs(this.pitch.value)/(this.roll.value+this.pitch.value)*xzForce*Math.sign(this.pitch.value);
        let zForce = (xzForce - Math.abs(xForce)) * Math.sign(this.pitch.value);
        //adjust forces for yaw
        //uc for unit circle
        let ucAngle = Math.atan(xForce/zForce);
        let ucHypotenuse = xForce/Math.sin(ucAngle);
        let adjXForce = ucHypotenuse*Math.sin(ucAngle+this.yaw.value);
        let adjZForce = ucHypotenuse*Math.cos(ucAngle+this.yaw.value);
        //apply forces to camera
        this.camera.position.y += Physics.calcMovement(yForce-9.8, frameTimeDelta);
        if (adjXForce > 0)
            this.camera.position.x += Physics.calcMovement(adjXForce, frameTimeDelta);
        if (adjZForce > 0)
            this.camera.position.z += Physics.calcMovement(adjZForce, frameTimeDelta);
        //apply rotations to camera
        this.camera.rotation.x = (this.pitch.value + this.camAngleRad);
        this.camera.rotation.y = this.yaw.value;
        this.camera.rotation.z = -this.roll.value;
    }

    //given an amount of force/second, this function returns the movement that force caused over an amount of time in ms
    static calcMovement(force, time) {
        return force/1000 * time;
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