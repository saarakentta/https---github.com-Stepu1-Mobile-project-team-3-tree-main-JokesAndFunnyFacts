import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function HomePage() {
  const [loading, setLoading] = useState(false);

  // Vitsin hakeminen API:sta
  const fetchRandomJoke = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Any');
      const data = await response.json();
      setLoading(false);
      if (data.type === 'single') {
        Alert.alert('Here is your joke:', data.joke);
      } else {
        Alert.alert('Here is your joke:', `${data.setup}\n${data.delivery}`);
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to fetch joke. Please try again!');
    }
  };

  // Faktan hakeminen API:sta
  const fetchRandomFact = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
      const data = await response.json();
      setLoading(false);
      Alert.alert('Here is your fact:', data.text);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to fetch fact. Please try again!');
    }
  };

  console.log("HomePage rendered"); // Debug-tarkistus

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Facts & Jokes</Text>
      {loading && <Text style={styles.loadingText}>Loading...</Text>}
      <TouchableOpacity style={styles.button} onPress={fetchRandomJoke}>
        <Text style={styles.buttonText}>Get a Random Joke</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={fetchRandomFact}>
        <Text style={styles.buttonText}>Get a Random Fact</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  loadingText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
