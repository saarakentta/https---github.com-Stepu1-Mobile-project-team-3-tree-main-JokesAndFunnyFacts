import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FavouritesContext } from '../context/FavouritesContext';
import { Share } from 'react-native';
import Header from '../components/Header';
import { globalStyles } from '../styles';

const shareJoke = async (joke) => {
  try {
    await Share.share({
      message: `Here's a funny joke: ${joke.text}`,
    });
  } catch (error) {
    console.error('Error sharing joke:', error);
  }
};

const JokesPage = () => {
  const { addFavourite } = useContext(FavouritesContext);

  const [category, setCategory] = useState('Programming');
  const [amount, setAmount] = useState(1);
  const [jokes, setJokes] = useState([]);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [showImage, setShowImage] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const categories = [
    { label: 'Programming', value: 'Programming' },
    { label: 'Miscellaneous', value: 'Misc' },
    { label: 'Dark', value: 'Dark' },
    { label: 'Pun', value: 'Pun' },
    { label: 'Spooky', value: 'Spooky' },
    { label: 'Christmas', value: 'Christmas' },
  ];

  const fetchJokes = async () => {
    setShowImage(false);
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
    addFavourite({ ...joke, type: 'joke' });
    alert('Joke saved to favourites!');
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setJokes([]);
      setShowImage(true);
      setRefreshing(false);
    }, 1000);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Jokes" />

      <ScrollView
        contentContainerStyle={globalStyles.jokesScrollViewContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={globalStyles.jokesContainer}>
          {showImage && (
            <Image
              source={require('../assets/Jokeri.png')}
              style={
                jokes.length === 0
                  ? globalStyles.jokesHeaderImage
                  : globalStyles.jokesSmallHeaderImage
              }
            />
          )}

          <Text style={globalStyles.jokesLabel}>Select category:</Text>
          <TouchableOpacity
            style={globalStyles.jokesDropdownButton}
            onPress={() => setCategoryModalVisible(true)}
          >
            <Text style={globalStyles.jokesDropdownText}>
              {categories.find((cat) => cat.value === category)?.label || 'Select category'}
            </Text>
          </TouchableOpacity>

          <Modal
            visible={isCategoryModalVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setCategoryModalVisible(false)}
          >
            <View style={globalStyles.jokesModalOverlay}>
              <View style={globalStyles.jokesModalContent}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.value}
                    style={globalStyles.jokesModalItem}
                    onPress={() => {
                      setCategory(cat.value);
                      setCategoryModalVisible(false);
                    }}
                  >
                    <Text style={globalStyles.jokesModalItemText}>{cat.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Modal>

          <Text style={globalStyles.jokesLabel}>Amount of jokes:</Text>
          <View style={globalStyles.jokesCheckboxContainer}>
            {[1, 2, 3].map((num) => (
              <TouchableOpacity
                key={num}
                style={[
                  globalStyles.jokesCheckbox,
                  amount === num && globalStyles.jokesCheckedCheckbox,
                ]}
                onPress={() => setAmount(num)}
              >
                <Text
                  style={[
                    globalStyles.jokesCheckboxText,
                    amount === num && globalStyles.jokesCheckedText,
                  ]}
                >
                  {num}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={globalStyles.jokesGenerateButton} onPress={fetchJokes}>
            <Text style={globalStyles.jokesGenerateButtonText}>Generate Jokes</Text>
          </TouchableOpacity>

          {jokes.map((item, index) => (
            <View style={globalStyles.jokesContainerItem} key={index}>
              <Text style={globalStyles.jokesItemText}>{item.text}</Text>
              <View style={globalStyles.jokesIconContainer}>
                <TouchableOpacity onPress={() => saveToFavourites(item)}>
                  <FontAwesome name="star" size={24} color="#5DAE5D" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => shareJoke(item)}>
                  <FontAwesome name="share-alt" size={24} color="#32CD32" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default JokesPage;
