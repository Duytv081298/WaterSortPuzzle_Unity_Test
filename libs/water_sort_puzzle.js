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

// var map = [
//     [7, 7, 7, 5],
//     [-1, 6, 6, 6],
//     [-1, 9, 9, 9],
//     [-1, 10, 11, 0],
//     [11, 11, 10, 11,],
//     [-1, -1, 4, 8],
//     [0, 0, 6, 9],
//     [-1, 8, 8, 8],
//     [-1, 1, 1, 1],
//     [0, 5, 10, 1],
//     [-1, 4, 4, 10],
//     [5, 5, 7, 4],
//     [3, 3, 3, 3],
//     [2, 2, 2, 2]
// ]

var map = [
    [7, 7, 7, 5],
    [-1, 6, 6, 6],
    [-1, 9, 9, 9],
    [-1, 10, 11, 0],
    [11, 11, 11, 11,],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, 1, 1, 1],
    [0, 5, 10, 1],
    [-1, 4, 4, 10],
    [5, 5, 7, 4],
    [3, 3, 3, 3],
    [2, 2, 2, 2]
]
var listBottle = []
var listBottleChoose = []



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
            bottle.shadow = new createjs.Shadow('#000', 0, 5, 15);

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
            bottle.shadow = new createjs.Shadow('#000', 0, 0, 10);

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
            rect.graphics.f(color).dr(0, (bottleBase.height * 0.9 / 4) * i, bottleBase.height * 1.5, i == arr.length - 1 ? (bottleBase.height * 0.9 / 4) * 3 : bottleBase.height * 0.9 / 4);
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
    var newChoose = checkClick(location)
    if (newChoose) {
        if (listBottleChoose.indexOf(newChoose) < 0) {
            if (listBottleChoose.length % 2 == 0) {
                if (map[newChoose].lastIndexOf(-1) != 3) upBottleChoose(newChoose, listBottleChoose.length + 1)
            } else {
                var oldChoose = listBottleChoose[listBottleChoose.length - 1]
                var colorCv = map[oldChoose][map[oldChoose].lastIndexOf(-1) + 1]
                var arrColor = getNumCv(colorCv, map[oldChoose], map[oldChoose].lastIndexOf(-1) + 1)
                var newEmtyChoose = map[newChoose].lastIndexOf(-1) + 1
                if (newEmtyChoose == 4) startMoveBottle(newChoose, listBottleChoose.length, arrColor)
                else if (arrColor.length <= newEmtyChoose && colorCv == map[newChoose][newEmtyChoose]) {
                    startMoveBottle(newChoose, listBottleChoose.length, arrColor)
                } else downBottleChoose(oldChoose)
            }
        } else downBottleChoose(newChoose)
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

var pass
function renderNewMaskC(newChoose, oldChoose, arrIndexAdd) {
    var arrMaskC = map[newChoose]
    var survival = listBottle[oldChoose].bottle.rotation / rt;
    var maxHeight = bottleBase.height * 0.9 / 4
    listBottle[newChoose].maskC.removeAllChildren()
    var arrAdd = arrIndexAdd.slice(pass - 1)
    var divisor = arrIndexAdd.length
    for (let i = 3; i >= 0; i--) {
        if (arrMaskC[i] >= 0 && arrAdd.indexOf(i) >= 0) {
            if (survival > (1 / divisor) * (pass - 1) && survival <= (1 / divisor) * pass && i == arrAdd[0]) {
                const color = convertColor(arrMaskC[i]);
                var rect = new createjs.Shape();
                var hNew = i == arrMaskC.length - 1 ? maxHeight * survival * 3 : maxHeight * survival
                var yNew = i == arrMaskC.length - 1 ? maxHeight * 3 + maxHeight * i - hNew : maxHeight * (i + 1) - hNew
                rect.graphics.f(color).dr(0, yNew, bottleBase.height * 1.5, hNew);
                listBottle[newChoose].maskC.addChild(rect);
                if (survival >= (1 / divisor) * pass - 0.05) {
                    pass++
                    arrAdd.shift()
                    break;
                }
            }
        } else if (arrMaskC[i] >= 0) {
            const color = convertColor(arrMaskC[i]);
            var rect = new createjs.Shape();
            rect.graphics.f(color).dr(0, maxHeight * i, bottleBase.height * 1.5, i == arrMaskC.length - 1 ? maxHeight * 3 : maxHeight);
            listBottle[newChoose].maskC.addChild(rect);
        }
    }
    if (survival == 1) {
        listBottleChoose.splice(listBottleChoose.indexOf(newChoose), 1);
        listBottleChoose.splice(listBottleChoose.indexOf(oldChoose), 1);
    }
}
// function reRenderMaskC(maxHeight, oldChoose, indexRemove) {
//     var oldsurvival = listBottle[oldChoose].bottle.rotation / rt;
//     var survival = 1 - oldsurvival;
//     console.log(survival);
//     console.log(pass);
//     var ratio = maxHeight / bottleBase.height * 0.9
//     var oldItemHeight = bottleBase.height * 0.9 / 4
//     listBottle[oldChoose].maskC.removeAllChildren()
//     var arrRemove = indexRemove.slice(pass - 1)
//     var divisor = indexRemove.length
//     console.log(arrRemove);
//     var arr = map[oldChoose]
//     var phantru = bottleBase.width * Math.sin(degrees_to_radians(rt))
//     var rendIndex = 0
//     if (survival == 0) {
//         for (let i = 0; i < arr.length; i++) {
//             if (arr[i] >= 0) {
//                 arr[i] = -1
//                 break;
//             }
//         }
//         for (let i = 0; i < arr.length; i++) {
//             if (arr[i] >= 0) {
//                 const color = convertColor(arr[i]);
//                 var rect = new createjs.Shape();
//                 rect.graphics.f(color).dr(0, oldItemHeight * rendIndex * ratio, bottleBase.height * 1.5, i == arr.length - 1 ? oldItemHeight * 3 : oldItemHeight * ratio);
//                 listBottle[oldChoose].maskC.addChild(rect);
//                 rendIndex++
//             }
//         }
//     } else {
//         for (let i = 0; i < arr.length; i++) {
//                 console.log(divisor - pass);
//             if (arr[i] >= 0 && arrRemove.indexOf(i) >= 0) {
//                 if (survival >= (1 / divisor) * (divisor - pass) && i == arrRemove[0]) {
//                     console.log(88888888888);
//                     // const color = convertColor(arr[i]);
//                     // var rect = new createjs.Shape();
//                     // rect.graphics.f(color).dr(0, oldItemHeight * i * ratio, bottleBase.height * 1.5, oldItemHeight * ratio * survival);
//                     // listBottle[oldChoose].maskC.addChild(rect);
//                 }
//             } else if (arr[i] >= 0) {
//                 const color = convertColor(arr[i]);
//                 var rect = new createjs.Shape();
//                 rect.graphics.f(color).dr(0, oldItemHeight * (i - 1) * ratio + (oldItemHeight * ratio * survival), bottleBase.height * 1.5, i == arr.length - 1 ? oldItemHeight * 3 : oldItemHeight * ratio);
//                 listBottle[oldChoose].maskC.addChild(rect);
//             }
//         }
//     }
//     listBottle[oldChoose].maskC.y = listBottle[oldChoose].bottle.y + bottleBase.height * 0.1 * survival + phantru * oldsurvival
//     var newRO = 90 - listBottle[oldChoose].bottle.rotation
//     listBottle[oldChoose].mask.rotation = listBottle[oldChoose].bottle.rotation
//     if (newRO < 90) {
//         listBottle[oldChoose].mask.x = listBottle[oldChoose].bottle.x + bottleBase.width / 15
//         listBottle[oldChoose].mask.y = listBottle[oldChoose].bottle.y
//     }
// }
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

var rt = 50
function upBottleChoose(newChoose) {
    listBottleChoose.push(newChoose)
    listBottle[newChoose].mask.y = listBottle[newChoose].mask.y - bottleBase.height * 0.9 / 2
    listBottle[newChoose].maskC.y = listBottle[newChoose].maskC.y - bottleBase.height * 0.9 / 2
    listBottle[newChoose].bottle.y = listBottle[newChoose].bottle.y - bottleBase.height * 0.9 / 2
}
function downBottleChoose(newChoose) {
    listBottle[newChoose].mask.y = listBottle[newChoose].mask.y + bottleBase.height * 0.9 / 2
    listBottle[newChoose].maskC.y = listBottle[newChoose].maskC.y + bottleBase.height * 0.9 / 2
    listBottle[newChoose].bottle.y = listBottle[newChoose].bottle.y + bottleBase.height * 0.9 / 2
    listBottleChoose.splice(listBottleChoose.indexOf(newChoose), 1);
}
function startMoveBottle(newChoose, index, arrColor) {
    pass = 1
    listBottleChoose.push(newChoose)

    var oldChoose = listBottleChoose[index - 1]
    var newBottle = listBottle[newChoose].bottle

    var colorAdd = map[oldChoose][map[oldChoose].lastIndexOf(-1) + 1]

    var indexAdd = map[newChoose].lastIndexOf(-1)
    var arrIndexAdd = []
    console.log(arrColor);
    for (let i = arrColor.length; i > 0; i--) {
        arrIndexAdd.push(indexAdd)
        map[newChoose][indexAdd] = colorAdd
        indexAdd--
    }
    createjs.Tween.get(listBottle[oldChoose].bottle)
        .to({ rotation: rt, x: newBottle.x, y: newBottle.y - bottleBase.height * 0.9 / 2 }, 1000 + (arrIndexAdd.length - 1) * 500, createjs.Ease.quadInOut)
        .call(() => {
            listBottle[oldChoose].bottle.rotation = rt
            endMoveBottle(oldChoose)
        })
        .addEventListener("change", handleChange);


    function handleChange(event) {
        var newBasewidth = bottleBase.width * Math.cos(degrees_to_radians(listBottle[oldChoose].bottle.rotation))
        listBottle[oldChoose].maskC.x = listBottle[oldChoose].bottle.x + newBasewidth * 1.3 - bottleBase.height * 1.5
        var maxHeight = getHeightMaskC(listBottle[oldChoose].bottle.rotation);
        reRenderMaskC(maxHeight, oldChoose, arrColor)
        renderNewMaskC(newChoose, oldChoose, arrIndexAdd)
    }
}
function endMoveBottle(index) {
    var newX = index <= 6 ? bottleBase.remainder + (bottleBase.remainder + bottleBase.width) * index : bottleBase.remainder + (bottleBase.remainder + bottleBase.width) * (index - 7)
    createjs.Tween.get(listBottle[index].bottle)
        .to({
            rotation: 0,
            x: newX,
            y: index <= 6 ? stage.canvas.height * 2.5 / 10 : stage.canvas.height * 5.5 / 10
        }, 1000, createjs.Ease.quadInOut)
        .call(() => {
            listBottle[index].bottle.rotation = 0
        })
        .addEventListener("change", handleChange);

    function handleChange(event) {
        var newBasewidth = bottleBase.width * Math.cos(degrees_to_radians(listBottle[index].bottle.rotation))
        listBottle[index].maskC.x = listBottle[index].bottle.x + newBasewidth * 1.3 - bottleBase.height * 1.5
        var maxHeight = getHeightMaskC(listBottle[index].bottle.rotation);
        reRenderMaskC(maxHeight, index)
    }
}
function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}





