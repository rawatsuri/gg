import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const API_URL = 'http://localhost:5000/api';

export default function WealthScreen() {
  const [wealthData, setWealthData] = useState([]);
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpenses: 0, totalSavings: 0 });
  const navigation = useNavigation();

  useEffect(() => {
    fetchWealthData();
    fetchWealthSummary();
  }, []);

  const fetchWealthData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get(`${API_URL}/wealth`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWealthData(response.data);
    } catch (error) {
      console.error('Error fetching wealth data:', error);
    }
  };

  const fetchWealthSummary = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get(`${API_URL}/wealth/summary`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching wealth summary:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.delete(`${API_URL}/wealth/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchWealthData();
      fetchWealthSummary();
    } catch (error) {
      console.error('Error deleting wealth data:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Date: {new Date(item.date).toLocaleDateString()}</Text>
      <Text style={styles.itemText}>Category: {item.category}</Text>
      <Text style={styles.itemText}>Amount: ${item.income || item.expenses}</Text>
      <Text style={styles.itemText}>Description: {item.description}</Text>
      <View style={styles.itemButtons}>
        <TouchableOpacity onPress={() => navigation.navigate('WealthForm', { data: item })}>
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
      <Text style={styles.title}>Wealth Tracker</Text>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total Income: ${summary.totalIncome.toFixed(2)}</Text>
        <Text style={styles.summaryText}>Total Expenses: ${summary.totalExpenses.toFixed(2)}</Text>
        <Text style={styles.summaryText}>Total Savings: ${summary.totalSavings.toFixed(2)}</Text>
      </View>
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('WealthForm')}
      >
        <Text style={styles.addButtonText}>Add New Entry</Text>
      </TouchableOpacity>
      <FlatList
        data={wealthData}
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
  summary: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shado 3,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
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

