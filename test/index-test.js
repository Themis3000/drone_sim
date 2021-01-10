import { Physics } from "../src/app/utils/physics.js";
import "chai";
const should = chai.should();
const expect = chai.expect;

describe("Physics", function () {

});

class DummyCamera {
    constructor() {
        this.position = new Vector();
        this.rotation = new Vector();
    }
}

class Vector {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
}

