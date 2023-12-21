"use client";

import { Canvas , useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

function CUBE1() {
  const cube1 = useRef();

  useFrame((state) => {
    if (cube1) {
      cube1.current.scale.z = 2 +( (Math.sin(state.clock.elapsedTime) / 5));
      cube1.current.scale.x = 1 +( (Math.sin(state.clock.elapsedTime + 2) / 5));
    }
  });
  return (
    <mesh
      ref={cube1}
      castShadow
      position={[-4, 0, 0]}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={'rgb(63, 63, 70)'} wireframe={true} linewidth={2} />
    </mesh>
  );
}

function CUBE2() {
    const cube2 = useRef();

  useFrame((state) => {
    if (cube2) {
        cube2.current.scale.z = 3 +( (Math.sin(state.clock.elapsedTime + 0.75) / 5));
        cube2.current.scale.x = 1 +( (Math.sin(state.clock.elapsedTime + 1) / 5));
    }
  });
  return (
    <mesh ref={cube2} castShadow position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={'rgb(63, 63, 70)'} wireframe={true}  linewidth="5"/>
    </mesh>
  );
}

function CUBE3() {
    const cube3 = useRef();

  useFrame((state) => {
    if (cube3) {
        cube3.current.scale.z = 1.5 +( (Math.sin(state.clock.elapsedTime +0.5) / 5));
        cube3.current.scale.x = 1 +( (Math.sin(state.clock.elapsedTime + 1) / 5));
    }
  });
  return (
    <mesh ref={cube3} castShadow position={[4, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={'rgb(63, 63, 70)'} wireframe={true} linewidth={2}/>
    </mesh>
  );
}

export default function BG() {
  return (
    <div className=" top-0 fixed w-full h-screen z-0">
      <Canvas
        className="fixed w-full h-screen bg-darkgray"
        camera={{ position: [0, 0, 5] }}
      >
        {/* Add lighting */}
        <ambientLight intensity={7} />

        <CUBE1 />
        <CUBE2 />
        <CUBE3 />
      </Canvas>
    </div>
  );
}
