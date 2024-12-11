import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const fetchRandomJoke = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Any');
      const data = await response.json();
      setLoading(false);
      if (data.type === 'single') {
        setContent(data.joke);
      } else {
        setContent(`${data.setup}\n${data.delivery}`);
      }
    } catch (error) {
      setLoading(false);
      setContent('Error fetching joke. Please try again!');
    }
  };

  const fetchRandomFact = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
      const data = await response.json();
      setLoading(false);
      setContent(data.text);
    } catch (error) {
      setLoading(false);
      setContent('Error fetching fact. Please try again!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Facts & Jokes</Text>
      {loading && <Text style={styles.loadingText}>Loading...</Text>}

      {/* Kuvan näyttäminen */}
      <Image 
        source={require('../assets/Etusivu-kuva.png')} 
        style={styles.headerImage} 
      />

      {/* Napit kuvan alle */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonLeft} onPress={fetchRandomFact}>
          <Text style={styles.buttonText}>Get a Random Fact</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRight} onPress={fetchRandomJoke}>
          <Text style={styles.buttonText}>Get a Random Joke</Text>
        </TouchableOpacity>
      </View>

      {/* Sisältö */}
      {content !== '' && (
      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>Here's your result:</Text>
        <Text style={styles.resultText}>{content}</Text>
      </View>
    )}
  </View>
);
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Keskittää pystysuunnassa
    alignItems: 'center', // Keskittää vaakasuunnassa
    backgroundColor: '#fff',
    padding: 20,
  },
  headerImage: {
    width: '100%', // Skaalaa kuvan leveyden
    height: 180, // Korkeus
    resizeMode: 'contain', // Säilyttää mittasuhteet
    marginBottom: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 45,
    color: '#000',
  },
  loadingText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row', // Asettaa napit vaakasuoraan
    justifyContent: 'space-around', // Tasainen jako nappien välillä
    width: '100%', // Vie koko leveyden
    marginTop: 10, // Jättää tilaa kuvan alle
  },
  buttonLeft: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    width: '45%', // Leveys suhteutettuna
    alignItems: 'center',
  },
  buttonRight: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    width: '45%', // Leveys suhteutettuna
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    backgroundColor: '#f3f4f6', // Vaalea harmaa tausta
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000', // Varjo
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Varjo Androidille
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 10,
  },
  resultText: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic', // Kursivoitu tyyli
  },
});

