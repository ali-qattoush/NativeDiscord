import auth from "@react-native-firebase/auth";

export default function Logout() {
  auth()
    .signOut()
    .then(() => console.log("User signed out!"));

  return null;
}

