import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const Header = ({ title }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      {/* Viiva Headerin alapuolella */}
      <View style={styles.bottomLine} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#121212', // Tumma taustaväri
  },
  header: {
    backgroundColor: '#121212',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center', // Keskittää otsikon
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomLine: {
    height: 3, // Viivan paksuus
    backgroundColor: '#333', // Viivan väri
    width: '100%', // Viiva vie koko leveyden
  },
  
});

export default Header;
