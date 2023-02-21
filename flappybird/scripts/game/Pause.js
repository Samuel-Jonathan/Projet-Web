import { setPause, loopGame } from "./Game.js";

    export function initPause(){
        pause();   
    }

    export function initResume(){
        resume();
    }

    export function pause() {
        setPause(true);
      }
      
      export function resume(){
        setPause(false)
        loopGame();
      }

    
      
      
