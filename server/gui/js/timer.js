class Timer {
    constructor(c, str) {
        this.controller = c;
        console.log("Setting zero time: " + str);
        this.time = this.parseTime(str);
    }

    parseTime(str) {
        let r = str.split(':');
        let h = parseInt(r[0]);
        let m = parseInt(r[1]);
        let d = new Date();
        d.setHours(h);
        d.setMinutes(m);
        d.setSeconds(0);
        d.setMilliseconds(0);
        return(d);
    }

    update() {
        console.log("Updating interval!");
        let d = new Date();
        this.elapsed = (d - this.time) / 1000;
        // console.log(this.elapsed);
        // call controller callback
        this.controller.onTimeUpdate();
    }

    setZero(str) {
        this.time = parseTime(str);
    }
}