import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";

type MapSearchInputProps = {
  onSelectAddress: (
    addressData: GooglePlaceData,
    addressDetail: GooglePlaceDetail | null
  ) => void;
};

export function MapSearchInput({ onSelectAddress }: MapSearchInputProps) {
  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <GooglePlacesAutocomplete
          placeholder="Digite o endereço"
          minLength={3}
          fetchDetails={true}
          onPress={(data, details) => {
            onSelectAddress(data, details);
          }}
          enablePoweredByContainer={false}
          query={{
            key: `${GOOGLE_MAPS_API_KEY}`,
            language: "en",
          }}
          styles={{
            description: {
              fontWeight: "bold",
            },
            textInput: {
              height: 50,
              fontSize: 16,
              color: "#000",
              backgroundColor: "#fff",
              borderRadius: 5,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: "lightgrey",
            },
          }}
        />
      }
      keyExtractor={(_, index) => `key-${index}`}
      renderItem={() => null}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
  },
});

export default MapSearchInput;
