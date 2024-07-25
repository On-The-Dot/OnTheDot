import React, { useMemo } from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

export type MonthType = {
  sAT?: string;

  /** Style props */
  monthPosition?: string;
  monthMarginLeft?: number | string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const Month = ({ sAT, monthPosition, monthMarginLeft }: MonthType) => {
  const monthStyle = useMemo(() => {
    return {
      ...getStyleValue("position", monthPosition),
      ...getStyleValue("marginLeft", monthMarginLeft),
    };
  }, [monthPosition, monthMarginLeft]);

  return (
    <View style={[styles.month, monthStyle]}>
      <Text style={styles.sat}>{sAT}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sat: {
    fontSize: FontSize.overline_size,
    letterSpacing: 2,
    lineHeight: 12,
    textTransform: "uppercase",
    fontFamily: FontFamily.overline,
    color: Color.baseGray40,
    textAlign: "center",
  },
  month: {
    width: 30,
    height: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Month;
