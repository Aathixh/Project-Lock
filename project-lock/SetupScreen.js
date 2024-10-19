import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert } from "react-native";
import WifiManager from "react-native-wifi-reborn";

const SetupScreen = ({ navigation }) => {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [isConnectedToESP32, setIsConnectedToESP32] = useState(false);

  const connectToESP32 = async () => {
    try {
      await WifiManager.connectToProtectedSSID(
        "ESP32_Hotspot",
        "12345678",
        false
      );
      console.log("Connected to ESP32 AP");
      Alert.alert("Connected to ESP32 AP");
      setIsConnectedToESP32(true);
    } catch (error) {
      console.error("Error connecting to ESP32 AP:", error);
      Alert.alert("Error connecting to ESP32 AP:", error.message);
    }
  };

  const sendCredentials = async () => {
    const url = "http://192.168.4.1/setup"; // ESP32 AP IP address
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `ssid=${ssid}&password=${password}`,
      });
      const result = await response.text();
      console.log(result);
      Alert.alert("Credentials sent", result);
    } catch (error) {
      console.error("Error sending credentials:", error);
      Alert.alert("Error sending credentials:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>SETUP ESP32</Text>
      </View>
      <Button title="Connect to ESP32" onPress={connectToESP32} />
      {isConnectedToESP32 && (
        <View style={styles.setupContainer}>
          <TextInput
            style={styles.input}
            placeholder="SSID"
            value={ssid}
            onChangeText={setSsid}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Send Credentials" onPress={sendCredentials} />
        </View>
      )}
      <Button
        title="Back to Main"
        onPress={() => navigation.navigate("Main")}
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
  setupContainer: {
    marginTop: 20,
    width: "80%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default SetupScreen;
