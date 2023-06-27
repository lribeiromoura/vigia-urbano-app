import React, { createContext, useState, ReactNode, useEffect } from "react";
import * as Location from "expo-location";

interface LocationContextProps {
  problem: string;
  location: LocationType;
  errorMsg: string | null;
  addressLocation: Location.LocationGeocodedAddress | null;
  setErrorMsg: (message: string | null) => void;
  setProblem: React.Dispatch<React.SetStateAction<string>>;
  setLocation: (location: LocationType) => void;
  setAddressLocation: (
    address: Location.LocationGeocodedAddress | null
  ) => void;
  haveLocationAccess: () => Promise<boolean>;
}

export const LocationContext = createContext<LocationContextProps>(
  {} as LocationContextProps
);

interface LocationProviderProps {
  children: ReactNode;
}

export function LocationProvider({ children }: LocationProviderProps) {
  const [problem, setProblem] = useState<string>("");
  const [location, setLocation] = useState<LocationType | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [addressLocation, setAddressLocation] =
    useState<Location.LocationGeocodedAddress | null>(null);

  const haveLocationAccess = async (): Promise<boolean> => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return false;
      }
      return true;
    } catch (error) {
      setErrorMsg("Error requesting location permissions");
      return false;
    }
  };

  return (
    <LocationContext.Provider
      value={{
        problem,
        location,
        errorMsg,
        addressLocation,
        setErrorMsg,
        setLocation,
        setProblem,
        setAddressLocation,
        haveLocationAccess,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}
