import React from 'react';
import './App.css';
import { store } from "./actions/store";
import { Provider } from "react-redux";
import Recipes from "./components/Recipes";
import Search from "./components/Search";
import RecipeDetail from "./components/RecipeDetail";
import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";

function App() {
  return (
    <Provider store = {store}>
      <ToastProvider autoDismiss={true}>
        <Container maxWidth="lg">
          <Search />
        </Container>
        <Container>
          <RecipeDetail />
        </Container>
        <Container maxWidth="lg">
          <Recipes />
        </Container>
      </ToastProvider>
    </Provider>
  );
}

export default App;
