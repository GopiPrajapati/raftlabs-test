import { GET } from "@/adminService/httpClient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import useStore from "../useStore";

export default function PropertyDetail() {
  const { id } = useLocalSearchParams();
  const [property, setProperty] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const addBooking = useStore((state) => state.addBooking);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await GET(`properties/${id}`);
        setProperty(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <Text>Loading property details...</Text>;
  if (error) return <Text>Error: {error}</Text>;
  if (!property) return null;

  return (
    <View className="flex-1 p-4">
      <TouchableOpacity onPress={() => router.back()}>
        <MaterialIcons name="arrow-left" size={hp(4)} />
      </TouchableOpacity>
      <MapView
        style={{ height: "85%" }}
        initialRegion={{
          latitude: property.location.coordinates.latitude,
          longitude: property.location.coordinates.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: property.location.coordinates.latitude,
            longitude: property.location.coordinates.longitude,
          }}
          title={property.name}
        />
      </MapView>

      <Text className="text-lg font-bold mt-4">{property.name}</Text>
      <Text className="mb-4">{property.description}</Text>

      <Button
        title="Book Now"
        onPress={() => {
          addBooking(property.id);
          Alert.alert(
            "Booking",
            `You have booked the property: ${property.title}`
          );
        }}
      />
    </View>
  );
}
