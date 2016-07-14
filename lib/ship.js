function Ship(wave, ctx){
  this.wave = wave;
  this.ctx = ctx;
  this.x = Math.random() * 1400 + 100;
  this.y = 0;
  this.tilt = 0;
}

Ship.prototype.render = function(color){
  const hsla = `hsla(${color.h + 120}, ${color.s}%, 0%, ${color.a})`;

  this.ctx.save();
  this.ctx.fillStyle = hsla;
  this.ctx.beginPath();
  const begin = .2 + this.tilt;
  const end = Math.PI-.2 + this.tilt;
  this.ctx.arc(this.x, this.y - 15, 25, begin, end);
  this.ctx.fill();
  this.ctx.restore();
};

Ship.prototype.move = function(){
  for(let i = 0; i < this.wave.points.length; i++){
    const point = this.wave.points[i];
    if(point.x > this.x){
      const prevPoint = this.wave.points[i-1];

      const total = Math.abs(point.x - prevPoint.x)
      const left = Math.abs(this.x - prevPoint.x);
      const right = Math.abs(this.x - point.x);
      const leftWeight = right / total; // opposite on purpose
      const rightWeight = left / total; // closer should mean bigger, not smaller

      this.y = (prevPoint.y * leftWeight + point.y * rightWeight);
      const heightWidthRatio = (point.y - prevPoint.y) / (point.x - prevPoint.x);
      // this.x += .5 * heightWidthRatio;
      // this.tilt = .5 * heightWidthRatio;

      this.tilt = 2 * heightWidthRatio * (leftWeight < rightWeight ? leftWeight : rightWeight);

      // looking good, but we gotta  decrease tilt as we go toward apex/nadir

      break
    }
  }
};

module.exports = Ship;




// y(t) = (y0−2y1+y2)t^2 + (2y1−2y0)t + y0