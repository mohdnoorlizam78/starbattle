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
//display planet
var planet1 = new Image();
var planet2 = new Image();
var planet3 = new Image();
var planet4 = new Image();
var planet5 = new Image();
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
var Score = 0;
//variable size astroid
var astroidSize = 50;
var fuelSize = 50;
var fuels = [];
var coins = [];
var planet1speed = 800;
var planet2speed = 800;
var planet3speed = 800;
var planet4speed = 800;
var planet5speed = 800;

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
    //sumber image planet
    planet1.src = "images/planet1.png";
    planet2.src = "images/planet2.png";
    planet3.src = "images/planet3.png";
    planet4.src = "images/planet4.png";
    planet5.src = "images/planet5.png";
    //nak hasilkan tulisan di timer (saiz dan jenis tulisan)
    ctx.font = "25px  Arial";

    //genrate asteroid
    astroids = generateAstroid();
    //generate fuels
    fuels.push(generateFuel());
    //generate coin
    coins.push(generateFuel());


    
  


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
// function detect untuk click mouse
    document.addEventListener("click", checkClick, false);
}

//function gerakan repeated pada background
function draw (){
    //arahan untuk pause
    if(!play) return false;
    //counter untuk timer (-++ maksudnye kira nombor menaik)
    counter++;

    ctx.drawImage(background1,bspeed, 40);
    ctx.drawImage(background2,bspeed + canvas.width, 40);
    ctx.drawImage(planet1, planet1speed, 50, 50, 50);
    ctx.drawImage(planet2, planet2speed, 100, 100, 100);
    ctx.drawImage(planet3, planet3speed, 400, 200, 200);
    ctx.drawImage(planet4, planet4speed, 300, 100, 100);
    ctx.drawImage(planet5, planet5speed, 200, 150, 150);
    bspeed -=1;
    planet1speed -=1.0;
        //repeated planet
        if(planet1speed == -100)
            planet1speed == -800;
    planet2speed -=0.8;
        if(planet2speed == -100)
        planet2speed == -850;

    planet3speed -=0.1;
    planet4speed -=0.6;
    planet5speed -=0.3;
    if (bspeed < -canvas.width)
        bspeed = 0;
  //counter untuk timer
    if (counter == 60) {
        second++;
        counter = 0;

 //counter untuk fuel (-- maksudnye kira nombor menurun)
        fuelCounter--;
        if(fuelCounter<=0){
            play = false;
            $("#end").show(300);
        }

    }

        //functionkedudukan timer
        ctx.clearRect(50, 0, 450, 40);
        //function hasilkan text di timer
        ctx.fillText(second, 50,30);
        //function hasilkan fuel counter text dan position
        ctx.fillText("Fuel: ", 120, 30);
        ctx.fillText(fuelCounter, 180, 30);
        //function hasilkan score text dan position
        ctx.fillText("Score: ", 250, 30);
        ctx.fillText(Score, 330, 30);
        // function display pause text dan position
        ctx.fillText("Pause", 400, 30);
        //function hasilkan ship di canvas 75,75 untuk besarkan ship
        ctx.drawImage(player, playerX, playerY, 75, 75)



           //function hasilkan astroid random 
           loop = 1;
           for(i = 0; i < 11; i++){
                   for(j = 0; j<16; j++) {
                       if(astroids.indexOf (loop) > -1){
                            ctx.drawImage(astroid, j * astroidSize, i*astroidSize + 40, astroidSize, astroidSize );
                            //arahan untuk pelanggaraan 
                            if(checkCollision(playerX, playerY, j * astroidSize, i * astroidSize + 40, astroidSize)){
                                play = false;
                                $("#end").show(300);
                            }
                        }             
                   
                       
                       
                       //function hasilkan gambarfuel random 
                       if(fuels.indexOf (loop) > -1){
                       ctx.drawImage(fuel, j* fuelSize, i * fuelSize + 40, fuelSize, fuelSize);
                            //arahan untuk pelanggaraan dapat max markah 30 shj
                            if(checkCollision(playerX, playerY, j * fuelSize, i * fuelSize + 40, fuelSize)){
                                //utk hilangkan fuel lepas pelanggaran
                                index = fuels.indexOf(loop);
                                if(index != -1)
                                    fuels.splice(index,1);
                                fuelCounter +=15;
                                //semak kalau fuel dah x keluar
                                if(fuels.length == 0)
                                    fuels.push(generateFuel());
                                //set max markah 30
                                if(fuelCounter>30)
                                    fuelCounter = 30;
                            }
                       }
                        
                        //function coins
                        if(coins.indexOf (loop) > -1){
                            ctx.drawImage(coin, j* fuelSize, i * fuelSize + 40, fuelSize, fuelSize);
                                 //arahan untuk pelanggaraan dapat max markah 30 shj
                                if(checkCollision(playerX, playerY, j * fuelSize, i * fuelSize + 40, fuelSize)){
                                     //utk hilangkan coins lepas pelanggaran
                                     index = coins.indexOf(loop);
                                     if(index != -1)
                                         coins.splice(index,1);
                                         Score ++;
                                    //semak kalau fuel dah x keluar
                                    if(coins.length == 0)
                                        coins.push(generateFuel());
                                }
                        }
                            
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
            
        // function utk keluarkan fuel rendam dan gerak kebawah
        $.each(fuels, function(index,val){
            if(fuels[index] > 15 && fuels.length < 3 && counter % 59 == 0){
                    fuels.push(generateFuel());

            }     
            if(fuels [index] > 160)
                fuels.splice(index, 1);
             //keluarkan fuel random 
            if(counter % 30 == 0)
                fuels[index] += 16;
        });
        //keluarkan coin
        $.each(coins, function(index,val){
            if(coins[index] > 15 && coins.length < 5 && counter % 59 == 0){
                coins.push(generateFuel());
            }     
            if(coins[index] > 160)
                coins.splice(index, 1);
            //keluarkan coins random 
            if(counter % 30 == 0)
                coins[index] += 16;
        });

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
// keyboard huruf p
            case 80:
                play = !play;
                if(play) draw();
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

//function untuk perlanggaran
function checkCollision(playerX, playerY, objectX, objectY, objectSize){
    return (playerX + 75) >= objectX && playerX < (objectX + objectSize) && playerY <= (objectY + objectSize);
}

//function klik play/pause guna mause
function checkClick(e){
    //function position / kedudukan mouse dalam canvas
    var r = canvas.getBoundingClientRect();
    var p = {x:e.clientX - r.left, y:e.clientY - r.top};
    if(p.x >= 400 && p.x <= 475 && p.y >=30 && p.y <= 40){
        play = !play;
        ctx.clearRect(400,0,470,40);
            if(play) {
                draw();
            }
            else{
                ctx.fillText("Play",400,30);
             }
    }
    
}
//function button start
$("#start").click(function(){
    draw();

    //function hide button start
    $(this).hide(200);


});
$("#end").hide();

$("#nama").keyup(function(){
    if($(this).val().length > 0) {
    $("#continue").prop("disabled", false);
}
else
    $("#continue").prop("disabled", true);
});


$("#continue").click(function(){
    var name = $("#name").val();
    $("#end").hide();
    $("#ranking").show(300);
        $.post("info.php", {name:name, second:second, sore:score} , function(data){
        $("#table").html(data);
    
    });
});
$("#ranking").hide();

$("#play-again").click(function (){
    $("#ranking").hide();
    fuels = [];
    coins = [];
    astroids = [];
    second = 0;
    score = [];
    fuelCounter = 15;
    playerX = 10;
    playerY = 300;
    asteroids = generateAstroid();
    fuels.push(generateFuel());
    coins.push(generateFuel());
    play = true;
    draw();
});
