function bind(width, height)
{
   Init = Module.cwrap('InitHOG', 'void', []);
   Frame = Module.cwrap('DoFrame', 'string', []);
   MouseEvent = Module.cwrap('MouseEvent', 'void', ['number', 'number', 'number', 'number', 'number']);
   KeyEvent = Module.cwrap('HitKey', 'void', ['string']);
   SetCanvas = Module.cwrap('SetCanvasSize', 'void', ['number', 'number']);
   
   Init();
   SetCanvas(Number(width), Number(height));
   setInterval(doFrame, 50);
   installMouseListener();
}

var element_offset_x ; // The distance from the left side of the element to the left of the content area
var element_offset_y ; // The distance from the left side of the element to the left of the content area
var down = false;

function installMouseListener()
{
var element = document.getElementById('picture');
var items = element.childNodes;
var i;
for (i=0;i<items.length;i++){
  items[i].addEventListener('mousemove', mouseDrag);
  items[i].addEventListener('mousedown', mouseDown);
  items[i].addEventListener('mouseup',   mouseUp);
}
element_offset_x = element.getBoundingClientRect().left  -  document.getElementsByTagName("html")[0].getBoundingClientRect().left  ;
element_offset_y = element.getBoundingClientRect().top  -  document.getElementsByTagName("html")[0].getBoundingClientRect().top  ;

}

function doFrame()
{
  Frame();
  //document.getElementById('picture').innerHTML = tmp;
  //installMouseListener();
  var element = document.getElementById('picture');
  element_offset_x = element.getBoundingClientRect().left  -  document.getElementsByTagName("html")[0].getBoundingClientRect().left  ;
  element_offset_y = element.getBoundingClientRect().top  -  document.getElementsByTagName("html")[0].getBoundingClientRect().top  ;
}

function mouseDown(event) {
  down = true;
  x = (event.clientX + window.pageXOffset) - element_offset_x ; 
  y = (event.clientY + window.pageYOffset) - element_offset_y ; 
  MouseEvent(x, y, false, true, false);
}

function mouseUp(event) {
  down = false;
  x = (event.clientX + window.pageXOffset) - element_offset_x ; 
  y = (event.clientY + window.pageYOffset) - element_offset_y ; 
  MouseEvent(x, y, true, false, false);
}

function mouseDrag(event) {
   if (event.which == 1 && down)
   {
      x = (event.clientX + window.pageXOffset) - element_offset_x ; 
      y = (event.clientY + window.pageYOffset) - element_offset_y ; 
      MouseEvent(x, y, false, true, true);
   }
   if (!down)
   {
      x = (event.clientX + window.pageXOffset) - element_offset_x ; 
      y = (event.clientY + window.pageYOffset) - element_offset_y ; 
      MouseEvent(x, y, false, false, true);
   }
}

function loadingMessage()
{
    var canvas = document.getElementById("fg");
    var ctx = canvas.getContext("2d");
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Loading...", canvas.width/2, canvas.height/2);
}
