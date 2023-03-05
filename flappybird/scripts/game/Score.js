export class Score {

	constructor(ctx, position, value) {
		this.ctx = ctx;
		this.position = position;
		this.value = value;
	}

	draw() {
		let ctx = this.ctx;
		// Affichage du score
		ctx.save();
		ctx.font = '48px Chakra Petch';
		ctx.fillText(this.value, 10, 50);
		ctx.restore();
	}

	addScore(pipeX, width) {

		// Ajoute un point lorsqu'on passe un tuyau
		if (pipeX + width < 500) {
			this.value++;
		}

	}

	getValue() {
		return this.value;
	}
}