import { MotiView } from "moti";
import { SvgXml } from "react-native-svg";
import MiniLogo from "../components/MiniLogo";
import { Box } from "@gluestack-ui/themed";
import React from "react";

export function LoopMiniLogo() {

    return (
        <Box>
            <MotiView
                from={{ translateY: 0 }}
                animate={{ translateY: -10 }}
                transition={{
                    loop: true,
                    repeat: Infinity,
                    type: 'timing',
                    duration: 1000, 
                    direction: 'alternate' 
                }}
            >
                <SvgXml xml={MiniLogo} />
            </MotiView>
        </Box>
    );
}
