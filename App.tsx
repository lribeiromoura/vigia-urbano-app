import { NativeBaseProvider, View } from "native-base";
import Routes from "./src/routes/routes";
import { AuthProvider } from "./src/context/AuthContext";
import { LocationProvider } from "./src/context/LocationContext";

export default function App() {
  return (
    <NativeBaseProvider>
      <AuthProvider>
        <LocationProvider>
          <Routes />
        </LocationProvider>
      </AuthProvider>
    </NativeBaseProvider>
  );
}
