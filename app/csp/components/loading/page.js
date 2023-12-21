"use client";

import { Canvas , useFrame } from "@react-three/fiber";
import React, { useRef } from "react";


function CUBE2() {
    const cube2 = useRef();

  useFrame((state) => {
    if (cube2) {
        cube2.current.rotation.z += 0.05
        cube2.current.rotation.x += 0.05
        cube2.current.rotation.y += 0.05
        // cube2.current.scale.x = 1 +( (Math.sin(state.clock.elapsedTime + 1) / 5));
    }
  });
  return (
    <mesh ref={cube2} castShadow position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <boxGeometry args={[3,3,3]} />
      <meshStandardMaterial color={'rgb(63, 63, 70)'} wireframe={true}  linewidth="5"/>
    </mesh>
  );
}



export default function Loading() {
  return (
    <div className=" relative top-0 w-full h-52 z-30">
      <Canvas
        className="fixed w-full h-screen bg-transparent"
        camera={{ position: [0, 0, 5] }}
      >
        {/* Add lighting */}
        <ambientLight intensity={7} />
        <CUBE2 />
        
      </Canvas>
    </div>
  );
}
