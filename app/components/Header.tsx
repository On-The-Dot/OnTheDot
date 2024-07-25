import {View,Text} from 'react-native'

export default function Header() {
  return (
    <View
      style={{
        backgroundColor: "rgba(150,126,118,0.59)",
        paddingTop: 60,
        paddingBottom: 20,
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          color: "white",
          fontSize: 27,
          fontWeight: 800,
        }}
      >
        Find A Study Group
      </Text>
    </View>
  );
}