import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
    const [favourites, setFavourites] = useState([]);

    const addFavourite = async (joke) => {
        if (!favourites.some((fav) => fav.text === joke.text)) {
            const updatedFavourites = [...favourites, joke];
            setFavourites(updatedFavourites);
            await AsyncStorage.setItem('favourites', JSON.stringify(updatedFavourites));
        }
    };

    const loadFavourites = async () => {
        try {
            const storedFavourites = await AsyncStorage.getItem('favourites');
            if (storedFavourites) {
                setFavourites(JSON.parse(storedFavourites));
            }
        } catch (error) {
            console.error('Error loading favourites:', error);
        }
    };

    return (
        <FavouritesContext.Provider value={{ favourites, addFavourite, loadFavourites }}>
            {children}
        </FavouritesContext.Provider>
    );
};
