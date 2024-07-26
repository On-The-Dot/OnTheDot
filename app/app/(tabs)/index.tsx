import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          style={styles.calendar}
          theme={{
            backgroundColor: '#f9f9f9', // Light background for a modern look
            calendarBackground: '#ffffff', // White background for the calendar
            textSectionTitleColor: '#6d6e71', // Light gray color for section titles
            selectedDayBackgroundColor: '#007bff', // Blue for selected day
            selectedDayTextColor: '#ffffff', // White text for selected day
            todayTextColor: '#ff5722', // Orange for today
            dayTextColor: '#333333', // Dark gray for day text
            textDisabledColor: '#b0b0b0', // Light gray for disabled days
            dotColor: '#007bff', // Blue dots for events
            selectedDotColor: '#ffffff', // White dots for selected day
            arrowColor: '#007bff', // Blue arrows
            monthTextColor: '#333333', // Dark gray for month text
            indicatorColor: '#007bff', // Blue indicator
            textDayFontFamily: 'Arial', // Modern font
            textMonthFontFamily: 'Arial', // Modern font
            textDayHeaderFontFamily: 'Arial', // Modern font
            textDayFontWeight: '400', // Regular weight
            textMonthFontWeight: '600', // Semi-bold weight
            textDayHeaderFontWeight: '400', // Regular weight
            textDayFontSize: 14, // Smaller font size
            textMonthFontSize: 16, // Slightly larger font size
            textDayHeaderFontSize: 14, // Header font size
          }}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5, // Remove padding to minimize space
  },
  calendarContainer: {
    marginTop: 20,
    marginBottom: 20, // Space below the calendar
    paddingBottom: 0, // Remove bottom padding
    paddingHorizontal: 10, // Add horizontal padding if needed
  },
  calendar: {
    borderWidth: 0, // Remove border
    borderRadius: 10, // Rounded corners for modern look
    elevation: 2, // Subtle shadow for depth
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    height: 350,
  },
});
