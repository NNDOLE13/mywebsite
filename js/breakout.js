rulesBtn = document.getElementById('rules-btn')
rules = document.getElementById('rules')
closeBtn = document.getElementById('close-btn')
canvas = document.getElementById('canvas')
ctx = canvas.getContext('2d')
btn = document.querySelector('.btn1')
sounds = ['bubble']
sound = ['music']



score = 0

brickRowCount = 9
brickColumnCount = 5


//creat ball properties
ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,
}

//Create paddle properties
paddle = {
    x: canvas.width / 2 -40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0,
    gx: canvas.width / 2 - 40,
}


brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true,
}

//Create Bricks
bricks = []
for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = []
    for (let j = 0; j < brickColumnCount; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY
        bricks[i][j] = {x, y, ...brickInfo}
    }
}
//draw ball on canvas
function drawBall() {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = '#009599'
    ctx.fill()
    ctx.closePath()
}

//draw paddle on canvas
function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddle.x, paddle.y,  paddle.w, paddle.h)
    ctx.fillStyle = '#009599'
    ctx.fill()
    ctx.closePath()
}

//draw score on canvas
function drawScore() {
    ctx.font = '20px Arial'
    ctx.fillText(`Score: ${score}`, canvas.width-100,30)
}

//Draw bricks on canvas
function drawBricks()
{
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath()
            ctx.rect(brick.x, brick.y, brick.w, brick.h)
            ctx.fillStyle = brick.visible ? `#0095dd` :
            'transparent';
            ctx.fill()
            ctx.closePath()
        })
    })
}

console.log(bricks)

//draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawPaddle()
    drawBall()
    drawScore()
    drawBricks()
}


//create move paddle function
function movePaddle() {
    paddle.x = paddle.x + paddle.dx
    //wall detection
    if (paddle.x < 0) {
        paddle.x = 0;
    }
    if (paddle.x + paddle.w > canvas.width ) {
        paddle.x = canvas.width - paddle.w
    }
}

//Keydown Event
function keyDown(e) {
    //console.log(e.key)
    if (e.key =='ArrowRight' || e.key == 'Right') {
        paddle.dx = paddle.speed
    }
    if (e.key =='ArrowLeft' || e.key == 'Left') {
        paddle.dx = -paddle.speed
    }
}


//Keyup event
function keyUp(e) {
    if (e.key == 'ArrowRight' || e.key =='Right' || e.key == 'ArrowLeft' || e.key == 'Left') {
        paddle.dx = 0
    }
}


//keyboard event handlers
document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)

function moveBall() {
    ball.x = ball.x + ball.dx
    ball.y = ball.y + ball.dy

    //wall collison (top)
    if (ball.y + ball.size < 0) {
        ball.dy = -1 * ball.dy
    }
    //right
    if (ball.x + ball.size > canvas.width) {
        ball.dx = -1 * ball.dx
    }
    //bottom
    if(ball.y + ball.size > canvas.height) {
        ball.dy = -1 * ball.dy
        btn.classList.remove('active')
        moveBall() = false
    }
    //left
    if (ball.x + ball.size < 0){
        ball.dx = -1 * ball.dx
    }
    //paddle collision
    if(
        ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.w
        && ball.y + ball.size > paddle.y
    ){
        ball.dy = -1 * ball.speed
    }
    //brick collison
    bricks.forEach(column => {
        column.forEach(brick => {
            if(brick.visible){
                if(
                    ball.x - ball.size > brick.x &&
                    ball.x + ball.size < brick.x + brick.w &&
                    ball.y + ball.size > brick.y &&
                    ball.y - ball.size < brick.y + brick.h
                ){
                    ball.dy = -1 * ball.dy
                    brick.visible = false
                    increaseScore()
                    document.getElementById(sounds).play()
                }
            }
        })
    })
}


//increase score
function increaseScore() {
    score++
    document.getElementById(sounds).play()
    if (score == brickRowCount * brickColumnCount){
        score = 0
        showAllBricks()
    }
}

function showAllBricks() {
    bricks.forEach(column => {
        column.forEach(bricks => {
            bricks.visible = true
        })
    })
}

function update() {
    moveBall()
    movePaddle()
    draw()
    requestAnimationFrame(update)
}


btn.addEventListener('click', () => {
    document.getElementById(sound).play()
    showAllBricks()
    ball.x = paddle.gx
    ball.y = ball.dy + 350
    paddle.x = paddle.gx
    update()
    score = 0
    draw()
    btn.classList.add('active')
})






rulesBtn.addEventListener('click', () => {
    rules.classList.add('show')
})

closeBtn.addEventListener('click', () => {
    rules.classList.remove('show')
})


