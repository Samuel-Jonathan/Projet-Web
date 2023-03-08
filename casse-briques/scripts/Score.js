export default class Score {

	

	constructor(x, y, value) {
        this.x = x;
        this.y = y;
		this.value = value;
	}

	draw(ctx) {
		
		// Affichage du score
		ctx.save();
		ctx.fillText(this.value, this.x, this.y);
		ctx.restore();
	}

	addScore(value) {
        this.value += value;
	}

	getValue() {
		return this.value;
	}
}