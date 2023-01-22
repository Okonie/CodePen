var container=document.getElementById("can");
 var context = container.getContext('2d'); 
var x1=0;
var y1=0;// получаем конткест
var g=0.01;
var dt1=0.001;
var m=0.01;
var victory=false;
var check=false;
var Names = [];
var NewTr;
var count;
Names[1]="Прямая";
Names[2]="Парабола";
Names[3]="Окружность";
Names[4]="Гипербола";
Names[5]="Брахистохрона";
//var flag=true;
//var k=0.5;
var Points = [];
var Parametrs = [];
var Bra = [];
// Add some data
for (var i = 1; i <= 5; i++) {
    Points[i] = new Object( {  X: 0,
  Y: 0,
  Vx: 0,
  Vy: 0,                           
  dt: 0,
  flag: true,
  blue: Math.floor(Math.random()*255),
  red: Math.floor(Math.random()*255),
  green: Math.floor(Math.random()*255),  
  victory: false,
  time: 0,
   er: false,                          
  a: Math.atan(2)} );
}
function restart(flag) {
  for (var key1 in Points) {
   Points[key1].X=0;
     Points[key1].Y=0;
     Points[key1].Vx=0;
     Points[key1].dt=0;
     Points[key1].Vy=0;
     Points[key1].flag=true;
     Points[key1].time=0;
     Points[key1].er=false;
     Points[key1].a=Math.atan(2);
      Points[key1].victory=false;
    
}
  context.fillStyle = '#ffffff'; // устанавливаем цвет заливки в черный
  context.fillRect(0, 0, container.width, container.height);
  if (flag) {
    if (isAN(document.getElementById('x1').value))
   x1=Number(document.getElementById('x1').value);
   if (isAN(document.getElementById('y1').value))
   y1=Number(document.getElementById('y1').value);
  if (x1===0) x1=900;
  if (y1===0) y1=100;
  }
   context.fillStyle = '#000000';
  context.beginPath();
    context.arc(x1, y1, 5, 0, Math.PI * 2, true); 
 context.stroke();
  Parametrs[1]=Number(document.getElementById("in1").value);
  Parametrs[2]=Number(document.getElementById("in2").value);
  Parametrs[3]=Number(document.getElementById("in3").value);
 Parametrs[4]=findC(x1,y1);
 Parametrs[5]=Number(document.getElementById("in4").value);
  check=false;
  Bra=[];
  count=0;
  fillBra(Parametrs[4]);
  victory=false;
  document.getElementById('vic').value="";
  newTr = document.createElement('tr');
 var newTd1 = document.createElement('td');    newTd1.appendChild(document.createTextNode(Parametrs[5]));
        newTr.appendChild(newTd1);
    for(var i=1; i<container.width/50; i++) {
       // table.deleteRow(i);
    var h=container.height; 
  context.moveTo(50*i,h);
context.lineTo(50*i,h-10);
context.stroke();
   context.font = "15px Times New Roman";
context.fillStyle = "red";
    context.textAlign = "center";
context.strokeText(i*50,50*i,h-10);
      }
   for(var i=1; i<container.height/50; i++) {
       // table.deleteRow(i);
  context.moveTo(0,i*50);
context.lineTo(10,i*50);
context.stroke();
   context.font = "15px Times New Roman";
context.fillStyle = "red";
    context.textAlign = "left";
context.strokeText(i*50,1,50*i-5);
      }
  for (var key1 in Points) {
    if (!( document.getElementById("td"+key1)=== null))
  document.getElementById("td"+key1).style.backgroundColor="rgb("+Points[key1].red+","+Points[key1].green+","+Points[key1].blue+")";
   }
}

  
  
