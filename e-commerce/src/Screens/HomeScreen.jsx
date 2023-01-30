import {
  Button,
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import images from "../config/FlatLListImages";

const { width } = Dimensions.get("window");

const ITEM_WIDTH = width / 2 - 10 * 3;

export default function HomeScreen() {
  const [search, setSearch] = useState({
    nameCategory: "",
  });

  const handleChange = (value, field) => {
    setSearch({ [field]: value });
  };

  //top para saber el tamaño de todos los dispositivos

  const { top } = useSafeAreaInsets();

  //Ruta
  const navigation = useNavigation();

  //Guardar nuestras categorias

  const [category, setCategory] = useState([]);

  //Obtener las categorias

  const getCategory = async () => {
    try {
      //para poder acceder y obtener la peticion del axios en la desectructuracion tiene que ser data, que por lo general lo definimos cuando estamos en el backend

      // const {category} = await axios.get("/category")  ASI ESTA MAL

      const { data } = await axios.get("/category");

      console.log(data.data);

      //Ahora esa informacion que obtuvimos gracias al axios la guardamos en nuestro setCategory

      setCategory(data.data);
    } catch (error) {
      console.log(`error en la funcion getCategory `, error.message);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  console.log(search);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View style={{ ...styles.viewpadre, top: top + 20 }}>
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: "white",
                padding: 10,
                borderRadius: 100,
                marginBottom: 7,
                alignSelf: "center",
              }}
            >
              <Ionicons name="person" color={"#93c5fd"} size={30} />
            </View>
            <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
              Bienvenido {}
            </Text>
          </TouchableOpacity>

          {/* TextInput busqueda */}

          <View
            style={{
              padding: 10,
              flexDirection: "row",
              borderRadius: 15,
              marginTop: 20,
              paddingHorizontal: 50,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              ...styles.shadow,
            }}
          >
            <Ionicons name="search" color={"#71717a"} size={15} />
            <TextInput
              placeholder="Buscar categoria"
              style={{ marginLeft: 8 }}
              onChangeText={(value) => handleChange(value, "search")}
            />
          </View>
            
          
            <FlatList
          style={{ marginTop: 10 * 2, marginBottom: 280 }}
          data={images}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          
          contentContainerStyle={{paddingHorizontal:10}}
          renderItem={({ item }) => (
            <View style={{backgroundColor:"white" , marginHorizontal:12, ...styles.viewFlat , borderRadius:10, borderColor:"white",borderWidth:4 , justifyContent:"center", alignSelf:"center"}}>
            <TouchableOpacity>
              <Image
                style={{
                  width: 300,
                  height: 180,
                  borderRadius:10
                  
                }}
                source={item.image}
              />
              
              
            </TouchableOpacity>
            </View>
          )}
        />

            {/* <View style={{flex:1,backgroundColor:"blue", width:50}}>
              
            </View> */}
            
          
        </View>
        </ScrollView>
      
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  viewpadre: {
    alignItems: "center",
    flex: 1,
  },

  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 7,
  },

  viewFlat:{
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 6,
},
shadowOpacity: 0.39,
shadowRadius: 8.30,

elevation: 13,
  }

});
