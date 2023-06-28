import React, { useEffect, useRef } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

type LocationType = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
} | null;

type MapViewComponentProps = {
  location: LocationType;
  errorMsg: string | null;
  setErrorMsg: (message: string | null) => void;
  setLocation: (location: LocationType) => void;
};

export function MapViewComponent({
  location,
  errorMsg,
}: MapViewComponentProps) {
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        500
      );
    }
  }, [location]);

  return (
    <SafeAreaView style={{ flex: 1, height: '100%' }}>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          showsUserLocation={true}
          followsUserLocation={false}
          style={styles.map}
          initialRegion={location as Region}
          zoomControlEnabled={true}
          zoomEnabled={true}
          zoomTapEnabled={true}
        >
          {location ? <Marker coordinate={{ ...location }} /> : null}
        </MapView>
      </View>
    </SafeAreaView>
  );
}

export default MapViewComponent;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    display: "flex",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
