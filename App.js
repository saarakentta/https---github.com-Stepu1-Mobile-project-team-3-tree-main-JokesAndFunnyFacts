import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { BottomNavigation, MD3LightTheme, PaperProvider } from "react-native-paper";
import Home from './components/HomePage';
import Favourites from './components/FavouritesPage';
import Facts from './components/FactsPage';
import Jokes from './components/JokesPage';
import { useState } from 'react';
import { FavouritesProvider } from './context/FavouritesContext';

const routes = [
  { key: 'home', title: 'Home', focusedIcon: 'home' },
  { key: 'favourites', title: 'Favourites', focusedIcon: 'heart' },
  { key: 'facts', title: 'Facts', focusedIcon: 'school' },
  { key: 'jokes', title: 'Jokes', focusedIcon: 'emoticon-lol' },
];

export default function App() {
  const [index, setIndex] = useState(0);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    favourites: Favourites,
    facts: Facts,
    jokes: Jokes,
  });

  return (
    <FavouritesProvider>
    <PaperProvider theme={MD3LightTheme}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </PaperProvider>
    </FavouritesProvider>
  );
}
