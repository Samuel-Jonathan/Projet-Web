import { Player } from "./Player.js";

export class Score {

	index = 0;

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

		if (pipeX + width < 500) {
			// Ajoute un point (pas de bonus) / Ajoute deux points (bonus x2)
			this.value += (!Player.hasX2Bonus) ? 1 : 2;
			this.index++;
		}

	}

	getValue() {
		return this.value;
	}

	getIndex() {
		return this.index;
	}
}