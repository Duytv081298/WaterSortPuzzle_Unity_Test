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
var listBottle = []



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
    // for (let i = 0; i < listBottle.length; i++) {
    //     const bottle = listBottle[i].bottle;
    //     const maskF = listBottle[i].maskF;
    //     if (isMobile) {
    //         bottle.addEventListener("mousedown", onMouseDown, supportsPassive ? { passive: true } : false);
    //         maskF.addEventListener("mousedown", onMouseDown, supportsPassive ? { passive: true } : false);
    //         canvas.addEventListener("touchmove", onPressMove, supportsPassive ? { passive: true } : false);
    //         canvas.addEventListener("touchend", onMouseUp, supportsPassive ? { passive: true } : false);
    //         bottle.myParam = i;
    //         maskF.myParam = i;
    //     } else {
    //         bottle.addEventListener("mousedown", onMouseDown);
    //         maskF.addEventListener("mousedown", onMouseDown);
    //         canvas.addEventListener("mousemove", onPressMove);
    //         canvas.addEventListener("mouseup", onMouseUp);
    //         bottle.myParam = i;
    //         maskF.myParam = i;
    //     }
    // }

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
    console.log('width ', width);
    console.log('height ', height);
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

            var maskC = getMaskC(i)
            maskC.y = bottle.y + bottleBase.height * 0.1
            maskC.x = bottle.x + bottleBase.width - stage.canvas.width

            var mask = new createjs.Shape();
            mask.graphics.rc(0, 0, bottleBase.width * 0.82, bottleBase.height * 0.9, 0, 0, 25, 25);
            mask.x = bottle.x + (bottleBase.width - bottleBase.width * 0.82) / 2
            mask.y = bottle.y + bottleBase.height * 0.1


            var maskF = new createjs.Shape();
            maskF.graphics.setStrokeStyle(5).beginStroke("#000000").f("#ffffff").rc(0, 0, bottleBase.width * 0.82, bottleBase.height * 0.9, 0, 0, 25, 25);
            maskF.x = bottle.x + (bottleBase.width - bottleBase.width * 0.82) / 2
            maskF.alpha = 0.01
            maskF.y = 0

            stage.addChild(maskF, maskC);
            maskC.mask = mask;
            stage.addChild(bottle)
            listBottle.push({ bottle: bottle, mask: mask, maskC: maskC, maskF: maskF, status: true })
        } else {
            var iNew = i - 7
            var xb = x + (x + bottleBase.width) * iNew
            var bottle = bottleBase.bottle.clone()
            bottle.y = stage.canvas.height * 5.5 / 10
            bottle.x = xb

            var maskC = getMaskC(i)
            maskC.y = bottle.y + bottleBase.height * 0.1
            maskC.x = bottle.x + bottleBase.width - stage.canvas.width

            var mask = new createjs.Shape();
            mask.graphics.rc(0, 0, bottleBase.width * 0.82, bottleBase.height * 0.9, 0, 0, 25, 25);
            mask.x = bottle.x + (bottleBase.width - bottleBase.width * 0.82) / 2
            mask.y = bottle.y + bottleBase.height * 0.1

            var maskF = mask.clone()
            maskF.y = stage.canvas.height - bottleBase.height * 0.9
            stage.addChild(maskC, maskF);
            maskC.mask = mask;
            stage.addChild(bottle)
            listBottle.push({ bottle: bottle, mask: mask, maskC: maskC, maskF: maskF, status: true })
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
            rect.graphics.f(color).dr(0, (bottleBase.height * 0.9 / 4) * i, stage.canvas.width, bottleBase.height * 0.9 / 4);
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




function handleMouseDown(event) {
    // oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
    // oldMidPt = oldPt;
    isDrawing = true;
    containerBottle[0].maskC.removeAllChildren()
    var rect0 = new createjs.Shape();
    rect0.graphics.f("blue").dr(0, 0, stage.canvas.width, bottleBase.height * 0.9 / 4);
    var rect1 = new createjs.Shape();
    rect1.graphics.f("red").dr(0, bottleBase.height * 0.9 / 4, stage.canvas.width, bottleBase.height * 0.9 / 4);
    var rect2 = new createjs.Shape();
    rect2.graphics.f("yellow").dr(0, (bottleBase.height * 0.9 / 4) * 2, stage.canvas.width, bottleBase.height * 0.9 / 4);
    var rect3 = new createjs.Shape();
    rect3.graphics.f("white").dr(0, (bottleBase.height * 0.9 / 4) * 3, stage.canvas.width, bottleBase.height * 0.9 / 4);

    containerBottle[0].maskC.addChild(rect0, rect1, rect2, rect3);
}
function handleMouseMove(event) {
    if (isDrawing) {
        // star.x = stage.mouseX;
        // star.y = stage.mouseY

        // containerBottle[0].bottle.x = stage.mouseX;
        // containerBottle[0].bottle.y = stage.mouseY;
        // mask.x = stage.mouseX + (bottleBase.width - bottleBase.width * 0.82) / 2
        // mask.y = stage.mouseY + bottleBase.height * 0.1



        // console.log({ x: stage.mouseX, y: stage.mouseY });

        // var midPoint = new createjs.Point(oldPt.x + stage.mouseX >> 1, oldPt.y + stage.mouseY >> 1);

        // mask0
        // 		.moveTo(midPoint.x, midPoint.y)
        // 		.curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);

        // oldPt.x = stage.mouseX;
        // oldPt.y = stage.mouseY;

        // oldMidPt.x = midPoint.x;
        // oldMidPt.y = midPoint.y;
        // mask0.rotation = 45
        // mask0.cache(-stage.mouseX + mask.width / 2, -stage.mouseY + mask.height / 2, stage.canvas.width, stage.canvas.height);
        // mask0.updateCache();



        stage.update();
        // console.log({ x: mask0.x, y: mask0.y });
    }

}
function handleMouseUp(event) {
    isDrawing = false;
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

// createjs.Tween.get(mask, { loop: true, bounce: true })
//     .to({ x: 100, y: 100, scale: 2 }, 2000, createjs.Ease.quadInOut)


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
    checkClick(location)
    // bottleCurr = evt.currentTarget.myParam;
    // console.log(bottleCurr);
    // distanceGTH = getDistance(location, { x: indexHint.realityX, y: indexHint.realityY })
}
function onPressMove(evt) {

}
function onMouseUp(evt) {

}

function currentMouse(evt) {
    return { x: evt.stageX, y: evt.stageY }
}

function checkClick(location) {
    var x = (location.x - bottleBase.remainder) / (bottleBase.remainder + bottleBase.width)
    if (location.y >= stage.canvas.height * 2.5 / 10 && location.y <= stage.canvas.height * 2.5 / 10 + bottleBase.height) console.log({ x: Math.floor(x), y: 1 });
    else if (location.y >= stage.canvas.height * 5.5 / 10 && location.y <= stage.canvas.height * 5.5 / 10 + bottleBase.height) console.log({ x: Math.floor(x) +7, y: 1 });
}