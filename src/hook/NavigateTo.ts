import { useToast } from "@gluestack-ui/themed";
import { ScreenNames, Navigation } from "../routes/routes";
import { useNavigation } from "@react-navigation/native";

export function navigateTo() {
  const toast = useToast();
  const navigation = useNavigation<Navigation>();

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
