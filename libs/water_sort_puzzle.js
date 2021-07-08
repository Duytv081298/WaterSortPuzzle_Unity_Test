var isMobile = detectMobile();

var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

var height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
width = isMobile ? width : height / 1.7;
var canvas, stage, update = true;
var supportsPassive = false, pressMove = false;
var queue;
var isDrawing;

var containerMain = new createjs.Container()
var bottleBase, bottleCurr
// var mask

var map = [
    [7, 7, 7, 5],
    [-1, 6, 6, 6],
    [-1, 9, 9, 9],
    [-1, 10, 11, 0],
    [11, 11, 10, 11,],
    [-1, -1, 4, 8],
    [0, 0, 6, 9],
    [-1, 8, 8, 8],
    [-1, 1, 1, 1],
    [0, 5, 10, 1],
    [-1, 4, 4, 10],
    [5, 5, 7, 4],
    [3, 3, 3, 3],
    [2, 2, 2, 2]
]

// var map = [
//     [7, 7, 7, 5],
//     [-1, 6, 6, 6],
//     [-1, 9, 9, 9],
//     [-1, 4, 11, 0],
//     [11, 11, 11, 11,],
//     [-1, 4, 2, 2],
//     [-1, -1, -1, -1],
//     [4, 4, 4, 4],
//     [-1, 1, 1, 1],
//     [3, 5, 10, 1],
//     [4, 2, 2, 10],
//     [5, 5, 7, 4],
//     [3, 3, 3, 3],
//     [2, 2, 3, 3]
// ]

var containerBottleClone = [
    { newBottle: new createjs.Container(), oldBottle: new createjs.Container() },
    { newBottle: new createjs.Container(), oldBottle: new createjs.Container() },
    { newBottle: new createjs.Container(), oldBottle: new createjs.Container() },
    { newBottle: new createjs.Container(), oldBottle: new createjs.Container() },
    { newBottle: new createjs.Container(), oldBottle: new createjs.Container() },
    { newBottle: new createjs.Container(), oldBottle: new createjs.Container() },
    { newBottle: new createjs.Container(), oldBottle: new createjs.Container() },
    { newBottle: new createjs.Container(), oldBottle: new createjs.Container() },
    { newBottle: new createjs.Container(), oldBottle: new createjs.Container() },
    { newBottle: new createjs.Container(), oldBottle: new createjs.Container() },
    { newBottle: new createjs.Container(), oldBottle: new createjs.Container() },
    { newBottle: new createjs.Container(), oldBottle: new createjs.Container() },
    { newBottle: new createjs.Container(), oldBottle: new createjs.Container() },
    { newBottle: new createjs.Container(), oldBottle: new createjs.Container() },
]
var listBottle = []
var listBottleChoose = []

var listBottleTemp = []
var rt = 50
var listBottleA = [], listBottleB = [];

