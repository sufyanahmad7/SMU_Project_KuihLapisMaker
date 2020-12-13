import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function BlockRGB(props) 
{
  return (
    <View style={[
        props.style,
        {
                backgroundColor: `rgb(${props.red}, ${props.green}, ${props.blue})`,
                // padding:30,
                // width: 90,
        },
    ]}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
