import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Projects({ route }) {
    //   const { userData } = route.params;

    //   console.log(userData);
    return (
        <View style={styles.container}>
            {/* <Image
        style={styles.userimage}
        source={{
          uri: userData.image_url,
        }}
      />
      <Text>{userData.usual_full_name}</Text>
      <Text>{userData.login}</Text>
      <Text>{userData.location}</Text>
      <Text>{userData.email}</Text> */}
            <Text>projects</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        padding: 10,
    },

    Button: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80vw'
    },
});