import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";

type ParallaxScrollViewProps = {
  headerBackgroundColor: { light: string; dark: string };
  renderForeground: () => React.ReactNode;
  children: React.ReactNode;
};

const ParallaxScrollView: React.FC<ParallaxScrollViewProps> = ({
  headerBackgroundColor,
  renderForeground,
  children,
}) => {
  const { light } = headerBackgroundColor; // Here, you can handle light or dark theme

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: light }]}
      contentContainerStyle={{ backgroundColor: light }}
    >
      <View style={{ height: 100 }}>{renderForeground()}</View>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default ParallaxScrollView;
