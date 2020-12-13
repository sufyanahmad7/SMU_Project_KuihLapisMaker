import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, useWindowDimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import BlockRGB from "./components/BlockRGB";
import { FlatList } from 'react-native-gesture-handler';

const NUM_COLUMNS = 10;

function HomeScreen({navigation}) 
{
  const [colorArray, setColorArray] = useState([]);

  // Setting the dimensions of 1 colour block.
  const BLOCK_SIZE = useWindowDimensions().width / NUM_COLUMNS;

  useEffect(() => 
  {
    navigation.setOptions
    ({
      headerRight: () => <Button onPress={addColor} title="Add Color" />,
      headerLeft: () => <Button onPress={resetColor} title="Reset" />,
    })
    // alert("You just pressed a button!");
  })

  function renderItem({item})
  {
    return (
    <TouchableOpacity onPress={() => navigation.navigate("DetailsScreen", { ...item })}>
      <BlockRGB 
      // style={{height:60, width:90}} 
      style={{height:BLOCK_SIZE, width:BLOCK_SIZE}} 
      red={item.red} green={item.green} blue={item.blue} />
    </TouchableOpacity>
    )
  }

  function addColor()
  {
    let newColor = 
    {
      red: Math.floor(Math.random() * 256),
      green: Math.floor(Math.random() * 256),
      blue: Math.floor(Math.random() * 256),
      id: `${colorArray.length}`,
    };
    setColorArray([...colorArray, newColor]);
  }

  function resetColor()
  {
    setColorArray([]);
  }
     
    return (
      <View style={styles.container}>
      {/* Buttons below the header */}
      {/* <TouchableOpacity
        style={{ height: 40, justifyContent: "center" }}
        onPress={addColor}
      >
        <Text style={{ color: "blue" }}>Add Colour</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ height: 40, justifyContent: "center" }}
        onPress={resetColor}
      >
        <Text style={{ color: "red" }}>Reset Colour</Text>
      </TouchableOpacity> */}
      
      <FlatList
        style={{ width: "100%" }}
        data={colorArray}
        renderItem={renderItem}
        // numColumns={4}
        numColumns={NUM_COLUMNS}
      />
    </View>
    );
}

function DetailsScreen({route})
{
  // Destructuring this so that we don't have to type route.params.red etc.
  const {red, green, blue} = route.params;

  const total = red + green + blue;

  return(
    <View style={[styles.container, {backgroundColor: `rgb(${red}, ${green}, ${blue})`}]}>
      <Text style={total<350 ? styles.detailTextLight : styles.detailText}>red: {red}</Text>
      <Text style={total<350 ? styles.detailTextLight : styles.detailText}>green: {green}</Text>
      <Text style={total<350 ? styles.detailTextLight : styles.detailText}>blue: {blue}</Text>
      {/* <Text style={styles.detailText}>Red: {red}</Text>
      <Text style={styles.detailText}>Green: {green}</Text>
      <Text style={styles.detailText}>Blue: {blue}</Text> */}
    </View>
  )
}

// Stack navigation for the app
const Stack = createStackNavigator();
export default function App() 
{
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name="Kuih Lapis Maker" 
        component={HomeScreen}  
        options=
        {{
          //  headerTitle: "Kuih Lapis",
           headerTitleStyle: 
           {
             fontWeight: "bold",
             fontSize: 23,
           },
           headerStyle: {
             height: 120,
             backgroundColor: "lightgreen",
             borderBottomColor: "#ccc",
             borderBottomWidth: 3,
           },
        }}
/>
      <Stack.Screen name="DetailsScreen"  options=
        {{headerTitle: "Color Details",}} component={DetailsScreen} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: 
  {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  detailText:
  {
    fontSize: 40,
    color: "black",
  },

  detailTextLight:
  {
    fontSize: 40,
    color: "white",
  },
});



