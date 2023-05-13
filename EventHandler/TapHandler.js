import {Gesture, GestureDetector, TapGestureHandler} from 'react-native-gesture-handler';
import {Vector2} from "three";

export const TapHandler2 = ({children}) => {
    const tap = Gesture
        .LongPress()
        .onTouchesDown((event) => {

            console.log(`long press ${event.x}`)
        })
        .onTouchesUp(() => {
            console.log('long press up')
        })

    return (
        <GestureDetector gesture={tap}>
            {children}
        </GestureDetector>
    );
};

export function TapHandler({children, states}) {
    const [zoom, offset, color_schema, setZoom, setOffset, setColorScheme, aspect, setAspect] = states

    return (
        <TapGestureHandler
            onHandlerStateChange={({nativeEvent}) => {
                if (nativeEvent.state === ACTIVE) {
                    let delta = -16

                    let newZoom = zoom;
                    newZoom *= 1 + delta * 0.001;

                    const space = newZoom - zoom;
                    console.log("zoomDIFF = ", newZoom)
                    const mouseX = nativeEvent.x / window.innerWidth;
                    const mouseY = 1 - nativeEvent.y / window.innerHeight;

                    console.log(`\n x: ${mouseX} \n y: ${mouseY} \n nX: ${nativeEvent.x} \n nY: ${nativeEvent.y}\n zoom: ${zoom}\n space: ${space}`)

                    let offsetX = (-mouseX * space)
                    let offsetY = (-mouseY * space * aspect);
                    const newOffset = new THREE.Vector2(offsetX, offsetY);
                    console.log(`\n offsetX = ${offsetX}\n offsetY = ${offsetY}\n newOffset = ${newOffset}`)
                    setOffset((offset: Vector2) => (offset.add(newOffset)))
                    setZoom(newZoom)
                    //Alert.alert(`I'm being pressed for so long, ${newOffset} ${newZoom}`);
                }
            }}
            minDurationMs={800}>
            {children}
        </TapGestureHandler>
    )
}

const ACTIVE = 4