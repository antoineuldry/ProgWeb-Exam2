// Simplify the use of document.querySelector and document.querySelectorAll
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const setLSData = (key, value) => {
    typeof value === "object"
        ? localStorage.setItem(key, JSON.stringify(value))
        : localStorage.setItem(key, value);
};

const getLSData = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch {
        return localStorage.getItem(key);
    }
}

export { $, $$, setLSData, getLSData };