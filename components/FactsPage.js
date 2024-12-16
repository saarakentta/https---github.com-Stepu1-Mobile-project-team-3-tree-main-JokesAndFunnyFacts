import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Modal, Image, ScrollView, RefreshControl } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FavouritesContext } from '../context/FavouritesContext';
import { Share } from 'react-native';
import Header from '../components/Header';
import { globalStyles } from '../styles';

const shareFact = async (fact) => {
  try {
    await Share.share({
      message: `Here's an interesting fact: ${fact.text}`,
    });
  } catch (error) {
    console.error('Error sharing fact:', error);
  }
};

const FactsPage = () => {
  const { addFavourite } = useContext(FavouritesContext);
  const [language, setLanguage] = useState('en');
  const [amount, setAmount] = useState(1);
  const [facts, setFacts] = useState([]);
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
  const [showImage, setShowImage] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const languages = [
    { label: 'English', value: 'en' },
    { label: 'German', value: 'de' },
  ];

  const fetchFacts = async () => {
    setShowImage(false);
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

  const saveToFavourites = (fact) => {
    addFavourite({ ...fact, type: 'fact' });
    alert('Fact saved to favourites!');
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setFacts([]);
      setShowImage(true);
      setRefreshing(false);
    }, 1000);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Facts" />
      <ScrollView
        contentContainerStyle={globalStyles.factsScrollViewContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={globalStyles.factsContainer}>
          {showImage && (
            <Image source={require('../assets/Einstein.png')} style={globalStyles.factsHeaderImage} />
          )}

          <Text style={globalStyles.factsLabel}>Select language:</Text>
          <TouchableOpacity
            style={globalStyles.factsDropdownButton}
            onPress={() => setLanguageModalVisible(true)}
          >
            <Text style={globalStyles.factsDropdownText}>
              {languages.find((lang) => lang.value === language)?.label || 'Select language'}
            </Text>
          </TouchableOpacity>

          <Modal
            visible={isLanguageModalVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setLanguageModalVisible(false)}
          >
            <View style={globalStyles.factsModalOverlay}>
              <View style={globalStyles.factsModalContent}>
                {languages.map((lang) => (
                  <TouchableOpacity
                    key={lang.value}
                    style={globalStyles.factsModalItem}
                    onPress={() => {
                      setLanguage(lang.value);
                      setLanguageModalVisible(false);
                    }}
                  >
                    <Text style={globalStyles.factsModalItemText}>{lang.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Modal>

          <Text style={globalStyles.factsLabel}>Amount of facts:</Text>
          <View style={globalStyles.factsCheckboxContainer}>
            {[1, 2, 3].map((num) => (
              <TouchableOpacity
                key={num}
                style={[
                  globalStyles.factsCheckbox,
                  amount === num && globalStyles.factsCheckedCheckbox,
                ]}
                onPress={() => setAmount(num)}
              >
                <Text
                  style={[
                    globalStyles.factsCheckboxText,
                    amount === num && globalStyles.factsCheckedText,
                  ]}
                >
                  {num}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={globalStyles.factsGenerateButton} onPress={fetchFacts}>
            <Text style={globalStyles.factsGenerateButtonText}>Generate Facts</Text>
          </TouchableOpacity>

          {facts.map((item) => (
            <View style={globalStyles.factsContainerItem} key={item.id}>
              <Text style={globalStyles.factsItemText}>{item.text}</Text>
              <View style={globalStyles.factsIconContainer}>
                <TouchableOpacity onPress={() => saveToFavourites(item)}>
                  <FontAwesome name="star" size={24} color="#FF8C42" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => shareFact(item)}>
                  <FontAwesome name="share-alt" size={24} color="#FFA07A" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default FactsPage;
