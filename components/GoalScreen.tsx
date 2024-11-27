'use client';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const API_URL = 'http://localhost:5000/api';

export default function GoalScreen() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get(`${API_URL}/goals`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGoals(response.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const addGoal = async () => {
    if (newGoal.trim() === '') return;
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.post(`${API_URL}/goals`, { description: newGoal }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewGoal('');
      fetchGoals();
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  const toggleGoal = async (id, completed) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.put(`${API_URL}/goals/${id}`, { completed: !completed }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchGoals();
    } catch (error) {
      console.error('Error toggling goal:', error);
    }
  };

  const deleteGoal = async (id) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.delete(`${API_URL}/goals/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchGoals();
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const renderGoal = ({ item }) => (
    <View style={styles.goalItem}>
      <TouchableOpacity onPress={() => toggleGoal(item._id, item.completed)}>
        <Ionicons 
          name={item.completed ? 'checkbox-outline' : 'square-outline'} 
          size={24} 
          color="#4CAF50" 
        />
      </TouchableOpacity>
      <Text style={[styles.goalText, item.completed && styles.completedGoal]}>
        {item.description}
      </Text>
      <TouchableOpacity onPress={() => deleteGoal(item._id)}>
        <Ionicons name="trash-outline" size={24} color="#FF0000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goals</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new goal"
          value={newGoal}
          onChangeText={setNewGoal}
        />
        <TouchableOpacity style={styles.addButton} onPress={addGoal}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={goals}
        renderItem={renderGoal}
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
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  goalText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  completedGoal: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});

