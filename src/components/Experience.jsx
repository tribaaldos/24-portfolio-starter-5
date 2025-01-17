import {
  Center,
  ContactShadows,
  Environment,
  Float,
  MeshDistortMaterial,
  RoundedBox,
  Sky,
  useScroll,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { config } from "../config.js";
import useMobile from "../hooks/useMobile";
import { Avatar } from "./Avatar";
import { Balloon } from "./Balloon";
import { MacBookPro } from "./MacBookPro";
import { Mailbox } from "./Mailbox";
import { Monitor } from "./Monitor";
import { MonitorScreen } from "./MonitorScreen";
import { SectionTitle } from "./SectionTitle";
// import { Star } from "./Star";
import { Ball } from "./Ball.jsx";
import PlaneTexture from "./Plane.jsx";
import { Sandrio } from "./Sandrio.jsx";

const SECTIONS_DISTANCE = 10;

export const Experience = () => {
  const { isMobile, scaleFactor } = useMobile();
  const [section, setSection] = useState(config.sections[0]);
  const sceneContainer = useRef();
  const scrollData = useScroll();
  useFrame(() => {
    if (isMobile) {
      sceneContainer.current.position.x =
        -scrollData.offset * SECTIONS_DISTANCE * (scrollData.pages - 1);
      sceneContainer.current.position.z = 0;
    } else {
      sceneContainer.current.position.z =
        -scrollData.offset * SECTIONS_DISTANCE * (scrollData.pages - 1);
      sceneContainer.current.position.x = 0;
    }

    setSection(
      config.sections[Math.round(scrollData.offset * (scrollData.pages - 1))]
    );
  });

  useEffect(() => {
    const handleHashChange = () => {
      const sectionIndex = config.sections.indexOf(
        window.location.hash.replace("#", "")
      );
      if (sectionIndex !== -1) {
        scrollData.el.scrollTo(
          0,
          (sectionIndex / (config.sections.length - 1)) *
            (scrollData.el.scrollHeight - scrollData.el.clientHeight)
        );
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <>
      <Sky />
      
      <Environment preset="sunset" />
      <Avatar position-z={isMobile ? -5 : 0} />
      {/* <Sandrio scale={0.5} position-x={-0.5} position-z={-2}/> */}

      {/* SHADOWS & FLOOR */}
      <ContactShadows opacity={0.9} scale={[30, 30]} color="#9c8e66" />
      {/* <mesh position-y={-0.001} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="#f5f3ee" />
      </mesh> */}
      <PlaneTexture />

      <motion.group ref={sceneContainer} animate={section}>
        {/* HOME */}
        <motion.group
          position-y={-5}
          variants={{
            home: {
              y: 0,
            },
          }}
        >
          {/* <Star position-z={isMobile ? -5 : 0} position-y={2.2} scale={0.3} /> */}
          <Float floatIntensity={2} speed={2}>
            <MacBookPro
              position-x={isMobile ? -0.5 : -1}
              position-y={isMobile ? 1 : 0.5}
              position-z={isMobile ? -2 : 0}
              scale={0.3}
              rotation-y={Math.PI / 4}
            />
          </Float>
          {/* <PalmTree
            scale={0.018}
            rotation-y={THREE.MathUtils.degToRad(140)}
            position={isMobile ? [1, 0, -4] : [scaleFactor * 4, 0, -5]}
          /> */}
          <group scale={isMobile ? 0.3 : 1}>
            {/* <Float floatIntensity={0.6}> */}
              <Center disableY disableZ>
                <SectionTitle
                  className="title-section"
                  size={2}
                  position-y={0.7}
                  position-z={-6}
                  position-x={-3}
                  bevelEnabled
                  bevelThickness={0.3}
                  rotation-y={Math.PI / 10}

                >
                  {config.home.title}
                </SectionTitle>
              </Center>
            {/* </Float> */}
            <Center disableY disableZ>
              <SectionTitle
                size={1.2}
                position-x={-2.6}
                position-z={-3}
                bevelEnabled
                bevelThickness={0.3}
                rotation-y={Math.PI / 10}
              >
                {config.home.subtitle}
              </SectionTitle>
            </Center>
          </group>
        </motion.group>
        {/* SKILLS */}
        <motion.group
          position-x={isMobile ? SECTIONS_DISTANCE : 0}
          position-z={isMobile ? -4 : SECTIONS_DISTANCE}
          position-y={-5}
          variants={{
            skills: {
              y: 0,
            },
          }}
        >
          <group position-x={isMobile ? 0 : -2}>
            <SectionTitle position-z={1.5} rotation-y={Math.PI / 6}>
              SKILLS
            </SectionTitle>
 

          </group>
          <mesh position-y={2} position-z={-4} position-x={1}>
            {/* <sphereGeometry args={[1, 64, 64]} />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={1}
              speed={5}
              color="yellow"
            /> */}

            <Ball scale={0.4} />
          </mesh>
        </motion.group>
        {/* PROJECTS */}
        <motion.group
          position-x={isMobile ? 2 * SECTIONS_DISTANCE : 0}
          position-z={isMobile ? -3 : 2 * SECTIONS_DISTANCE}
          position-y={-5}
          variants={{
            projects: {
              y: 0,
            },
          }}
        >
          <group position-x={isMobile ? -0.25 : 1}>
            <SectionTitle
              position-x={-0.5}
              position-z={0}
              rotation-y={-Math.PI / 6}
            >
              PROJECTS
            </SectionTitle>

            <group
              position-x={0.5}
              position-z={0}
              rotation-y={-Math.PI / 6}
              scale={0.8}
            >
              <Monitor
                scale={0.02}
                position-y={1}
                rotation-y={-Math.PI / 2}
                position-z={-1}
              />
              <MonitorScreen
                rotation-x={-0.18}
                position-z={-0.895}
                position-y={1.74}
              />
              <RoundedBox scale-x={2} position-y={0.5} position-z={-1}>
                <meshStandardMaterial color="white" />
              </RoundedBox>
            </group>
          </group>
        </motion.group>
        {/* CONTACT */}
        <motion.group
          position-x={isMobile ? 3 * SECTIONS_DISTANCE : 0}
          position-z={isMobile ? -4 : 3 * SECTIONS_DISTANCE}
          position-y={-5}
          variants={{
            contact: {
              y: 0,
            },
          }}
        >
          <SectionTitle
            position-x={isMobile ? -1.1 : -2 * scaleFactor}
            position-z={0.6}
          >
            CONTACT
          </SectionTitle>
          <group position-x={-2 * scaleFactor}>

            <group position-y={2.2} position-z={-5.5}>
              <Float floatIntensity={4} rotationIntensity={1.5}>
                <Balloon scale={0.5} position-x={-0.5} color="#71a2d9" />
              </Float>
              <Float
                floatIntensity={1.5}
                rotationIntensity={2}
                position-z={0.5}
              >
                <Balloon scale={0.5} color="#d97183" />
              </Float>
              <Float speed={2} rotationIntensity={2}>
                <Balloon scale={0.5} position-x={0.4} color="yellow" />
              </Float>
            </group>
          </group>

          <Mailbox
            scale={0.25}
            rotation-y={1.25 * Math.PI}
            position-x={1}
            position-y={0.25}
            position-z={0.5}
          />
   
        </motion.group>
      </motion.group>
    </>
  );
};
