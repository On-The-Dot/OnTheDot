import React, { useMemo } from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

export type DateinactiveType = {
  carModelNumber?: string;

  /** Style props */
  dateinactivePosition?: string;
  dateinactiveHeight?: number | string;
  dateinactiveBorderRadius?: number;
  dateinactiveMarginLeft?: number | string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const Dateinactive = ({
  carModelNumber,
  dateinactivePosition,
  dateinactiveHeight,
  dateinactiveBorderRadius,
  dateinactiveMarginLeft,
}: DateinactiveType) => {
  const dateinactiveStyle = useMemo(() => {
    return {
      ...getStyleValue("position", dateinactivePosition),
      ...getStyleValue("height", dateinactiveHeight),
      ...getStyleValue("borderRadius", dateinactiveBorderRadius),
      ...getStyleValue("marginLeft", dateinactiveMarginLeft),
    };
  }, [
    dateinactivePosition,
    dateinactiveHeight,
    dateinactiveBorderRadius,
    dateinactiveMarginLeft,
  ]);

  return (
    <View style={[styles.dateinactive, dateinactiveStyle]}>
      <Text style={styles.text}>{carModelNumber}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: FontSize.h4_size,
    lineHeight: 18,
    fontFamily: FontFamily.overline,
    color: Color.baseGray80,
    textAlign: "center",
    width: 20,
    height: 15,
  },
  dateinactive: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Dateinactive;
