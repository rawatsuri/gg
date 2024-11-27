import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'http://localhost:5000/api';

export default function WealthFormScreen({ route }) {
  const navigation = useNavigation();
  const [formData, setFormData] = useState(route.params?.data || {
    amount: '',
    category: 'Income',
    description: '',
  });

  const handleChange = (name, value) => {
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const method = route.params?.data ? 'put' : 'post';
      const url = route.params?.data 
        ? `${API_URL}/wealth/${route.params.data._id}`
        : `${API_URL}/wealth`;

      const data = {
        ...formData,
        [formData.category.toLowerCase()]: parseFloat(formData.amount) || 0,
      };

      await axios[method](url, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigation.goBack();
    } catch (error) {
      console.error('Error submitting wealth data:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Log Financial Data</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={formData.amount}
          onChangeText={(value) => handleChange('amount', value)}
          keyboardType="numeric"
        />
        <Picker
          selectedValue={formData.category}
          onValueChange={(value) => handleChange('category', value)}
          style={styles.picker}
        >
          <Picker.Item label="Income" value="Income" />
          <Picker.Item label="Expense" value="Expense" />
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={formData.description}
          onChangeText={(value) => handleChange('description', value)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4CAF50',
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shado 3,
  },
  input: {
    height: 40,
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    height: 40,
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

