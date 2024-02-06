import * as utils from "./modules/utils";
import Game from "./modules/Game";

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
const notyf = new Notyf();

import { shuffle } from "lodash";

const form = utils.$('form');
const inputLabel = utils.$('input');
const scoreLabel = document.getElementById('score');
const highscoreLabel = document.getElementById('highscore');

const getCountries = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const countries = data.map(country => {
            const translations = country.translations || {};

            return {
                translations,
                flags: country.flags || {}
            };
        });
        return shuffle(countries);
    } catch (error) {
        console.log(error);
    }
};

const startGame = async () => {
    const countries = await getCountries();
    const game = new Game(countries);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const answer = inputLabel.value;

        if (game.currentCountry.checkAnswer(answer)) {
            game.addPoint();
            notyf.success('Correct!');
        } else {
            notyf.error('Incorrect!');
        }

        scoreLabel.textContent = `Score: ${game.score}`;

        if (game.score > game.highscore) {
            game.highscore = game.score;
            highscoreLabel.textContent = `Highscore: ${game.highscore}`;
            localStorage.setItem('highscore', game.highscore);
        }

        game.nextCountry();
        inputLabel.value = '';

        if (game.isGameOver()) {
            notyf.success('Game Over!');
        }
    });
}

startGame();
highscoreLabel.textContent = `Highscore: ${localStorage.getItem('highscore') || 0}`;