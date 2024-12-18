import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { GET } from "../../adminService/httpClient";

import colors from "../../constants/customColors";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [isFocus, setIsFocus] = useState(false);

  const {
    data: properties,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      // const res = await GET("properties");
      // return res;
      const res = await GET("");
      return res.properties;
    },
  });

  const filteredProperties = properties?.filter((property: any) =>
    property?.title?.toLowerCase()?.includes(search?.toLowerCase())
  );

  const renderProperties = (item: any) => {
    const { id, images, title } = item?.item ?? {};
    return (
      <TouchableOpacity
        onPress={() => router.push(`/property/${id}`)}
        style={{
          justifyContent: "center",
          backgroundColor: colors.lightGray,
          marginVertical: hp(2),
        }}
      >
        <SliderBox
          images={images}
          onCurrentImagePressed={(index) => router.push(`/property/${id}`)}
          sliderBoxHeight={400}
          style={{
            height: 250,
            width: "96%",
            borderRadius: hp(2),
          }}
          dotColor="#FFEE58"
          inactiveDotColor="#90A4AE"
          dotStyle={{
            width: 15,
            height: 15,
            borderRadius: hp(2),
            marginHorizontal: 10,
            padding: 0,
            margin: 0,
          }}
        />
        <Text
          style={{
            color: "black",
            fontWeight: "600",
            fontSize: hp(2),
            textAlign: "center",
            marginTop: hp(1),
            marginBottom: hp(1.5),
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  if (isLoading) return <Text>Loading properties...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={{ flex: 1, marginHorizontal: wp(2) }}>
      <View
        style={[
          styles.inputCon,
          { borderColor: isFocus ? colors.focusedColor : colors.borderColor },
        ]}
      >
        <TextInput
          placeholder="Search properties..."
          value={search}
          onChangeText={setSearch}
          style={[styles.input]}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
      </View>
      <FlatList
        data={filteredProperties}
        keyExtractor={(item) => item.id}
        renderItem={renderProperties}
        contentContainerStyle={{
          backgroundColor: "white",
          marginVertical: hp(2),
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputCon: {
    marginTop: hp(0),
    borderRadius: hp(1.1),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingHorizontal: wp(2),
    shadowOffset: { width: 0, height: 0 },
    shadowColor: colors.borderColor,
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 5,
    borderWidth: hp(0.2),
    borderColor: colors.borderColor,
  },
  input: {
    fontSize: hp(1.8),
    color: colors.focusedColor,
    textAlignVertical: "center",
    paddingVertical: hp(1.4),
    paddingHorizontal: wp(2.5),
    borderRadius: hp(1),
    flex: 1,
  },
  labelText: {
    color: colors.labelColor,
    marginBottom: hp(0.8),
    fontSize: hp(1.7),
  },
  error: {
    marginTop: hp(1.5),
    color: colors.red,
    fontSize: hp(1.6),
  },
  icon: {
    color: colors.eyeColor,
    marginEnd: wp(2.5),
  },
  textCon: {
    marginTop: hp(2),
  },
});
