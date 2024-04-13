import { View, Text, Button } from "react-native";
import { supabase } from "@/lib/supabase";

const ProfileScreen = () => {
  return (
    <View className="flex-1 py-10">
      <Button
        title="Sign Out"
        onPress={async () => await supabase.auth.signOut()}
      />
    </View>
  );
};

export default ProfileScreen;
