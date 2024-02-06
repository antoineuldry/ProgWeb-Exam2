import Country from "./Country";

class Game {
    #score;
    #highscore;
    #currentHighscore
    #countries;
    #countryIndex;
    currentCountry;

    constructor(countries) {
        this.#score = 0;
        this.#highscore = localStorage.getItem('highscore') || 0;
        this.#currentHighscore = 0;
        this.#countries = countries;
        this.#countryIndex = 0;
        this.currentCountry = new Country(this.#countries[this.#countryIndex]);
        this.currentCountry.displayFlag();
    }

    get score() {
        return this.#score;
    }

    get highscore() {
        return this.#highscore;
    }

    set currentHighscore(value) {
        this.#currentHighscore = value;
    }

    addPoint() {
        this.#score++;
    }

    isGameOver() {
        if (this.#countryIndex >= this.#countries.length) {
            if (this.#score > this.#highscore) {
                alert(`GG! You beat the highscore(${this.#highscore}) with ${this.#score} points!`);
            } else {
                alert(`Game Over! You scored ${this.#score} points. The highscore is ${this.#highscore} points.`);
            }

            this.#score = 0;
            this.#countryIndex = 0;
            this.currentCountry = new Country(this.#countries[this.#countryIndex]);
            this.currentCountry.displayFlag();

            return true;
        }
    }

    nextCountry() {
        if (this.isGameOver()) return;
        this.#countryIndex++;
        this.currentCountry = new Country(this.#countries[this.#countryIndex]);
        this.currentCountry.displayFlag();
    }
}

export default Game;