window.onload = function() {
document.getElementById("t1").value=document.getElementById("in1").value;
document.getElementById("t2").value=document.getElementById("in2").value;
document.getElementById("t3").value=document.getElementById("in3").value;
document.getElementById("t4").value=document.getElementById("in4").value; 
 restart(true);

 //var t= parab1(100, 10, 1);
  setInterval(function() {
if (!Points[1].er) moveLine(Points[1], x1, y1);
if (!Points[2].er) movePara(Points[2], Parametrs[1], x1, y1);
  if (!Points[3].er)  moveCirc(Points[3], Parametrs[2], x1, y1);
if (!Points[4].er) moveGip1(Points[4], Parametrs[3], x1, y1);
    //moveSin(Points[6], 120, 1,  x1, y1);
   //  moveBra1(Points[4], 1, x1, y1);
if (!Points[5].er) moveBra(Points[5], Parametrs[4]);
    
    context.fillStyle = '#ffffff'; // устанавливаем цвет заливки в черный
  //context.fillRect(0, 0, container.width, container.height);
   // context.fillStyle = '#000000'; // устанавливаем цвет 
     /* document.getElementById('t1').value=Points[5].X;
    document.getElementById('t2').value=Points[5].Y;
    document.getElementById('t3').value=Points[5].a;
     document.getElementById('t4').value=Points[5].Vx;
     document.getElementById('vy').value=Points[5].Vy;
     document.getElementById('flag').value=Points[5].flag;
   */
    for (var key in Points) {
if (Points[key].X>x1 && !Points[key].victory) {
 Points[key].time=Points[key].dt;
  Points[key].victory=true;
  count++;
}
      if (Points[key].dt>2 && !Points[key].victory) {
         Points[key].time=Points[key].dt;
  Points[key].victory=true;
  count++;
      }
      if (Points[key].Vx<0) {
        Points[key].er=true;
        if (!Points[key].victory) {
           Points[key].time=2;
  Points[key].victory=true;
          count++;
        }
      }
      if (Points[key].X>x1 && !victory) {
        document.getElementById('vic').value=Names[key];
                    victory=true;
      }
    if (count==Points.length-1) {
    //  alert("al");
      count++;
      for (var key2 in Points) {
        var newTd1 = document.createElement('td');
        newTd1.appendChild(document.createTextNode(Points[key2].time.toFixed(3)));
        newTr.appendChild(newTd1);
      }
       tab.appendChild(newTr);
    }
      fillP(Points[key]);
    }
   
    
    
  }, 10);
};
function fillP(t) {
  var r=t.red;
  var g=t.green;
  var b=t.blue;
    context.fillStyle = "rgb("+r+","+g+","+b+")";
    context.fillRect(t.X, t.Y, 3, 3); 
}
function GeneralMoveX(t, Y, X, Vx) {
    var a=0;
  if ((X-t.X)!==0) {
 a=Math.atan((Y-t.Y)/(X-t.X));
     t.a=a;
  }
    t.Vx=Vx;
    t.X=X;
  t.Y=Y; 
   t.dt += dt1;
}
function moveLine(t, x, y) {
   var Vx=t.Vx+t.dt*((g*Math.sin(2*t.a)/2)- Parametrs[5]*g*Math.pow(Math.cos(t.a),2));
   var  X=t.X+t.dt*t.Vx;
  var k=lin(x,y);
  document.getElementById("t6").value=k.toFixed(2);
  var   Y=k*X;
  GeneralMoveX(t, Y, X, Vx);
  }
function CircGetx1(b, x, y) {
  return (x*x+y*y-2*b*y)/(2*x);
}
function moveCirc(t, b, x, y) {
  var Vx=t.Vx+t.dt*((g*Math.sin(2*t.a)/2)- Parametrs[5]*g*Math.pow(Math.cos(t.a),2));
   var  X=t.X+t.dt*t.Vx;
  var a1=CircGetx1(b, x, y);
  var R2=a1*a1+b*b;
    document.getElementById("t21").value=a1.toFixed(2);
    document.getElementById("t22").value=Math.pow(R2,0.5).toFixed();
  var   Y=Math.pow(R2-Math.pow(X-a1,2),0.5)+b;
 GeneralMoveX(t, Y, X, Vx);
}
function GeneralMoveY(t, Y, X, Vy) {
  var a=0;
  if ((X-t.X)!==0) {
 a=Math.atan((Y-t.Y)/(X-t.X));
     t.a=a;
  }
    t.Vy=Vy;
    t.X=X;
  t.Y=Y; 
   t.dt += dt1;
  
}
function moveGip1(t, c, x, y) {
  if (t.a>0.7853982 && t.flag) {
   //  if (!t.flag) { t.Vy=t.Vx;
      //   t.flag=true; }
     var Vy=t.Vy+t.dt*(g*Math.pow(Math.sin(t.a),2)- Parametrs[5]*g*Math.sin(2*t.a)/2);
   var  Y=t.Y+t.dt*t.Vy;
  var a1=y*(x-c)/x;
  var b=a1*c;
     document.getElementById("t31").value=a1.toFixed();
     document.getElementById("t32").value=b.toFixed();
  var   X=c+b/(Y-a1);
  GeneralMoveY(t, Y, X, Vy);
  }
  else {
  if (t.flag) { t.Vx=t.Vy;
         t.flag=false; }
    var Vx=t.Vx+t.dt*((g*Math.sin(2*t.a)/2)- Parametrs[5]*g*Math.pow(Math.cos(t.a),2));
   var X1=t.X+t.dt*t.Vx;
    var a2=y*(x-c)/x;
  var b1=a2*c;
    document.getElementById("t31").value=a2.toFixed();
     document.getElementById("t32").value=b1.toFixed();
  var   Y1=a2+b1/(X1-c);
GeneralMoveX(t, Y1, X1, Vx);
  }
}
function movePara(t, A, x, y) { 
    var Vx=t.Vx+t.dt*((g*Math.sin(2*t.a)/2)- Parametrs[5]*g*Math.pow(Math.cos(t.a),2));
   var  X=t.X+t.dt*t.Vx;
  var b=parab1(x, y, A);
  document.getElementById("t11").value=b.toFixed(2);
  var   Y=A*Math.pow(X,2)+b*X;
 GeneralMoveX(t, Y, X, Vx);
}
function parab1(x1, y1, a1) {
 // var t1=a1*x1*x1;
  var t2=((y1-(a1*x1*x1))/x1);
  return t2;
}
function lin(x,y) {
  return y/x; }
