import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Share } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { FavouritesContext } from '../context/FavouritesContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Header from '../components/Header';
import { globalStyles } from '../styles';

// Värikoodaus tyyppien mukaan
const getTypeColor = (type) => (type === 'fact' ? '#FF8C42' : '#5DAE5D');

// Jakamistoiminto
const shareItem = async (item) => {
  try {
    await Share.share({
      message: `Check this out: ${item.text}`,
    });
  } catch (error) {
    console.error('Error sharing item:', error);
  }
};

const FavouritesPage = () => {
  const { favourites, removeFavourite } = useContext(FavouritesContext);
  const [filter, setFilter] = useState('all');

  // Suodatuslogiikka
  const filteredFavourites = favourites.filter((item) => {
    if (filter === 'fact') return item.type === 'fact';
    if (filter === 'joke') return item.type === 'joke';
    return true; // All
  });

  const renderRightActions = (item) => (
    <View style={globalStyles.favouritesDeleteContainer}>
      <Text style={globalStyles.favouritesDeleteText}>Delete</Text>
    </View>
  );

  return (
    <GestureHandlerRootView style={globalStyles.favouritesContainer}>
      {/* Header-komponentti */}
      <Header title="Favourites" />

      {/* Suodatin napit */}
      <View style={globalStyles.favouritesFilterContainer}>
        {['all', 'fact', 'joke'].map((btn) => (
          <TouchableOpacity
            key={btn}
            style={[
              globalStyles.favouritesFilterButton,
              btn === 'all' && filter === 'all' && globalStyles.favouritesAllButton,
              filter === btn && btn !== 'all' && { backgroundColor: getTypeColor(btn) },
            ]}
            onPress={() => setFilter(btn)}
          >
            <Text
              style={[
                globalStyles.favouritesFilterText,
                filter === btn && globalStyles.favouritesActiveFilterText,
              ]}
            >
              {btn.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* FlatList sisältö */}
      <FlatList
        data={filteredFavourites}
        keyExtractor={(item, index) => item.text + index}
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={() => renderRightActions(item)}
            onSwipeableRightOpen={() => removeFavourite(item)}
          >
            <TouchableOpacity onLongPress={() => shareItem(item)}>
              <View style={globalStyles.favouritesCardContainer}>
                {/* Väripalkki */}
                <View
                  style={[
                    globalStyles.favouritesColorBar,
                    { backgroundColor: getTypeColor(item.type) },
                  ]}
                />
                {/* Sisältö */}
                <View style={globalStyles.favouritesContentContainer}>
                  <Text style={globalStyles.favouritesCardText}>{item.text}</Text>
                  <Text style={globalStyles.favouritesTimestamp}>
                    {item.type === 'fact' ? 'Fact' : 'Joke'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Swipeable>
        )}
        ListEmptyComponent={
          <Text style={globalStyles.favouritesNoItemsText}>No favourites yet!</Text>
        }
      />
    </GestureHandlerRootView>
  );
};

export default FavouritesPage;