async function gameinit() {
    createjs.RotationPlugin.install();
    createjs.MotionGuidePlugin.install();
    setStage();
    loadImage();
    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", tick);
}
//Event
function addEvent() {
    stage.addEventListener("stagemousedown", onMouseDown);
    stage.addEventListener("stagemouseup", onPressMove);
    stage.addEventListener("stagemousemove", onMouseUp);
}
function removeEvent(target) {
    if (isMobile) {
        target.removeEventListener("mousedown", onMouseDown, supportsPassive ? { passive: true } : false);
        canvas.removeEventListener("touchmove", onPressMove, supportsPassive ? { passive: true } : false);
        canvas.removeEventListener("touchend", onMouseUp, supportsPassive ? { passive: true } : false);
    } else {
        target.removeEventListener("mousedown", onMouseDown);
        canvas.removeEventListener("mousemove", onPressMove);
        canvas.removeEventListener("mouseup", onMouseUp);
    }
}
function removeAllEvent() {
    for (let i = 0; i < blockUse.length; i++) {
        const target = blockUse[i].target;
        if (isMobile) {
            if (target) {
                target.removeEventListener("mousedown", onMouseDown, supportsPassive ? { passive: true } : false);
                canvas.removeEventListener("touchmove", onPressMoveFree, supportsPassive ? { passive: true } : false);
                canvas.removeEventListener("touchend", onMouseUpFree, supportsPassive ? { passive: true } : false);
            }
        } else {
            if (target) {
                target.removeEventListener("mousedown", onMouseDown);
                canvas.removeEventListener("mousemove", onPressMoveFree);
                canvas.removeEventListener("mouseup", onMouseUpFree);
            }
        }
    }
}
function setStage() {
    canvas = document.getElementById("myCanvas");
    stage = new createjs.Stage(canvas);
    stage.mouseMoveOutside = true;
    canvas.height = height;
    canvas.width = width;
}
async function loadImage() {
    queue = new createjs.LoadQueue(false);
    var manifest = [
        { src: './images/full_bottle.png', id: 'full_bottle' },
    ];
    queue.on("complete", setAnimation);
    queue.loadManifest(manifest);
}
function setAnimation() {
    spriteSheet = new createjs.SpriteSheet({
        images: [queue.getResult("full_bottle")],
        framerate: 25,
        frames: [
            [1, 1, 400, 711, 0, 0, 0],
            [403, 1, 100, 348, 0, 0, 0],
            [403, 351, 63, 77, 0, -45, -1],
            [468, 351, 43, 69, 0, -55, 0],
            [468, 422, 41, 72, 0, -56, -34],
            [403, 430, 62, 63, 0, -46, -48],
            [403, 495, 61, 80, 0, -44, -3],
            [466, 496, 32, 65, 0, -62, -48],
            [500, 496, 11, 28, 0, -70, -111],
            [500, 526, 11, 17, 0, -70, -127],
            [466, 563, 13, 56, 0, -70, -63],
            [403, 577, 60, 58, 0, -47, -44],
            [481, 563, 13, 48, 0, -70, -78],
            [496, 563, 12, 38, 0, -70, -94],
            [403, 637, 58, 65, 0, -58, 0],
            [463, 637, 48, 79, 0, -51, -21],
            [403, 704, 57, 83, 0, -45, -6],
            [462, 718, 49, 74, 0, -52, -2],
            [1, 714, 313, 27, 0, 0, 0],
            [316, 714, 57, 68, 0, -60, 0],
            [1, 743, 301, 257, 0, 0, 0],
            [304, 794, 206, 30, 0, 0, 0],
            [1, 1002, 255, 254, 0, 0, 0],
            [258, 1002, 249, 169, 0, 0, 0],
            [258, 1173, 54, 84, 0, -47, -10],
            [304, 826, 200, 44, 0, 0, 0],
            [314, 1173, 52, 73, 0, -61, 0],
            [368, 1173, 143, 57, 0, 0, 0],
            [304, 872, 150, 64, 0, 0, 0],
            [456, 872, 53, 46, 0, -50, -37],
            [304, 938, 143, 57, 0, 0, 0],
            [449, 938, 56, 52, 0, -49, -41]
        ],

        "animations": {
            "bg": { "frames": [0] },
            "bottle": { "frames": [1] },
            "confetti": { "frames": [9, 8, 13, 12, 10, 7, 4, 15, 24, 16, 6, 2, 26, 19, 14, 3, 17, 29, 31, 11, 5] },
            "txt_can_you": { "frames": [18] },
            "Decor": { "frames": [20] },
            "txt_tab_to_pour": { "frames": [21] },
            "Circle_decor": { "frames": [22] },
            "Cup": { "frames": [23] },
            "txt_wesome": { "frames": [25] },
            "btn_install_now": { "frames": [27] },
            "btn_next": { "frames": [28] },
            "btn_try_again": { "frames": [30] }
        },
    });
    setBackground()
    setMap()
    addEvent();

}
function setBackground() {

    var bg = new createjs.Sprite(spriteSheet, "bg");
    bg.scaleX = stage.canvas.width / bg.getBounds().width;
    bg.scaleY = stage.canvas.height / bg.getBounds().height;

    var bottle = new createjs.Sprite(spriteSheet, "bottle");
    bottle.scale = (stage.canvas.width / 9) / bottle.getBounds().width

    bottleBase = { bottle: bottle, width: bottle.getBounds().width * bottle.scale, height: bottle.getBounds().height * bottle.scale, remainder: (stage.canvas.width - bottle.getBounds().width * bottle.scale * 7) / 8 }
    stage.addChild(bg)

}
function setMap() {
    var x = bottleBase.remainder
    for (let i = 0; i < 14; i++) {
        if (i <= 6) {
            var xb = x + (x + bottleBase.width) * i
            var bottle = bottleBase.bottle.clone()
            bottle.y = stage.canvas.height * 2.5 / 10
            bottle.x = xb
            // bottle.shadow = new createjs.Shadow('#000', 0, 5, 15);

            var maskC = getMaskC(i)
            maskC.y = bottle.y + bottleBase.height * 0.1
            maskC.x = bottle.x + bottleBase.width - bottleBase.height * 1.5

            var mask = new createjs.Shape();
            mask.graphics.rc(0, 0, bottleBase.width * 0.85, bottleBase.height, 0, 0, 25, 25);
            mask.x = bottle.x + (bottleBase.width - bottleBase.width * 0.82) / 2
            mask.y = bottle.y

            stage.addChild(maskC);
            maskC.mask = mask;
            stage.addChild(bottle)
            listBottle.push({ bottle: bottle, mask: mask, maskC: maskC, status: true })
        } else {
            var iNew = i - 7
            var xb = x + (x + bottleBase.width) * iNew
            var bottle = bottleBase.bottle.clone()
            bottle.y = stage.canvas.height * 5.5 / 10
            bottle.x = xb
            // bottle.shadow = new createjs.Shadow('#000', 0, 0, 10);

            var maskC = getMaskC(i)
            maskC.y = bottle.y + bottleBase.height * 0.1
            maskC.x = bottle.x + bottleBase.width - bottleBase.height * 1.5

            var mask = new createjs.Shape();
            mask.graphics.rc(0, 0, bottleBase.width * 0.85, bottleBase.height, 0, 0, 25, 25);
            mask.x = bottle.x + (bottleBase.width - bottleBase.width * 0.82) / 2
            mask.y = bottle.y

            stage.addChild(maskC);
            maskC.mask = mask;
            stage.addChild(bottle)
            listBottle.push({ bottle: bottle, mask: mask, maskC: maskC, status: true })
        }
    }
}
function getMaskC(bottle) {
    var maskC = new createjs.Container()
    var arr = map[bottle]
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= 0) {
            const color = convertColor(arr[i]);
            var rect = new createjs.Shape();
            rect.graphics.f(color).dr(0, (bottleBase.height * 0.9 / 4) * i, bottleBase.height * 1.5, i == arr.length - 1 ? (bottleBase.height * 0.91 / 4) * 3 : bottleBase.height * 0.91 / 4);
            maskC.addChild(rect);
        }
    }
    return maskC
}
function tick(event) {
    if (update) {
        stage.update(event);
    }
}
function detectMobile() {
    try {
        var opts = Object.defineProperty({}, "passive", {
            get: function () {
                supportsPassive = true;
            },
        });
        window.addEventListener("testPassive", null, opts);
        window.removeEventListener("testPassive", null, opts);
    } catch (e) { }
    var iOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false;
    if (iOS) {
        return true;
    }
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1;
    if (isAndroid) {
        return true;
    }
    return false;
}
function convertColor(color) {
    switch (color) {
        case 0:
            return "#88aaff"
        case 1:
            return "#3f4482"
        case 2:
            return "#145def"
        case 3:
            return "#f27914"
        case 4:
            return "#f4c916"
        case 5:
            return "#6c7490"
        case 6:
            return "#bc245e"
        case 7:
            return "#bf3cbf"
        case 8:
            return "#ff94d1"
        case 9:
            return "#008160"
        case 10:
            return "#809917"
        case 11:
            return "#B3D666"
    }
}
function getWin() {
    var win = 0;
    for (let i = 0; i < map.length; i++) {
        const bottle = map[i];
        winC = true
        for (let j = 0; j < bottle.length; j++) {
            const item = bottle[j];
            if (item == -1) winC = false
        }
        if (winC) win++
        else return false
    }
    if (win == 12) return true
}
function onMouseDown(evt) {
    pressMove = true;
    var location = currentMouse(evt);
    var newChoose = checkClick(location)
    if (newChoose != null) {
        if (listBottleA.length == listBottleB.length) {
            if (listBottleA.indexOf(newChoose) < 0) {
                if (map[newChoose].lastIndexOf(-1) != 3) {
                    listBottleA.push(newChoose);
                    upBottleChoose(newChoose)
                }
            }
        } else {
            if (newChoose != listBottleA[listBottleA.length - 1]) {
                var oldChoose = listBottleA[listBottleA.length - 1]
                var colorCv = map[oldChoose][map[oldChoose].lastIndexOf(-1) + 1]
                var arrColor = getNumCv(colorCv, map[oldChoose], map[oldChoose].lastIndexOf(-1) + 1)
                var newEmtyChoose = map[newChoose].lastIndexOf(-1) + 1
                if (newEmtyChoose == 4) {
                    listBottleB.push(newChoose);
                    startMoveBottle(listBottleA.length - 1, arrColor)
                } else if (arrColor.length <= newEmtyChoose && colorCv == map[newChoose][newEmtyChoose]) {
                    listBottleB.push(newChoose);
                    startMoveBottle(listBottleA.length - 1, arrColor)
                } else {
                    downBottleChoose(listBottleA.length - 1)
                }
            } else {
                downBottleChoose(listBottleA.length - 1)
            }

        }
    }
}
function getNumCv(color, arr, i) {
    var temp = [i]
    for (let j = i + 1; j < arr.length; j++) {
        const item = arr[j];
        if (item == color) temp.push(j)
        else break;
    }
    return temp
}
function onPressMove(evt) {
    if (pressMove) {
        // var location = currentMouse(evt);
        // listBottle[4].mask.x = location.x
        // listBottle[4].mask.y = location.y
    }
}
function onMouseUp(evt) {
    if (pressMove) {
        pressMove = false
        if (listBottleChoose.length != 0 && listBottleChoose[listBottleChoose.length - 1].length == 1) {
        }
    }
}
function currentMouse(evt) {
    return { x: evt.stageX, y: evt.stageY }
}
function checkClick(location) {
    var x = (location.x - bottleBase.remainder) / (bottleBase.remainder + bottleBase.width)
    var minx = Math.floor(x) * (bottleBase.remainder + bottleBase.width) + bottleBase.remainder
    var maxx = Math.floor(x + 1) * (bottleBase.width) + bottleBase.remainder * Math.floor(x) + bottleBase.remainder
    if (location.x > minx && location.x < maxx) {
        if (location.y >= stage.canvas.height * 2.5 / 10 && location.y <= stage.canvas.height * 2.5 / 10 + bottleBase.height) return Math.floor(x)
        else if (location.y >= stage.canvas.height * 5.5 / 10 && location.y <= stage.canvas.height * 5.5 / 10 + bottleBase.height) return Math.floor(x) + 7
        else return null
    } else return null
}
function getHeightMaskC(degrees) {
    var cosRotation = Math.cos(degrees_to_radians(degrees))
    return bottleBase.height * cosRotation
}
function upBottleChoose(newChoose) {
    var arr = map[newChoose]
    var arrColor = []
    var color1 = arr[0]
    var numColor1 = 1;
    for (let i = 1; i < arr.length; i++) {
        const item = arr[i];
        if (color1 == item) {
            numColor1++
            if (i == arr.length - 1) arrColor.push({ color: color1, numColor: numColor1 })
        } else {
            arrColor.push({ color: color1, numColor: numColor1 })
            color1 = item;
            numColor1 = 1;
            if (i == arr.length - 1) arrColor.push({ color: color1, numColor: numColor1 })
        }
    }
    var mask = listBottle[newChoose].mask.clone()
    mask.y = listBottle[newChoose].mask.y - bottleBase.height * 0.9 / 3
    var bottle = bottleBase.bottle.clone()
    bottle.y = listBottle[newChoose].bottle.y - bottleBase.height * 0.9 / 3
    bottle.x = listBottle[newChoose].bottle.x
    var maskC = getMaskCClone(arrColor)
    maskC.y = listBottle[newChoose].maskC.y - bottleBase.height * 0.9 / 3
    maskC.x = bottle.x + bottleBase.width - bottleBase.height * 1.5

    stage.addChild(containerBottleClone[newChoose].oldBottle)
    containerBottleClone[newChoose].oldBottle.removeAllChildren()
    containerBottleClone[newChoose].oldBottle.addChild(maskC)
    maskC.mask = mask
    containerBottleClone[newChoose].oldBottle.addChild(bottle)
    listBottleTemp.push({ maskC: maskC, mask: mask, bottle: bottle, index: newChoose, arrColor: arrColor })
    listBottle[newChoose].mask.alpha = 0
    listBottle[newChoose].maskC.alpha = 0
    listBottle[newChoose].bottle.alpha = 0
}
function downBottleChoose(index) {

    var oldChoose = listBottleA[index];
    listBottle[oldChoose].mask.alpha = 1
    listBottle[oldChoose].bottle.alpha = 1
    listBottle[oldChoose].maskC.alpha = 1
    reRenderMaskCMap(oldChoose)
    containerBottleClone[oldChoose].oldBottle.removeAllChildren()

    listBottleTemp.splice(index, 1)
    listBottleA.splice(index, 1)
}
function startMoveBottle(index, arrColor) {
    var oldChoose = listBottleA[index];
    var newChoose = listBottleB[index];
    var newBottle = listBottle[newChoose].bottle;
    var colorAdd = map[oldChoose][arrColor[0]]
    var indexAdd = map[newChoose].lastIndexOf(-1)
    //edit map
    arrColor.forEach(id => {
        map[oldChoose][id] = -1
        map[newChoose][indexAdd] = colorAdd
        indexAdd--
    });
    var bottleClone = listBottleTemp[index]

    //create arr Object clone
    var arrNewBottle = map[newChoose]
    var arrayClone = []
    if (arrNewBottle[0] == -1) {
        arrayClone = [
            { color: -1, numColor: arrNewBottle.lastIndexOf(-1) + 1 },
            { color: colorAdd, numColor: arrColor.length }
        ]
        var startLoop = arrayClone[0].numColor + arrayClone[1].numColor

        var color1 = arrNewBottle[startLoop]
        var numColor1 = 1;
        var i = startLoop + 1
        do {
            const color = arrNewBottle[i];
            if (color1 == color) {
                numColor1++
                if (i == arrNewBottle.length - 1) arrayClone.push({ color: color1, numColor: numColor1 })
            } else {
                arrayClone.push({ color: color1, numColor: numColor1 })
                color1 = color;
                numColor1 = 1;
                if (i == arrNewBottle.length - 1) arrayClone.push({ color: color1, numColor: numColor1 })
            }
            i++;
        }
        while (i < arrNewBottle.length);
    } else {
        var startLoop = arrColor.length
        var colorAdd = arrNewBottle[0]
        arrayClone = [
            { color: colorAdd, numColor: arrColor.length }
        ]
        var color1 = arrNewBottle[arrColor.length]
        var numColor1 = 1;
        var i = startLoop + 1
        do {
            const color = arrNewBottle[i];
            if (color1 == color) {
                numColor1++
                if (i == arrNewBottle.length - 1) arrayClone.push({ color: color1, numColor: numColor1 })
            } else {
                arrayClone.push({ color: color1, numColor: numColor1 })
                color1 = color;
                numColor1 = 1;
                if (i == arrNewBottle.length - 1) arrayClone.push({ color: color1, numColor: numColor1 })
            }
            i++;
        }
        while (i < arrNewBottle.length);
    }

    rt = getRotation(arrColor)

    createjs.Tween.get(bottleClone.bottle)
        .to({ rotation: 30, x: newBottle.x, y: newBottle.y - bottleBase.height * 0.9 / 2 }, 500, createjs.Ease.quadInOut)
        .call(() => {
            bottleClone.bottle.rotation = 30
            createjs.Tween.get(bottleClone.bottle)
                .to({ rotation: rt }, 500 + (arrColor.length - 1) * 500, createjs.Ease.quadInOut)
                .call(() => {
                    bottleClone.bottle.rotation = rt
                    endMoveBottle(index)
                })
                .addEventListener("change", handleChange2);
        })
        .addEventListener("change", handleChange1);


    function handleChange1(event) {
        reRenderMaskC(bottleClone, index, 0)
    }
    function handleChange2(event) {
        reRenderMaskC(bottleClone, index, 1)
        renderNewMaskC(bottleClone, index, arrayClone)
    }
}
function getRotation(arr) {
    switch (arr[arr.length - 1]) {
        case 0:
            return 50;
        case 1:
            return 65;
        case 2:
            return 80;
        case 3:
            return 90;
    }
}
function endMoveBottle(index) {

    var bottleClone = listBottleTemp[index]
    var oldChoose = listBottleA[index];
    var newX = oldChoose <= 6 ? bottleBase.remainder + (bottleBase.remainder + bottleBase.width) * oldChoose : bottleBase.remainder + (bottleBase.remainder + bottleBase.width) * (oldChoose - 7)
    createjs.Tween.get(bottleClone.bottle)
        .to({
            rotation: 0,
            x: newX,
            y: oldChoose <= 6 ? stage.canvas.height * 2.5 / 10 : stage.canvas.height * 5.5 / 10
        }, 500, createjs.Ease.quadInOut)
        .call(() => {
            reRenderMap(index)
            bottleClone.bottle.rotation = 0
            listBottleTemp.splice(index, 1)
            listBottleA.splice(index, 1)
            listBottleB.splice(index, 1)
        })
        .addEventListener("change", handleChange);

    function handleChange(event) {
        reRenderMaskCEnd(bottleClone, index)
    }
}
function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}
function reRenderMaskCEnd(bottleClone) {
    var oldsurvival = bottleClone.bottle.rotation / rt;
    var survival = 1 - oldsurvival;
    var maxHeight = getHeightMaskC(bottleClone.bottle.rotation);
    var ratio = maxHeight / bottleBase.height * 0.9;
    var heightBase = bottleBase.height * 0.9 / 4;
    bottleClone.maskC.removeAllChildren();
    var arrnew = bottleClone.arrColor;
    var divisor = 4 - arrnew[0].numColor
    var bonus = divisor == 0 ? 0 : (heightBase * oldsurvival) / divisor

    for (let i = 0; i < arrnew.length; i++) {
        var nY = 0
        if (arrnew[i].color >= 0) {
            const color = convertColor(arrnew[i].color);
            var rect = new createjs.Shape();
            if (i == 1 && i == arrnew.length - 1) {
                nY = heightBase * arrnew[0].numColor * ratio * survival
                rect.graphics.f(color).dr(0, 0, bottleBase.height * 1.5, heightBase * arrnew[i].numColor + bonus + heightBase * 2);
                rect.y = nY
            } else if (i == 1) {
                nY = heightBase * arrnew[0].numColor * ratio * survival
                rect.graphics.f(color).dr(0, 0, bottleBase.height * 1.5, heightBase * arrnew[i].numColor + bonus);
                rect.y = nY
            }
            else if (i > 1 && i < arrnew.length - 1) {
                rect.graphics.f(color).dr(0, 0, bottleBase.height * 1.5, heightBase * arrnew[i].numColor * ratio + bonus);
                rect.y = bottleClone.maskC.children[bottleClone.maskC.children.length - 1].y + heightBase * arrnew[i - 1].numColor * ratio + bonus;
            }
            else if (i == arrnew.length - 1) {
                rect.graphics.f(color).dr(0, 0, bottleBase.height * 1.5, heightBase * arrnew[i].numColor * ratio + heightBase * 2);
                rect.y = bottleClone.maskC.children[bottleClone.maskC.children.length - 1].y + heightBase * arrnew[i - 1].numColor * ratio + bonus;
            }
            bottleClone.maskC.addChild(rect);
        }
    }
    var newBasewidth = bottleBase.width * Math.cos(degrees_to_radians(bottleClone.bottle.rotation))
    var phantru = bottleBase.width * Math.sin(degrees_to_radians(rt));
    bottleClone.maskC.x = bottleClone.bottle.x + newBasewidth - bottleBase.height * 1.5
    bottleClone.maskC.y = bottleClone.bottle.y + bottleBase.height * 0.1 * survival + phantru * oldsurvival
    var newRO = 90 - bottleClone.bottle.rotation
    bottleClone.mask.rotation = bottleClone.bottle.rotation
    if (newRO < 90) {
        bottleClone.mask.x = bottleClone.bottle.x + (bottleBase.width / 10)
        bottleClone.mask.y = bottleClone.bottle.y + (bottleBase.width / 20) * oldsurvival
    }
}
var dot = new createjs.Shape();
function reRenderMaskC(bottleClone, indexBottleClone, life) {
    var oldsurvival = life == 1 ? (bottleClone.bottle.rotation - 30) / (rt - 30) : 0;
    var survival = life == 1 ? 1 - oldsurvival : 1;
    var maxHeight = getHeightMaskC(bottleClone.bottle.rotation);
    var ratio = maxHeight / bottleBase.height * 0.9;
    var heightBase = bottleBase.height * 0.9 / 4;
    bottleClone.maskC.removeAllChildren();
    var arr = bottleClone.arrColor;
    if (life == 1) {
        stage.removeChild(dot)
        dot.graphics.setStrokeStyle(1);
        dot.graphics.beginStroke("#000000");
        dot.graphics.beginFill("red");
        dot.graphics.drawCircle(0, 0, 30);
        stage.addChild(dot)
    }

    if (survival == 0) {
        var divisor = 4 - arr[0].numColor
        var bonus = divisor == 0 ? 0 : (heightBase * oldsurvival) / divisor
        var arrnew = listBottleTemp[indexBottleClone].arrColor
        for (let i = 0; i < arrnew.length; i++) {
            if (arrnew[0].color == -1) {
                if (i == 1) {
                    var oldIndex = arrnew[i - 1]
                    arrnew[i - 1] = { color: -1, numColor: oldIndex.numColor + arrnew[i].numColor }
                    const a1 = arrnew.slice(0, 1)
                    const a2 = arr.slice(2, arrnew.length);
                    arrnew = a1.concat(a2);
                    break;
                }
            }
            else {
                const a1 = [{ color: -1, numColor: arrnew[0].numColor }]
                const a2 = arr.slice(1, arrnew.length);
                arrnew = a1.concat(a2);
                break;
            }
        }
        listBottleTemp[indexBottleClone].arrColor = arrnew
        for (let i = 0; i < arrnew.length; i++) {
            if (arrnew[i].color >= 0) {
                const color = convertColor(arrnew[i].color);
                var rect = new createjs.Shape();
                if (i == 1) {
                    rect.graphics.f(color).dr(0, 0, bottleBase.height * 1.5, heightBase * arrnew[i].numColor + bonus);
                } else if (i > 1 && i < arrnew.length - 1) {
                    rect.graphics.f(color).dr(0, 0, bottleBase.height * 1.5, heightBase * arrnew[i].numColor * ratio + bonus);
                    rect.y = bottleClone.maskC.children[bottleClone.maskC.children.length - 1].y + heightBase * arrnew[i - 1].numColor * ratio + bonus;
                } else if (i == arrnew.length - 1) {
                    rect.graphics.f(color).dr(0, 0, bottleBase.height * 1.5, heightBase * arrnew[i].numColor * ratio + heightBase * 2);
                    rect.y = bottleClone.maskC.children[bottleClone.maskC.children.length - 1].y + heightBase * arrnew[i - 1].numColor * ratio + bonus;
                }
                bottleClone.maskC.addChild(rect);
            }
        }
    } else reRenderMaskClone(arr, bottleClone, oldsurvival, survival, ratio, maxHeight)
    var newBasewidth = bottleBase.width * Math.cos(degrees_to_radians(bottleClone.bottle.rotation))
    var phantru = bottleBase.width * Math.sin(degrees_to_radians(rt));
    bottleClone.maskC.x = bottleClone.bottle.x + newBasewidth - bottleBase.height * 1.5
    bottleClone.maskC.y = bottleClone.bottle.y + bottleBase.height * 0.1 * survival + phantru * oldsurvival
    var newRO = 90 - bottleClone.bottle.rotation
    bottleClone.mask.rotation = bottleClone.bottle.rotation
    if (newRO < 90) {
        bottleClone.mask.x = bottleClone.bottle.x + (bottleBase.width / 10)
        bottleClone.mask.y = bottleClone.bottle.y + (bottleBase.width / 20) * oldsurvival
    }
}
function reRenderMaskClone(arrColor, bottleClone, oldsurvival, survival, ratio, maxHeight) {
    var maskC = bottleClone.maskC;
    var heightBase = bottleBase.height * 0.9 / 4;
    var divisor, bonus;
    for (let i = 0; i < arrColor.length; i++) {
        if (arrColor[0].color == -1) {
            var survival1
            if (bottleClone.bottle.rotation <= 30) survival1 = 1 - bottleClone.bottle.rotation / 30
            else survival1 = 0
            divisor = arrColor.length - arrColor[0].numColor - arrColor[1].numColor
            bonus = divisor == 0 ? 0 : heightBase * oldsurvival / divisor
            if (arrColor[i].color >= 0) {
                const color = convertColor(arrColor[i].color);
                var rect = new createjs.Shape();
                var nY = heightBase * arrColor[0].numColor * survival1 * ratio
                if (i == 1) {
                    if (i != arrColor.length - 1) rect.graphics.f(color).dr(0, 0, bottleBase.height * 1.5, heightBase * arrColor[i].numColor * survival);
                    else {
                        nY = heightBase * arrColor[0].numColor * survival * ratio
                        rect.graphics.f(color).dr(0, 0, bottleBase.height * 1.5, maxHeight);
                    }
                    rect.y = nY;
                    maskC.addChild(rect);
                }
                else if (i == 2 && i != arrColor.length - 1) {
                    nY = bottleClone.maskC.children[bottleClone.maskC.children.length - 1].y + heightBase * arrColor[i - 1].numColor * survival
                    rect.graphics.f(color).dr(0, 0, bottleBase.height * 1.5, heightBase * arrColor[i].numColor * ratio + bonus);
                    rect.y = nY;
                    maskC.addChild(rect);
                }
                else if (i == 2 && i == arrColor.length - 1) {
                    nY = bottleClone.maskC.children[bottleClone.maskC.children.length - 1].y + heightBase * arrColor[i - 1].numColor * survival
                    rect.graphics.f(color).dr(0, 0, bottleBase.height * 1.5, heightBase * arrColor[i].numColor + heightBase * 2 + bonus);
                    rect.y = nY;
                    maskC.addChild(rect);
                }
                else {
                    nY = bottleClone.maskC.children[bottleClone.maskC.children.length - 1].y + heightBase * arrColor[i - 1].numColor * ratio + bonus
                    rect.graphics.f(color).dr(0, 0, bottleBase.height * 1.5, heightBase * arrColor[i].numColor + heightBase * 2);
                    rect.y = nY;
                    maskC.addChild(rect);
                }
            }
        } else {
            const color = convertColor(arrColor[i].color);
            var rect = new createjs.Shape();
            var nY = 0
            divisor = 4 - arrColor[0].numColor
            bonus = divisor == 0 ? 0 : (heightBase * oldsurvival) / divisor
            if (i == 0) {
                if (i != arrColor.length - 1) rect.graphics.f(color).dr(0, 0, bottleBase.height * 1.5, heightBase * arrColor[i].numColor * survival);
                else rect.graphics.f(color).dr(0, 0, bottleBase.height * 1.5, maxHeight);
                rect.y = nY;
                maskC.addChild(rect);
            }
            else if (i == 1 && i != arrColor.length - 1) {
                nY = bottleClone.maskC.children[bottleClone.maskC.children.length - 1].y + heightBase * arrColor[i - 1].numColor * survival
                rect.graphics.f(color).dr(0, 0, bottleBase.height * 1.5, heightBase * arrColor[i].numColor * ratio + bonus);
                rect.y = nY;
                maskC.addChild(rect);
            }
            else if (i == 1 && i == arrColor.length - 1) {
                nY = bottleClone.maskC.children[bottleClone.maskC.children.length - 1].y + heightBase * arrColor[i - 1].numColor * survival
                rect.graphics.f(color).dr(0, 0, bottleBase.height * 1.5, heightBase * arrColor[i].numColor + heightBase * 2 + bonus);
                rect.y = nY;
                maskC.addChild(rect);
            }
            else {
                nY = bottleClone.maskC.children[bottleClone.maskC.children.length - 1].y + heightBase * arrColor[i - 1].numColor * ratio + bonus
                rect.graphics.f(color).dr(0, 0, bottleBase.height * 1.5, heightBase * arrColor[i].numColor + heightBase * 2);
                rect.y = nY;
                maskC.addChild(rect);
            }

        }
    }
}
function renderNewMaskC(bottleClone, index, arrayClone) {
    var newChoose = listBottleB[index];

    var mask = listBottle[newChoose].mask.clone()
    var maskC = getNewMaskCClone(arrayClone, bottleClone)

    var bottle = bottleBase.bottle.clone()
    bottle.x = listBottle[newChoose].bottle.x
    bottle.y = listBottle[newChoose].bottle.y
    maskC.y = listBottle[newChoose].maskC.y
    maskC.x = listBottle[newChoose].bottle.x + bottleBase.width - bottleBase.height * 1.5
    stage.addChild(containerBottleClone[newChoose].newBottle)
    containerBottleClone[newChoose].newBottle.removeAllChildren()
    containerBottleClone[newChoose].newBottle.addChild(maskC)
    maskC.mask = mask
    listBottle[newChoose].mask.alpha = 0
    listBottle[newChoose].bottle.alpha = 0
    listBottle[newChoose].maskC.alpha = 0
    containerBottleClone[newChoose].newBottle.addChild(bottle)

}
function getMaskCClone(arrColor) {
    var maskC = new createjs.Container();
    var heightBase = bottleBase.height * 0.9 / 4;
    for (let i = 0; i < arrColor.length; i++) {
        if (arrColor[i].color >= 0) {
            const color = convertColor(arrColor[i].color);
            var rect = new createjs.Shape();
            var nY
            if (arrColor[0].color == -1) {
                var extra = heightBase * arrColor[0].numColor;
                nY = maskC.children.length == 0 ? extra : maskC.children[maskC.children.length - 1].y + heightBase * arrColor[i - 1].numColor;
            }
            else nY = i == 0 ? 0 : maskC.children[maskC.children.length - 1].y + heightBase * arrColor[i - 1].numColor;
            rect.graphics.f(color).dr(0, 0, bottleBase.height * 1.5, i == arrColor.length - 1 ? heightBase * arrColor[i].numColor + heightBase * 2 : heightBase * arrColor[i].numColor);
            rect.y = nY;
            maskC.addChild(rect);
        }
    }
    return maskC
}
function getNewMaskCClone(arrColor, bottleClone) {
    var oldsurvival = (bottleClone.bottle.rotation - 30) / (rt - 30);
    var survival = 1 - oldsurvival;
    var maskC = new createjs.Container();
    var heightBase = bottleBase.height * 0.9 / 4;
    if (arrColor[0].color == -1) {
        for (let i = 0; i < arrColor.length; i++) {
            const color = convertColor(arrColor[i].color);
            var rect = new createjs.Shape();
            var NY = heightBase * arrColor[0].numColor
            if (arrColor[i].color >= 0) {
                if (i == 1) {
                    rect.graphics.f(color).dr(0, 0, bottleBase.height * 1.5, i == arrColor.length - 1 ? heightBase * arrColor[i].numColor * oldsurvival + heightBase * 2 : heightBase * arrColor[i].numColor * oldsurvival);
                    rect.y = NY + heightBase * arrColor[i].numColor * survival;
                    maskC.addChild(rect);
                } else {
                    rect.graphics.f(color).dr(0, 0, bottleBase.height * 1.5, i == arrColor.length - 1 ? heightBase * arrColor[i].numColor + heightBase * 2 : heightBase * arrColor[i].numColor);
                    rect.y = heightBase * (i + 1);
                    maskC.addChild(rect);
                }
            }
        }

    } else {
        for (let i = arrColor.length - 1; i >= 0; i--) {
            const color = convertColor(arrColor[i].color);
            var rect = new createjs.Shape();
            var nY = 0
            if (i == 0) {
                rect.graphics.f(color).dr(0, 0, bottleBase.height * 1.5, i == arrColor.length - 1 ? heightBase * arrColor[i].numColor * oldsurvival + heightBase * 2 : heightBase * arrColor[i].numColor * oldsurvival);
                rect.y = nY + heightBase * arrColor[i].numColor * survival;
                maskC.addChild(rect);
            } else if (i == arrColor.length - 1) {
                nY = heightBase * (4 - arrColor[i].numColor)
                rect.graphics.f(color).dr(0, 0, bottleBase.height * 1.5, heightBase * arrColor[i].numColor + heightBase * 2);
                rect.y = nY;
                maskC.addChild(rect);
            }
            else {
                nY = maskC.children[maskC.children.length - 1].y - heightBase * arrColor[i].numColor
                rect.graphics.f(color).dr(0, 0, bottleBase.height * 1.5, heightBase * arrColor[i].numColor);
                rect.y = nY;
                maskC.addChild(rect);
            }

        }
    }
    return maskC
}
function reRenderMap(index) {
    var oldChoose = listBottleA[index];
    var newChoose = listBottleB[index];
    listBottle[oldChoose].mask.alpha = 1
    listBottle[oldChoose].bottle.alpha = 1
    listBottle[oldChoose].maskC.alpha = 1
    reRenderMaskCMap(oldChoose)
    containerBottleClone[oldChoose].oldBottle.removeAllChildren()

    listBottle[newChoose].mask.alpha = 1
    listBottle[newChoose].bottle.alpha = 1
    listBottle[newChoose].maskC.alpha = 1
    reRenderMaskCMap(newChoose)
    containerBottleClone[newChoose].newBottle.removeAllChildren()
}
function reRenderMaskCMap(index) {
    listBottle[index].maskC.removeAllChildren()
    var arr = map[index]
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= 0) {
            const color = convertColor(arr[i]);
            var rect = new createjs.Shape();
            rect.graphics.f(color).dr(0, (bottleBase.height * 0.9 / 4) * i, bottleBase.height * 1.5, i == arr.length - 1 ? (bottleBase.height * 0.91 / 4) * 3 : bottleBase.height * 0.91 / 4);
            listBottle[index].maskC.addChild(rect);
        }
    }
}