function moveSin(t, A, m, x, y) { 
    var Vx=t.Vx+t.dt*(g*Math.sin(2*t.a)/2);
   var  X=t.X+t.dt*t.Vx;
  var k=(Math.asin(y/A)+2*3.1415926*m)/x;
 // if (A<0) A*=-1;
  var Y=A*Math.sin(X*k);
 GeneralMoveX(t, Y, X, Vx);
}

function moveBra(t, c) {
    if (t.a>0.7853982) {
       var Vy=t.Vy+t.dt*(g*Math.pow(Math.sin(t.a),2)- Parametrs[5]*g*Math.sin(2*t.a)/2);
   var  Y=t.Y+t.dt*t.Vy;
  var p=Math.acos(1-Y/c);
  var   X=c*(p-Math.sin(p));
  GeneralMoveY(t, Y, X, Vy);
  }
  else if  (t.a<-0.7853982 || check) {
    if (!t.flag) { t.Vy=-t.Vx;
        t.flag=true; }
    check=true;
    var Vy1=t.Vy+t.dt*(g*Math.pow(Math.sin(t.a),2)- Parametrs[5]*g*Math.sin(2*t.a)/2);
  var   Y1=t.Y+t.dt*t.Vy;
      var   X2=-c*Math.acos((c-Y1)/c)+Math.pow(2*c*Y1-Y1*Y1,0.5)+2*3.1415926*c;
  GeneralMoveY(t, Y1, X2, Vy1);
  }
  else {
    if (t.flag) { t.Vx=t.Vy;
        t.flag=false; }
    var Vx=t.Vx+t.dt*((g*Math.sin(2*t.a)/2)- Parametrs[5]*g*Math.pow(Math.cos(t.a),2));
   var X1=t.X+t.dt*t.Vx;
  var   Y2=minDif(Bra, X1);
    if (X1<2*3.1415926*Parametrs[4])
GeneralMoveX(t, Y2, X1, Vx);
  }
  }
function moveBra1(t, c, x, y) {
  t.X=c*(t.dt-Math.sin(t.dt));
  t.Y=c*(1-Math.cos(t.dt));
   t.dt += dt1;
}
function minDif(mas, el) {
  var min=Math.abs(el);
  var res=mas[0];
  for (var key in mas) {
    if (Math.abs(key-el)<min) {
      min=Math.abs(key-el);
      res=mas[key];
  }
  }
  return res;
}
function fillBra(c) {
 
  for (var t=0; t<6.3; t+=0.005) {
    var x=c*(t-Math.sin(t));
    var y=c*(1-Math.cos(t));
    Bra[x]=y;
}
}
function findC(x, y) {
  var p=x/y;
    var f0=-1;
    var res;
    for (var t=0; t<100; t+=0.001) {
       var f=(t-Math.sin(t))/(1-Math.cos(t))-p;
        if (f>0 && f0<0) {
         res=t;
            break;
        }
        f0=f;
    }
  document.getElementById("t5").value=(y/(1-Math.cos(res))).toFixed(2);
    return y/(1-Math.cos(res));
}
can.onclick = function(event) {
    // вывести тип события, элемент и координаты клик
 // alert(event.clientX + ":" + event.clientY);
  x1=event.pageX-700;
  y1=event.pageY-90;
document.getElementById('x1').value=x1;
document.getElementById('y1').value=y1;
  restart(false);
};

function deleteRow() {
			var table = document.getElementById("tab");
			var rowCount = table.rows.length;
  if(rowCount!=1)
        table.deleteRow(rowCount-1);
      
}
 
