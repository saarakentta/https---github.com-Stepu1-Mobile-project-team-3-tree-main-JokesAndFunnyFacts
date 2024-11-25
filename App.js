import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { BottomNavigation, MD3LightTheme, PaperProvider } from "react-native-paper";
import Home from './components/HomePage';
import Top10 from './components/Top10Page';
import Favourites from './components/FavouritesPage';
import Facts from './components/FactsPage';
import Jokes from './components/JokesPage';
import { useState } from 'react';

const routes = [
  {key : 'home', title : 'Home', focusedIcon: 'home'},
  {key : 'top10', title : 'Top10', focusedIcon: 'star'},
  {key : 'favourites', title : 'Favourites', focusedIcon: 'heart'},
  {key : 'facts', title : 'Facts', focusedIcon: 'school'},
  {key : 'jokes', title : 'Jokes', focusedIcon: 'emoticon-lol'}
]

export default function App() {

  const [index, setIndex] = useState(0);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    top10: Top10,
    favourites: Favourites,
    facts: Facts,
    jokes: Jokes
  });

  return (
    <PaperProvider theme={MD3LightTheme}>
        <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
        />
    </PaperProvider>
  );
}
