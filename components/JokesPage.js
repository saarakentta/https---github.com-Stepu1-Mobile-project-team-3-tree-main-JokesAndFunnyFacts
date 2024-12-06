import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { FavouritesContext } from '../context/FavouritesContext';


const JokesPage = () => {

    const { addFavourite } = useContext(FavouritesContext);
    
    const [category, setCategory] = useState('Programming'); // Default category
    const [amount, setAmount] = useState(1); // Default number of jokes
    const [jokes, setJokes] = useState([]);
    const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);

    // Available categories
    const categories = [
        { label: 'Programming', value: 'Programming' },
        { label: 'Miscellaneous', value: 'Misc' },
        { label: 'Dark', value: 'Dark' },
        { label: 'Pun', value: 'Pun' },
        { label: 'Spooky', value: 'Spooky' },
        { label: 'Christmas', value: 'Christmas' },
    ];

    const fetchJokes = async () => {
        try {
            const response = await fetch(
                `https://v2.jokeapi.dev/joke/${category}?type=single&amount=${amount}`
            );
            const data = await response.json();

            if (data.jokes) {
                setJokes(data.jokes.map((joke) => ({ text: joke.joke })));
            } else if (data.joke) {
                setJokes([{ text: data.joke }]);
            } else {
                setJokes([{ text: 'No jokes found for this category. Try again!' }]);
            }
        } catch (error) {
            console.error('Error fetching jokes:', error);
            setJokes([{ text: 'Error fetching data. Please try again later.' }]);
        }
    };

        const saveToFavourites = (joke) => {
            addFavourite(joke); // Päivitetään konteksti ja AsyncStorage
            alert('Joke saved to favourites!');
        }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Random Joke Generator</Text>

            {/* Category Selection */}
            <Text>Select category:</Text>
            <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setCategoryModalVisible(true)}
            >
                <Text style={styles.dropdownText}>
                    {categories.find((cat) => cat.value === category)?.label || 'Select category'}
                </Text>
            </TouchableOpacity>

            <Modal
                visible={isCategoryModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setCategoryModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {categories.map((cat) => (
                            <TouchableOpacity
                                key={cat.value}
                                style={styles.modalItem}
                                onPress={() => {
                                    setCategory(cat.value);
                                    setCategoryModalVisible(false);
                                }}
                            >
                                <Text style={styles.modalItemText}>{cat.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Modal>

            {/* Amount Selection */}
            <Text style={styles.checkboxLabel}>Amount of jokes:</Text>
            <View style={styles.checkboxContainer}>
                {[1, 2, 3].map((num) => (
                    <TouchableOpacity
                        key={num}
                        style={[styles.checkbox, amount === num && styles.checkedCheckbox]}
                        onPress={() => setAmount(num)}
                    >
                        <Text style={[styles.checkboxText, amount === num && styles.checkedText]}>
                            {num}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Generate Jokes Button */}
            <TouchableOpacity style={styles.generateButton} onPress={fetchJokes}>
                <Text style={styles.generateButtonText}>Generate Jokes</Text>
            </TouchableOpacity>

            {/* Display Jokes */}
            <FlatList
                data={jokes}
                keyExtractor={(item, index) => item.text + index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.jokeContainer}>
                        <Text style={styles.joke}>{item.text}</Text>
                        <TouchableOpacity onPress={() => saveToFavourites(item)}>
                            <Ionicons name="star-outline" size={24} color="#6200ee" />
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.noJokes}>No jokes to display.</Text>}
            />
        </View>
    );
};

export default JokesPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingTop: 100,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
        textAlign: 'center',
        paddingBottom: 30,
    },
    dropdownButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        padding: 10,
        width: '100%',
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dropdownText: {
        fontSize: 16,
        color: '#000',
    },
    checkboxLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15,
    },
    checkbox: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#6200ee',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    checkedCheckbox: {
        backgroundColor: '#6200ee',
    },
    checkboxText: {
        fontSize: 16,
        color: '#6200ee',
    },
    checkedText: {
        color: '#fff',
    },
    generateButton: {
        backgroundColor: '#6200ee',
        padding: 15,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    generateButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    joke: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        color: '#000',
        textAlign: 'center',
    },
    noJokes: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 16,
        color: '#555',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modalItemText: {
        fontSize: 16,
        color: '#000',
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
});
