import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Button } from "react-native";

const MainScreen = ({ navigation }) => {
  const [doorState, setDoorState] = useState("closed");

  const toggleDoor = async () => {
    const url = `http://192.168.1.29:80/${
      doorState === "closed" ? "open" : "close"
    }`;
    try {
      const response = await fetch(url);
      const result = await response.text();
      console.log(result);
      setDoorState(doorState === "closed" ? "open" : "closed");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>PROJECT LOCK</Text>
      </View>
      <View
        style={[
          styles.outerCircle,
          { borderColor: doorState === "closed" ? "green" : "red" },
        ]}
      >
        <TouchableOpacity style={styles.button} onPress={toggleDoor}>
          <Text style={styles.buttonText}>
            {doorState === "closed" ? "Open Door" : "Close Door"}
          </Text>
        </TouchableOpacity>
        <View
          style={[
            styles.led,
            { backgroundColor: doorState === "closed" ? "green" : "red" },
          ]}
        />
      </View>
      <Button
        title="Setup ESP32"
        onPress={() => navigation.navigate("Setup")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d1d5de",
  },
  title: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  titleText: {
    fontSize: 38,
    fontWeight: "800",
  },
  outerCircle: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderRadius: 110,
    width: 280,
    height: 280,
    backgroundColor: "transparent",
  },
  button: {
    width: 250,
    height: 250,
    borderRadius: 100,
    backgroundColor: "#ffff",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 35,
    fontWeight: "600",
  },
  led: {
    position: "absolute",
    top: 200,
    width: 35,
    height: 10,
    borderRadius: 10,
  },
});

export default MainScreen;
