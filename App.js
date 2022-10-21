import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, Button } from 'react-native';
import * as Contacts from 'expo-contacts'
import { useState } from 'react';

export default function App() {

  const [contact, setContact] = useState({});
  const [list, setList] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers] }
      );

      setList(data)
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.table}>
        <FlatList
          data={list}
          keyExtractor={ item => item.lookupKey}
          renderItem={({ item }) => {
            const { name, phoneNumbers } = item;
            return (<Text>{`${name}     ${phoneNumbers ? phoneNumbers[0].number : '(no phone number)'}`}</Text>)
          }}
          ListEmptyComponent={<Text>Get some contacts!</Text>}
        />
      </View>
      
      <View style={styles.button}>
        <Button title="Hae" onPress={getContacts} />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  table: {
    height: '70%'
  },
  button: {
    margin: 20
  }
});
