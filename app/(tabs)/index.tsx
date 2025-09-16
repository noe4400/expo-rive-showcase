import { useRouter } from "expo-router";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const showcases = [
  { id: "1", title: "Starry Night Camping", route: "/explore" },

];

export default function Home() {
  const router = useRouter();

  return (
   <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

      <FlatList
        data={showcases}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(item.route)}
            style={{
              padding: 20,
              backgroundColor: "#eee",
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 18 }}>{item.title}</Text>
          </TouchableOpacity>
        )}
       
      />
    </SafeAreaView>
  );
}