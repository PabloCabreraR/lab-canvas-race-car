const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

let car, obs1, obs2, obs3, obs4

const background = new Image()
background.src = '/images/road.png'
background.onload = ()=> {
  ctx.drawImage(background, 0, 0, ctx.canvas.width, ctx.canvas.height)
}


class Car{
  constructor(){
    this.img = ''
    this.width = 60
    this.height = 140
    this.x = 220
    this.y = 550
  }

  renderCar(){
    this.img = new Image()

    this.img.src = '/images/car.png'

    this.img.onload = () => {
      this.drawCar()
    }
  }

  drawCar(){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }

  moveRight(){
    this.x += 3
  }

  moveLeft(){
    this.x -= 3
  }
}

// class Obstacle {
//   constructor(width, x){
//     this.width = width
//     this.height = 30
//     this.x = x
//     this.y = 0
//     this.color = 'red'
//   }

//   drawObstacle(){
//     ctx.fillStyle = this.color
//     ctx.fillRect(this.x,this.y, this.width, this.height)
//   }

//   moveDown(){
//       this.y += 1
//   }
// }

const drawBackground = () => {
  ctx.drawImage(background, 0, 0, ctx.canvas.width, ctx.canvas.height)
}

const clearCanvas = () => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

const drawCanvas = () => {
  drawBackground()
  car.drawCar()
}

const checkBorders = () => {
  if (car.x <= 40){
    car.x = 40
  }
  if (car.x >= 400){
    car.x = 400
  }
}

// const createObstacle = () => {
//   con
// }

const updateCanvas = () => {
  clearCanvas()
  drawCanvas()
  checkBorders()
  requestAnimationFrame(updateCanvas)
}

const startGame = () =>{
  car = new Car()
  car.renderCar()
  updateCanvas()
}

document.addEventListener('keydown', (event)=>{
  if (event.key === 'ArrowRight'){
    car.moveRight()
  }
  if(event.key === 'ArrowLeft'){
    car.moveLeft()
  }
})

window.onload = () => {
  drawBackground()
  document.getElementById('start-button').onclick = () => {
    startGame();
  };
};


// setInterval(()=>{
//   let randomStartPoint = (Math.floor(Math.random()*280)+40)
//   obs1 = new Obstacle(200, randomStartPoint)
//   obs1.drawObstacle()
//   setInterval(()=>{
//     clearCanvas()
//     obs1.drawObstacle()
//     obs1.moveDown()
//   } , 1)
// }, 2000)

