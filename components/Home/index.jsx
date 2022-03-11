import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ImageBackground,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Home_image from "../../assets/42_logo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index({ navigation }) {
  const [login, onChangeLogin] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const image = {
    uri: "https://images.unsplash.com/photo-1530176928500-2372a88e00b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fDNkJTIwYmFja2dyb3VuZCUyMHdoaXRlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  };
  const getToken = async () => {
    try {
      const response = await axios.post(`https://api.intra.42.fr/oauth/token`, {
        grant_type: "client_credentials",
        client_id:
          "160ec65318675dc7088c2c4b6139fbae91387ae8bcc71c363e0597676532bd70",
        client_secret:
          "21e6dfeba0b0cf4d69bd9d7516a1fafc3df090f4ba5e0538f9c6b3e258363ab0",
      });
      if (response.data) {
        console.log(response.data.access_token);
        return response.data.access_token;
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("catch");
    }
  };
  const sendData = async (login, token) => {
    try {
      var response = await axios.get(
        "https://api.intra.42.fr/v2/users/" + login.trim().toLowerCase(),
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
      if (response.data) {
        setLoading(false);
        navigation.navigate("Infos", { userData: response.data });
      }
    } catch (error) {
      console.log(error.message);
      alert("login doesnt exist");
      setLoading(false);
    }
  };

  const getUser = async (login) => {
    setLoading(true);
    login.trim();
    if (login && login !== "") {
      try {
        var token = await AsyncStorage.getItem("access_token");
        if (token) {
          token = JSON.parse(token);
          if (token.created_at + token.expires_in <= Date.now() / 1000) {
            console.log("token expired");
            token = await getToken();
            if (token)
              await AsyncStorage.setItem("access_token", JSON.stringify(token));
          }
        } else {
          token = await getToken();
          console.log(token);
          if (token)
            await AsyncStorage.setItem("access_token", JSON.stringify(token));
        }
        await sendData(login, token);
      } catch (error) {
        console.log(error);
        alert(error);
        setLoading(false);
      }
    } else alert("you should set a login first");
    setLoading(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
    viewContainer: {
      marginTop: -100,
      alignItems: "center",
      justifyContent: "center",
    },
    tinyLogo: {
      width: 150,
      height: 150,
      maxWidth: 200,
      maxHeight: 200,
      marginLeft: -20,
    },
    input: {
      width: "80%",
      margin: 12,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: "#EA7523",
      backgroundColor: "white",
      padding: 10,
    },
    button: {
      backgroundColor: "#EA7523",
      width: "80%",
      padding: 10,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
    },
    text: {
      fontWeight: "bold",
      color: "white",
      fontSize: 17,
    },
  });

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={image}
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!loading ? (
            <View style={styles.viewContainer}>
              <Image
                style={styles.tinyLogo}
                source={Home_image}
                resizeMode="cover"
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangeLogin}
                value={login}
                placeholder="Login"
              />
              <Pressable style={styles.button} onPress={() => getUser(login)}>
                <Text style={styles.text}>Search</Text>
              </Pressable>
            </View>
          ) : (
            <ActivityIndicator size="large" color="#EA7523" />
          )}
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}
