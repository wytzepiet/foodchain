import { createEffect, createRoot, createSignal } from "solid-js";

export const [darkMode, setDarkMode] = createSignal(false);

createRoot(() => {
  createEffect(() => document.body.classList.toggle("dark", darkMode()));
});
