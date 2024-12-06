import React, { useContext, useEffect } from 'react';
import { FavouritesContext } from '../context/FavouritesContext';

const FavouritesPage = () => {
    const { favourites, loadFavourites } = useContext(FavouritesContext);

    useEffect(() => {
        loadFavourites(); // Lataa suosikit kerran komponentin alustuksessa
    }, []);

    return (
        <View>
            <Text>Favourite Jokes</Text>
            {favourites.length === 0 ? (
                <Text>No favourites yet.</Text>
            ) : (
                <FlatList
                    data={favourites}
                    keyExtractor={(item, index) => item.text + index}
                    renderItem={({ item }) => <Text>{item.text}</Text>}
                />
            )}
        </View>
    );
};
