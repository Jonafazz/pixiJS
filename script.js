let app;
let player;
let keys = {};//array to store which keys are used
let bulletss = [];// array to store bullets
let challenges = []; // array to store challanges

//qikjo krijon nje texture te fotografise se 'plumbit'
let BulletTexture = PIXI.Texture.from("git.png");
let ChallengeTexture = PIXI.Texture.from("purple.png");

function shootBullet() {
    let bullet = new PIXI.Sprite(BulletTexture);
    bullet.anchor.set(0.5);
    bullet.scale.set(0.3);
    bullet.x = player.x;
    bullet.y = player.y;
    app.stage.addChild(bullet);
    bulletss.push(bullet)
};

function moveBullets() {
    bulletss.forEach(bullet => {
        bullet.y -= 10; //10 tregon sa shpejt ka me shku,,, y tregon drejtimin kah me shku
        if (bullet.y < 0) {
            app.stage.removeChild(bullet);
            bulletss.splice(bulletss.indexOf(bullet), 1)
        }
    })
};



function createChallenge() {
    let challe = new PIXI.Sprite(ChallengeTexture);
    challe.anchor.set(0.5);
    challe.x = Math.random() * app.view.width;
    challe.y = -50;
    app.stage.addChild(challe);
    challenges.push(challe);
};

function moveChallenges() {
    challenges.forEach(challe => {
        challe.y += 3;//move challenge downwards, ne pixi vlera +3 eshte -3 ne bosht kordinativ(eshte e kunderta e boshtit kordinativ)
        if (challe.y > app.view.height) {
            app.stage.removeChild(challe);
            challenges.splice(challenges.indexOf(challe), 1)
        }
    })
};


// qekjo krijon katrorin e zi
window.onload = function () {
    app = new PIXI.Application({
        width: 800,
        height: 600,
        backgroundcolor: 0xAAAAAA
    });

    //qekjo e vendos katrorin e zi ne body
    document.body.appendChild(app.view);

    // qekjo krijon nje texture te fotos ku e bojm store me nje variabel
    let texture = PIXI.Texture.from("codi.png");

    //na vyn me kriju nje characater (sprite) si ne scratch
    player = new PIXI.Sprite(texture);


    //qet ne mes te faqes sprite qe e kemi krijuar
    player.anchor.set(0.5);
    player.x = app.view.width / 2;
    player.y = app.view.height / 2;

    //e vendos sprite ne katrorin e zi
    app.stage.addChild(player);


    //qetu i bojm funskionet for keyboard movements

    //ana e majt brenda kllapave eshte eventi qe do te ndodhe "keysdown"
    //ana e djath brenda kllapave eshte funksioni qe ka mu bo run
    window.addEventListener("keydown", keysDown);
    window.addEventListener("keyup", keysUp);


    function keysDown(e) {
        // tregon vleren numerike te tasteve qe klikohen
        console.log(e.keyCode);
        keys[e.keyCode] = true;
    }

    function keysUp(e) {
        // nuk ti merr dy keys ne te njejten kohe
        keys[e.keyCode] = false;
    }

    // vazhdimisht e kontrollon a po klikohet tasti
    app.ticker.add(gameLoop);
}
function gameLoop() {
    if (keys["38"]) {
        player.y -= 5;//move player for 5 up 
    }
    if (keys["40"]) {
        player.y += 5;
    }
    if (keys["37"]) {
        player.x -= 5;
    }
    if (keys["39"]) {
        player.x += 5;
    };
    if (keys["87"]) {
        shootBullet();
    };
    moveBullets()

    if (Math.random() < 0.02) {
        createChallenge()

    }
    moveChallenges()
}