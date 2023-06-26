import {
    GooglePlaceData,
    GooglePlaceDetail,
  } from "react-native-google-places-autocomplete";
  import MapSearchInput from "../../../../components/MapComponent/components/MapSearchInput";
  import { useContext } from "react";
  import { LocationContext } from "../../../../context/LocationContext";
  import MapViewComponent from "../../../../components/MapComponent";
  import { Box } from "native-base";
  
  export function MapComponent() {
    const { latLong, location, errorMsg, setLocation, setErrorMsg, setLatLong } =
      useContext(LocationContext);
  
    const handleSetAddress = (
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
      }
    };
    return (
      <>
        <Box backgroundColor="#fff" px={10} paddingBottom={5}>
          <MapSearchInput onSelectAddress={handleSetAddress} />
        </Box>
        <MapViewComponent
          latLong={latLong}
          location={location}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
          setLocation={setLocation}
        ></MapViewComponent>
      </>
    );
  }