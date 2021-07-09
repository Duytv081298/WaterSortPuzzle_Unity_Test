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
    [-1, 4, 2, 10],
    [5, 3, 7, 4],
    [3, 5, 3, 3],
    [2, 4, 2, 2]
]
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
var corner, install_now;
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
}
function removeEvent() {
    stage.removeEventListener("stagemousedown", onMouseDown);
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
            [1, 1, 270, 480, 0, 0, 0],
            [1, 483, 240, 318, 0, -186, -18],
            [273, 1, 301, 257, 0, 0, 0],
            [576, 1, 255, 254, 0, 0, 0],
            [833, 1, 251, 304, 0, -191, -10],
            [1086, 1, 224, 330, 0, -191, -29],
            [1312, 1, 157, 288, 0, -237, -144],
            [273, 260, 245, 264, 0, -243, 0],
            [243, 526, 224, 275, 0, -253, -1],
            [1, 803, 220, 202, 0, -206, -174],
            [223, 803, 249, 169, 0, 0, 0],
            [469, 526, 169, 275, 0, -231, -4],
            [474, 803, 205, 179, 0, -212, -158],
            [520, 260, 124, 256, 0, -258, -202],
            [646, 257, 100, 348, 0, 0, 0],
            [748, 307, 210, 335, 0, -199, -48],
            [960, 333, 245, 252, 0, -194, -201],
            [1207, 333, 202, 290, 0, -258, -3],
            [960, 587, 232, 229, 0, -201, -186],
            [1194, 625, 190, 293, 0, -220, -14],
            [681, 644, 188, 315, 0, -215, -92],
            [871, 644, 43, 221, 0, -294, -264],
            [223, 974, 206, 30, 0, 0, 0],
            [916, 644, 41, 184, 0, -294, -328],
            [681, 961, 313, 27, 0, 0, 0],
            [959, 818, 200, 44, 0, 0, 0],
            [640, 607, 38, 145, 0, -294, -394],
            [996, 864, 150, 64, 0, 0, 0],
            [996, 930, 143, 57, 0, 0, 0],
            [1386, 625, 35, 104, 0, -294, -462],
            [1148, 920, 143, 57, 0, 0, 0],
            [1293, 920, 45, 53, 0, -5, -1],
            [871, 867, 32, 62, 0, -294, -531]
        ],

        "animations": {
            "bg": { "frames": [0] },
            "confetti": { "frames": [32, 29, 26, 23, 21, 13, 6, 20, 15, 5, 1, 4, 17, 8, 7, 11, 19, 12, 9, 18, 16] },
            "decor": { "frames": [2] },
            "circle_decor": { "frames": [3] },
            "cup": { "frames": [10] },
            "bottle": { "frames": [14] },
            "txt_tab_to_pour": { "frames": [22] },
            "txt_can_you": { "frames": [24] },
            "txt_wesome": { "frames": [25] },
            "btn_next": { "frames": [27] },
            "btn_install_now": { "frames": [28] },
            "btn_try_again": { "frames": [30] },
            "hand_tut": { "frames": [31] }
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

    install_now = new createjs.Sprite(spriteSheet, "btn_install_now");
    install_now.scaleX = stage.canvas.width / 4.5 / install_now.getBounds().width;
    install_now.scaleY = stage.canvas.width / 4.5 / install_now.getBounds().width;
    install_now.x = (stage.canvas.width - install_now.getBounds().width * install_now.scaleX) / 2;
    install_now.y = stage.canvas.height - install_now.getBounds().height * install_now.scaleY * 2;

    stage.addChild(bg, install_now)
    var install_nowx = install_now.x,
        install_nowy = install_now.y,
        install_nowscale = stage.canvas.width / 4.5 / install_now.getBounds().width;
    createjs.Tween.get(install_now, { loop: true })
        .to(
            {
                scale: (stage.canvas.width / 5) / install_now.getBounds().width,
                x: (stage.canvas.width - ((stage.canvas.width / 5) / install_now.getBounds().width) * install_now.getBounds().width) / 2,
                y: install_nowy - (stage.canvas.width / 5 - stage.canvas.width / 8) / 10,
            },
            500,
            createjs.Ease.linear
        )
        .to({ scale: install_nowscale, x: install_nowx, y: install_nowy }, 500, createjs.Ease.linear);
    install_now.addEventListener("click", () => { getLinkInstall() }, false);

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
            listBottle.push({ bottle: bottle, mask: mask, maskC: maskC, status: true, pass: false })
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
            listBottle.push({ bottle: bottle, mask: mask, maskC: maskC, status: true, pass: false })
        }
    }

    renderConfetti()
    renderHand()
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
            if (listBottleA[listBottleA.length - 1] == newChoose) {
                if (map[newChoose].lastIndexOf(-1) != 3 && listBottle[listBottleA[listBottleA.length - 1]].status == true) {
                    listBottleA.push(newChoose);
                    upBottleChoose(newChoose)
                }
            } else {
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
    createjs.Tween.removeTweens(hand_tut);
    stage.removeChild(hand_tut)
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
    listBottle[newChoose].status = false
    listBottle[newChoose].pass = false

    var bottle = bottleBase.bottle.clone()
    bottle.y = listBottle[newChoose].bottle.y
    bottle.x = listBottle[newChoose].bottle.x

    var mask = listBottle[newChoose].mask.clone()
    mask.y = listBottle[newChoose].mask.y

    var maskC = getMaskCClone(arrColor)
    maskC.y = listBottle[newChoose].maskC.y
    maskC.x = bottle.x + bottleBase.width - bottleBase.height * 1.5

    stage.addChild(containerBottleClone[newChoose].oldBottle)
    containerBottleClone[newChoose].oldBottle.removeAllChildren()
    containerBottleClone[newChoose].oldBottle.addChild(maskC)
    maskC.mask = mask
    containerBottleClone[newChoose].oldBottle.addChild(bottle)


    createjs.Tween.get(bottle)
        .to({ y: listBottle[newChoose].bottle.y - bottleBase.height * 0.9 / 3 }, 100, createjs.Ease.linear)
    createjs.Tween.get(mask)
        .to({ y: listBottle[newChoose].mask.y - bottleBase.height * 0.9 / 3 }, 100, createjs.Ease.linear)
    createjs.Tween.get(maskC)
        .to({ y: listBottle[newChoose].maskC.y - bottleBase.height * 0.9 / 3 }, 100, createjs.Ease.linear)


    listBottleTemp.push({ maskC: maskC, mask: mask, bottle: bottle, index: newChoose, arrColor: arrColor })
    listBottle[newChoose].mask.alpha = 0
    listBottle[newChoose].maskC.alpha = 0
    listBottle[newChoose].bottle.alpha = 0
}
function downBottleChoose(index, test) {
    var oldChoose
    if (test) oldChoose = index
    else oldChoose = listBottleA[index];


    createjs.Tween.get(listBottleTemp[index].bottle)
        .to({ y: listBottle[oldChoose].bottle.y }, 200, createjs.Ease.linear)
    createjs.Tween.get(listBottleTemp[index].mask)
        .to({ y: listBottle[oldChoose].mask.y }, 200, createjs.Ease.linear)
    createjs.Tween.get(listBottleTemp[index].maskC)
        .to({ y: listBottle[oldChoose].maskC.y }, 200, createjs.Ease.linear)
        .call(() => {
            listBottle[oldChoose].mask.alpha = 1
            listBottle[oldChoose].bottle.alpha = 1
            listBottle[oldChoose].maskC.alpha = 1
            reRenderMaskCMap(oldChoose)
            containerBottleClone[oldChoose].oldBottle.removeAllChildren()
            listBottleTemp.splice(index, 1)
            listBottleA.splice(index, 1)
        })

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

    corner = getRotation(arrColor)

    createjs.Tween.get(bottleClone.bottle)
        .to({ rotation: corner.r0, x: newBottle.x, y: newBottle.y - bottleBase.height * 0.9 / 2 }, 500, createjs.Ease.linear)
        .call(() => {
            bottleClone.bottle.rotation = corner.r0
            createjs.Tween.get(bottleClone.bottle)
                .to({ rotation: corner.r1, x: newBottle.x + bottleBase.width / 4 }, 1000 + (arrColor.length - 1) * 500, createjs.Ease.linear)
                .call(() => {
                    bottleClone.bottle.rotation = corner.r1
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
            return { r0: 25, r1: 50 };
        case 1:
            return { r0: 30, r1: 65 };
        case 2:
            return { r0: 30, r1: 80 };
        case 3:
            return { r0: 77, r1: 90 };
    }
}
function endMoveBottle(index) {

    var bottleClone = listBottleTemp[index]
    var oldChoose = listBottleA[index];
    var newBottle = map[listBottleB[index]];
    var newX = oldChoose <= 6 ? bottleBase.remainder + (bottleBase.remainder + bottleBase.width) * oldChoose : bottleBase.remainder + (bottleBase.remainder + bottleBase.width) * (oldChoose - 7)
    createjs.Tween.get(bottleClone.bottle)
        .to({
            rotation: 0,
            x: newX,
            y: oldChoose <= 6 ? stage.canvas.height * 2.5 / 10 : stage.canvas.height * 5.5 / 10
        }, 500, createjs.Ease.linear)
        .call(() => {
            reRenderMap(index)
            var win = checkWin(index)
            if (win) gameWin()
            bottleClone.bottle.rotation = 0
            listBottle[oldChoose].status = true
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
    var oldsurvival = bottleClone.bottle.rotation / corner.r1;
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
    var phantru = bottleBase.width * Math.sin(degrees_to_radians(corner.r1));
    bottleClone.maskC.x = bottleClone.bottle.x + newBasewidth - bottleBase.height * 1.5
    bottleClone.maskC.y = bottleClone.bottle.y + bottleBase.height * 0.1 * survival + phantru * oldsurvival
    var newRO = 90 - bottleClone.bottle.rotation
    bottleClone.mask.rotation = bottleClone.bottle.rotation
    if (newRO < 90) {
        bottleClone.mask.x = bottleClone.bottle.x + (bottleBase.width / 10)
        bottleClone.mask.y = bottleClone.bottle.y + (bottleBase.width / 20) * oldsurvival
    }
}
var dotC = new createjs.Container()

var dot = new createjs.Shape();
function reRenderMaskC(bottleClone, indexBottleClone, life) {
    var oldsurvival = life == 1 ? (bottleClone.bottle.rotation - corner.r0) / (corner.r1 - corner.r0) : 0;
    var survival = life == 1 ? 1 - oldsurvival : 1;
    var maxHeight = getHeightMaskC(bottleClone.bottle.rotation);
    var ratio = maxHeight / bottleBase.height * 0.9;
    var heightBase = bottleBase.height * 0.9 / 4;
    bottleClone.maskC.removeAllChildren();
    var arr = bottleClone.arrColor;

    var newBasewidth = bottleBase.width * Math.cos(degrees_to_radians(bottleClone.bottle.rotation))
    if (life == 1) {
        const color = convertColor(map[listBottleB[indexBottleClone]][map[listBottleB[indexBottleClone]].lastIndexOf(-1) + 1]);
        var tru = bottleBase.width * Math.sin(degrees_to_radians(bottleClone.bottle.rotation)) * 0.9
        dot.graphics.f(color).dr(0, 0, stage.canvas.width / 80, bottleBase.height + bottleBase.height * 0.94 / 3 - tru);
        var bottle = bottleClone.bottle
        dot.x = bottle.x + newBasewidth * 0.85
        dot.y = bottle.y + tru
        dotC.addChild(dot)
        stage.addChild(dotC)
    }
    if (survival == 0) {
        dotC.removeAllChildren()
        dot = new createjs.Shape();
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
    var phantru = bottleBase.width * Math.sin(degrees_to_radians(corner.r1));
    bottleClone.maskC.x = bottleClone.bottle.x + newBasewidth - bottleBase.height * 1.5
    bottleClone.maskC.y = bottleClone.bottle.y + bottleBase.height * 0.1 * survival + phantru * oldsurvival + 1.5 - bottleBase.height * 0.05 * oldsurvival
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
                        rect.graphics.f(color).dr(0, 0, bottleBase.height * 1.5, maxHeight * 4);
                    }
                    rect.y = nY;
                    maskC.addChild(rect);;
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
                else rect.graphics.f(color).dr(0, 0, bottleBase.height * 1.5, maxHeight * 4);
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
    var oldsurvival = (bottleClone.bottle.rotation - corner.r0) / (corner.r1 - corner.r0);
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
                } else if (i == 2) {
                    rect.graphics.f(color).dr(0, 0, bottleBase.height * 1.5, i == arrColor.length - 1 ? heightBase * arrColor[i].numColor + heightBase * 2 : heightBase * arrColor[i].numColor);
                    rect.y = heightBase * (arrColor[0].numColor + arrColor[1].numColor);
                    maskC.addChild(rect);
                } else {
                    rect.graphics.f(color).dr(0, 0, bottleBase.height * 1.5, i == arrColor.length - 1 ? heightBase * arrColor[i].numColor + heightBase * 2 : heightBase * arrColor[i].numColor);
                    rect.y = maskC.children[maskC.children.length - 1].y + heightBase * arrColor[i - 1].numColor;
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
function checkWin(index) {
    var newChoose = listBottleB[index]
    var ListColor = map[newChoose];
    var passItem = true;
    var color1 = ListColor[0]
    for (let i = 0; i < ListColor.length; i++) {
        const color = ListColor[i];
        if (color != color1) {
            passItem = false
            break;
        }
    }
    listBottle[newChoose].pass = passItem
    if (passItem) boottlePass(index)
    var win = 0
    for (let i = 0; i < listBottle.length; i++) {
        const bottle = listBottle[i];
        if (bottle.pass == true) win++
    }
    if (win == 12) return true
    else return false
}
function boottlePass(index) {
    var newChoose = listBottleB[index]
    var bottles = listBottle[newChoose]
    var bottle = bottles.bottle
    var confetti = new createjs.Sprite(spriteSheet, 'confetti');
    confetti.scale = (stage.canvas.width / 25) / confetti.getBounds().width
    confetti.x = bottle.x - (confetti.getBounds().width * confetti.scale) * 8.5;
    confetti.y = bottle.y + bottleBase.height / 2 - (confetti.getBounds().height * confetti.scale) * 8;
    stage.addChild(confetti);
    confetti.on("animationend", handleComplete);
    function handleComplete() {
        stage.removeChild(this);
        confetti = null;
    }
}
function renderConfetti() {
    var confetti = new createjs.Sprite(spriteSheet, 'confetti');
    confetti.scale = (stage.canvas.width / 35) / confetti.getBounds().width
    var nLoop = Math.round(stage.canvas.height / (confetti.getBounds().height * confetti.scale * 7))
    var nLoop1 = Math.round(stage.canvas.width / (confetti.getBounds().width * confetti.scale * 7))

    for (let i = 0; i < nLoop - 1; i++) {
        var item = confetti.clone()
        item.rotation = 45
        item.x = confetti.getBounds().width * confetti.scale * 3
        item.y = (confetti.getBounds().height * confetti.scale * 7) * (i)
        stage.addChild(item);
        item.on("animationend", handleComplete);
        function handleComplete() {
            stage.removeChild(this);
            item = null;
        }
    }
    for (let i = 0; i < nLoop - 1; i++) {
        var item = confetti.clone()
        item.rotation = -45
        item.x = stage.canvas.width - confetti.getBounds().width * confetti.scale * 17
        item.y = (confetti.getBounds().height * confetti.scale * 7) * (i + 1)
        stage.addChild(item);
        item.on("animationend", handleComplete);
        function handleComplete() {
            stage.removeChild(this);
            item = null;
        }
    }
    for (let i = 0; i < nLoop1 - 1; i++) {
        var item = confetti.clone()
        item.x = (confetti.getBounds().height * confetti.scale * 3) * (i)
        item.y = stage.canvas.height - (confetti.getBounds().height * confetti.scale * 7)
        stage.addChild(item);
        item.on("animationend", handleComplete);
        function handleComplete() {
            stage.removeChild(this);
            item = null;
        }
    }
}
function gameWin() {
    stage.removeChild(install_now);
    var particle = new createjs.Shape();
    particle.graphics.f("#000000").dr(0, 0, stage.canvas.width, stage.canvas.height);
    particle.alpha = 0.4


    var cup = new createjs.Sprite(spriteSheet, "cup");
    cup.scale = (stage.canvas.width / 2) / cup.getBounds().width
    cup.x = (stage.canvas.width - cup.getBounds().width * cup.scale) / 2
    cup.y = stage.canvas.height / 6

    var circle_decor = new createjs.Sprite(spriteSheet, "circle_decor");
    circle_decor.scale = cup.scale
    circle_decor.x = (stage.canvas.width - circle_decor.getBounds().width * circle_decor.scale) / 2
    circle_decor.y = cup.y - cup.getBounds().height * cup.scale / 11

    var decor = new createjs.Sprite(spriteSheet, "decor");
    decor.scale = cup.scale
    decor.x = (stage.canvas.width - decor.getBounds().width * decor.scale) / 2
    decor.y = cup.y - cup.getBounds().height * cup.scale / 3

    var txt_wesome = new createjs.Sprite(spriteSheet, "txt_wesome");
    txt_wesome.scale = cup.scale
    txt_wesome.x = (stage.canvas.width - txt_wesome.getBounds().width * txt_wesome.scale) / 2
    txt_wesome.y = cup.y + cup.getBounds().height * cup.scale * 1.4

    var btn_next = new createjs.Sprite(spriteSheet, "btn_next");
    btn_next.scale = cup.scale
    btn_next.x = (stage.canvas.width - btn_next.getBounds().width * btn_next.scale) / 2
    btn_next.y = txt_wesome.y + cup.getBounds().height * cup.scale * 0.8

    btn_next.addEventListener("click", () => { getLinkInstall() }, false);
    stage.addChild(particle, circle_decor, cup, decor, txt_wesome, btn_next)
}
function gameClose() {

    stage.removeChild(install_now);
    var particle = new createjs.Shape();
    particle.graphics.f("#000000").dr(0, 0, stage.canvas.width, stage.canvas.height);
    particle.alpha = 0.8

    var textE = new createjs.Text('Can you do better?', "22px Impact", "#fbca75");
    textE.scale = (stage.canvas.width / 1.5) / textE.getMeasuredWidth()
    textE.x = (stage.canvas.width - textE.getMeasuredWidth() * textE.scale) / 2
    textE.y = stage.canvas.height / 4

    var textE1 = new createjs.Text('Can you do better?', "22px Impact", "#1f282f");
    textE1.scale = textE.scale
    textE1.x = textE.x
    textE1.y = textE.y + textE.getMeasuredHeight() * textE.scale * 0.1

    var btn_try_again = new createjs.Sprite(spriteSheet, "btn_try_again");
    btn_try_again.scale = (stage.canvas.width / 3.5) / btn_try_again.getBounds().width
    btn_try_again.x = (stage.canvas.width - btn_try_again.getBounds().width * btn_try_again.scale) / 2
    btn_try_again.y = textE.y + btn_try_again.getBounds().height * btn_try_again.scale * 3
    btn_try_again.addEventListener("click", () => { getLinkInstall() }, false);

    stage.addChild(particle, textE1, textE, btn_try_again)
}
var hand_tut
function renderHand() {
    hand_tut = new createjs.Sprite(spriteSheet, "hand_tut");
    hand_tut.scale = (stage.canvas.width / 9) / hand_tut.getBounds().width
    hand_tut.x = stage.canvas.width / 4
    hand_tut.y = stage.canvas.height * 5 / 6
    stage.addChild(hand_tut)
    var bottle = listBottle[10].bottle

    createjs.Tween.get(hand_tut,  { loop: true, bounce: true })
        .to({
            x: bottle.x,
            y: bottle.y + bottleBase.height / 2
        }, 700, createjs.Ease.linear)
        .wait(200)
}
function getLinkInstall() {
    window.open("https://play.google.com/store/apps/details?id=sort.water.puzzle.pour.color.tubes.sorting.game")
}