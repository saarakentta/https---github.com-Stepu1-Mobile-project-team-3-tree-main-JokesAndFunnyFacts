import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  
  // HomePage
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  homeHeaderImage: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  homeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  homeButtonFact: {
    backgroundColor: '#FF8C42',
    padding: 15,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  homeButtonJoke: {
    backgroundColor: '#5DAE5D',
    padding: 15,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  homeResultContainer: {
    marginTop: 20,
    backgroundColor: '#f3f4f6',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  homeResultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  homeResultText: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  homeShareButton: {
    marginTop: 15,
    backgroundColor: '#73b5d1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
  },
  homeShareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  homeLoadingText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  iconButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    width: '60%',
  },
  iconButton: {
    backgroundColor: '#f3f4f6',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  

  // FavouritesPage
  favouritesContainer: {
    flex: 1,
  },
  favouritesFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  favouritesFilterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#eaeaea',
    elevation: 2,
  },
  favouritesAllButton: {
    backgroundColor: '#73b5d1',
  },
  favouritesFilterText: {
    color: '#333',
    fontWeight: 'bold',
  },
  favouritesActiveFilterText: {
    color: '#fff',
  },
  favouritesCardContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  favouritesColorBar: {
    width: 10,
    height: '100%',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  favouritesContentContainer: {
    flex: 1,
    padding: 15,
  },
  favouritesCardText: {
    fontSize: 16,
    color: '#333',
  },
  favouritesTimestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  favouritesDeleteContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    width: 80,
    borderRadius: 8,
    elevation: 2,
  },
  favouritesDeleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
  favouritesNoItemsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  
  // FactsPage tyylit
  factsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  factsScrollViewContainer: {
    flexGrow: 1,
  },
  factsHeaderImage: {
    width: '110%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  factsLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FF8C42',
  },
  factsDropdownButton: {
    borderWidth: 1,
    borderColor: '#FF8C42',
    backgroundColor: '#FFF7F2',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  factsDropdownText: {
    fontSize: 16,
  },
  factsCheckboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  factsCheckbox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FF8C42',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  factsCheckedCheckbox: {
    backgroundColor: '#FF8C42',
  },
  factsCheckboxText: {
    fontSize: 16,
    color: '#FF8C42',
  },
  factsCheckedText: {
    color: '#fff',
  },
  factsGenerateButton: {
    backgroundColor: '#FF8C42',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  factsGenerateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  factsContainerItem: {
    backgroundColor: '#FFF7F2',
    borderLeftWidth: 5,
    borderColor: '#FF8C42',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  factsItemText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  factsIconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15,
  },
  factsModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  factsModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  factsModalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  factsModalItemText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },

  // JokesPages tyylit
  jokesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  jokesScrollViewContainer: {
    flexGrow: 1,
  },
  jokesHeaderImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  jokesSmallHeaderImage: {
    width: '60%',
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  jokesLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#5DAE5D',
  },
  jokesDropdownButton: {
    borderWidth: 1,
    borderColor: '#5DAE5D',
    backgroundColor: '#E6F5E6',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  jokesDropdownText: {
    fontSize: 16,
  },
  jokesCheckboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  jokesCheckbox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#5DAE5D',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  jokesCheckedCheckbox: {
    backgroundColor: '#5DAE5D',
  },
  jokesCheckboxText: {
    fontSize: 16,
    color: '#5DAE5D',
  },
  jokesCheckedText: {
    color: '#fff',
  },
  jokesGenerateButton: {
    backgroundColor: '#5DAE5D',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  jokesGenerateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  jokesContainerItem: {
    backgroundColor: '#E6F5E6',
    borderLeftWidth: 5,
    borderColor: '#5DAE5D',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  jokesItemText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  jokesIconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15,
  },
  jokesModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  jokesModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  jokesModalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  jokesModalItemText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
});
