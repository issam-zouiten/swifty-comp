import React from 'react'
import { StyleSheet, Text, View, Button, Pressable, TextInput, ImageBackground } from 'react-native';
import axios from 'axios';
export default function Index({ navigation }) {
    const [login, onChangeLogin] = React.useState("");
    const image = { uri: "https://images.unsplash.com/photo-1530176928500-2372a88e00b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fDNkJTIwYmFja2dyb3VuZCUyMHdoaXRlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60" };
    const getToken = async () => {
        try {
            const response = await axios.post(`https://api.intra.42.fr/oauth/token`,
                {
                    grant_type: "client_credentials",
                    client_id: "160ec65318675dc7088c2c4b6139fbae91387ae8bcc71c363e0597676532bd70",
                    client_secret: "21e6dfeba0b0cf4d69bd9d7516a1fafc3df090f4ba5e0538f9c6b3e258363ab0",
                }
            )
            if (response.data) {
                return (response.data.access_token)
            }
            else {
                console.log("error");
            }
        } catch (error) {
            console.log("catch");
        }
    }

    const getUser = async (login) => {

        if (login) {
            try {
                const token = await getToken();
                const response = await axios.get(`https://api.intra.42.fr/v2/users/${login}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                if (response.data) {
                    console.log(response.data)
                    navigation.navigate('Infos', { userData: response.data })
                }
                else {
                    console.log("error");
                }
            } catch (error) {
                console.log(error);
            }
        }

    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
            flexDirection: 'column',
        },
        container1: {
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: "orange",
            flexDirection: 'column',
            padding: 15,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 6,
            },
            shadowOpacity: 0.39,
            shadowRadius: 8.30,

            elevation: 13,
        },
        button: {
            backgroundColor: "orange",
            width: 100,
            textAlign: 'center',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "orange",
            borderWidth: 1,
            borderColor: "orange",
            color: "red"
        },
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            borderColor: "orange",
            padding: 10,
            borderRadius: 5,
        },

    });

    return (
        <>
            <View style={styles.container}>
                <ImageBackground source={image} style={{
                    width: '100%', height: '100%', justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={styles.container1}>

                        {/* <Text style={{ color: "orange", fontWeight: "bold", fontSize: 30 }}>Home page</Text> */}
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeLogin}
                            value={login}
                            placeholder="Enter login"
                        />
                    </View>
                    <Pressable style={styles.button} title="Search" onPress={() => getUser(login)}><Text style={{ color: "white", fontWeight: "bold" }}>Search</Text></Pressable>
                </ImageBackground>
            </View>
        </>
    )
}