import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, SafeAreaView, Text, Alert } from 'react-native';

type SubmitForm = {
  description: string,
  price: number,
  rating: number,
}

export default function CreateScreen() {
  const [formData, setFormData] = useState<SubmitForm>({
    description: '',
    price: 0,
    rating: 0,
  });

  async function onPressSubmit() {
    try {
      if (formData.description.trim() === '' || formData.price === 0 || formData.rating === 0) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }

      if (formData.rating < 1 || formData.rating > 5) {
        Alert.alert('Error', 'Rating should be between 1 and 5');
        return;
      }

      const response = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        Alert.alert('Success', 'Data created successfully');
        setFormData({ description: '', price: 0, rating: 0 });
      } else {
        throw new Error('Error creating data');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      Alert.alert('Error', 'Failed to submit form. Please try again later.');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>
          Create Data
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Description"
          onChangeText={text => setFormData({ ...formData, description: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Price"
          onChangeText={text => setFormData({ ...formData, price: parseFloat(text) })}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Rating"
          onChangeText={text => setFormData({ ...formData, rating: parseFloat(text) })}
          keyboardType="numeric"
        />

        <View style={styles.buttonContainer}>
          <Button title='Create' onPress={onPressSubmit} color="#448A63"/>
        </View>
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
  buttonContainer: {
    marginTop: 10,
  },
});
