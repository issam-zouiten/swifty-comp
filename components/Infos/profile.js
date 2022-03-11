import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
    ScrollView
} from 'react-native';
import * as Progress from "react-native-progress";
import defaultImage from "../../assets/default_img.png";

export default function Profile({ route }) {
    const { userData } = route.params;
    console.log(userData)
    const [cursus, setCursus] = useState(userData.cursus_users[userData.cursus_users.length - 1]);
    const [image, setImage] = useState(null)

    //check image 
    function checkImage(url) {
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.send();
        request.onload = function () {
            if (request.status == 200) //if(statusText == OK)
            {
                setImage(url)
            } else {
                console.log("image doesn't exist");
            }
        }
    }
    useEffect(() => {
        checkImage(userData.image_url);
    }, [])
    // cursus infos
    const grade = cursus?.grade;
    const cursus_skills = cursus?.skills;
    const level = cursus?.level;
    var level_per = 0;
    if (level)
        level_per = (level % 100) - parseInt(level);
    return (
        <SafeAreaView style={styles.container}>

            <ImageBackground
                style={styles.header}
                // blurRadius={5}
                source={{ uri: 'https://images.unsplash.com/photo-1530176928500-2372a88e00b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fDNkJTIwYmFja2dyb3VuZCUyMHdoaXRlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60' }}
            />

            {image ? <Image style={styles.avatar} source={{ uri: `${image}` }} /> : <Image style={styles.avatar} source={{ uri: `${image}` }} />}
            <View style={styles.body1}>
                <Text style={styles.name}>{userData.login}</Text>
                <Text style={styles.info}>{userData.usual_full_name}</Text>
                <Text style={styles.info}>{userData.email}</Text>
                <View style={{ marginTop: 20, alignItems: "center", justifyContent: 'center' }}>
                    <Progress.Bar
                        progress={level_per}
                        width={300}
                        color="#EA7523"
                        height={20}
                    >
                        <Text
                            style={{
                                position: "absolute",
                                color: "#000",
                                fontSize: 11,
                                marginLeft: 120,
                                marginTop: 3
                            }}
                        >
                            Level {level}%
                        </Text>
                    </Progress.Bar>
                </View>
            </View>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <View style={styles.body}>
                    <View style={styles.bodyContent}>

                        {/* <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text> */}
                        <View style={{ flexDirection: "column",  marginBottom: 30 }}>
                            {cursus_skills?.map((item, i) => {
                                return (
                                    <View key={item.id} style={{  marginBottom: 5 }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text
                                                style={{
                                                    color: "black",
                                                    textAlign: "center",
                                                    marginBottom: 4,
                                                }}
                                            >
                                                {item.name}
                                            </Text>
                                            <Text style={{
                                                fontSize: 12,
                                                fontWeight: "bold",
                                                color: "#EA7523",
                                                alignItems: "flex-end",
                                                marginBottom: 2
                                            }}>{item.level.toFixed(2)}%</Text>
                                        </View>
                                        {/* <ProgressBar
                                            progress={item.level.toFixed(2) / 100}
                                            color="#EA7523"
                                            style={{ width: 300, height: 5 }}
                                        /> */}
                                    </View>
                                );
                            })}
                        </View>

                        {/* <TouchableOpacity style={styles.buttonContainer}>
                        <Text>Opcion 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text>Opcion 2</Text>
                    </TouchableOpacity> */}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    );

}

const styles = StyleSheet.create({
    header: {
        // backgroundColor: "#00BFFF",
        height: 200,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 1,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130
    },
    headerBackgroundImage: {
        paddingBottom: 20,
        paddingTop: 45,
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    body: {
        margin: 5,
        marginBottom: 350,
    },
    body1: {
        marginTop: 60,
        alignSelf: 'center',
        alignItems: 'center',
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,

    },
    name: {
        fontSize: 28,
        color: "#696969",
        fontWeight: "600"
    },
    info: {
        fontSize: 13,
        color: "#696969",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
    scroll: {
        width: "100%",
        height: "100%",
    },
});