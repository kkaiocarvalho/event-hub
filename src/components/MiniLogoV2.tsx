import { MotiView, TransitionConfig } from "moti";
import { SvgXml } from "react-native-svg";
import { Box } from "@gluestack-ui/themed";
import React from "react";

const HeadLogo = `<svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.73412 0.530416C4.64399 0.212282 5.15116 -0.16045 5.39738 0.0732054C6.8258 1.4288 7.43778 2.51722 7.53928 3.44971C7.67821 4.72589 6.86315 5.73078 5.81042 6.7582C5.75263 6.81464 5.69405 6.87115 5.63498 6.92777L5.54379 7.01462L5.3717 7.17749L5.16603 7.37065C4.27711 8.20459 3.33747 9.08606 2.74899 10.156C2.21965 11.1182 1.97388 12.2318 2.28983 13.6007C2.36091 13.9087 1.92155 14.1596 1.71181 13.9141C0.407698 12.3872 -0.0438965 11.1278 0.0033148 10.0328C0.0638537 8.62434 0.949349 7.47077 1.95837 6.34976C2.12301 6.16699 2.29111 5.98486 2.45921 5.80269L2.46132 5.80038C2.80584 5.42703 3.15044 5.05351 3.46589 4.67377C3.93654 4.10704 4.34642 3.52144 4.60156 2.89061C4.85675 2.25878 4.95659 1.58216 4.80758 0.834651C4.78762 0.73447 4.76319 0.63308 4.73412 0.530416Z" fill="url(#paint0_linear_501_811)"/>
    <path d="M10.3181 3.88138C10.228 3.56323 10.7351 3.19049 10.9814 3.42417C12.4098 4.77974 13.0218 5.86818 13.1233 6.80067C13.2622 8.07684 12.4471 9.08174 11.3944 10.1092C11.3366 10.1656 11.278 10.2221 11.219 10.2787L11.1278 10.3656L10.9557 10.5284L10.75 10.7216C9.86109 11.5555 8.92146 12.437 8.33297 13.507C7.80363 14.4692 7.55787 15.5828 7.87377 16.9517C7.94486 17.2597 7.50553 17.5106 7.29579 17.2651C5.99168 15.7382 5.54009 14.4788 5.5873 13.3838C5.64784 11.9753 6.53333 10.8217 7.54235 9.70072C7.70699 9.51795 7.87509 9.33581 8.04319 9.15365L8.0453 9.15134C8.38982 8.7799 8.73442 8.40446 9.04984 8.02473C9.52052 7.458 9.9304 6.8724 10.1855 6.24153C10.4407 5.60974 10.5405 4.9331 10.3916 4.18559C10.3716 4.08541 10.3472 3.98402 10.3181 3.88138Z" fill="url(#paint1_linear_501_811)"/>
    <defs>
    <linearGradient id="paint0_linear_501_811" x1="5.92265" y1="-0.760323" x2="2.02909" y2="14.8702" gradientUnits="userSpaceOnUse">
    <stop stop-color="#038C8C"/>
    <stop offset="0.9999" stop-color="#13F2F2"/>
    </linearGradient>
    <linearGradient id="paint1_linear_501_811" x1="11.5066" y1="2.59063" x2="7.61307" y2="18.2211" gradientUnits="userSpaceOnUse">
    <stop stop-color="#038C8C"/>
    <stop offset="1" stop-color="#13F2F2"/>
    </linearGradient>
    </defs>
    </svg>
    `;

