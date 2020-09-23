var stage = new createjs.Stage("canvass");


var con = new createjs.Container();
con.width = 300;
con.height = 300;
con.x = 100;
con.y = 100;

 var shape = new createjs.Shape();
 shape.graphics.beginFill("#ff0000").drawRect(0, 0, 900, 900);
 shape.setBounds(0, 0, 900, 900);
 console.log(con)
 con.addChild(shape);
 stage.addChild(con);

 createjs.Ticker.on("tick", handleTick);

 function handleTick(event) {
     stage.update();
 }