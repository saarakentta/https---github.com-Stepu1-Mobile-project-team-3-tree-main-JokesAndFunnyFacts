import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { FavouritesContext } from '../context/FavouritesContext';

const FavouritesPage = () => {
    const { favourites } = useContext(FavouritesContext);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Favourite Jokes</Text>
            {favourites.length === 0 ? (
                <Text style={styles.noFavourites}>No favourites yet.</Text>
            ) : (
                <FlatList
                    data={favourites}
                    keyExtractor={(item, index) => item.text + index}
                    renderItem={({ item }) => (
                        <Text style={styles.joke}>{item.text}</Text>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    noFavourites: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
    },
    joke: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
});

export default FavouritesPage;
