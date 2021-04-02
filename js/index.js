window.onload = () => {
    // CLASS
    class Car{
        constructor(){
            this.x = ctx.canvas.width/2 - 15
            this.y = 630
            this.width = 30
            this.height = 60
        }

        drawSelf(){
            ctx.drawImage(loadedImages.car, this.x, this.y, this.width, this.height)
        }

        moveLeft(){
            this.x -= 10
        }

        moveRight(){
            this.x += 10
        }
    }

    class Obstacle{
        constructor(){
            this.width = Math.floor(Math.random()*30) + 40
            this.height = 20
            this.x = Math.floor(Math.random()*(435 - this.width - 65)) + 65
            this.y = 0
        }

        drawSelf(){
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }

        moveSelf(){
            this.y += 1
        }
    }

    // VARIABLES
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    ctx.font = '30px Arial'
    ctx.textAlign = 'center'
    ctx.baseline = 'middle'

    let gameOver = false

    let loadedAllImages = false
    const loadedImages = {}
    const listOfUrls = {road: '/images/road.png', car: '/images/car.png'}
    let counterForLoadedImages = 0
    const arrayOfObstacles = []

    let backgroundAudio

    let score = 0

    const car = new Car()

    //DOM MANIPULATION
    document.getElementById('start-button').onclick = () => {
        startGame()
    }

    document.addEventListener('keydown', (event)=> {
        if (event.key === 'ArrowLeft'){
            car.moveLeft()
        }else if (event.key === 'ArrowRight'){
            car.moveRight()
        }
    })

    // GAME LOGIC
    const startGame = () => {
        loadImages()
        loadAudios()
        backgroundAudio.play()
        updateCanvas()
    }

    const loadImages = () => {
        for(let key in listOfUrls){
            const img = new Image()
            img.src = listOfUrls[key]
            img.onload = ()=>{
                counterForLoadedImages++
                loadedImages[key] = img

                if (counterForLoadedImages === Object.keys(listOfUrls).length){
                    loadedAllImages = true
                }
            }
        }
    }
     
    const loadAudios = () => {
        backgroundAudio = new Audio('/sounds/tech-house.mp3')

    }

    const clearCanvas = () => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    }

    const drawRoad = () => {
        ctx.drawImage(loadedImages.road, 0, 0, ctx.canvas.width, ctx.canvas.height)
    }

    const drawCar = () => {
        car.drawSelf()
    }

    let counter = 0

    const createObstacles = () => {
        counter ++
        if (counter === 80){
            const obstacle = new Obstacle()
            arrayOfObstacles.push(obstacle)
            counter = 0
        }
    }

    const drawObstacles = () =>{
        arrayOfObstacles.forEach((obstacle)=>{
            obstacle.drawSelf()
        })
    }

    const moveObstacle = ()=> {
        arrayOfObstacles.forEach((obstacle)=>{
            obstacle.moveSelf()
        })
    }

    const renderScore = ()=> {
        ctx.fillStyle = 'black'
        ctx.fillText(`Score:${score}`, 70, 40)
    }

    const renderGameOverText = () => {
        ctx.fillText('GAME OVER', ctx.canvas.width/2, ctx.canvas.height/2)
    }

    const checkCollision = ()=>{
        arrayOfObstacles.forEach((obstacle)=>{
            if (obstacle.y + obstacle.height === car.y){
                if ((obstacle.x <= car.x && car.x <= (obstacle.x+obstacle.width))||(obstacle.x <= (car.x+car.width) && (car.x+car.width) <= (obstacle.x+obstacle.width))){
                    backgroundAudio.pause()
                    gameOver = true
                    renderGameOverText()
                }else{
                    score++
                }
            }
        })
    }

    const updateCanvas = () => {
        if (loadedAllImages && !gameOver){
            clearCanvas()
            drawRoad()
            drawCar()
            createObstacles()
            drawObstacles()
            moveObstacle()
            checkCollision()
            renderScore()
        }
        requestAnimationFrame(updateCanvas)
    }
}