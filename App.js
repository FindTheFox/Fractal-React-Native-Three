import React, {useMemo, useRef, useState} from "react";
import { StyleSheet, View } from "react-native";
import { Canvas, useFrame,extend } from "@react-three/fiber";
import {OrthographicCamera, shaderMaterial} from "@react-three/drei";
import { THREE } from 'expo-three';
import glsl from "glslify";

function Plane(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  let [aspect,setAspect] = useState(window.innerWidth / window.innerHeight);

  const uniforms = useMemo(
      () => ({
        res: {value: new THREE.Vector2(window.innerWidth, window.innerHeight)},
        aspect: {value: aspect},
        offset: {value: new THREE.Vector2(-2, -4)}}),
      []
  );
  /* Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (mesh && mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    }
  });
    */

    const fragmentShader = glsl(`
      precision highp float;
      uniform vec2 res;
      uniform float aspect;
      uniform vec2 offset;
      
      float mandelbrot(vec2 c){
        float alpha = 1.0;
        vec2 z = vec2(0.0 , 0.0);      
        
        for(int i=0; i < 200; i++){  // i < max iterations        
          float x_sq = z.x*z.x;
          float y_sq = z.y*z.y;
          vec2 z_sq = vec2(x_sq - y_sq + offset.x, (2.0* z.x  * z.y)+ offset.y);        
          z = z_sq + c;        
          if(x_sq + y_sq > 4.0){
            alpha = float(i)/200.0;
            break;
          }
        }
        return alpha;
      }  
      void main(){ // gl_FragCoord in [0,1]
        vec2 uv = 4.0 * vec2(aspect, 1.0) * gl_FragCoord.xy / res -2.0*vec2(aspect, 1.0);
        float s = 1.0 - mandelbrot(uv);    
        vec3 coord = vec3(s, s, s);
        gl_FragColor = vec4(pow(coord, vec3(7.0, 8.0, 5.0)), 1.0);
      }`
    )
/*
  const MyShaderMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: glsl(`
        void main(){}
      `),
      fragmentShader: fragmentShader
  })
  extend({MyShaderMaterial});
*/
  useFrame((state, delta) => (mesh.current.x += delta))
  return (
      /*

      <mesh

    >
          <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
          <meshStandardMaterial
        attach="material"
        color={ "hotpink" }
      />
      </mesh>
 */

    <mesh
        ref={mesh}
        position={[0,0,0]}
    >
      <planeGeometry attach="geometry" args={[2, 2]} />
      <shaderMaterial
          attach="material"
          uniforms={uniforms}
          fragmentShader={fragmentShader}
      />
    </mesh>

  );
}

export default function App() {

  return (
      <View style={styles.container}>
        <Canvas>
          <Plane/>

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
        </Canvas>
      </View>
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
