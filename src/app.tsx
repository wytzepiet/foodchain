import { Suspense, createSignal, on, onMount } from "solid-js";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import "./app.css";
import { initializeShortcuts } from "./components/shortcut";

export default function App() {
  onMount(() => {
    initializeShortcuts();
  });

  return (
    <Router root={(props) => <Suspense>{props.children}</Suspense>}>
      <FileRoutes />
    </Router>
  );
}
