import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, TorusKnot, Text } from '@react-three/drei';

function MovingShape() {
    const mesh = useRef();
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        mesh.current.rotation.x = t * 0.2;
        mesh.current.rotation.y = t * 0.3;
        mesh.current.position.y = Math.sin(t) * 0.5;
    });

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <TorusKnot ref={mesh} args={[1, 0.3, 128, 16]} position={[2, 0, 0]}>
                <meshNormalMaterial />
            </TorusKnot>
        </Float>
    );
}

const Hero3D = () => {
    return (
        <div className="absolute inset-0 -z-10 h-screen w-full">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <MovingShape />
            </Canvas>
        </div>
    );
};

export default Hero3D;
