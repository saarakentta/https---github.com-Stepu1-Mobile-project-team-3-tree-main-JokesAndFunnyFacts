import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Share } from 'react-native';
import Header from '../components/Header';
import { globalStyles } from '../styles';

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [resultTitleColor, setResultTitleColor] = useState('#FF8C42'); // Oletusväri oranssi

  const fetchRandomJoke = async () => {
    setLoading(true);
    setResultTitleColor('#5DAE5D'); // Vihreä väri vitseille
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Any');
      const data = await response.json();
      setLoading(false);
      setContent(data.type === 'single' ? data.joke : `${data.setup}\n${data.delivery}`);
    } catch (error) {
      setLoading(false);
      setContent('Error fetching joke. Please try again!');
    }
  };

  const fetchRandomFact = async () => {
    setLoading(true);
    setResultTitleColor('#FF8C42'); // Oranssi väri faktoille
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

  const shareContent = async () => {
    try {
      await Share.share({
        message: `Here's something interesting for you: \n${content}`,
      });
    } catch (error) {
      console.error('Error sharing content:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Facts And Jokes" />

      <View style={globalStyles.homeContainer}>
        {loading && <Text style={globalStyles.homeLoadingText}>Loading...</Text>}

        {/* Kuvan näyttäminen */}
        <Image
          source={require('../assets/Etusivu-kuva.png')}
          style={globalStyles.homeHeaderImage}
        />

        {/* Napit kuvan alle */}
        <View style={globalStyles.homeButtonContainer}>
          <TouchableOpacity style={globalStyles.homeButtonFact} onPress={fetchRandomFact}>
            <Text style={globalStyles.homeButtonText}>Get a Random Fact</Text>
          </TouchableOpacity>
          <TouchableOpacity style={globalStyles.homeButtonJoke} onPress={fetchRandomJoke}>
            <Text style={globalStyles.homeButtonText}>Get a Random Joke</Text>
          </TouchableOpacity>
        </View>

        {/* Sisältö ja Share-nappi */}
        {content !== '' && (
          <View style={globalStyles.homeResultContainer}>
            <Text style={[globalStyles.homeResultTitle, { color: resultTitleColor }]}>
              Here's your result:
            </Text>
            <Text style={globalStyles.homeResultText}>{content}</Text>
            {/* Jakamisnappi */}
            <TouchableOpacity style={globalStyles.homeShareButton} onPress={shareContent}>
              <Text style={globalStyles.homeShareButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
