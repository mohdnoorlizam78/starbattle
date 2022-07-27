//buat variable komponen dalam game
var canvas;
var ctx;
var play = true;
var background1 = new Image ();
var background2 = new Image ();
var timer = new Image();
var fuel = new Image();
var coin = new Image();
var player = new Image();
var astroid = new Image();
//variable background speed
var bspeed = 0;
//variable player ship untuk tentukan position
var playerX=10;
var playerY=300;
//variable player speed
var playerSpeed = 10;
//variable timer
var second = 0;
var counter = 0;
//variable fuelcounter(start dari berapa second remaining)
var fuelCounter = 15;
//variable score(utk kira score)
var Score=0;
//variable size astroid
var astroidSize = 50;
var fuelSize = 50;
var fuels = [];

//untuk canvas masukkan gambar dalam media files

window.onload = function (){
    canvas = document.getElementById("game"); 
    ctx = canvas.getContext("2d");
    player.src = "images/ship.png";
    coin.src="images/coin.png";
    timer.src="images/timer.png";
    fuel.src="images/fuel.png";
    astroid.src="images/stone.png";
    background1.src= "images/background.jpg";
    background2.src= "images/background.jpg";
 //nak hasilkan tulisan di timer (saiz dan jenis tulisan)
    ctx.font = "25px  Arial";

    //generate asteroid
    astroids = generateAstroid();
    //generate fuels
    fuels.push(generateFuel());

    
    //nak onload background pada canvas

    background2.onload = function() {
        ctx.drawImage(background1, 0, 40);
        ctx.drawImage(background2, 0 - canvas.width, 40);
        //nak onload icon timer pada canvas
        ctx.drawImage(timer, 10, 0, 40, 40);
        //nak onload (masukkan ) astroid pada canvas
        ctx.drawImage(astroid, 50, 50, 50, 50 );

    }

//function untuk gerak gune keyboard
    document.addEventListener("keydown", keyPressed);
}

//function gerakan repeated pada background
function draw (){
    //counter untuk timer (-++ maksudnye kira nombor menaik)
    counter++;

    ctx.drawImage(background1,bspeed, 40);
    ctx.drawImage(background2,bspeed + canvas.width, 40);
    bspeed -=1;
    if (bspeed < -canvas.width)
        bspeed = 0;
  //counter untuk timer
    if (counter == 60) {
        second++;
        counter = 0;

 //counter untuk fuel (-- maksudnye kira nombor menurun)
        fuelCounter--;

    }

        //functionkedudukan timer
        ctx.clearRect(50, 0, 200, 40);
        //function hasilkan text di timer
        ctx.fillText(second, 50,30);
        //function hasilkan fuel counter text dan position
        ctx.fillText("Fuel: ", 120, 30);
        ctx.fillText(fuelCounter, 180, 30);
        //function hasilkan score text dan position
        ctx.fillText("Score: ", 250, 30);
        ctx.fillText(Score, 330, 30);
        //function hasilkan ship di canvas 75,75 untuk besarkan ship
        ctx.drawImage(player, playerX, playerY, 80, 65 )



           //function hasilkan astroid random 
           loop = 1;
           for(i = 0; i < 11; i++){
                   for(j = 0; j<16; j++) {
                       if(astroids.indexOf (loop) > 1)
                       ctx.drawImage(astroid, j * astroidSize, i*astroidSize + 40, astroidSize, astroidSize );
                       
                       
                       //function hasilkan gambarfuel random 
                       if(fuels.indexOf (loop) > -1)
                       ctx.drawImage(fuel, j* fuelSize, i * fuelSize + 40, fuelSize, fuelSize);
                       loop++;
                   }
           }


         //function untuk counter astroid repated
          if(counter % 10 == 0) { //semakin kecil counter semakin laju..
                   movingAstroids = 0;
                    $.each(astroids, function(index,val){
                           if(astroids [index] > index * 16 + 1 && val !=800)
                            astroids[index] -= Math.floor(Math.random () * 2 ); //bilangan lompat, cuba tukar ke 5
                           else
                            astroids[index]= 800;
                            if(astroids [index] == 800)
                                movingAstroids++;
                            if(movingAstroids ==10)
                                astroids = generateAstroid();
                    });
            }

            $.each(fuels, function(index, val){
                if(fuels[index] > 15 && fuels.length < 3 && counter % 59 == 0){
                    fuels.push(generateFuel());
                }
                if(fuel[index] > 160)
                    fuels.splice(index, 1);
                //if(counter % 30 == 0)
                    fuels[index] += 16;
            };

        anim = requestAnimationFrame(draw);

}

function keyPressed (e) {
    switch (e.keyCode) {
//arrow ke kiri case 37 (statemnt IF diberi untuk menghadkan kawasan didalam canvas)
        case 37:
            if(playerX > 0)
                playerX-= playerSpeed;
            break;
//arrow ke kanan case 39
            case 39:
                if(playerX < canvas.width - playerSpeed * 8) //hadkan kawasan
            playerX += playerSpeed;
            break;
//arrow ke depan case 38
            case 38:
                if(playerY > 40) //hadkan kawasan
                playerY -= playerSpeed;
            break;
//arrow ke kebelakang case 40
            case 40:
                if(playerY < canvas.height - playerSpeed * 8) //hadkan kawasan
                playerY += playerSpeed;
            break;
    }
}

//function random asteroid
function generateAstroid() {
    var arr = [];
    //function untuk astroid duduk hujung (800 lebar canvas/50 = 16)
    for(a=16; a<= 160; a += 16) {
        r = Math.floor(Math.random() * 2);
        if (r == 0)
            arr.push(a);
            else
            arr.push (800);     
    }
    return arr;
}

//fuction generate fuel
function generateFuel(){
    var num = Math.floor(Math.random() * 16) + 1;
    return num;
}

//function button start
$("#start").click(function(){
    draw();

    //function hide button start
    $(this).hide(200);


});