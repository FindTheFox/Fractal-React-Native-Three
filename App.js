import React, {Suspense, useRef} from "react";
import {StyleSheet, View} from "react-native";
import {Canvas} from "@react-three/fiber";
import {OrthographicCamera, shaderMaterial} from "@react-three/drei";
import {fragmentShader} from "./shaders/MandelbrotShader";
import {TapHandler} from "./EventHandler/TapHandler";
import {useSceneState} from "./hooks/useScene";

function Plane({states}) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    const [zoom, offset, color_scheme, setZoom, setOffset, setColorScheme, aspect, setAspect, uniforms] = states

    return (
        <mesh
            ref={mesh}
            position={[0, 0, 0]}
        >
            <planeGeometry attach="geometry" args={[2, 2]}/>
            <shaderMaterial
                key={uniforms.zoom.value}
                attach="material"
                uniforms={uniforms}
                fragmentShader={fragmentShader}
            />
        </mesh>
    );
}

export default function App() {
    const states = useSceneState()

    return (
        <TapHandler states={states}>
            <View style={styles.container}>
                <Canvas>
                    <Suspense fallback={null}>
                        <Plane states={states}/>
                        <OrthographicCamera
                            makeDefault
                            zoom={1}
                            left={-1}
                            right={1}
                            top={1}
                            bottom={-1}
                            near={-1}
                            far={1}
                        />
                    </Suspense>
                </Canvas>
            </View>
        </TapHandler>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "black",
    },
});
