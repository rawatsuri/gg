import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';

const API_URL = 'http://localhost:5000/api';

export default function HomeScreen() {
  const [healthData, setHealthData] = useState([]);
  const [wealthData, setWealthData] = useState([]);

  useEffect(() => {
    fetchHealthData();
    fetchWealthData();
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

  const prepareChartData = (data, key) => {
    const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
    return {
      labels: sortedData.slice(-7).map(item => new Date(item.date).toLocaleDateString()),
      datasets: [{
        data: sortedData.slice(-7).map(item => item[key] || 0)
      }]
    };
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Health & Wealth Dashboard</Text>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Steps (Last 7 Days)</Text>
        <LineChart
          data={prepareChartData(healthData, 'steps')}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Income vs Expenses (Last 7 Days)</Text>
        <LineChart
          data={{
            labels: wealthData.slice(-7).map(item => new Date(item.date).toLocaleDateString()),
            datasets: [
              {
                data: wealthData.slice(-7).map(item => item.income || 0),
                color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
                strokeWidth: 2
              },
              {
                data: wealthData.slice(-7).map(item => item.expenses || 0),
                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                strokeWidth: 2
              }
            ],
            legend: ['Income', 'Expenses']
          }}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
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
  chartContainer: {
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
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4CAF50',
  },
});

