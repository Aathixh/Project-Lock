import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

export default function App() {
  const [doorState, setDoorState] = useState("closed");

  const toggleDoor = () => {
    // Logic to send signal to ESP32
    if (doorState === "closed") {
      setDoorState("open");
      console.log("opening");
      // Send signal to open the door
    } else {
      setDoorState("closed");
      console.log("closing");
      // Send signal to close the door
    }
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d1d5de",
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
    fontWeight: "bold",
  },
  led: {
    position: "absolute",
    top: 200,
    width: 35,
    height: 10,
    borderRadius: 10,
  },
});
