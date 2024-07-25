import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Calendar} from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [events, setEvents] = useState<{ date: string; title: string; time: string; }[]>([
    { date: '2024-07-04', title: 'Work', time: '05:00 - 09:00pm' },
    { date: '2024-07-04', title: 'Work', time: '10:00 - 2:00pm' },
    { date: '2024-07-25', title: 'Work', time: '10:00 - 2:00pm' },
  ]);

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <ParallaxScrollView
      backgroundColor="blue"
      contentBackgroundColor="white"
      parallaxHeaderHeight={100}
      renderForeground={() => (
        <View style={styles.parallaxHeader}>
          <Text style={styles.parallaxHeaderText}>Calendar</Text>
        </View>
      )}
    >
      <View style={styles.container}>
        <Calendar
          onDayPress={onDayPress}
          markedDates={{
            [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
          }}
        />
        {selectedDate && (
          <View style={styles.eventBox}>
            <FlatList
              data={events.filter(event => event.date === selectedDate)}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.eventItem}>
                  <Text style={styles.eventTitle}>{item.title}</Text>
                  <Text style={styles.eventTime}>{item.time}</Text>
                </View>
              )}
              ListEmptyComponent={<Text style={styles.noEventsText}>No Events</Text>}
            />
          </View>
        )}
      </View>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  parallaxHeader: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  parallaxHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  eventBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    padding: 15,
  },
  eventItem: {
    backgroundColor: '#E0F7FA',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventTime: {
    fontSize: 16,
  },
  noEventsText: {
    textAlign: 'center',
    fontSize: 18,
    margin: 20,
  },
});

export default HomeScreen;
