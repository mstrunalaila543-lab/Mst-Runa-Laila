import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  RotateCcw,
  Eye,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Layers,
  Wrench,
  Droplets,
  Play,
  Pause,
  Info,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface PaintFinish {
  id: string;
  name: string;
  color: string;
  roughness: number;
  metalness: number;
}

const PAINT_FINISHES: PaintFinish[] = [
  { id: 'liquid-silver', name: 'Supra Quicksilver (LB Spec)', color: '#D2D6DC', roughness: 0.12, metalness: 0.95 },
  { id: 'stealth-black', name: 'Stealth Satin Black', color: '#18191B', roughness: 0.22, metalness: 0.8 },
  { id: 'ceramic-white', name: 'Ceramic Pearl White', color: '#F0F2F5', roughness: 0.14, metalness: 0.7 },
  { id: 'lime-spec', name: 'Hyper Lime Detailing Spec', color: '#C9F044', roughness: 0.18, metalness: 0.45 },
  { id: 'midnight-slate', name: 'Midnight Charcoal', color: '#2B2F38', roughness: 0.13, metalness: 0.88 },
];

interface CameraPreset {
  id: string;
  label: string;
  pos: [number, number, number];
  target: [number, number, number];
}

const CAMERA_PRESETS: CameraPreset[] = [
  { id: 'front-34', label: 'Front 3/4', pos: [3.8, 1.25, 4.2], target: [0, 0.4, 0] },
  { id: 'front-aero', label: 'Front LB Widebody', pos: [3.9, 0.7, 0.1], target: [0, 0.35, 0] },
  { id: 'side', label: 'Side Profile', pos: [0.1, 1.0, 5.2], target: [0, 0.38, 0] },
  { id: 'rear-wing', label: 'Rear GT Wing & Diffuser', pos: [-4.2, 1.3, 1.6], target: [-0.6, 0.45, 0] },
  { id: 'wheel-detail', label: 'Advan Wheel Detail', pos: [2.2, 0.55, 2.3], target: [1.4, 0.36, 1.05] },
];

interface CarPartInfo {
  id: string;
  name: string;
  code: string;
  detailingTreatment: string;
  chemicalUsed: string;
  meshKey: string;
}

const CAR_PARTS_CATALOG: CarPartInfo[] = [
  {
    id: 'hood',
    name: 'LB-Performance Sculpted Cowl Hood',
    code: 'PART-01 / AERO HOOD',
    detailingTreatment: '2-Stage Micro-Compound Leveling & Heat-Resistant Ceramic Shield',
    chemicalUsed: 'Meguiar\'s M205 Finishing Compound + Gtechniq C1 Crystal Lacquer',
    meshKey: 'hoodMesh',
  },
  {
    id: 'fenders',
    name: 'Widebody Flared Front Fenders & Canards',
    code: 'PART-02 / FLARED ARCH',
    detailingTreatment: 'Precision Edge Buffing, Seam Air-Blowout & UV Polymer Sealant',
    chemicalUsed: 'Rupes Yellow Fine Foam Pad + CarPro Reload Silica Spray',
    meshKey: 'fenderMesh',
  },
  {
    id: 'wing',
    name: 'Carbon High-Downforce GT Rear Wing',
    code: 'PART-03 / CARBON AERO',
    detailingTreatment: 'Wet-Look Clear-Resin Polishing & UV Degradation Inhibitor',
    chemicalUsed: 'Angelwax Resurrection Compound + 9H Ceramic Suede Applicator',
    meshKey: 'wingMesh',
  },
  {
    id: 'splitter',
    name: 'Front Carbon Splitter & Advan Lower Valance',
    code: 'PART-04 / RACE SPLITTER',
    detailingTreatment: 'De-greasing, Tar Dissolution & Ceramic Plastic Restoration Barrier',
    chemicalUsed: 'CarPro TarX + Solution Finish Trim Restorer',
    meshKey: 'splitterMesh',
  },
  {
    id: 'diffuser',
    name: 'Rear Venturi Diffuser & Dual Exhaust Tips',
    code: 'PART-05 / REAR DIFFUSER',
    detailingTreatment: 'Stainless Exhaust Carbon Etch Removal & High-Temp Ceramic Coating',
    chemicalUsed: 'Menzerna Metal Polish + Gyeon Q² Rim High-Temp Coat',
    meshKey: 'diffuserMesh',
  },
  {
    id: 'wheels',
    name: 'Advan Racing Deep-Dish Stanced Wheels',
    code: 'PART-06 / ADVAN WHEELS',
    detailingTreatment: 'Chemical Iron Decontamination Fallout Removal & Rim Face Ceramic',
    chemicalUsed: 'Bilt Hamber Auto-Wheel De-Ironer + CarPro DLUX Rim Coat',
    meshKey: 'wheelGroup',
  },
  {
    id: 'calipers',
    name: 'Lime Accent 6-Piston Performance Calipers',
    code: 'PART-07 / BRAKE SYSTEM',
    detailingTreatment: 'Ultra-Fine Steam Cleansing & Ceramic Caliper Barrier',
    chemicalUsed: 'Optimum No Rinse (ONR) + High-Temperature Quartz Glaze',
    meshKey: 'calipers',
  },
  {
    id: 'canopy',
    name: 'Aerodynamic Cockpit & UV Tinted Glass',
    code: 'PART-08 / GLASS CANOPY',
    detailingTreatment: 'Ceramic Glass Polishing & Ultra-Hydrophobic Rain Shielding',
    chemicalUsed: 'CarPro FlyBy Forte Nano-Tech Glass Coating',
    meshKey: 'canopyMesh',
  },
];

