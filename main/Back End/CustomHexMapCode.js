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

