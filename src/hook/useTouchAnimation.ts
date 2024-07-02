import { useWindowDimensions } from "react-native";
import { useAnimationState } from "moti";

export function useTouchAnimation() {
  const { height } = useWindowDimensions();

  const animationState = useAnimationState({
    from: {
      opacity: 0.5,
      translateY: -height,
      rotateZ: "50deg",
      rotateY: "30deg",
      rotateX: "30deg",
    },
    intermediate: {
      opacity: 0.75,
      translateY: -height / 2,
      rotateZ: "-50deg",
      rotateY: "-30deg",
      rotateX: "-30deg",
    },
    to: {
      opacity: 1,
      translateY: 0,
      rotateZ: "0deg",
      rotateY: "0deg",
      rotateX: "0deg",
    },
  });

  const touchAnimation = () => {
    animationState.transitionTo("from");
    animationState.transitionTo("intermediate");
    setTimeout(() => {
      animationState.transitionTo("to");
    }, 10);
  };

  return { touchAnimation, animationState };
}