interface WashStep {
  stepNumber: string;
  title: string;
  chemicalName: string;
  brandProduct: string;
  purpose: string;
  sprayColor: string;
  particleType: 'foam' | 'purple-reaction' | 'water' | 'mist' | 'coating';
}

const WASH_SIMULATION_STEPS: WashStep[] = [
  {
    stepNumber: '01',
    title: 'Snow Foam Pre-Wash Cannon',
    chemicalName: 'pH-Neutral Hyper-Foam Surfactant',
    brandProduct: 'Chemical Guys Honeydew / CarPro Lift Snow Foam',
    purpose: 'Blankets vehicle in thick clinging foam to encapsulate abrasive grit and road dust before physical contact.',
    sprayColor: '#FFFFFF',
    particleType: 'foam',
  },
  {
    stepNumber: '02',
    title: 'Iron Fallout Chemical Decontamination',
    chemicalName: 'Acid-Free Brake Dust & Iron Dissolver',
    brandProduct: 'Bilt Hamber Auto-Wheel / CarPro IronX',
    purpose: 'Chemically dissolves sintered metallic rail dust and brake pad iron, turning purple on contact without harming clearcoat.',
    sprayColor: '#A855F7',
    particleType: 'purple-reaction',
  },
  {
    stepNumber: '03',
    title: 'Clay Lubricant & Synthetic Clay Mitt',
    chemicalName: 'High-Lubricity Synthetic Clay Spray',
    brandProduct: 'Nanoskin Glide Ultra-Slick Clay Lubricant',
    purpose: 'Provides frictionless barrier for clay media to shear off embedded industrial tree sap and tar deposits.',
    sprayColor: '#93C5FD',
    particleType: 'mist',
  },
  {
    stepNumber: '04',
    title: 'Multi-Stage Micro-Compound Polishing',
    chemicalName: 'Diminishing Micro-Abrasive Polish',
    brandProduct: 'Rupes BigFoot D-A Fine + Meguiar\'s M205 Mirror Glaze',
    purpose: 'Restores true optical depth and eliminates 90%+ of swirl marks, buffer holograms, and spider-web scratches.',
    sprayColor: '#E2E8F0',
    particleType: 'mist',
  },
  {
    stepNumber: '05',
    title: '9H Nano-Ceramic Liquid Quartz Application',
    chemicalName: 'SiO2 / TiO2 Cross-Linking Molecular Coating',
    brandProduct: 'Gtechniq Crystal Serum Ultra / CarPro C.Quartz Professional',
    purpose: 'Bonds molecularly with clearcoat to create an ultra-hard sacrificial glass shield with >110° water contact angle.',
    sprayColor: '#C9F044',
    particleType: 'coating',
  },
  {
    stepNumber: '06',
    title: 'Deionized Spot-Free Hydro-Rinse',
    chemicalName: '0-PPM Purified Deionized Mineral-Free Water',
    brandProduct: 'Mobile Pure-Flow Double-Resin Filtration System',
    purpose: 'Final rinse with zero total dissolved solids (TDS), ensuring zero water spotting even when drying in direct ambient sunlight.',
    sprayColor: '#67E8F9',
    particleType: 'water',
  },
];

