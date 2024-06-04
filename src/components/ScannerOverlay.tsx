import { Box, Center } from "@gluestack-ui/themed";
import { Path, Svg } from "react-native-svg";

const Overlay = () => (
  <Svg width="100%" height="364" viewBox="0 0 431 364" fill="none">
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0.985766 0.926758H0.985352V364H0.985766V0.926758ZM430.831 0.926758V364H430.831V0.926758H430.831ZM30.8519 24.207C28.3667 24.207 26.3519 26.2217 26.3519 28.707V72.6376C26.3519 75.1228 24.3372 77.1376 21.8519 77.1376C19.3667 77.1376 17.3519 75.1228 17.3519 72.6376V28.707C17.3519 21.2512 23.3961 15.207 30.8519 15.207H83.7252C86.2105 15.207 88.2252 17.2217 88.2252 19.707C88.2252 22.1923 86.2105 24.207 83.7252 24.207H30.8519ZM343.591 19.707C343.591 17.2217 345.606 15.207 348.091 15.207H400.965C408.421 15.207 414.465 21.2511 414.465 28.707V72.6375C414.465 75.1228 412.45 77.1375 409.965 77.1375C407.479 77.1375 405.465 75.1228 405.465 72.6375V28.707C405.465 26.2217 403.45 24.207 400.965 24.207H348.091C345.606 24.207 343.591 22.1923 343.591 19.707ZM409.965 287.79C412.45 287.79 414.465 289.805 414.465 292.29V336.221C414.465 343.677 408.421 349.721 400.965 349.721H348.091C345.606 349.721 343.591 347.706 343.591 345.221C343.591 342.736 345.606 340.721 348.091 340.721H400.965C403.45 340.721 405.465 338.706 405.465 336.221V292.29C405.465 289.805 407.479 287.79 409.965 287.79ZM21.8519 287.79C24.3372 287.79 26.3519 289.805 26.3519 292.29V336.221C26.3519 338.706 28.3667 340.721 30.852 340.721H83.7252C86.2105 340.721 88.2252 342.736 88.2252 345.221C88.2252 347.706 86.2105 349.721 83.7252 349.721H30.852C23.3961 349.721 17.3519 343.677 17.3519 336.221V292.29C17.3519 289.805 19.3667 287.79 21.8519 287.79Z"
      fill="white"
    />
  </Svg>
);

export function ScannerOverlay() {
  return (
    <Center position="absolute" w="$full" h="$full" zIndex={10}>
      <Box w="70%">
        <Overlay />
      </Box>
    </Center>
  );
}