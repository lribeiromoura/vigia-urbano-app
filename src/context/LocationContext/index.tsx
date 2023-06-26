import React, { createContext, useState, ReactNode, useEffect } from "react";
import * as Location from "expo-location";


interface LocationContextProps {
  cep: string;
  number: string;
  problem: string;
  latLong: LatLongProps | null;
  location: LocationType;
  errorMsg: string | null;
  setErrorMsg: (message: string | null) => void;
  handleSetCep: (cepString: string | null) => void;
  setNumber: React.Dispatch<React.SetStateAction<string>>;
  setProblem: React.Dispatch<React.SetStateAction<string>>;
  setLatLong: (latLong: LatLongProps) => void;
  setLocation: (location: LocationType) => void;
}

export const LocationContext = createContext<LocationContextProps>({} as LocationContextProps);

interface LocationProviderProps {
  children: ReactNode;
}

export function LocationProvider({ children }: LocationProviderProps) {
  const [cep, setCep] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [problem, setProblem] = useState<string>('');
  const [latLong, setLatLong] = useState<LatLongProps | null>(null);
  const [location, setLocation] = useState<LocationType | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [address, setAddress] = useState<Location.LocationGeocodedAddress | null>(null);
  const handleSetCep = (cepString: string | null) => {
    if(null) {
        setNumber('00000000');
    }
    cepString ? setCep(cepString) : setCep('ere');
  };

  const haveLocationAccess = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return false;
    }
    return true;
  }

  useEffect(() => {
    (async () => {
      let currentLocation: LocationType;
      if(!await haveLocationAccess()) {
        return;
      }
      if (latLong) {
        currentLocation = {
          latitude: latLong.lat,
          longitude: latLong.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
      } else {
        let locationData = await Location.getCurrentPositionAsync({});
        const { coords } = locationData;
        
        currentLocation = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
      }
      setLocation(currentLocation);

      let regionName = await Location.reverseGeocodeAsync({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      });
      setAddress(regionName[0]);
    })();
  }, [latLong]);

  return (
    <LocationContext.Provider
      value={{
        cep,
        number,
        problem,
        latLong,
        location,
        errorMsg,
        setErrorMsg,
        setLocation,
        handleSetCep,
        setNumber,
        setProblem,
        setLatLong,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}
