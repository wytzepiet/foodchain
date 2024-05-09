import { createEffect, createSignal } from "solid-js";

export const [darkMode, setDarkMode] = createSignal(false);
createEffect(() => document.body.classList.toggle("dark", darkMode()));
