export default class Score {

	

	constructor(x, y, value, color,size) {
        this.x = x;
        this.y = y;
		this.value = value;
		this.color = color;
		this.size = size;
	}

	draw(ctx) {
		
		// Affichage du score
		ctx.save();
		ctx.fillStyle = this.color;
		ctx.font = this.size + "px Arial";
		ctx.fillText("Score:" + this.value, this.x, this.y);
		//taille de police 
		ctx.restore();
	}

	addScore(value) {
        this.value += value;
	}

	getValue() {
		return this.value;
	}
}