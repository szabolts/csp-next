"use client";

import Link from "next/link";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

function traverseAndDoSomething(object: any) {
  // Do something with the current object, e.g., log its name
  if (object.isMesh) {
    console.log(object.name);
    object.castShadow = true;
    object.receiveShadow = true;
  }

  // Traverse through children recursively
  if (object.children && object.children.length > 0) {
    object.children.forEach((child: any) => {
      traverseAndDoSomething(child);
    });
  }
}

function Model() {
  // így nem sír a refre a returnben, useRefnek kell egy default érték
  const groupRef = useRef<THREE.Group>(null);
  const gltf = useLoader(GLTFLoader, "/szétvág.glb");
  const model = gltf.scene;
  const mixer = new THREE.AnimationMixer(model);

  useFrame(() => {
    if (mixer) {
      mixer.update(0.005); // You can adjust the time delta as needed
    }
  });

  useEffect(() => {
    traverseAndDoSomething(model);
    if (gltf.animations.length > 0) {
      for (let i = 0; i < gltf.animations.length; i++) {
        const action = mixer.clipAction(gltf.animations[i]);
        action.play();
      }
    }
  }, [model]);

  console.log("Animations:", gltf.animations);

  return (
    <group ref={groupRef}>
      <primitive
        object={model}
        position={[0, 0, 0]}
        scale={1.5}
        rotation={[0, Math.PI, Math.PI/2]}
      />
    </group>
  );
}

function Light() {
  // const { theme } = useTheme();

  // const lightIP = theme === "dark" ? 300 : 1000;

  // const lightI = theme === "dark" ? 1 : 100;

  return (
    <group>
      <pointLight
        castShadow
        position={[0, 7, 7]}
        // color={"white"}
        color={"white"}
        intensity={300}
      />
      <pointLight
        castShadow
        position={[0, -3, -5]}
        // color={"white"}
        color={"white"}
        intensity={300}
      />
      {/* <rectAreaLight
        position={[0, -3, -5]}
        // color={"white"}
        color={"white"}
        intensity={300}
      /> */}
    </group>
  );
}

export default function Home() {
  return (
    <main>
      <div
        id="home"
        className="flex flex-col justify-center items-center h-screen"
      >
        <h1 className="text-9xl text-center font-bold  pb-6 bg-gradient-to-tl from-green-300 via-blue-500 to-purple-600 text-transparent bg-clip-text">
          Cutting Edge Optimizer
        </h1>
        <h3 className="max-w-4xl text-4xl text-center pb-6 bg-gradient-to-tl from-green-300 via-blue-500 to-purple-600 text-transparent bg-clip-text">
          In the world of precision and efficiency, our algorithm slices through
          complexity, redefining the art of optimal cutting stock solutions.
        </h3>
        <Link href="/csp">
          <button className="text-2xl bg-gradient-to-tl from-purple-600 to-blue-500 hover:from-green-300 hover:via-blue-500 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce">
            Get started for Free
          </button>
        </Link>
      </div>
      <div
        id="features"
        className=" relative flex flex-col justify-center items-center h-screen pt-32"
      >
        <div className=" relative flex flex-col w-full p-2">
          <h1 className="  text-6xl">Lorem  ipsum</h1>
          <p>Lorem ipsum dolor sit amet</p>
        </div>

        <Canvas
          camera={{ position: [-7, 0, 0] }}
          className="absolute top-0 left-0 w-full h-full z-30 bg-gradient-to-b from-transparent via-zinc-600 to-black"
        >
          <Suspense fallback={null}>
            <Model />
          </Suspense>

          <Light />
          <EffectComposer>
            {/* Bloom Effect */}
            <Bloom intensity={1} luminanceThreshold={10} />

            {/* Depth of Field Effect */}
          </EffectComposer>
        </Canvas>
      </div>
      {/* <div className=" absolute w-screen h-64  bg-zinc-500 dark:bg-zinc-700 z-20"></div> */}
      <div
        id="pricing"
        className=" relative flex flex-row justify-center items-center h-screen bg-zinc-300 dark:bg-zinc-500 z-30 shadow-large shadow-zinc-900"
      >
        <div className="flex flex-col">
          <h1 className="text-6xl">Lorem  ipsum</h1>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
      <div
        id="contactus"
        className="flex flex-row justify-center items-center h-screen"
      >
        <div className="flex flex-col">
          <h1 className="text-6xl">Lorem  ipsum</h1>
          <p>
          Lorem ipsum dolor sit amet
          </p>
        </div>
      </div>
    </main>
  );
}
