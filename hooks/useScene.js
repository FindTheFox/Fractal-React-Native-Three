import {THREE} from 'expo-three';
import {useEffect, useState} from "react";

export const useSceneState = () => {
    const [zoom, setZoom] = useState(() => (4.0));
    const [offset, setOffset] = useState(() => (new THREE.Vector2(aspect, 1.0)));
    const [color_scheme, setColorScheme] = useState(() => (1));
    const [aspect, setAspect] = useState(window.innerWidth / window.innerHeight);
    const [a, setA] = useState(() => (0.0));
    const [b, setB] = useState(() => (0.0));
    const [c, setC] = useState(() => (0.0));
    const [d, setD] = useState(() => (0.0));
    const [e, setE] = useState(() => (0.0));
    const [f, setF] = useState(() => (0.0));

    const [uniforms, setUniforms] = useState(() => ({
            res: {type: 'vec2', value: new THREE.Vector2(window.innerWidth, window.innerHeight)},
            aspect: {type: 'float', value: aspect},
            offset: {type: 'vec2', value: offset},
            zoom: {type: 'float', value: zoom},
            color_scheme: {type: 'int', value: color_scheme},
            a: {type: 'float', value: a},
            b: {type: 'float', value: b},
            c: {type: 'float', value: c},
            d: {type: 'float', value: d},
            e: {type: 'float', value: e},
            f: {type: 'float', value: f}
        }
    ));

    useEffect(() => {
        console.log("RESET SCENE")
    }, [])

    useEffect(() => {
        console.log("ZOOM ===", zoom, "OFFSET ===", offset)
        setUniforms((uniforms) => ({
            ...uniforms,
            zoom: {value: zoom},
            offset: {value: offset},
            color_scheme: {value: color_scheme}
        }))
    }, [zoom, offset, color_scheme])

    return [zoom, offset, color_scheme, setZoom, setOffset, setColorScheme, aspect, setAspect, uniforms];
};