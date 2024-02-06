class Country {
    #data;
    #answers;
    #flag;

    constructor(data) {
        this.#data = data;
        this.#answers = this.extractAnswers();
        this.#flag = this.#data.flags.png;
    }

    get flag() {
        return this.#flag;
    }

    extractAnswers() {
        const translations = this.#data.translations;
        return new Set(Object.values(translations).map(translation => translation.common.toLowerCase()));
    }

    checkAnswer(answer) {
        return this.#answers.has(answer.toLowerCase());
    }

    displayFlag() {
        const flagContainer = document.getElementById('flag');
        flagContainer.innerHTML = '';
        const flag = document.createElement('img');
        flag.src = this.#flag;
        flagContainer.appendChild(flag);
    }
}

export default Country;