
var canvas = document.getElementById('canvas'),
    width = 800, // px
    height = 600; // px


var menuConfig = {
    canvas: canvas,
    width: width,
    height: height
};

var mainMenu = new Menu(menuConfig),
    optionsMenu = new Menu(menuConfig);

var buttonWidth = 400, // px
    buttonHeight = 50; // px

var newGameButton = new Button({
    x: 200,
    y: 280,
    width: buttonWidth,
    height: buttonHeight,
    text: "New Game"
});
//That's what we'll be looping
var optionsButton = new Button({
    x: 200,
    y: 280 + buttonHeight + 10,
    width: buttonWidth,
    height: buttonHeight,
    text: "Options"
});
var exitButton = new Button({
    x: 200,
    y: 280 + 2 * (buttonHeight + 10),
    width: buttonWidth,
    height: buttonHeight,
    text: "Exit"
});

newGameButton.clickHandler(function () {
    alert("Your code should go here, not mine :)");
});
exitButton.clickHandler(function () {
    alert("Exit where? It's a freakin' web page!");
});
optionsButton.clickHandler(optionsMenu);

var infoButton = new Button({
    x: 200,
    y: 280,
    width: buttonWidth,
    height: buttonHeight,
    text: "Information"
});
var mainMenuButton = new Button({
    x: 200,
    y: 280 + 2 * (buttonHeight + 10),
    width: buttonWidth,
    height: buttonHeight,
    text: "<- Back"
});

infoButton.clickHandler(function () {
    alert("Right now I only serve simple buttons. So... Options are not as spectacular as I would want them to" +
        " be...\n" +
        "But! And it's a big but! I will be adding a couple of new button types, which should be good for:\n\n" +
        " - boolean configuration\n" +
        " - radio button/multiple choice button\n" +
        " - text field maybe?");
});
mainMenuButton.clickHandler(mainMenu);

mainMenu.appendButton(newGameButton);
mainMenu.appendButton(optionsButton);
mainMenu.appendButton(exitButton);

optionsMenu.appendButton(infoButton);
optionsMenu.appendButton(mainMenuButton);

mainMenu.init();