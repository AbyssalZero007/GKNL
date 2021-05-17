function hexBuild() {
    for (i = 0; i < 6; i++) {
        var startX = 50;
        var startY = 50;
        var r = 50;
        var a = 2 * Math.pi / 6;
        var x = startX + r * Math.cos(a * i);
        var y = startY + r * Math.sin(a * i);
        str += x + "," + y + " ";
    }
}

class hex {

}





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
                hexDraw(centerX, centerY, r);
            } else if (layerCounter%2 == 1) {
                var xPos = layerCounter;
                var yPos = 1;
                if (i==1) {
                    for (j = 0; j < layerCounter*6; j++) {
                        var startLoopNum = Math.round(layerCounter/2);
                        var m = xPos*(3*r*Math.cos(angle));
                        var n = -1*yPos*r*Math.sin(angle);
                        if (j==0) {
                            hexDraw(centerX+m, centerY+n, r);
                            yPos += 1;
                            xPos -= 1;
                        } else if (j==1) {
                            hexDraw(centerX+m, centerY+n, r);
                            yPos -= 1;
                            xPos -= 1;
                        } else if (j==2) {
                            hexDraw(centerX+m, centerY+n, r);
                            yPos -= 2;
                        } else if (j==3) {
                            hexDraw(centerX+m, centerY+n, r);
                            yPos -= 1;
                            xPos += 1;
                        } else if (j==4) {
                            hexDraw(centerX+m, centerY+n, r);
                            yPos += 1;
                            xPos += 1;
                        } else if (j==5) {
                            hexDraw(centerX+m, centerY+n, r);
                        }
                        i += 1;
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
                            hexDraw(centerX+m, centerY+n, r);
                        } else if (j >= startLoopNum && j <= layerCounter) {
                            yPos += 1;
                            xPos -= 1;
                            var m = xPos*(3*r*Math.cos(angle));
                            var n = -1*yPos*r*Math.sin(angle);
                            hexDraw(centerX+m, centerY+n, r);
                        } else if (j > layerCounter && j <= layerCounter*2) {
                            yPos -= 1;
                            xPos -= 1;
                            var m = xPos*(3*r*Math.cos(angle));
                            var n = -1*yPos*r*Math.sin(angle);
                            hexDraw(centerX+m, centerY+n, r);
                        } else if (j > layerCounter*2 && j <= layerCounter*3) {
                            yPos -= 2;
                            var m = xPos*(3*r*Math.cos(angle));
                            var n = -1*yPos*r*Math.sin(angle);
                            hexDraw(centerX+m, centerY+n, r);
                        } else if (j > layerCounter*3 && j <= layerCounter*4) {
                            yPos -= 1;
                            xPos += 1;
                            var m = xPos*(3*r*Math.cos(angle));
                            var n = -1*yPos*r*Math.sin(angle);
                            hexDraw(centerX+m, centerY+n, r);
                        } else if (j > layerCounter*4 && j <= layerCounter*5) {
                            yPos += 1;
                            xPos += 1;
                            var m = xPos*(3*r*Math.cos(angle));
                            var n = -1*yPos*r*Math.sin(angle);
                            hexDraw(centerX+m, centerY+n, r);
                        }  else if (j > layerCounter*5 && j <= layerCounter*6) {
                            yPos += 2;
                            var m = xPos*(3*r*Math.cos(angle));
                            var n = -1*yPos*r*Math.sin(angle);
                            hexDraw(centerX+m, centerY+n, r);
                        }
                        i += 1;
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
                        hexDraw(centerX+m, centerY+n, r);
                    } else if (j >= startLoopNum && j < layerCounter) {
                        yPos += 1;
                        xPos -= 1;
                        var m = xPos*(3*r*Math.cos(angle));
                        var n = -1*yPos*r*Math.sin(angle);
                        hexDraw(centerX+m, centerY+n, r);
                    } else if (j >= layerCounter && j < layerCounter*2) {
                        yPos -= 1;
                        xPos -= 1;
                        var m = xPos*(3*r*Math.cos(angle));
                        var n = -1*yPos*r*Math.sin(angle);
                        hexDraw(centerX+m, centerY+n, r);
                    } else if (j >= layerCounter*2 && j < layerCounter*3) {
                        yPos -= 2;
                        var m = xPos*(3*r*Math.cos(angle));
                        var n = -1*yPos*r*Math.sin(angle);
                        hexDraw(centerX+m, centerY+n, r);
                    } else if (j >= layerCounter*3 && j < layerCounter*4) {
                        yPos -= 1;
                        xPos += 1;
                        var m = xPos*(3*r*Math.cos(angle));
                        var n = -1*yPos*r*Math.sin(angle);
                        hexDraw(centerX+m, centerY+n, r);
                    } else if (j >= layerCounter*4 && j < layerCounter*5) {
                        yPos += 1;
                        xPos += 1;
                        var m = xPos*(3*r*Math.cos(angle));
                        var n = -1*yPos*r*Math.sin(angle);
                        hexDraw(centerX+m, centerY+n, r);
                    }  else if (j >= layerCounter*5 && j < layerCounter*6) {
                        yPos += 2;
                        var m = xPos*(3*r*Math.cos(angle));
                        var n = -1*yPos*r*Math.sin(angle);
                        hexDraw(centerX+m, centerY+n, r);
                    }
                    i += 1;
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
}

function hexDraw(x, y, r) {
    var canvas = document.getElementById('hexDrawingCanvas');
    var ctx = canvas.getContext('2d');
    let a = 2 * Math.PI / 6;
    ctx.beginPath();
    for (var i = 0; i < 6; i++) {
        ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
    }
    ctx.closePath();
    ctx.stroke();
}

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