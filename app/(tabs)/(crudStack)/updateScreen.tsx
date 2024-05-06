import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, SafeAreaView, Text, Alert } from 'react-native';

type SubmitForm = {
  title: string;
  description: string;
  price: number;
  brand: string;
  discountPercentage: number;
}

export default function UpdateScreen() {
  const [formData, setFormData] = useState<SubmitForm>({
    title: '',
    description: '',
    price: 0,
    brand: '',
    discountPercentage: 0,
  });
  const [id, setId] = useState<string>('');

  const handlePriceChange = (text: string) => {
    const price = parseFloat(text);
    if (!isNaN(price)) {
      setFormData({ ...formData, price });
    }
  };

  const handleDiscountChange = (text: string) => {
    const discountPercentage = parseFloat(text);
    if (!isNaN(discountPercentage) && discountPercentage >= 0 && discountPercentage <= 100) {
      setFormData({ ...formData, discountPercentage });
    }
  };

  const onPressSubmit = async () => {
    if (!id.trim()) {
      Alert.alert('Error', 'ID cannot be empty');
      return;
    }

    if (
      formData.title.trim() === '' ||
      formData.description.trim() === '' ||
      formData.brand.trim() === '' ||
      formData.price <= 0
    ) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    if (formData.discountPercentage < 0 || formData.discountPercentage > 100) {
      Alert.alert('Error', 'Discount percentage must be between 0 and 100');
      return;
    }

    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        Alert.alert('Success', 'Data Updated');
      } else if (response.status === 404) {
        Alert.alert('Error', 'ID not found');
      } else {
        throw new Error('Error updating data');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      Alert.alert('Error', 'Failed to submit form. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>
          Update Data
        </Text>

        <TextInput
          style={styles.input}
          placeholder="ID"
          onChangeText={text => setId(text)}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Title"
          onChangeText={text => setFormData({ ...formData, title: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Description"
          onChangeText={text => setFormData({ ...formData, description: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Price"
          onChangeText={handlePriceChange}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Brand"
          onChangeText={text => setFormData({ ...formData, brand: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Discount Percentage"
          onChangeText={handleDiscountChange}
          keyboardType="numeric"
        />

        <Button title='Update' onPress={onPressSubmit} color="#448A63"/>
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
