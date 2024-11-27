import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'http://localhost:5000/api';

export default function HealthFormScreen({ route }) {
  const navigation = useNavigation();
  const [formData, setFormData] = useState(route.params?.data || {
    steps: '',
    caloriesBurned: '',
    waterIntake: '',
    weight: '',
    sleepHours: '',
    mood: '',
  });

  const handleChange = (name, value) => {
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const method = route.params?.data ? 'put' : 'post';
      const url = route.params?.data 
        ? `${API_URL}/health/${route.params.data._id}`
        : `${API_URL}/health`;

      await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigation.goBack();
    } catch (error) {
      console.error('Error submitting health data:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Log Health Data</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Steps"
          value={formData.steps}
          onChangeText={(value) => handleChange('steps', value)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Calories Burned"
          value={formData.caloriesBurned}
          onChangeText={(value) => handleChange('caloriesBurned', value)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Water Intake (ml)"
          value={formData.waterIntake}
          onChangeText={(value) => handleChange('waterIntake', value)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Weight (kg)"
          value={formData.weight}
          onChangeText={(value) => handleChange('weight', value)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Sleep Hours"
          value={formData.sleepHours}
          onChangeText={(value) => handleChange('sleepHours', value)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Mood"
          value={formData.mood}
          onChangeText={(value) => handleChange('mood', value)}
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
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    height: 40,
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
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

