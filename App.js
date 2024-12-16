import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { BottomNavigation, PaperProvider, MD3LightTheme } from "react-native-paper";
import Home from './components/HomePage';
import Favourites from './components/FavouritesPage';
import Facts from './components/FactsPage';
import Jokes from './components/JokesPage';
import { useState } from 'react';
import { FavouritesProvider } from './context/FavouritesContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const routes = [
  { key: 'home', title: 'Home', focusedIcon: 'home' },
  { key: 'favourites', title: 'Favourites', focusedIcon: 'heart' },
  { key: 'facts', title: 'Facts', focusedIcon: 'school' },
  { key: 'jokes', title: 'Jokes', focusedIcon: 'emoticon-lol' },
];

export default function App() {
  const [index, setIndex] = useState(0);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'home':
        return <Home />;
      case 'favourites':
        return <Favourites />;
      case 'facts':
        return <Facts />;
      case 'jokes':
        return <Jokes />;
      default:
        return null;
    }
  };

  const theme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: '#73b5d1',
      secondary: '#eb4034',
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FavouritesProvider>
        <PaperProvider theme={theme}>
          {/* StatusBar lisätty */}
          <StatusBar style="light" backgroundColor="#121212" translucent={false} />

          <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            barStyle={{ backgroundColor: '#121212' }} 
            activeColor="#fff" 
            inactiveColor="#444444" 
            activeIndicatorStyle={{ backgroundColor: '#121212', borderRadius: 20 }} 
          />
        </PaperProvider>
      </FavouritesProvider>
    </GestureHandlerRootView>
  );
}
