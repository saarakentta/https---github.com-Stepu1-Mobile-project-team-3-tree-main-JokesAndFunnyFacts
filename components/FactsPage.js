import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

const FactsPage = () => {
    const [language, setLanguage] = useState('en'); // Default language
    const [amount, setAmount] = useState(0); // Default number of facts
    const [facts, setFacts] = useState([]);
    const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);

    // Available languages
    const languages = [
        { label: 'English', value: 'en' },
        { label: 'German', value: 'de' },
    ];

    // Fetch random facts
    const fetchFacts = async () => {
        try {
            const fetchedFacts = [];
            for (let i = 0; i < amount; i++) {
                const response = await fetch(`https://uselessfacts.jsph.pl/random.json?language=${language}`);
                const data = await response.json();
                fetchedFacts.push({ text: data.text, id: `${data.id}-${i}` });
            }
            setFacts(fetchedFacts);
        } catch (error) {
            console.error('Error fetching facts:', error);
            setFacts([{ text: 'Error fetching data. Please try again later.', id: 'error' }]);
        }
    };

    // Save a fact to favourites
    const saveToFavourites = async (fact) => {
        try {
            const storedFavourites = await AsyncStorage.getItem('favourites');
            const favourites = storedFavourites ? JSON.parse(storedFavourites) : [];
            if (!favourites.some((f) => f.text === fact.text)) {
                favourites.push(fact);
                await AsyncStorage.setItem('favourites', JSON.stringify(favourites));
                alert('Fact added to favourites!');
            } else {
                alert('Fact is already in favourites!');
            }
        } catch (error) {
            console.error('Error saving to favourites:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Random Fact Generator</Text>

            <Text>Select language: </Text>
            <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setLanguageModalVisible(true)}
            >
                <Text style={styles.dropdownText}>
                    {languages.find((lang) => lang.value === language)?.label || 'Select language'}
                </Text>
            </TouchableOpacity>

            <Modal
                visible={isLanguageModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setLanguageModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {languages.map((lang) => (
                            <TouchableOpacity
                                key={lang.value}
                                style={styles.modalItem}
                                onPress={() => {
                                    setLanguage(lang.value);
                                    setLanguageModalVisible(false);
                                }}
                            >
                                <Text style={styles.modalItemText}>{lang.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Modal>

            <Text style={styles.checkboxLabel}>Amount of jokes: </Text>

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

            {/* Generate Facts Button */}
            <TouchableOpacity style={styles.generateButton} onPress={fetchFacts}>
                <Text style={styles.generateButtonText}>Generate Facts</Text>
            </TouchableOpacity>

            <FlatList
                data={facts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.factContainer}>
                        <Text style={styles.fact}>{item.text}</Text>
                        <TouchableOpacity onPress={() => saveToFavourites(item)}>
                            <FontAwesome name="star" size={24} color="#FFD700" />
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.noFacts}>No facts to display.</Text>}
            />
        </View>
    );
};

export default FactsPage;

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
    factContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    fact: {
        color: '#000',
        flex: 1,
        marginRight: 10,
    },
    noFacts: {
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
});