function reRenderMaskC(maxHeight, newChoose) {
    var oldsurvival = listBottle[newChoose].bottle.rotation / rt;
    var survival = 1 - oldsurvival;
    console.log(survival);
    console.log(pass);
    var ratio = maxHeight / bottleBase.height * 0.9
    var oldItemHeight = bottleBase.height * 0.9 / 4
    listBottle[newChoose].maskC.removeAllChildren()
    var arr = map[newChoose]
    var phantru = bottleBase.width * Math.sin(degrees_to_radians(rt))
    var rendIndex = 0
    if (survival == 0) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] >= 0) {
                arr[i] = -1
                break;
            }
        }
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] >= 0) {
                const color = convertColor(arr[i]);
                var rect = new createjs.Shape();
                rect.graphics.f(color).dr(0, oldItemHeight * rendIndex * ratio, bottleBase.height * 1.5, i == arr.length - 1 ? oldItemHeight * 3 : oldItemHeight * ratio);
                listBottle[newChoose].maskC.addChild(rect);
                rendIndex++
            }
        }
    } else {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] >= 0 && i == 0) {
                const color = convertColor(arr[i]);
                var rect = new createjs.Shape();
                rect.graphics.f(color).dr(0, oldItemHeight * i * ratio, bottleBase.height * 1.5, oldItemHeight * ratio * survival);
                listBottle[newChoose].maskC.addChild(rect);
            } else if (arr[i] >= 0) {
                const color = convertColor(arr[i]);
                var rect = new createjs.Shape();
                rect.graphics.f(color).dr(0, oldItemHeight * (i - 1) * ratio + (oldItemHeight * ratio * survival), bottleBase.height * 1.5, i == arr.length - 1 ? oldItemHeight * 3 : oldItemHeight * ratio);
                listBottle[newChoose].maskC.addChild(rect);
            }
        }
    }
    listBottle[newChoose].maskC.y = listBottle[newChoose].bottle.y + bottleBase.height * 0.1 * survival + phantru * oldsurvival
    var newRO = 90 - listBottle[newChoose].bottle.rotation
    listBottle[newChoose].mask.rotation = listBottle[newChoose].bottle.rotation
    if (newRO < 90) {
        listBottle[newChoose].mask.x = listBottle[newChoose].bottle.x + bottleBase.width / 15
        listBottle[newChoose].mask.y = listBottle[newChoose].bottle.y
    }
}