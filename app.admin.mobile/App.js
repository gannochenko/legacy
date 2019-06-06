import React from 'react';
import { StyleSheet, Text, View, WebView } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default class App extends React.Component {
    // https://kmagiera.github.io/react-native-gesture-handler/docs/component-swipeable.html
    render() {
        return (
            <Swipeable
                style={{ flex: 1 }}
                renderRightActions={(progress, dragX) => {
                    return <Text>"I am here!"</Text>;
                }}
            >
                <Text>
                    <View style={{ flex: 1 }}>
                        <View
                            style={{ flex: 1, backgroundColor: 'powderblue' }}
                        />
                        <View style={{ flex: 2, backgroundColor: 'skyblue' }} />
                        <View
                            style={{ flex: 3, backgroundColor: 'steelblue' }}
                        />
                    </View>
                </Text>
            </Swipeable>
        );

        //return <WebView source={{ uri: 'http://192.168.178.23:3000/' }} />;

        // return (
        //   <View style={styles.container}>
        //     <Text>!Open up App.js to start working on your app!</Text>
        //   </View>
        // );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    hello: {
        flex: 1,
    },
});
