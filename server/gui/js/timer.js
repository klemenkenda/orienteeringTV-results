class Timer {
    constructor(c, str) {
        console.log("Creating timer.");
        this.controller = c;
        console.log("Setting zero time: " + str);
        this.startTime = this.parseTime(str);
        c.rememberTimer(this);
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

    getZeroStartTime() {
        let d = this.startTime;
        return ((d.getHours() * 60 + d.getMinutes()) * 60 + d.getSeconds()) * 100;
    }

    setZero(str) {
        this.time = parseTime(str);
    }
}