import "./App.sass";
import "../public/fonts/inter.css"

import { Component } from "solid-js";
import { Sidebar } from "@features/sidebar/views";
import { Panels } from "@features/panels/views";
import { interceptAuthCallback } from "@features/auth/utils";

import "@features/theme/stores"

const App: Component = () => {
  interceptAuthCallback();

  return (
    <>
      <Sidebar />
      <Panels />
    </>
  );
};

export default App;
