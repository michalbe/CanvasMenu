
var canvas = document.getElementById('canvas'),
    width = 800, // px
    height = 600; // px


var menuConfig = {
    canvas: canvas,
    width: width,
    height: height,
    animation: function () {}
};

var mainMenu = new Menu(menuConfig);

var buttonWidth = 400, // px
    buttonHeight = 50; // px


/**
 * It will be a module :)
 *
 * @returns {redraw}
 * @constructor
 */
var RedrawInactiveButton = function () {
    //I want to devide the button field into 5px squares, so I need to know how many squares would fit horizontally
    // and vertically:
    var width = buttonWidth / 5,
        height = buttonHeight / 5;

    /**
     * Function used for drawing little canvas squares
     *
     * (it will be better if we draw those 5x5 squares during initiation, not during rendering phase)
     *
     * @param color
     * @returns {Element}
     */
    function drawSmallRect(color) {
        var canvas = document.createElement('canvas');
        canvas.width = 5;
        canvas.height = 5;
        var context = canvas.getContext('2d');

        context.fillStyle = color;
        context.fillRect(0, 0, this.width, this.height);

        return canvas;
    }

    //Array to store yellowish-dark colors
    var darkRect = [
        drawSmallRect('#939900'),
        drawSmallRect('#939900'),
        drawSmallRect('#939900'),
        drawSmallRect('#939900'),
        drawSmallRect('#c4cc00'),
        drawSmallRect('#474d00'),
        drawSmallRect('#2f3300'),
        drawSmallRect('#181a00'),
        drawSmallRect('#181a00'),
        drawSmallRect('#181a00'),
        drawSmallRect('#768000'),
        drawSmallRect('#FFCC33'),
        drawSmallRect('#FFCC66'),
        drawSmallRect('#FFCC99'),
        drawSmallRect('#000000'),
        drawSmallRect('#000000'),
        drawSmallRect('#000000'),
        drawSmallRect('#000000')
    ];

    //Array to store yellowish-light colors
    var rect = [
        drawSmallRect('#FFFF00'),
        drawSmallRect('#FFFF33'),
        drawSmallRect('#FFFF66'),
        drawSmallRect('#FFFF99'),
        drawSmallRect('#FFFFCC'),
        drawSmallRect('#FFCC00'),
        drawSmallRect('#FFCC33'),
        drawSmallRect('#FFCC66'),
        drawSmallRect('#FFCC99'),
        drawSmallRect('#FFCCCC')

    ];

    //Array of all squares which would fit into the button
    var squares = Array(width * height);

    /**
     * Function which is re-picking square colors from rect and darkRect
     */
    function pickNew() {
        var i;
        for(i = 0; i < width * height; i += 1) {
            if (i < width * 2) { //Let's pick darker set of colors for border squares
                squares[i] = darkRect[Math.floor(Math.random() * darkRect.length)]
            } else if (i > width * (height - 2)) { //Let's pick darker set of colors for border squares
                squares[i] = darkRect[Math.floor(Math.random() * darkRect.length)]
            } else if (i % width < 2) { //Let's pick darker set of colors for border squares
                squares[i] = darkRect[Math.floor(Math.random() * darkRect.length)]
            } else if (i % width > width - 3) { //Let's pick darker set of colors for border squares
                squares[i] = darkRect[Math.floor(Math.random() * darkRect.length)]
            } else { //If it's not in the border, re-pick color from the lighter set of rectangles
                squares[i] = rect[Math.floor(Math.random() * rect.length)]
            }

        }
    }
    pickNew();

    /**
     * This function will be responsible directly for rendering the button
     * @param ctx
     */
    function redraw(ctx) {
        var i;
        if (this.tick % 10 === 0) { //Every 10 ticks (so... every 10 * 16ms = 160 ms)
            pickNew(); //Let's pick new squares to draw
        }

        for(i = 0; i < width * height; i += 1) { //We also need to redraw the squares which were already drawn
            //Unfortunately, you have to do that, because i call ctx.clearRect before I call on this function :/...
            // So...
            ctx.drawImage(squares[i], i % width * 5, Math.floor(i / width) * 5);
        }
    }

    //And lets return only the redraw function
    return redraw;
};

