import { NativeBaseProvider, View } from "native-base";
import Routes from "./src/routes/routes";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    <NativeBaseProvider>
      <AuthProvider>
          <Routes />
      </AuthProvider>
    </NativeBaseProvider>
  );
}
