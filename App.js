import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import MovieDetailScreen from "./screens/MovieDetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Search Movies" component={HomeScreen} />
        <Stack.Screen name="Movie Details" component={MovieDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