var RedrawFocusedButton = function () {
    var width = buttonWidth / 5,
        height = buttonHeight / 5;

    function drawSmallRect(color) {
        var canvas = document.createElement('canvas');
        canvas.width = 5;
        canvas.height = 5;
        var context = canvas.getContext('2d');

        context.fillStyle = color;
        context.fillRect(0, 0, this.width, this.height);

        return canvas;
    }

    var darkRect = [
        drawSmallRect('#000000'),
        drawSmallRect('#1a000d'),
        drawSmallRect('#33001a'),
        drawSmallRect('#1a000d'),
        drawSmallRect('#33001a'),
        drawSmallRect('#4d0026'),
        drawSmallRect('#800040')
    ];

    var rect = [
        drawSmallRect('#ff1a8c'),
        drawSmallRect('#ff0080'),
        drawSmallRect('#e60073'),
        drawSmallRect('#cc0066'),
        drawSmallRect('#b30059'),
        drawSmallRect('#99004d'),
        drawSmallRect('#800040'),
        drawSmallRect('#660033'),
        drawSmallRect('#4d0026')

    ];

    var squares = Array(width * height);


    function pickNew() {
        var i;
        for(i = width; i < width * (height - 1) + 1; i += 1) {
            if (i < width * 2) {
                squares[i] = darkRect[Math.floor(Math.random() * darkRect.length)];
                squares[i - width] = squares[i];
            } else if (i > width * (height - 2)) {
                squares[i] = darkRect[Math.floor(Math.random() * darkRect.length)];
                squares[i + width] = squares[i];
            } else if (i % width < 2) {
                squares[i] = rect[Math.floor(Math.random() * rect.length)]
            } else if (i % width > width - 2) {
                squares[i] = rect[Math.floor(Math.random() * rect.length)]
            } else {
                squares[i] = rect[Math.floor(Math.random() * rect.length)]
            }

        }
    }
    pickNew();

    function redraw(ctx) {
        var i;
        if (this.tick % 7 === 0) {
            pickNew();
        }

        for(i = 0; i < width * height; i += 1) {
            ctx.drawImage(squares[i], i % width * 5, Math.floor(i / width) * 5);
        }
    }

    return redraw;
};


var newGameButton = new Button({
    x: 200,
    y: 280,
    width: buttonWidth,
    height: buttonHeight,
    text: "New Game",
    redrawInactive: new RedrawInactiveButton(),
    redrawFocused: new RedrawFocusedButton(),
    redrawDownColor: '#FF0033',
    redrawUpColor: '#330033',
    redrawInactiveFont: '#111111',
    redrawDownFont: '#111111',
    font: (buttonHeight * 2 / 5 ) + 'pt Courier' //I want it smaller
});
var optionsButton = new Button({
    x: 200,
    y: 280 + buttonHeight + 10,
    width: buttonWidth,
    height: buttonHeight,
    text: "Options",
    redrawInactive: new RedrawInactiveButton(),
    redrawFocused: new RedrawFocusedButton(),
    redrawDownColor: '#FF0033',
    redrawUpColor: '#330033',
    redrawInactiveFont: '#111111',
    redrawDownFont: '#111111',
    font: (buttonHeight * 2 / 5 ) + 'pt Courier'
});
var exitButton = new Button({
    x: 200,
    y: 280 + 2 * (buttonHeight + 10),
    width: buttonWidth,
    height: buttonHeight,
    text: "Exit",
    redrawInactive: new RedrawInactiveButton(),
    redrawFocused: new RedrawFocusedButton(),
    redrawDownColor: '#FF0033',
    redrawUpColor: '#330033',
    redrawInactiveFont: '#111111',
    redrawDownFont: '#111111',
    font: (buttonHeight * 2 / 5 ) + 'pt Courier'
});

newGameButton.clickHandler(function () {
    alert("Your code should go here, not mine :)");
});
optionsButton.clickHandler(function () {
    alert("Let's not make it more complicated then it should be :)...");
});
exitButton.clickHandler(function () {
    alert("Exit where? It's a freakin' web page!");
});


mainMenu.appendButton(newGameButton);
mainMenu.appendButton(optionsButton);
mainMenu.appendButton(exitButton);


mainMenu.init();