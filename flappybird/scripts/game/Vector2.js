export class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  //Addition de deux vecteurs
  static sum(v1, v2) {
    return new Vector2(v1.x + v2.x, v1.y + v2.y);
  }

  //Soustraction de deux vecteurs
  static substract(v1, v2) {
    return new Vector2(v1.x - v2.x, v1.y - v2.y);
  }

  //Multiplie la position x par un nombre
  multX(k) {
    this.x = this.x * k;
  }

  //Multiplie la position y par un nombre
  multY(k) {
    this.y = this.y * k;
  }

  //Multiplie la position x et y par un nombre
  mult(k) {
    this.x = this.x * k;
    this.y = this.y * k;
  }

  //Normalise un vecteur
  normalize() {
    this.x = 1;
    this.y = 1;
  }


  // Crée un vecteur aléatoire
  static randomVector(max) {
    return new Vector2(
      Math.floor(Math.random() * max),
      Math.floor(Math.random() * max)
    );
  }
}
