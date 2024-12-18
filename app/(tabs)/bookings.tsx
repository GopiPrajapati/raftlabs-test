import { View, Text, FlatList } from "react-native";
import useStore from "../useStore";

export default function BookingsScreen() {
  const bookings = useStore((state) => state.bookings);

  console.log("bookings", bookings);
  return (
    <View className="flex-1 p-4">
      <Text className="text-lg font-bold mb-4">Your Bookings</Text>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    </View>
  );
}
