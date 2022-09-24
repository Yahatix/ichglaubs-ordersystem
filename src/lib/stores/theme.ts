import { writable } from 'svelte/store';

import { browser } from "$app/environment";

type Theme = 'dracula' | 'light'

let storedTheme: Theme = 'dracula'
if (browser) {
    storedTheme = window.localStorage.getItem("theme") as Theme || 'dracula'
}

const theme = writable<Theme>(storedTheme);
export default theme
if (browser) {
    theme.subscribe(value => {
        localStorage.setItem("theme", value);
    });
}