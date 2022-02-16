import Link from 'next/link';
import { memo, useRef, useState } from 'react';
import IsEqual from 'react-fast-compare';
import * as THREE from 'three';
import { Canvas, MeshProps, useFrame } from '@react-three/fiber';

function Box(props: MeshProps) {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(() => {
    mesh.current.rotation.x += 0.01;
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 2, 3]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

function Home(): JSX.Element {
  return (
    <div>
      <p>Home</p>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
      <Link href="/about">Go To About</Link>
    </div>
  );
}

export default memo(Home, IsEqual);
