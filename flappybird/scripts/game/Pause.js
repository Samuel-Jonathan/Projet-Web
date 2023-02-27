import { setPause, loopGame } from "./Game.js";


export function pause() {
  setPause(true);
}

export function resume() {
  setPause(false)
  loopGame();
}




