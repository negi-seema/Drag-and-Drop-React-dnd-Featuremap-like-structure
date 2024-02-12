import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { Store } from "./store/store.jsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

ReactDOM.createRoot(document.getElementById("root")).render(
  <DndProvider backend={HTML5Backend}>
    <Provider store={Store}>
      <App />
    </Provider>
  </DndProvider>
);