export const Hero3DCar: React.FC<{
  onBookClick?: () => void;
  className?: string;
}> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedFinish, setSelectedFinish] = useState<PaintFinish>(PAINT_FINISHES[0]);
  const [coatingEnhanced, setCoatingEnhanced] = useState(true);
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [activePreset, setActivePreset] = useState<string>('front-34');
  const [mode3D, setMode3D] = useState<'interactive-3d' | 'studio-cutout'>('interactive-3d');
  const [isLoaded, setIsLoaded] = useState(false);

  // Exploded View state
  const [explosionProgress, setExplosionProgress] = useState<number>(0); // 0 (assembled) to 1 (fully exploded)
  const [isAutoExploding, setIsAutoExploding] = useState<boolean>(false);
  const [selectedPart, setSelectedPart] = useState<CarPartInfo | null>(null);

  // Detailing Wash Simulation state
  const [isWashModeActive, setIsWashModeActive] = useState<boolean>(false);
  const [currentWashIndex, setCurrentWashIndex] = useState<number>(0);
  const [isAutoWashing, setIsAutoWashing] = useState<boolean>(false);

  // Cutout view sub-angle for user's uploaded Supra image
  const [supraViewMode, setSupraViewMode] = useState<'front' | 'rear' | 'dark'>('front');

  // References to 3D scene elements
  const carBodyMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const targetCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3(3.8, 1.25, 4.2));
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.4, 0));
  const controlsRef = useRef<OrbitControls | null>(null);

  // References to exploded parts
  const partsRefs = useRef<{ [key: string]: THREE.Object3D }>({});
  const initialPartsPositions = useRef<{ [key: string]: THREE.Vector3 }>({});
  const explodedOffsets = useRef<{ [key: string]: THREE.Vector3 }>({});

  // Spray particle system ref
  const sprayParticlesRef = useRef<THREE.Points | null>(null);
  const sprayParticleMatRef = useRef<THREE.PointsMaterial | null>(null);

  // Update material properties when finish or coating changes
  useEffect(() => {
    if (!carBodyMaterialRef.current) return;
    const mat = carBodyMaterialRef.current;
    mat.color.set(selectedFinish.color);
    if (coatingEnhanced) {
      mat.roughness = Math.max(0.04, selectedFinish.roughness * 0.55);
      mat.metalness = Math.min(0.98, selectedFinish.metalness * 1.05);
      mat.clearcoat = 1.0;
      mat.clearcoatRoughness = 0.02;
    } else {
      mat.roughness = selectedFinish.roughness * 1.6;
      mat.metalness = selectedFinish.metalness * 0.9;
      mat.clearcoat = 0.45;
      mat.clearcoatRoughness = 0.25;
    }
    mat.needsUpdate = true;
  }, [selectedFinish, coatingEnhanced]);

  // Update spray particle color based on active wash step
  useEffect(() => {
    if (sprayParticleMatRef.current) {
      const step = WASH_SIMULATION_STEPS[currentWashIndex];
      sprayParticleMatRef.current.color.set(step.sprayColor);
      sprayParticleMatRef.current.size = step.particleType === 'foam' ? 0.08 : 0.04;
      sprayParticleMatRef.current.needsUpdate = true;
    }
  }, [currentWashIndex]);

  // Camera preset handler
  const handleSelectPreset = useCallback((preset: CameraPreset) => {
    setActivePreset(preset.id);
    targetCamPosRef.current.set(...preset.pos);
    targetLookAtRef.current.set(...preset.target);
  }, []);

  // Auto wash cycle timer
  useEffect(() => {
    if (!isAutoWashing) return;
    const interval = setInterval(() => {
      setCurrentWashIndex((prev) => (prev + 1) % WASH_SIMULATION_STEPS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [isAutoWashing]);

  // Auto explode cycle timer
  useEffect(() => {
    if (!isAutoExploding) return;
    let step = 0.015;
    let direction = 1;
    const interval = setInterval(() => {
      setExplosionProgress((prev) => {
        let next = prev + step * direction;
        if (next >= 1) {
          direction = -1;
          next = 1;
        } else if (next <= 0) {
          direction = 1;
          next = 0;
        }
        return next;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [isAutoExploding]);

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 560;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.replaceChildren(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF7F7F5);
    scene.fog = new THREE.Fog(0xF7F7F5, 12, 35);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(3.8, 1.25, 4.2);

    // Studio Environment (PMREMGenerator + RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    pmremGenerator.dispose();

    // Studio Lighting Rig
    const keyLight = new THREE.DirectionalLight(0xFFFFFF, 2.4);
    keyLight.position.set(5, 7, 6);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const topLight = new THREE.DirectionalLight(0xF4F7FF, 1.4);
    topLight.position.set(-4, 6, -3);
    scene.add(topLight);

    const hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0xD4D8DE, 1.0);
    scene.add(hemiLight);

    // Subtle lime accent lighting
    const limeAccentLight = new THREE.DirectionalLight(0xC9F044, 1.2);
    limeAccentLight.position.set(-6, 2.5, 4);
    scene.add(limeAccentLight);

    // Ground Studio Floor with soft contact shadow
    const floorGeo = new THREE.PlaneGeometry(35, 35);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xF7F7F5,
      roughness: 0.85,
      metalness: 0.05,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -0.001;
    floorMesh.receiveShadow = !isSoftwareGl;
    scene.add(floorMesh);

    // Radial contact shadow under widebody Supra
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(128, 128, 20, 128, 128, 120);
      grad.addColorStop(0, 'rgba(17, 18, 20, 0.55)');
      grad.addColorStop(0.5, 'rgba(17, 18, 20, 0.25)');
      grad.addColorStop(1, 'rgba(17, 18, 20, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;
    const contactShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(5.6, 3.2),
      new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        depthWrite: false,
        opacity: 0.95,
      })
    );
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.set(0, 0.005, 0);
    scene.add(contactShadow);

    // --- PROCEDURAL TOYOTA GR SUPRA (LIBERTY WALK / ADVAN WIDEBODY) ---
    const carRootGroup = new THREE.Group();

    // Body Paint Material (PBR with Clearcoat)
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(selectedFinish.color),
      roughness: selectedFinish.roughness * 0.55,
      metalness: selectedFinish.metalness,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      reflectivity: 0.95,
    });
    carBodyMaterialRef.current = bodyMaterial;

    // Carbon fiber / aero components material
    const carbonMaterial = new THREE.MeshStandardMaterial({
      color: 0x141517,
      roughness: 0.25,
      metalness: 0.5,
    });

    // Dark tinted canopy glass
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x111620,
      roughness: 0.04,
      metalness: 0.1,
      transmission: isSoftwareGl ? 0 : 0.88,
      transparent: true,
      opacity: isSoftwareGl ? 0.6 : 0.9,
      ior: 1.54,
    });

    // Advan Wheels deep-dish black / polished lip
    const wheelRimMat = new THREE.MeshStandardMaterial({
      color: 0x222225,
      roughness: 0.2,
      metalness: 0.9,
    });
    const wheelLipMat = new THREE.MeshStandardMaterial({
      color: 0xDDDDDD,
      roughness: 0.1,
      metalness: 0.98,
    });
    const tireMat = new THREE.MeshStandardMaterial({
      color: 0x161618,
      roughness: 0.9,
      metalness: 0.05,
    });

    // Signature Lime Detailing Calipers
    const caliperMat = new THREE.MeshStandardMaterial({
      color: 0xC9F044,
      roughness: 0.18,
      metalness: 0.6,
      emissive: 0x223300,
    });

    // Projector Headlights & Taillights
    const headlampGlowMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const tailGlowMat = new THREE.MeshBasicMaterial({ color: 0xFF2233 });

    // 1. Unibody Core Chassis (Main reference)
    const unibodyShape = new THREE.Shape();
    unibodyShape.moveTo(-2.2, 0.22);
    unibodyShape.lineTo(2.2, 0.22);
    unibodyShape.quadraticCurveTo(2.45, 0.35, 2.35, 0.55);
    unibodyShape.lineTo(1.4, 0.7);
    unibodyShape.lineTo(-1.7, 0.75);
    unibodyShape.quadraticCurveTo(-2.3, 0.62, -2.2, 0.22);

    const unibodyGeo = new THREE.ExtrudeGeometry(unibodyShape, {
      depth: 1.88,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.08,
      bevelSegments: 4,
    });
    unibodyGeo.center();
    const unibodyMesh = new THREE.Mesh(unibodyGeo, bodyMaterial);
    unibodyMesh.position.set(0, 0.44, 0);
    unibodyMesh.castShadow = !isSoftwareGl;
    unibodyMesh.receiveShadow = !isSoftwareGl;
    carRootGroup.add(unibodyMesh);

    // 2. PART-01: Sculpted Supra Cowl Hood (Explodes Up & Forward)
    const hoodGroup = new THREE.Group();
    const hoodGeo = new THREE.BoxGeometry(1.45, 0.07, 1.55);
    const hoodMesh = new THREE.Mesh(hoodGeo, bodyMaterial);
    hoodMesh.rotation.z = -0.06;
    hoodMesh.castShadow = !isSoftwareGl;
    hoodGroup.add(hoodMesh);

    // Cowl air vents on hood
    const ventL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.02, 0.2), carbonMaterial);
    ventL.position.set(0.1, 0.05, 0.35);
    const ventR = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.02, 0.2), carbonMaterial);
    ventR.position.set(0.1, 0.05, -0.35);
    hoodGroup.add(ventL, ventR);

    hoodGroup.position.set(1.25, 0.64, 0);
    carRootGroup.add(hoodGroup);
    partsRefs.current.hood = hoodGroup;
    initialPartsPositions.current.hood = hoodGroup.position.clone();
    explodedOffsets.current.hood = new THREE.Vector3(0.6, 1.1, 0);

    // 3. PART-02: Flared Widebody Fenders (Explodes Outward Sides)
    const fenderGroup = new THREE.Group();
    // Front Right Flare
    const flareFR = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.38, 0.22), bodyMaterial);
    flareFR.position.set(1.35, 0.44, 1.05);
    // Front Left Flare
    const flareFL = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.38, 0.22), bodyMaterial);
    flareFL.position.set(1.35, 0.44, -1.05);
    // Rear Right Wide Arch
    const flareRR = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.42, 0.25), bodyMaterial);
    flareRR.position.set(-1.35, 0.46, 1.08);
    // Rear Left Wide Arch
    const flareRL = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.42, 0.25), bodyMaterial);
    flareRL.position.set(-1.35, 0.46, -1.08);
    // Front Carbon Canards
    const canardR = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.04, 0.3), carbonMaterial);
    canardR.position.set(2.1, 0.36, 1.05);
    canardR.rotation.y = -0.3;
    const canardL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.04, 0.3), carbonMaterial);
    canardL.position.set(2.1, 0.36, -1.05);
    canardL.rotation.y = 0.3;

    fenderGroup.add(flareFR, flareFL, flareRR, flareRL, canardR, canardL);
    carRootGroup.add(fenderGroup);
    partsRefs.current.fenders = fenderGroup;
    initialPartsPositions.current.fenders = fenderGroup.position.clone();
    explodedOffsets.current.fenders = new THREE.Vector3(0, 0.4, 0);

    // 4. PART-03: Liberty Walk GT Rear Wing (Explodes Up & Rearward)
    const wingGroup = new THREE.Group();
    // Carbon Blade Wing
    const wingBlade = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.05, 2.1), carbonMaterial);
    wingBlade.position.set(0, 0.55, 0);
    // Upright Endplates
    const endplateL = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.35, 0.03), carbonMaterial);
    endplateL.position.set(0, 0.52, 1.05);
    const endplateR = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.35, 0.03), carbonMaterial);
    endplateR.position.set(0, 0.52, -1.05);
    // Vertical Stanchion Mounts
    const mountL = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.55), carbonMaterial);
    mountL.position.set(0, 0.28, 0.45);
    const mountR = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.55), carbonMaterial);
    mountR.position.set(0, 0.28, -0.45);

    wingGroup.add(wingBlade, endplateL, endplateR, mountL, mountR);
    wingGroup.position.set(-2.05, 0.74, 0);
    carRootGroup.add(wingGroup);
    partsRefs.current.wing = wingGroup;
    initialPartsPositions.current.wing = wingGroup.position.clone();
    explodedOffsets.current.wing = new THREE.Vector3(-0.9, 1.2, 0);

    // 5. PART-04: Front Carbon Splitter (Explodes Forward & Down)
    const splitterGroup = new THREE.Group();
    const splitterBlade = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.05, 2.12), carbonMaterial);
    splitterBlade.position.set(0, 0, 0);
    splitterGroup.add(splitterBlade);
    splitterGroup.position.set(2.1, 0.18, 0);
    carRootGroup.add(splitterGroup);
    partsRefs.current.splitter = splitterGroup;
    initialPartsPositions.current.splitter = splitterGroup.position.clone();
    explodedOffsets.current.splitter = new THREE.Vector3(1.1, -0.15, 0);

    // 6. PART-05: Rear Diffuser & Titanium Exhaust (Explodes Rearward)
    const diffuserGroup = new THREE.Group();
    const diffCore = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.16, 1.8), carbonMaterial);
    diffCore.rotation.z = 0.15;
    diffuserGroup.add(diffCore);

    // Dual Titanium Blue-Burned Exhaust Tips
    const exhMat = new THREE.MeshStandardMaterial({ color: 0x4B6B94, metalness: 0.95, roughness: 0.2 });
    const exhL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.25, 16), exhMat);
    exhL.rotation.z = Math.PI / 2;
    exhL.position.set(-0.35, -0.02, 0.45);
    const exhR = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.25, 16), exhMat);
    exhR.rotation.z = Math.PI / 2;
    exhR.position.set(-0.35, -0.02, -0.45);
    diffuserGroup.add(exhL, exhR);

    diffuserGroup.position.set(-2.0, 0.22, 0);
    carRootGroup.add(diffuserGroup);
    partsRefs.current.diffuser = diffuserGroup;
    initialPartsPositions.current.diffuser = diffuserGroup.position.clone();
    explodedOffsets.current.diffuser = new THREE.Vector3(-1.2, -0.1, 0);

    // 7. PART-06 & 07: Advan Wheels & Lime Calipers (Explodes Lateral Outward)
    const wheelsGroup = new THREE.Group();
    const wheelCoords: [number, number, number, string][] = [
      [1.35, 0.36, 1.05, 'FR'],
      [1.35, 0.36, -1.05, 'FL'],
      [-1.35, 0.38, 1.08, 'RR'],
      [-1.35, 0.38, -1.08, 'RL'],
    ];

    wheelCoords.forEach(([wx, wy, wz, tag], i) => {
      const singleWheel = new THREE.Group();
      singleWheel.position.set(wx, wy, wz);

      // Tire with Advan White Lettering look
      const tireGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.28, 24);
      tireGeo.rotateX(Math.PI / 2);
      const tire = new THREE.Mesh(tireGeo, tireMat);
      tire.castShadow = !isSoftwareGl;
      singleWheel.add(tire);

      // Deep dish rim & lip
      const rimGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.285, 18);
      rimGeo.rotateX(Math.PI / 2);
      const rim = new THREE.Mesh(rimGeo, wheelRimMat);
      singleWheel.add(rim);

      const lipGeo = new THREE.TorusGeometry(0.26, 0.02, 8, 24);
      const lip = new THREE.Mesh(lipGeo, wheelLipMat);
      lip.position.z = wz > 0 ? 0.14 : -0.14;
      singleWheel.add(lip);

      // Lime Detailing Caliper
      const caliper = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.16, 0.2), caliperMat);
      caliper.position.set(0.08, 0.12, wz > 0 ? 0.04 : -0.04);
      singleWheel.add(caliper);

      // Rotor disc
      const rotor = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.03, 16), wheelLipMat);
      rotor.rotateX(Math.PI / 2);
      singleWheel.add(rotor);

      wheelsGroup.add(singleWheel);
    });

    carRootGroup.add(wheelsGroup);
    partsRefs.current.wheels = wheelsGroup;
    initialPartsPositions.current.wheels = wheelsGroup.position.clone();
    explodedOffsets.current.wheels = new THREE.Vector3(0, 0, 0.7);

    // 8. PART-08: Glass Canopy (Explodes Upwards)
    const canopyShape = new THREE.Shape();
    canopyShape.moveTo(-0.95, 0);
    canopyShape.lineTo(0.7, 0);
    canopyShape.lineTo(0.3, 0.44);
    canopyShape.quadraticCurveTo(0.0, 0.5, -0.5, 0.46);
    canopyShape.lineTo(-0.85, 0.36);
    canopyShape.closePath();

    const canopyGeo = new THREE.ExtrudeGeometry(canopyShape, {
      depth: 1.34,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.05,
      bevelSegments: 4,
    });
    canopyGeo.center();
    const canopyMesh = new THREE.Mesh(canopyGeo, glassMaterial);
    canopyMesh.position.set(-0.1, 0.88, 0);
    canopyMesh.castShadow = !isSoftwareGl;
    carRootGroup.add(canopyMesh);
    partsRefs.current.canopy = canopyMesh;
    initialPartsPositions.current.canopy = canopyMesh.position.clone();
    explodedOffsets.current.canopy = new THREE.Vector3(0, 1.25, 0);

    // Headlight projector blades & Taillights
    const hlL = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.04, 0.4), headlampGlowMat);
    hlL.position.set(2.12, 0.56, 0.64);
    hlL.rotation.y = -0.25;
    const hlR = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.04, 0.4), headlampGlowMat);
    hlR.position.set(2.12, 0.56, -0.64);
    hlR.rotation.y = 0.25;
    carRootGroup.add(hlL, hlR);

    const tailBar = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.05, 1.6), tailGlowMat);
    tailBar.position.set(-2.24, 0.65, 0);
    carRootGroup.add(tailBar);

    scene.add(carRootGroup);

    // 9. DETAILING SPRAY & FOAM PARTICLE SYSTEM
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleVel = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount; p++) {
      particlePos[p * 3] = (Math.random() - 0.5) * 4.5;
      particlePos[p * 3 + 1] = 0.2 + Math.random() * 1.8;
      particlePos[p * 3 + 2] = (Math.random() - 0.5) * 2.8;

      particleVel[p * 3] = (Math.random() - 0.5) * 0.015;
      particleVel[p * 3 + 1] = -0.015 - Math.random() * 0.02;
      particleVel[p * 3 + 2] = (Math.random() - 0.5) * 0.015;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 0.06,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const sprayParticles = new THREE.Points(particleGeo, particleMat);
    sprayParticles.visible = false;
    scene.add(sprayParticles);
    sprayParticlesRef.current = sprayParticles;
    sprayParticleMatRef.current = particleMat;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.02;
    controls.minDistance = 2.2;
    controls.maxDistance = 8.5;
    controls.target.set(0, 0.4, 0);

    let isInteracting = false;
    controls.addEventListener('start', () => { isInteracting = true; });
    controls.addEventListener('end', () => { isInteracting = false; });

    let elapsed = 0;
    const clock = new THREE.Clock();
    let frameId = 0;

    setIsLoaded(true);

    // Animation Loop
    function tick() {
      const delta = clock.getDelta();
      elapsed += delta;

      camera.position.lerp(targetCamPosRef.current, 0.06);
      controls.target.lerp(targetLookAtRef.current, 0.06);

      // Subtle rotation if idling in front 3/4
      if (!isInteracting && elapsed > 2.0 && activePreset === 'front-34' && !isWashModeActive) {
        carRootGroup.rotation.y = Math.sin(elapsed * 0.18) * 0.07;
      }

      // Update Exploded Parts positions based on explosionProgress state
      const ep = explosionProgress;
      if (partsRefs.current.hood && initialPartsPositions.current.hood) {
        partsRefs.current.hood.position.lerpVectors(
          initialPartsPositions.current.hood,
          initialPartsPositions.current.hood.clone().add(explodedOffsets.current.hood),
          ep
        );
      }
      if (partsRefs.current.wing && initialPartsPositions.current.wing) {
        partsRefs.current.wing.position.lerpVectors(
          initialPartsPositions.current.wing,
          initialPartsPositions.current.wing.clone().add(explodedOffsets.current.wing),
          ep
        );
      }
      if (partsRefs.current.splitter && initialPartsPositions.current.splitter) {
        partsRefs.current.splitter.position.lerpVectors(
          initialPartsPositions.current.splitter,
          initialPartsPositions.current.splitter.clone().add(explodedOffsets.current.splitter),
          ep
        );
      }
      if (partsRefs.current.diffuser && initialPartsPositions.current.diffuser) {
        partsRefs.current.diffuser.position.lerpVectors(
          initialPartsPositions.current.diffuser,
          initialPartsPositions.current.diffuser.clone().add(explodedOffsets.current.diffuser),
          ep
        );
      }
      if (partsRefs.current.canopy && initialPartsPositions.current.canopy) {
        partsRefs.current.canopy.position.lerpVectors(
          initialPartsPositions.current.canopy,
          initialPartsPositions.current.canopy.clone().add(explodedOffsets.current.canopy),
          ep
        );
      }

      // Update Spray Particles if Wash Mode is Active
      if (sprayParticlesRef.current && isWashModeActive) {
        sprayParticlesRef.current.visible = true;
        const positions = sprayParticlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let p = 0; p < particleCount; p++) {
          positions[p * 3 + 1] += particleVel[p * 3 + 1];
          if (positions[p * 3 + 1] < 0.1) {
            positions[p * 3 + 1] = 1.4 + Math.random() * 0.6;
            positions[p * 3] = (Math.random() - 0.5) * 4.2;
            positions[p * 3 + 2] = (Math.random() - 0.5) * 2.4;
          }
        }
        sprayParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      } else if (sprayParticlesRef.current) {
        sprayParticlesRef.current.visible = false;
      }

      controls.update();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      floorGeo.dispose();
      floorMat.dispose();
      unibodyGeo.dispose();
      bodyMaterial.dispose();
      glassMaterial.dispose();
      carbonMaterial.dispose();
      wheelRimMat.dispose();
      caliperMat.dispose();
      tireMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [explosionProgress, isWashModeActive]);

  const activeWash = WASH_SIMULATION_STEPS[currentWashIndex];

  return (
    <div className={`relative w-full overflow-hidden select-none ${className}`}>
      {/* 3D WebGL Canvas or Studio Cutout */}
      <div className="relative w-full h-[520px] sm:h-[580px] md:h-[640px] lg:h-[720px] bg-[#F7F7F5]">
        {/* 3D WebGL Canvas */}
        <div
          ref={mountRef}
          className={`w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-700 ${
            mode3D === 'interactive-3d' && isLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none absolute inset-0'
          }`}
        />

        {/* Photorealistic Studio Cutout View featuring User's Toyota GR Supra Image */}
        {mode3D === 'studio-cutout' && (
          <div className="w-full h-full flex items-center justify-center relative px-4 bg-gradient-to-b from-[#111214] via-[#141518] to-[#0D0E10] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(201,240,68,0.08),transparent_60%)] pointer-events-none" />

            <div className="relative max-w-4xl w-full flex flex-col items-center">
              {/* Image Frame with crop to selected perspective from user's image */}
              <div className="relative w-full max-h-[460px] overflow-hidden rounded-2xl border border-[#2E3035] bg-black/50 shadow-2xl flex items-center justify-center">
                <img
                  src="/assets/aistudio/image_b2dd13e2.png"
                  alt="Toyota GR Supra Liberty Walk Detailing Showcase"
                  className={`w-full max-h-[500px] object-cover transition-all duration-700 ${
                    supraViewMode === 'front'
                      ? 'object-top scale-100'
                      : supraViewMode === 'rear'
                      ? 'object-center scale-100'
                      : 'object-bottom scale-100'
                  }`}
                />

                {/* Perspective selector pill on top of image */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 p-1 bg-black/80 backdrop-blur-md border border-[#2E3035] rounded-lg text-xs">
                  <button
                    type="button"
                    onClick={() => setSupraViewMode('front')}
                    className={`px-3 py-1 rounded-md transition-all font-mono ${
                      supraViewMode === 'front' ? 'bg-[#C9F044] text-[#111214] font-bold' : 'text-[#BFC3C8] hover:text-white'
                    }`}
                  >
                    Front LB Aero
                  </button>
                  <button
                    type="button"
                    onClick={() => setSupraViewMode('rear')}
                    className={`px-3 py-1 rounded-md transition-all font-mono ${
                      supraViewMode === 'rear' ? 'bg-[#C9F044] text-[#111214] font-bold' : 'text-[#BFC3C8] hover:text-white'
                    }`}
                  >
                    Rear GT Wing
                  </button>
                  <button
                    type="button"
                    onClick={() => setSupraViewMode('dark')}
                    className={`px-3 py-1 rounded-md transition-all font-mono ${
                      supraViewMode === 'dark' ? 'bg-[#C9F044] text-[#111214] font-bold' : 'text-[#BFC3C8] hover:text-white'
                    }`}
                  >
                    Stealth Black
                  </button>
                </div>

                <div className="absolute bottom-4 right-4 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#C9F044]/50 text-xs text-[#C9F044] font-mono">
                  TOYOTA GR SUPRA • LIBERTY WALK WIDEBODY
                </div>
              </div>

              {/* Specification strip */}
              <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-[#BFC3C8]">
                <span>• Full Multi-Stage Paint Correction</span>
                <span>• 9H Ceramic Hydrophobic Seal</span>
                <span>• Advan Deep-Dish Wheel Armor</span>
              </div>
            </div>
          </div>
        )}

        {/* Top Control Bar (View Mode & Explode / Wash Mode Switchers) */}
        <div className="absolute top-4 inset-x-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          {/* Left: Exploded & Wash Toggles */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              type="button"
              onClick={() => {
                setIsWashModeActive(false);
                setExplosionProgress(explosionProgress > 0 ? 0 : 0.85);
              }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm ${
                explosionProgress > 0
                  ? 'bg-[#111214] text-[#C9F044] border-[#C9F044]'
                  : 'bg-white/95 text-[#111214] border-[#E0E2E6] hover:bg-[#F2F2F0]'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>{explosionProgress > 0 ? 'Assemble Parts' : 'Explode Parts View'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setExplosionProgress(0);
                setIsWashModeActive(!isWashModeActive);
              }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm ${
                isWashModeActive
                  ? 'bg-[#C9F044] text-[#111214] border-[#C9F044]'
                  : 'bg-white/95 text-[#111214] border-[#E0E2E6] hover:bg-[#F2F2F0]'
              }`}
            >
              <Droplets className="w-3.5 h-3.5" />
              <span>{isWashModeActive ? 'Exit Wash Simulation' : 'Detailing Wash Simulation'}</span>
            </button>
          </div>

          {/* Right: 3D Interactive vs Studio Cutout */}
          <div className="flex items-center gap-1.5 p-1 bg-white/95 backdrop-blur-md border border-[#E0E2E6] rounded-lg shadow-sm text-xs font-medium pointer-events-auto">
            <button
              type="button"
              onClick={() => setMode3D('interactive-3d')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                mode3D === 'interactive-3d'
                  ? 'bg-[#111214] text-white shadow-xs'
                  : 'text-[#73777D] hover:text-[#111214]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Interactive 3D Supra
            </button>
            <button
              type="button"
              onClick={() => setMode3D('studio-cutout')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                mode3D === 'studio-cutout'
                  ? 'bg-[#111214] text-white shadow-xs'
                  : 'text-[#73777D] hover:text-[#111214]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Photo Studio View
            </button>
          </div>
        </div>

        {/* OVERLAY PANEL 1: EXPLODED PARTS INSPECTION HUD (When parts are exploded) */}
        {mode3D === 'interactive-3d' && explosionProgress > 0.1 && (
          <div className="absolute top-16 left-4 z-20 max-w-sm w-full bg-white/95 backdrop-blur-md rounded-xl p-4 border border-[#E0E2E6] shadow-xl animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
              <div className="flex items-center gap-1.5 text-xs font-bold font-heading text-[#111214] uppercase">
                <Wrench className="w-3.5 h-3.5 text-[#111214]" />
                <span>Exploded Parts Metrology</span>
              </div>
              <span className="text-[10px] font-mono text-[#73777D]">
                {Math.round(explosionProgress * 100)}% SEPARATION
              </span>
            </div>

            <div className="mt-2 text-xs text-[#555960]">
              Click any component to inspect its dedicated surface correction & coating chemical:
            </div>

            {/* Clickable Part Pills */}
            <div className="mt-3 flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
              {CAR_PARTS_CATALOG.map((part) => (
                <button
                  key={part.id}
                  type="button"
                  onClick={() => setSelectedPart(part)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all text-left ${
                    selectedPart?.id === part.id
                      ? 'bg-[#111214] text-[#C9F044] font-bold'
                      : 'bg-[#F2F2F0] text-[#111214] hover:bg-[#E5E7EB]'
                  }`}
                >
                  {part.name.split(' ')[0]} {part.name.split(' ')[1]}
                </button>
              ))}
            </div>

            {/* Selected Component Detail Box */}
            {selectedPart && (
              <div className="mt-3 p-3 rounded-lg bg-[#111214] text-white space-y-1.5 animate-in fade-in">
                <div className="text-[10px] font-mono text-[#C9F044] uppercase">
                  {selectedPart.code}
                </div>
                <div className="font-heading font-bold text-xs text-white">
                  {selectedPart.name}
                </div>
                <div className="text-[11px] text-[#BFC3C8] leading-tight">
                  <strong className="text-white block">Treatment:</strong> {selectedPart.detailingTreatment}
                </div>
                <div className="text-[11px] text-[#C9F044] leading-tight pt-1 border-t border-[#2E3035]">
                  <strong className="text-white block">Chemical / Compound:</strong> {selectedPart.chemicalUsed}
                </div>
              </div>
            )}
          </div>
        )}

        {/* OVERLAY PANEL 2: DETAILING WASH & CHEMICAL SPRAY HUD (When Wash Mode is active) */}
        {mode3D === 'interactive-3d' && isWashModeActive && (
          <div className="absolute top-16 left-4 z-20 max-w-md w-full bg-[#111214]/95 backdrop-blur-md rounded-xl p-4 sm:p-5 border border-[#C9F044]/60 shadow-2xl text-white animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-[#2E3035]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C9F044] animate-ping" />
                <span className="font-heading font-bold text-xs sm:text-sm text-white uppercase tracking-wider">
                  Live Detailing Wash Simulation
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#C9F044]">
                STEP {activeWash.stepNumber} / 06
              </span>
            </div>

            {/* Current Active Chemical Spray Display */}
            <div className="mt-3 space-y-2">
              <div className="text-xs font-mono text-[#BFC3C8] uppercase tracking-wider">
                ACTIVE SPRAY / CHEMICAL:
              </div>
              <div className="font-heading font-black text-lg text-[#C9F044]">
                {activeWash.title}
              </div>
              <div className="p-3 rounded-lg bg-[#18191D] border border-[#2E3035] space-y-1">
                <div className="text-xs text-white font-semibold">
                  {activeWash.brandProduct}
                </div>
                <div className="text-[11px] text-[#73777D] font-mono">
                  Formula: {activeWash.chemicalName}
                </div>
                <p className="text-xs text-[#BFC3C8] leading-relaxed pt-1">
                  {activeWash.purpose}
                </p>
              </div>
            </div>

            {/* Wash Step Controls */}
            <div className="mt-4 flex items-center justify-between gap-2 pt-2 border-t border-[#26282E]">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCurrentWashIndex((prev) => (prev - 1 + WASH_SIMULATION_STEPS.length) % WASH_SIMULATION_STEPS.length)}
                  className="p-1.5 rounded-md bg-[#222429] hover:bg-[#2E3138] text-white"
                  title="Previous chemical spray"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentWashIndex((prev) => (prev + 1) % WASH_SIMULATION_STEPS.length)}
                  className="p-1.5 rounded-md bg-[#222429] hover:bg-[#2E3138] text-white"
                  title="Next chemical spray"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsAutoWashing(!isAutoWashing)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 ${
                    isAutoWashing ? 'bg-[#C9F044] text-[#111214]' : 'bg-[#222429] text-white hover:bg-[#2E3138]'
                  }`}
                >
                  {isAutoWashing ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  <span>{isAutoWashing ? 'Pause' : 'Auto Cycle'}</span>
                </button>
              </div>

              <div className="text-[11px] font-mono text-[#C9F044] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Spraying Active</span>
              </div>
            </div>
          </div>
        )}

        {/* Rotate hint for 3D */}
        {mode3D === 'interactive-3d' && !isWashModeActive && (
          <div className="absolute top-16 right-4 z-10 hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/85 backdrop-blur-sm border border-[#E0E2E6] rounded-md text-[11px] text-[#73777D]">
            <RotateCcw className="w-3 h-3 text-[#111214]" />
            <span>Click & Drag to rotate 360° | Scroll to inspect</span>
          </div>
        )}

        {/* COLLAPSIBLE BOTTOM CONTROL DOCK */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[96%] max-w-4xl">
          <div className="flex flex-col items-center">
            {/* Collapse / Expand Tab */}
            <button
              type="button"
              onClick={() => setIsDockCollapsed(!isDockCollapsed)}
              className="flex items-center gap-1.5 px-3 py-1 mb-1.5 bg-white/95 border border-[#E0E2E6] rounded-full text-[11px] font-medium text-[#111214] shadow-xs hover:bg-[#F7F7F5] transition-colors"
            >
              {isDockCollapsed ? (
                <>
                  <ChevronUp className="w-3 h-3 text-[#111214]" />
                  <span>Customize Supra & Controls</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-3 h-3 text-[#111214]" />
                  <span>Hide Controls</span>
                </>
              )}
            </button>

            {/* Main Dock Container */}
            {!isDockCollapsed && (
              <div className="w-full bg-white/95 border border-[#E0E2E6] shadow-xl rounded-xl p-3 sm:p-4 backdrop-blur-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center divide-y md:divide-y-0 md:divide-x divide-[#E5E7EB]">
                  {/* 1. Paint Finishes */}
                  <div className="space-y-1.5 pb-2 md:pb-0">
                    <div className="flex items-center justify-between text-xs text-[#73777D] font-medium">
                      <span>Supra Finish: <strong className="text-[#111214]">{selectedFinish.name}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      {PAINT_FINISHES.map((finish) => (
                        <button
                          key={finish.id}
                          type="button"
                          title={finish.name}
                          onClick={() => setSelectedFinish(finish)}
                          className={`w-7 h-7 rounded-full border-2 transition-transform ${
                            selectedFinish.id === finish.id
                              ? 'border-[#111214] scale-110 shadow-sm'
                              : 'border-white/80 hover:scale-105'
                          }`}
                          style={{ backgroundColor: finish.color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* 2. Exploded / Reassembly Slider */}
                  <div className="space-y-1.5 py-2 md:py-0 md:px-4">
                    <div className="flex items-center justify-between text-xs text-[#73777D] font-medium">
                      <span>Parts Assembly:</span>
                      <span className="font-mono text-[#111214] font-bold text-[11px]">
                        {explosionProgress === 0 ? 'Assembled' : `${Math.round(explosionProgress * 100)}% Exploded`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={explosionProgress}
                        onChange={(e) => {
                          setIsWashModeActive(false);
                          setExplosionProgress(Number(e.target.value));
                        }}
                        aria-label="Parts explosion slider"
                        className="w-full accent-[#111214] cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* 3. Camera Perspectives */}
                  <div className="space-y-1.5 pt-2 md:pt-0 md:pl-4">
                    <div className="text-xs text-[#73777D] font-medium">
                      <span>Camera Perspectives:</span>
                    </div>
                    <div className="flex items-center gap-1 flex-wrap">
                      {CAMERA_PRESETS.map((preset) => (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => handleSelectPreset(preset)}
                          className={`px-2 py-1 text-[11px] font-medium rounded transition-all ${
                            activePreset === preset.id
                              ? 'bg-[#111214] text-white'
                              : 'bg-[#F2F2F0] text-[#111214] hover:bg-[#E5E7EB]'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
