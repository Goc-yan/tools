window.onload = function () {
    var dom = document.getElementById("clock");
    var ctx = dom.getContext("2d");
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var r = width / 2;
    var rem = width / 200

    function darwClock() {
        // save();
        ctx.translate(r, r);
        ctx.beginPath();
        ctx.lineWidth = 6 * rem;
        ctx.arc(0, 0, r - 3 * rem, 2 * Math.PI, false);
        ctx.stroke();

        var house = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
        ctx.font = 18 * rem + "px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        house.forEach(function (num, i) {
            var rad = 2 * Math.PI / 12 * i;
            var x = Math.cos(rad) * (r - 25 * rem);
            var y = Math.sin(rad) * (r - 25 * rem);
            ctx.fillText(num, x, y);
        });

        for (var i = 0; i < 60; i++) {
            var rad = 2 * Math.PI / 60 * i;
            var x = Math.cos(rad) * (r - 13 * rem);
            var y = Math.sin(rad) * (r - 13 * rem);
            ctx.beginPath();

            if (i % 5 === 0) {
                ctx.fillStyle = "#000";
                ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
            } else {
                ctx.fillStyle = "#ccc";
                ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
            }
            ctx.fill();
        }
    }

    function drawHour(hour, minute) {
        ctx.save();
        ctx.beginPath();
        var hRad = 2 * Math.PI / 12 * hour;
        var mRad = 2 * Math.PI / 12 / 60 * minute;
        ctx.rotate(hRad + mRad);
        ctx.lineWidth = 6 * rem;
        ctx.lineCap = "round";
        ctx.moveTo(0, 10 * rem);
        ctx.lineTo(0, -r / 2);
        ctx.stroke();
        ctx.restore();
    }

    function drawMin(min, seconds) {
        ctx.save();
        ctx.beginPath();
        var mRad = 2 * Math.PI / 60 * min;
        var sRad = 2 * Math.PI / 60 / 60 * seconds;
        ctx.rotate(mRad + sRad);
        ctx.lineWidth = 4 * rem;
        ctx.lineCap = "round";
        ctx.moveTo(0, 10 * rem);
        ctx.lineTo(0, -r + 25 * rem);
        ctx.stroke();
        ctx.restore();
    }
    function drawSec(seconds) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "#f00";
        var rad = 2 * Math.PI / 60 * seconds;
        ctx.rotate(rad);
        ctx.moveTo(-2 * rem, 20 * rem);
        ctx.lineTo(2 * rem, 20 * rem);
        ctx.lineTo(1 * rem, -r + 18 * rem);
        ctx.lineTo(-1 * rem, -r + 18 * rem);
        ctx.fill();
        ctx.restore();
    }

    function drawDot() {
        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.arc(0, 0, 2 * rem, 0, 2 * Math.PI, false);
        ctx.fill();
    }


    function draw() {
        var time = new Date();
        var hour = time.getHours();
        var minute = time.getMinutes();
        var seconds = time.getSeconds();

        ctx.clearRect(0, 0, width, height);
        ctx.save();
        darwClock();
        drawHour(hour, minute);
        drawMin(minute, seconds);
        drawSec(seconds);
        drawDot();
        ctx.restore();
    }
    draw();
    setInterval(draw, 1000);
}