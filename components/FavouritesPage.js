import React, { useContext } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FavouritesContext } from '../context/FavouritesContext';
import { FontAwesome } from '@expo/vector-icons';

const FavouritesPage = () => {
    // Käytä useContextia komponentin sisällä
    const { favourites, removeFavourite } = useContext(FavouritesContext);

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                <Text style={styles.header}>Favourite Jokes</Text>
                {favourites.length === 0 ? (
                    <Text style={styles.noFavourites}>No favourites yet.</Text>
                ) : (
                    <FlatList
                        data={favourites}
                        keyExtractor={(item, index) => item.text + index}
                        renderItem={({ item }) => (
                            <View style={styles.jokeContainer}>
                                <Text style={styles.jokeText}>{item.text}</Text>
                                <TouchableOpacity onPress={() => removeFavourite(item)}>
                                    <FontAwesome name="trash" size={24} color="red" />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
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
    jokeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    jokeText: {
        flex: 1,
        color: '#333',
    },
});

export default FavouritesPage;
