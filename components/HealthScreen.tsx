import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const API_URL = 'http://localhost:5000/api';

export default function HealthScreen() {
  const [healthData, setHealthData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchHealthData();
  }, []);

  const fetchHealthData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get(`${API_URL}/health`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHealthData(response.data);
    } catch (error) {
      console.error('Error fetching health data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.delete(`${API_URL}/health/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchHealthData();
    } catch (error) {
      console.error('Error deleting health data:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Date: {new Date(item.date).toLocaleDateString()}</Text>
      <Text style={styles.itemText}>Steps: {item.steps}</Text>
      <Text style={styles.itemText}>Calories: {item.caloriesBurned}</Text>
      <Text style={styles.itemText}>Water: {item.waterIntake} ml</Text>
      <View style={styles.itemButtons}>
        <TouchableOpacity onPress={() => navigation.navigate('HealthForm', { data: item })}>
          <Ionicons name="create-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item._id)}>
          <Ionicons name="trash-outline" size={24} color="#FF0000" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health Tracker</Text>
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('HealthForm')}
      >
        <Text style={styles.addButtonText}>Add New Entry</Text>
      </TouchableOpacity>
      <FlatList
        data={healthData}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
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
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shado 3,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
});

