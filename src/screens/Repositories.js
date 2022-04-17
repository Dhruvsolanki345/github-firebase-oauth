import { StyleSheet, Text, View, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";

import Loader from "../components/Loader";

import { reposState } from "../store/repo";
import { getItemFromStore } from "../utils/secureStore";
import moment from "moment";

export default function Repositories() {
  const [repos, setRepos] = useRecoilState(reposState);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = await getItemFromStore("github-token");

        const res = await axios.get(`https://api.github.com/user/repos`, {
          headers: {
            accept: "application/vnd.github.v3+json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;
        setRepos(data);
      } catch (err) {
        console.log("Error when fetching repositories data -> ", err);
      }
      setIsLoading(false);
    };

    setIsLoading(true);
    getData();
  }, []);

  const RenderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.repoName}>{item.full_name}</Text>
      <View style={styles.row}>
        <Text style={styles.name}>{item.owner.login}</Text>
        <Text style={styles.visibility}>{item.visibility}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.language}>{item.language}</Text>
        <Text style={styles.date}>
          {"Last updated at " +
            moment(item.updated_at).calendar({ sameElse: "Do MMMM, YYYY" })}
        </Text>
      </View>
    </View>
  );

  if (isLoading) return <Loader backgroundColor="#fff" />;

  return (
    <View style={styles.container}>
      <FlatList
        data={repos}
        keyExtractor={(item) => item.node_id}
        renderItem={RenderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    elevation: 6,
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  repoName: {
    fontSize: 20,
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginVertical: 5,
  },
  visibility: {
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  language: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#43b7b8",
  },
  date: {
    color: "#000",
  },
});
