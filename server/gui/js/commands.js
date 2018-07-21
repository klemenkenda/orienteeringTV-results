$(document).ready(function() {
    /**
     * Main functionality - websockets connection. 
     */

    const ws = new WebSocket('ws://localhost:8080/echo');
    
    ws.onopen = function () {
        console.log("WS open!");    
    };

    ws.onmessage = function (e) {
        console.log("Received: " + e.data);
    };

    ws.onerror = function (error) {
        console.log("Error: " + error);
    }

    // clear
    $("#clear").click(function() {
        console.log("Clicked: Clear");
        ws.send('empty');
    });
    
    $("#intro").click(function() {
        console.log("Clicked: Intro");
        ws.send('intro');
    })
})