const BodyLogo = `<svg width="45" height="27" viewBox="0 0 45 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.50146 1.1207C1.87081 1.1207 1.3403 1.57643 1.32174 2.17278C1.31624 2.3493 1.31348 2.52642 1.31348 2.70415C1.31348 12.4831 9.69273 20.4106 20.0291 20.4106C30.3654 20.4106 38.7446 12.4831 38.7446 2.70415C38.7446 2.52642 38.7419 2.3493 38.7362 2.17278C38.7177 1.57643 39.0488 0 37.6795 0L2.50146 1.1207Z" fill="url(#paint0_linear_501_812)"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M39.4759 14.0133C43.1424 14.0133 44.9997 11.2212 44.9997 7.77686C44.9997 4.33258 42.668 1.37689 39.4759 2.80507C35.8094 2.80507 32.8376 4.33258 32.8376 7.77686C32.8376 11.2212 29.1238 14.0133 39.4759 14.0133ZM39.4759 11.9455C41.8548 11.9455 42.9724 9.93988 42.8206 7.77686C42.6684 5.61384 41.8548 4.85215 39.4759 4.85215C37.0969 4.85215 35.1685 5.542 35.1685 7.77686C35.1685 10.0117 37.0969 11.9455 39.4759 11.9455Z" fill="url(#paint1_linear_501_812)"/>
    <path d="M36.1399 21.631C37.7552 21.5727 38.8138 22.9177 37.5299 23.8399C35.2511 25.4758 30.0425 27.018 19.6741 26.7844C8.32494 26.5285 3.63466 25.6236 1.7869 24.1432C0.521309 23.1294 2.01351 21.6745 3.67322 21.7858C6.97626 22.0078 12.4155 22.3839 19.6741 22.3839C27.9491 22.3839 32.2006 21.7731 36.1399 21.631Z" fill="url(#paint2_linear_501_812)"/>
    <path d="M34.4396 21.6292C36.1067 21.6292 37.2495 23.0023 35.791 23.7293C33.6587 24.7927 29.0289 25.5894 19.4775 25.5894C9.14994 25.5894 4.41118 24.8053 2.29856 23.7552C0.838959 23.0295 2.03972 21.6292 3.7066 21.6292C6.94686 21.6292 12.2499 21.6292 19.4775 21.6292C26.7433 21.6292 31.4132 21.6292 34.4396 21.6292Z" fill="#F2F2F2"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.75038 0C0.801426 0 0 0.69341 0 1.60048C0 11.4844 8.38243 19.4967 18.7227 19.4967C29.063 19.4967 37.4453 11.4844 37.4453 1.60048C37.4453 0.69341 36.6439 0 35.6952 0H1.75038Z" fill="#F2F2F2"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M38.82 13.0994C42.4861 13.0994 44.3434 10.2915 44.3434 6.82773C44.3434 3.36401 42.4861 1.82788 38.82 1.82788C35.1534 1.82788 32.1812 3.36401 32.1812 6.82773C32.1812 10.2915 28.4677 13.0994 38.82 13.0994ZM38.82 11.0199C41.199 11.0199 42.3165 9.00296 42.1643 6.82773C42.0125 4.65254 41.199 3.88651 38.82 3.88651C36.441 3.88651 34.5125 4.58029 34.5125 6.82773C34.5125 9.0752 36.441 11.0199 38.82 11.0199Z" fill="#F2F2F2"/>
    <defs>
    <linearGradient id="paint0_linear_501_812" x1="37.781" y1="0.863744" x2="35.1881" y2="20.4329" gradientUnits="userSpaceOnUse">
    <stop stop-color="#038C8C"/>
    <stop offset="1" stop-color="#13F2F2"/>
    </linearGradient>
    <linearGradient id="paint1_linear_501_812" x1="37.8541" y1="0.996065" x2="35.299" y2="20.4156" gradientUnits="userSpaceOnUse">
    <stop stop-color="#038C8C"/>
    <stop offset="1" stop-color="#00FFE0"/>
    </linearGradient>
    <linearGradient id="paint2_linear_501_812" x1="-1.85185" y1="23.8979" x2="35.1505" y2="23.8979" gradientUnits="userSpaceOnUse">
    <stop stop-color="#038C8C"/>
    <stop offset="1" stop-color="#13F2F2"/>
    </linearGradient>
    </defs>
    </svg>
    `;

export { HeadLogo, BodyLogo };

export function LoopMiniLogoV2() {
  return (
    <Box>
      <MotiView
        style={{ alignItems: "center", right: 3 }}
        from={{ translateY: -5 }}
        animate={{ translateY: -8 }}
        transition={{
          loop: true,
          repeat: Infinity,
          type: "timing",
          duration: 500,
          //TODO: REMOVE WARNING
          direction: "alternate",
        }}
      >
        <SvgXml xml={HeadLogo} />
      </MotiView>
      <SvgXml xml={BodyLogo} style={{ alignItems: "center" }} />
    </Box>
  );
}