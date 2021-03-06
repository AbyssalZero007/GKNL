class hoverCircle {
    constructor(xPoint, yPoint, radius) {
        this.x = xPoint;
        this.y = yPoint;
        this.r = radius;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getR() {
        return this.r;
    }
    toString() {
        return this.x + ", " + this.y + ", " + this.r;
    }
}

var hoverAreas = [];

// Functions:


function hexMapBuild(tiles, percentLength) {
    //Screen size percent to px
    var w = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

    var wPerThousandth = w/1000;
    var r = wPerThousandth*(percentLength*10)
    
    var layerCounter = 0;
    var layerCap = 0;
    var oddLayerCounter = 1;
    var tileCount = tiles;
    tileMax: {
        for (i = 0; i < tileCount; i++) {
            var canvasMeasure = document.getElementById('hexDrawingCanvas');
            let angle = 2 * Math.PI / 6;
            var centerX = canvasMeasure.width / 2;
            var centerY = canvasMeasure.height / 2;

            if (i==0) {
                hexDraw(centerX, centerY, r, percentLength);
                hoverBuild(centerX, centerY, percentLength);
            } else if (layerCounter%2 == 1) {
                var xPos = layerCounter;
                var yPos = 1;
                if (i==1) {
                    for (j = 0; j < layerCounter*6; j++) {
                        var startLoopNum = Math.round(layerCounter/2);
                        var m = xPos*(3*r*Math.cos(angle));
                        var n = -1*yPos*r*Math.sin(angle);
                        if (j==0) {
                            hexDraw(centerX+m, centerY+n, r, percentLength);
                            hoverBuild(centerX+m, centerY+n, percentLength);
                            yPos += 1;
                            xPos -= 1;
                        } else if (j==1) {
                            hexDraw(centerX+m, centerY+n, r, percentLength);
                            hoverBuild(centerX+m, centerY+n, percentLength);
                            yPos -= 1;
                            xPos -= 1;
                        } else if (j==2) {
                            hexDraw(centerX+m, centerY+n, r, percentLength);
                            hoverBuild(centerX+m, centerY+n, percentLength);
                            yPos -= 2;
                        } else if (j==3) {
                            hexDraw(centerX+m, centerY+n, r, percentLength);
                            hoverBuild(centerX+m, centerY+n, percentLength);
                            yPos -= 1;
                            xPos += 1;
                        } else if (j==4) {
                            hexDraw(centerX+m, centerY+n, r, percentLength);
                            hoverBuild(centerX+m, centerY+n, percentLength);
                            yPos += 1;
                            xPos += 1;
                        } else if (j==5) {
                            hexDraw(centerX+m, centerY+n, r, percentLength);
                            hoverBuild(centerX+m, centerY+n, percentLength);
                        }
                        //console.log(m, n);
                        i += 1;
                        //console.log(i);
                        if (tileCount == i-layerCounter+1) {
                            iCounter = i;
                            break tileMax;
                        }
                        
                    }
                } else {
                    var xPos = layerCounter;
                    var yPos = 0;
                    //equalizer
                    xPos += 1;
                    yPos += 2*oddLayerCounter;
                    oddLayerCounter++;
                    for (j = 0; j < layerCounter*6; j++) {
                        var startLoopNum = Math.round(layerCounter/2);
                        if (j < startLoopNum) {
                            yPos += 1;
                            xPos -= 1;
                            var m = xPos*(3*r*Math.cos(angle));
                            var n = -1*yPos*r*Math.sin(angle);
                            hexDraw(centerX+m, centerY+n, r, percentLength);
                        } else if (j >= startLoopNum && j <= layerCounter) {
                            yPos += 1;
                            xPos -= 1;
                            var m = xPos*(3*r*Math.cos(angle));
                            var n = -1*yPos*r*Math.sin(angle);
                            hexDraw(centerX+m, centerY+n, r, percentLength);
                        } else if (j > layerCounter && j <= layerCounter*2) {
                            yPos -= 1;
                            xPos -= 1;
                            var m = xPos*(3*r*Math.cos(angle));
                            var n = -1*yPos*r*Math.sin(angle);
                            hexDraw(centerX+m, centerY+n, r, percentLength);
                        } else if (j > layerCounter*2 && j <= layerCounter*3) {
                            yPos -= 2;
                            var m = xPos*(3*r*Math.cos(angle));
                            var n = -1*yPos*r*Math.sin(angle);
                            hexDraw(centerX+m, centerY+n, r, percentLength);
                        } else if (j > layerCounter*3 && j <= layerCounter*4) {
                            yPos -= 1;
                            xPos += 1;
                            var m = xPos*(3*r*Math.cos(angle));
                            var n = -1*yPos*r*Math.sin(angle);
                            hexDraw(centerX+m, centerY+n, r, percentLength);
                        } else if (j > layerCounter*4 && j <= layerCounter*5) {
                            yPos += 1;
                            xPos += 1;
                            var m = xPos*(3*r*Math.cos(angle));
                            var n = -1*yPos*r*Math.sin(angle);
                            hexDraw(centerX+m, centerY+n, r, percentLength);
                        }  else if (j > layerCounter*5 && j <= layerCounter*6) {
                            yPos += 2;
                            var m = xPos*(3*r*Math.cos(angle));
                            var n = -1*yPos*r*Math.sin(angle);
                            hexDraw(centerX+m, centerY+n, r, percentLength);
                        }
                        hoverBuild(centerX+m, centerY+n, percentLength);
                        //console.log(m, n);
                        i += 1;
                        //console.log(i);
                        if (tileCount == i-layerCounter+1) {
                            iCounter = i;
                            break tileMax;
                        }
                    }
                }
            } else if (i%2==0) {
                var xPos = layerCounter;
                var yPos = 0;
                //equalizer
                yPos += layerCounter;
                for (j = 0; j < layerCounter*6; j++) {
                    var startLoopNum = Math.round(layerCounter/2);
                    if (j < startLoopNum) {
                        yPos += 1;
                        xPos -= 1;
                        var m = xPos*(3*r*Math.cos(angle));
                        var n = -1*yPos*r*Math.sin(angle);
                        hexDraw(centerX+m, centerY+n, r, percentLength);
                    } else if (j >= startLoopNum && j < layerCounter) {
                        yPos += 1;
                        xPos -= 1;
                        var m = xPos*(3*r*Math.cos(angle));
                        var n = -1*yPos*r*Math.sin(angle);
                        hexDraw(centerX+m, centerY+n, r, percentLength);
                    } else if (j >= layerCounter && j < layerCounter*2) {
                        yPos -= 1;
                        xPos -= 1;
                        var m = xPos*(3*r*Math.cos(angle));
                        var n = -1*yPos*r*Math.sin(angle);
                        hexDraw(centerX+m, centerY+n, r, percentLength);
                    } else if (j >= layerCounter*2 && j < layerCounter*3) {
                        yPos -= 2;
                        var m = xPos*(3*r*Math.cos(angle));
                        var n = -1*yPos*r*Math.sin(angle);
                        hexDraw(centerX+m, centerY+n, r, percentLength);
                    } else if (j >= layerCounter*3 && j < layerCounter*4) {
                        yPos -= 1;
                        xPos += 1;
                        var m = xPos*(3*r*Math.cos(angle));
                        var n = -1*yPos*r*Math.sin(angle);
                        hexDraw(centerX+m, centerY+n, r, percentLength);
                    } else if (j >= layerCounter*4 && j < layerCounter*5) {
                        yPos += 1;
                        xPos += 1;
                        var m = xPos*(3*r*Math.cos(angle));
                        var n = -1*yPos*r*Math.sin(angle);
                        hexDraw(centerX+m, centerY+n, r, percentLength);
                    }  else if (j >= layerCounter*5 && j < layerCounter*6) {
                        yPos += 2;
                        var m = xPos*(3*r*Math.cos(angle));
                        var n = -1*yPos*r*Math.sin(angle);
                        hexDraw(centerX+m, centerY+n, r, percentLength);
                    }
                    hoverBuild(centerX+m, centerY+n, percentLength);
                    i += 1;
                    //console.log(m, n);
                    if (tileCount == i-layerCounter+1) {
                        iCounter = i;
                        break tileMax;
                    }
                }

            }
            if (i >= layerCap) {
                layerCap += 6*layerCounter;
                layerCounter += 1;
            }
        }
    }
    /*
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, circleRadius, 0, 2*Math.PI)
    ctx.fillStyle = "white";
    ctx.fill();
    */
}

function hexDraw(x, y, r, percent) {
    var canvasDraw = document.getElementById('hexDrawingCanvas');
    var ctx = canvasDraw.getContext('2d');
    let a = 2 * Math.PI / 6;
    ctx.beginPath();
    for (var i = 0; i < 6; i++) {
        ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
    }
    ctx.closePath();
    ctx.strokeStyle = "white";
    ctx.stroke();
    //hoverBuild(x, y, percent);
}

//dosent work for the hover areas, need to figured out why
function rebuild() {
    var canvasRebuild = document.getElementById('hexDrawingCanvas');
    var ctx = canvasRebuild.getContext('2d');
    ctx.clearRect(0, 0, canvasRebuild.width, canvasRebuild.height);
    hexMapBuild(91, 2.5);
}

function hoverBuild(x, y, percentLength) {
    
    var w = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
    var wPerThousandth = w/1000;
    var radiusHover = wPerThousandth*(percentLength*10)
    
    var canvasHover = document.getElementById('hexDrawingCanvas');
    var ctxHover = canvasHover.getContext('2d');

    var deg60 = 2 * Math.PI / 3;
    var circleRadius = radiusHover * Math.sin(deg60);

    var circle = new hoverCircle(x, y, circleRadius)
    hoverAreas.push(circle);

    ctxHover.beginPath();
    ctxHover.globalAlpha = 0.0;
    ctxHover.arc(x, y, circleRadius, 0, 2*Math.PI);
    ctxHover.fillStyle = "white";
    ctxHover.fill()
    ctxHover.globalAlpha = 1.0;
    ctxHover.font = "16px Arial";
    ctxHover.fillText(hoverAreas.length, hoverAreas[hoverAreas.length-1].getX()-8, hoverAreas[hoverAreas.length-1].getY()+8);
    ctxHover.closePath();

    
}

function mousemoveFunction(event) {
    var canvasHover = document.getElementById('hexDrawingCanvas');
    var ctxHover = canvasHover.getContext('2d');
    var rect = document.getElementById('hexDrawingCanvas').getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;

    for (i = 0; i < hoverAreas.length; i++) {
        //console.log(hoverAreas[i].toString());
        ctxHover.beginPath();
        ctxHover.arc(hoverAreas[i].getX(), hoverAreas[i].getY(), hoverAreas[i].getR(), 0, 2*Math.PI);
        
        if (ctxHover.isPointInPath(mouseX, mouseY)) {
            //ctxHover.globalAlpha = 1.0;
            //ctxHover.fillStyle = "green";
            hoverActionOn(i+1);
        } else {
            //ctxHover.globalAlpha = 1.0;
            //ctxHover.fillStyle = "white";
        }
        //ctxHover.fill();
    }
    
}

function hoverActionOn(text) {
    document.getElementById('infoBarTitleMutable').innerHTML = text;
}

function hoverActionOff() {
    
}

/* Example

var canvas = document.querySelector("canvas"),
    ctx = canvas.getContext("2d"),                      <----- Creates the shapes
    rects = [
        {x: 10, y: 10, w: 200, h: 50},
        {x: 50, y: 70, w: 150, h: 30}    // etc.
    ], i = 0, r;

// render initial rects.
while(r = rects[i++]) ctx.rect(r.x, r.y, r.w, r.h);
ctx.fillStyle = "blue"; ctx.fill();                      <----- renders them onto the screen on boot

canvas.onmousemove = function(e) {

  // important: correct mouse position:
  var rect = this.getBoundingClientRect(),
      x = e.clientX - rect.left,                      <----- gets mouse posistion each time it is moved
      y = e.clientY - rect.top,
      i = 0, r;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);        <----- clears the drawing board of initial shapes every time the mouse moves
  
  while(r = rects[i++]) {
    // add a single rect to path:
    ctx.beginPath();                                       <----- opens a new path for each object in the array each time 
    ctx.rect(r.x, r.y, r.w, r.h);                                 the mouse is moved after clearing
    
    // check if we hover it, fill red, if not fill it blue
    ctx.fillStyle = ctx.isPointInPath(x, y) ? "red" : "blue";               <----- checks the mouse position against the 
    ctx.fill();                                                                    object array and changes the color based off of that
  }

};

*/

/*
function hexDraw(x, y, r) {
    var str = "";
    for (i = 0; i < 6; i++) {
        var startX = x;
        var startY = y;
        var a = 2 * Math.PI / 6;
        var x = startX + r * Math.cos(a * i);
        var y = startY + r * Math.sin(a * i);
        str += Math.round(x*100)/100 + "," + Math.round(y*100)/100 + " ";
    }
    document.getElementById('hex').setAttribute("points", str)
}
*/