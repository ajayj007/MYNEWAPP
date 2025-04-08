// components/BitcoinChartScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, ScrollView } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const BitcoinChartScreen = () => {
    const [dataPoints, setDataPoints] = useState<{ value: number }[]>([]);

  const [currentPrice, setCurrentPrice] = useState<number | null>(null);

  const fetchBitcoinPrice = async () => {
    try {
      const response = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
      const price = parseFloat(response.data.price);
      setCurrentPrice(price);
      setDataPoints(prevData => [...prevData.slice(-19), { value: price }]);
    } catch (error) {
      console.error('Error fetching BTC price:', error);
    }
  };

  useEffect(() => {
    fetchBitcoinPrice();
    const interval = setInterval(fetchBitcoinPrice, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Button Clicked',
      text2: 'You clicked the button ✅',
    });
  };

  return (
    <View>
      <Text style={styles.header}>📊 BTC/USDT (Binance)</Text>
      <Text style={styles.price}>
        Current Price: {currentPrice ? `$${currentPrice.toFixed(2)}` : 'Loading...'}
      </Text>

      {dataPoints.length > 0 ? (
        <ScrollView horizontal>
        <LineChart
          data={dataPoints}
          isAnimated={true}
          thickness={2}
          color="#f7931a"
          maxValue={Math.max(...dataPoints.map(d => d.value), 50000) + 100}
          noOfSections={4}
          yAxisLabelPrefix="$"
          showVerticalLines={true}
          spacing={30}
          backgroundColor="#1e1e1e"
          hideRules={true}
          xAxisColor="#ccc"
          yAxisColor="#ccc"
        />
      </ScrollView>
      
      ) : (
        <ActivityIndicator size="large" color="#f7931a" style={{ marginVertical: 20 }} />
      )}

      <View style={styles.buttonContainer}>
        <Button title="Click me!" onPress={handleToast} color="#f7931a" />
      </View>
    </View>
  );
};

export default BitcoinChartScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: '#f7931a',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    paddingHorizontal: 50,
  },
});
