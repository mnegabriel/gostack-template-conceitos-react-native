import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from "./services/api";

export default function App() {
  const [ repositories, setRepositories ] = useState([])

  useEffect( () => {
    api.get("repositories")
      .then( response => {
        console.log(response.data)
        setRepositories(response.data)
      })
      .catch( erro => console.log(erro) )
  }, [])


  async function handleLikeRepository(id) {
    console.log("feito")
    const resto = repositories.filter( repo => repo.id != id)
    console.log(resto)
    const curtido = await api.post(`/repositories/${id}/like`)
    console.log(curtido.data)
    setRepositories([...resto, curtido.data])
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <Text>Teste</Text>
        <FlatList 
          style={styles.container}
          data={repositories}
          keyExtractor={ repository => repository.id}
          renderItem={ ({ item }) => (

            <>
              <View style={styles.repositoryContainer}>

                <Text style={styles.repository}>{item.title}</Text>

                <View style={styles.techsContainer}>
                  <Text style={styles.tech}>{item.techs}</Text>
                </View>

              </View>


              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  testID={`repository-likes-${item.id}`}
                >
                  {item.likes} curtidas
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(item.id)}
                testID={`like-button-${item.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>

            </>
          )}
        />
        
      </SafeAreaView>

      
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
