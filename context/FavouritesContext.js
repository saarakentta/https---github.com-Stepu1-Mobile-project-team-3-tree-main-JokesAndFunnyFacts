import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
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

        loadFavourites();
    }, []);

    const addFavourite = async (joke) => {
        if (!favourites.some((fav) => fav.text === joke.text)) {
            const updatedFavourites = [...favourites, joke];
            setFavourites(updatedFavourites);
            try {
                await AsyncStorage.setItem('favourites', JSON.stringify(updatedFavourites));
            } catch (error) {
                console.error('Error saving favourite:', error);
            }
        }
    };

    const removeFavourite = async (joke) => {
        const updatedFavourites = favourites.filter((item) => item.text !== joke.text);
        setFavourites(updatedFavourites);
        try {
            await AsyncStorage.setItem('favourites', JSON.stringify(updatedFavourites));
        } catch (error) {
            console.error('Error removing favourite:', error);
        }
    };

    return (
        <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite }}>
            {children}
        </FavouritesContext.Provider>
    );
};
