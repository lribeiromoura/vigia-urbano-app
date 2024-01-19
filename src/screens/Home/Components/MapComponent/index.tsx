import {
  GooglePlaceData,
  GooglePlaceDetail,
} from "react-native-google-places-autocomplete";
import MapSearchInput from "../../../../components/MapComponent/components/MapSearchInput";
import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../../../../context/LocationContext";
import MapViewComponent from "../../../../components/MapComponent";
import { Box } from "native-base";
import * as Location from "expo-location";
import { ButtonComponent } from "../../../../components/ButtonComponent";

type MapComponentProps = {
  handleConfirm: () => void;
};

export function MapComponent({ handleConfirm }: MapComponentProps) {
  const {
    location,
    errorMsg,
    addressLocation,
    setLocation,
    setErrorMsg,
    haveLocationAccess,
    setAddressLocation,
  } = useContext(LocationContext);

  const [isLoading, setIsLoading] = useState(false);

  const handleSetAddress = async (
    addressData: GooglePlaceData,
    addressDetail: GooglePlaceDetail | null
  ) => {
    if (addressDetail) {
      setLocation({
        latitude: addressDetail.geometry.location.lat,
        longitude: addressDetail.geometry.location.lng,
        latitudeDelta: addressDetail.geometry.location.lat,
        longitudeDelta: addressDetail.geometry.location.lng,
      });
      let fullAddress = await handleSetAddressLocation(
        addressDetail.geometry.location.lat,
        addressDetail.geometry.location.lng
      );
      setAddressLocation(fullAddress);
    }
  };

  const handleSetAddressLocation = async (lat: number, long: number) => {
    let regionName = await Location.reverseGeocodeAsync({
      latitude: lat,
      longitude: long,
    });
    return regionName[0];
  };

  const submitConfirm = async () => {
    if (location) {
      handleConfirm();
    }
  };

  const getLocalLocation = async () => {
    let currentLocation: LocationType;
    setIsLoading(true);
    if (!(await haveLocationAccess())) {
      return;
    }
    let locationData = await Location.getCurrentPositionAsync({});
    const { coords } = locationData;

    currentLocation = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    setLocation(currentLocation);
    let regionName = await Location.reverseGeocodeAsync({
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
    });
    setAddressLocation(regionName[0]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!location) {
      getLocalLocation();
    }
  }, [location, addressLocation]);
  return (
    <>
      <Box backgroundColor="#fff" px={10} paddingBottom={5}>
        <MapSearchInput
          onSelectAddress={handleSetAddress}
          addressLocation={addressLocation}
          isLoading={isLoading}
        />
      </Box>
      <MapViewComponent
        location={location}
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}
        setLocation={setLocation}
      ></MapViewComponent>
      <Box
        justifyContent="center"
        alignItems="center"
        padding={10}
        style={{
          position: "absolute",
          bottom: 24,
          width: "100%",
        }}
      >
        <ButtonComponent title="Confirmar" onPress={submitConfirm} />
      </Box>
    </>
  );
}
