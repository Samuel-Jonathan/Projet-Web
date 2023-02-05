class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  setX(x) {
    this.x = x;
  }

  setY(y) {
    this.y = y;
  }

  addX(x) {
    this.x += x;
  }

  addY(y) {
    this.y += y;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  static sum(v1, v2) {
    return new Vector2(v1.x + v2.x, v1.y + v2.y);
  }

  static substract(v1, v2) {
    return new Vector2(v1.x - v2.x, v1.y - v2.y);
  }

  multX(k) {
    this.x = this.x * k;
  }

  multY(k) {
    this.y = this.y * k;
  }

  mult(k) {
    this.x = this.x * k;
    this.y = this.y * k;
  }

  normalize() {
    this.x = 1;
    this.y = 1;
  }


  static randomVector(max) {
    return new Vector2(
      Math.floor(Math.random() * max),
      Math.floor(Math.random() * max)
    );
  }
}
