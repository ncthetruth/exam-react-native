import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, SafeAreaView, Text, Alert } from 'react-native';

type SubmitForm = {
  title: string;
  description: string;
  price: number;
  brand: string;
}

export default function DeleteScreen() {
  const [formData, setFormData] = useState<SubmitForm>({
    title: '',
    description: '',
    price: 0,
    brand: '',
  });
  const [id, setId] = useState<string>('');

  async function onPressSubmit() {
    try {
      if (!id.trim()) {
        Alert.alert('Error', 'ID cannot be empty');
        return;
      }

      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        Alert.alert('Success', 'Data deleted');
      } else if (response.status === 404) {
        Alert.alert('Error', 'ID not found');
      } else {
        Alert.alert('Error', 'Error deleting data');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      Alert.alert('Error', 'Error submitting form');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>
          Delete Data
        </Text>

        <TextInput
          style={styles.input}
          placeholder="ID"
          onChangeText={text => setId(text)}
          keyboardType="numeric"
          placeholderTextColor="#999"
        />

        <Button title='Delete' onPress={onPressSubmit} color="#448A63"/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#448A63',
    borderWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    borderRadius: 10,
  },
});
