//var express = require('express');
//var app = express();

//app.set("port", process.env.PORT || 4000)
//    .use(express.static(__dirname + '/SeniorProject'))
//    .use(express.json())
//    .use(express.urlencoded({ extended: true }))
//    //.get("/", getImage)
//    .get("/home", getProducts)
//    .get("/processInformation", processInformation)
//    .set('views', __dirname + '/views')
//    .set('view engine', 'ejs')
//    .listen(app.get("port"), function () {
//        console.log("Now listening on port: ", + app.get("port"));
//    });

function processInformation() {
    var _room = document.getElementById("Room").value;
    var _fabricType = document.getElementById("FabricType").value;
    var _fabricColor = document.getElementById("Color").value;
    var _fabricFabFmg = document.getElementById("FabMgf").value;
    var _fabricCurtainType = document.getElementById("CurtainType").value
    var _fabricLength = document.getElementById("Length").value;
    var _fabricFulness = document.getElementById("Fulness").value;
    var _rodSize = document.getElementById("RodSize").value;
    var _return = document.getElementById("Ret").value; 
    var _rodType = document.getElementById("RodType").value;
    var _comments = document.getElementById("Comments").value;
    var _windowHeight = document.getElementById("WindowHeight").value;

    var widths = calculateWidths(_rodSize, _fabricFulness, _return, _fabricFabFmg);
    var yards = calculateYards(widths, _fabricLength);
    var widthsLab = calculateWidthsLab(_rodSize);
    var fPrice = fabricPrice(_fabricType, yards);
    var rodPrice = determineRodPrice(_rodType);
    var amount = price(yards, fPrice);
    var labor = laborCost(widthsLab);
    var bTax = beforeTax(rodPrice, labor, fPrice);
    var tax = calulateTax(rodPrice, labor, fPrice);
    var aTax = afterTax(tax, bTax);
    var instAmount = (_rodSize / 12) * 10;
    var totalCost = total(instAmount, aTax);

    var result = {
        total: totalCost, room: _room, fabricType: _fabricType, fabricColor: _fabricColor, fabMfg: _fabricFabFmg,
        curtainType: _fabricCurtainType, length: _fabricLength, fullness: _fabricFulness, rodSize: _rodSize, return: _return,
        rodType: _rodType, comments: _comments, widths: widths, yards: yards, rodPrice: rodPrice
    };

    var output = document.getElementById('output');
    output.innerHTML = result.total;

    var room = document.getElementById('R');
    room.innerHTML = result.room;

    var fabricType = document.getElementById('F');
    fabricType.innerHTML = result.fabricType;
}

function calculateWidths(rodSize, fullness, fabricReturn, fabricManfacture) {
    var widths = (((rodSize * fullness) + (fabricReturn * 2)) / fabricManfacture);

    return widths;
}

function calculateYards(widths, fabricLength) {
    var yards = ((parseInt(fabricLength) + 20) * widths) / 36; 

    return Math.ceil(yards);
}

function calculateWidthsLab(rodSize) {
    var widthsLab = (((rodSize / 2) / 19) * 2);

    return Math.ceil(widthsLab);
}

function fabricPrice(fabricType, yards) {
    var price = 0;
    switch (fabricType) {
        case fabricType = "Snowbird":
            price = 28;
            break;
        case fabricType = "Handcart":
            price = 28;
            break;
        case fabricType = "Layton":
            price = 28;
            break;
        case fabricType = "NewFifth":
            price = 28;
            break;
        case fabricType = "Petals":
            price = 23;
            break;    
        case fabricType = "Voil":
            price = 10;
            break;
        case fabricType = "baptiste":
            price = 10;
            break;
        case fabricType = "BO":
            price = 12;
            break;
        case fabricType = "Lining":
            price = 12;
            break;
        case fabricType = "Prestige":
            price = 37;
            break;
        case fabricType = "HandcartWhite":
            price = 28;
            break;
        case fabricType = "ZanzibarWhite":
            price = 37;
            break;
    }

    return price * yards;
}

function determineRodPrice(rodType) {

    var price = 0;

    switch (rodType) {
        case rodType = "Thirty-FourtyEight":
            price = 25;
            break;
        case rodType = "ThirtyEight-SixtySix":
            price = 27;

            break;
        case rodType = "FourtyEight-EightySix":
            price = 31;
            break;
        case rodType = "SixtySix-OneTwenty":
            price = 45;
            break;
        case rodType = "EightySix-OneFifty":
            price = 50;
            break;
        case rodType = "One-OneEighty":
            price = 55;
            break;
        case rodType = "OneTwenty-TwoTwoFour":
            price = 60;
            break;
        case rodType = "OneSixty-ThreeHundred":
            price = 110;
            break;
        case rodType = "RTB":
            price = 15;
            break;
        case rodType = "Tension":
            price = 20;
            break;
    }

    return price;
}

function price(yards, fabricPrice) {
    var price = yards * fabricPrice;

    return price;
}

function laborCost(widthsLabor) {
    var rate = 30;

    var price = widthsLabor * rate;

    return price;
}

function beforeTax(rodPrice, labor, fPrice) {
    var price = rodPrice + labor + fPrice;

    return price;
}

function calulateTax(rodPrice, labor, fPrice) {
    var tax = (rodPrice + labor + fPrice) * .09;

    return Math.ceil(tax);
}

function afterTax(tax, beforeTax) {
    var price = tax + beforeTax;

    return price;
}

function total(install, tax) {
    var total = install + tax;

    return total;
}