function drawFromTable() {
  var can=document.getElementById("can1");
  can.removeAttribute("hidden");
  document.getElementById("b1").removeAttribute("hidden");
  var ctx=can.getContext('2d');
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, can.width, can.height);
  var table=document.getElementById("tab");
  //ctx.moveTo(table.rows[1].cells[0].innerHTML,table.rows[1].cells[1].innerHTML);
//  alert(table.rows[1].cells[0].innerHTML);
  var Y= [];
 // alert();
  for (var j=1; j<=5; j++) {
    Y[j]=[];
  for (var i=1; i<table.rows.length; i++) {
 // alert(table.rows[0].cells[0].innerHTML);
    var x=table.rows[i].cells[0].innerHTML;
    var y=table.rows[i].cells[j].innerHTML;
    Y[j][x]=y;
   // alert(Y[j][x]);
//ctx.fillStyle = "black";
   // ctx.fillRect(x*500, y*500, 3, 3); 
//ctx.lineTo(x*100,y*100);
  }
  }
  var P=scale(Y);
  var k1=(can.width-10)/(P[3]-P[2]);
  var k2=(can.height-10)/(P[1]-P[0]);
   for(var i=1; i<can.width/(0.02*k1); i++) {
    // alert(i);
    var h=can.height;
     var rmin=myR(Number(P[2]),0.02);
     var step=0.02*k1;
  ctx.moveTo(step*i+(rmin-Number(P[2]))*k1,h);
ctx.lineTo(step*i+(rmin-Number(P[2]))*k1,h-10);
     ctx.strokeStyle="black";
ctx.stroke();
   ctx.font = "15px Times New Roman";
ctx.fillStyle = "red";
    ctx.textAlign = "center";
     var v=Number(rmin)+Number(i*0.02);
     v=Math.round(v*100)/100;
   //  alert(v);
ctx.strokeText(v,step*i+(rmin-Number(P[2]))*k1,h-10);   
      }
  var scaley=0.01;
   for(var i=0; i<can.height/(k2*scaley); i++) {
  // alert(i);
   while (((P[1]-P[0])/scaley)>12) scaley*=10;
     var h=can.height; 
     var rmin=myR(Number(P[0]),scaley);
     var step=scaley*k2;
 ctx.moveTo(0,h-(step*i+(rmin-Number(P[0]))*k2));
ctx.lineTo(10,h-(step*i+(rmin-Number(P[0]))*k2));
       ctx.strokeStyle="black";
ctx.stroke();
   ctx.font = "15px Times New Roman";
ctx.fillStyle = "red";
    ctx.textAlign = "left";
    var v=Number(rmin)+Number(i*scaley);
     v=Math.round(v*100)/100;
ctx.strokeText(v,1,h-5-(step*i+(rmin-Number(P[0]))*k2));
      }
  for (var j=1; j<=5; j++) {
    for (var X in Y[j]) {
      ctx.beginPath();
      ctx.moveTo((X-P[2])*k1,can.height-(Y[j][X]-P[0])*k2);
      break;
    }
    for (var X in Y[j]) {
       ctx.fillStyle = "rgb("+Points[j].red+","+Points[j].green+","+Points[j].blue+")";
      
      ctx.fillRect((X-P[2])*k1,can.height-(Y[j][X]-P[0])*k2, 5, 5); 
      ctx.lineTo((X-P[2])*k1,can.height-(Y[j][X]-P[0])*k2);
      
       
    }
    if (j>=1 && j<=5) {
  ctx.strokeStyle="rgb("+Points[j].red+","+Points[j].green+","+Points[j].blue+")";
    ctx.stroke();
    }
  }
 

}

function scale(Y) {
  var mint=100;
  var maxt=0;
  var minm=100;
  var maxm=0;
  for (var j=1; j<=5; j++) {
    for (var X in Y[j]) {
   if (X>maxm) maxm=X;
      if (X<minm) minm=X;
      if (Y[j][X]>maxt) maxt=Y[j][X];
      if (Y[j][X]<mint) mint=Y[j][X];
}
  }
  var P=[];
  P[0]=mint;
  P[1]=maxt;
  P[2]=minm;
  P[3]=maxm;
  return P;
}

function myR(x, y) {
 x/=y;
    if(x%y!=0)
    x=Math.floor(x)+1;
    x*=y;
    return x;
}

function f1() {
document.getElementById("t1").value=document.getElementById("in1").value;
document.getElementById("t2").value=document.getElementById("in2").value;
document.getElementById("t3").value=document.getElementById("in3").value;
document.getElementById("t4").value=document.getElementById("in4").value;  
}


function isAN(value) {
  if(value instanceof Number)
    value = value.valueOf(); // Если это объект числа, то берём значение, которое и будет числом
  
  return  isFinite(value) && value === parseInt(value, 10);
}