import { useToast } from "@gluestack-ui/themed";
import { ScreenNames, StackNavigation } from "../routes/routes";
import { useNavigation } from "@react-navigation/native";

export function navigateTo() {
  const toast = useToast();
  const navigation = useNavigation<StackNavigation>();

  const navigate = (route: ScreenNames) => {
    toast.closeAll();
    navigation.navigate(route);
  };

  const goBack = () => {
    toast.closeAll();
    navigation.goBack();
  };

  return { navigate, goBack };
}
