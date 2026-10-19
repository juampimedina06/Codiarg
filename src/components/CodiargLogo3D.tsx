import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const CodiargLogo3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 680;
    const height = container.clientHeight || 600;

    // 1. Escena, Cámara y Renderizador (100% transparente y sin recortes laterales)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);

    // Ajusta la distancia Z según el aspect ratio para que ningún borde ni partícula se corte a izq/der
    const updateCameraFit = (w: number, h: number) => {
      const aspect = w / h;
      camera.aspect = aspect;
      const halfFovRad = THREE.MathUtils.degToRad(camera.fov * 0.5);
      const requiredHalfExtent = 5.25; // Radio total incluyendo anillo, letras flotantes e inclinación 3D
      const distVertical = requiredHalfExtent / Math.tan(halfFovRad);
      const distHorizontal =
        requiredHalfExtent / (Math.tan(halfFovRad) * aspect);
      camera.position.z = Math.max(distVertical, distHorizontal, 13.4);
      camera.updateProjectionMatrix();
    };
    updateCameraFit(width, height);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI / 1.55;
    controls.minPolarAngle = Math.PI / 2.8;
    controls.maxAzimuthAngle = Math.PI / 3.2;
    controls.minAzimuthAngle = -Math.PI / 3.2;

    // 2. Iluminación Estudio Clay 3D
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.75);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.85);
    mainLight.position.set(4, 7, 12);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0x7fd6ff, 1.05);
    rimLight.position.set(-7, 4, 8);
    scene.add(rimLight);

    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    // Paleta exacta extraída del logotipo oficial Codiarg
    const mats = {
      navyOutline: new THREE.MeshStandardMaterial({
        color: 0x07192b,
        roughness: 0.4,
      }),
      pureWhite: new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.2,
      }),
      iceShadow: new THREE.MeshStandardMaterial({
        color: 0xaecce6,
        roughness: 0.35,
      }),
      bugBlack: new THREE.MeshStandardMaterial({
        color: 0x061626,
        roughness: 0.32,
      }),
      bugHighlight: new THREE.MeshStandardMaterial({
        color: 0x679bc7,
        emissive: 0x2b5b84,
        emissiveIntensity: 0.25,
        roughness: 0.3,
      }),
      bugChest: new THREE.MeshStandardMaterial({
        color: 0x183654,
        roughness: 0.38,
      }),
      eyeGlow: new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 0.65,
        roughness: 0.08,
      }),
      screenSlate: new THREE.MeshStandardMaterial({
        color: 0x466685,
        roughness: 0.38,
      }),
      metalLight: new THREE.MeshStandardMaterial({
        color: 0xd0e2f2,
        roughness: 0.3,
        metalness: 0.15,
      }),
      metalMid: new THREE.MeshStandardMaterial({
        color: 0x7e9bb8,
        roughness: 0.35,
        metalness: 0.2,
      }),
      leafBright: new THREE.MeshStandardMaterial({
        color: 0x82d622,
        roughness: 0.32,
      }),
      leafDark: new THREE.MeshStandardMaterial({
        color: 0x41a612,
        roughness: 0.38,
      }),
      glyphCyan: new THREE.MeshStandardMaterial({
        color: 0xaee4ff,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.25,
        roughness: 0.3,
      }),
      americaCeleste: new THREE.MeshStandardMaterial({
        color: 0x7dd3fc,
        roughness: 0.28,
      }),
      argentinaCeleste: new THREE.MeshStandardMaterial({
        color: 0x0096f6,
        emissive: 0x0074d9,
        emissiveIntensity: 0.22,
        roughness: 0.24,
      }),
    };

    // =========================================================================
    // 3. PORTAL EXTERIOR (BORDE OSCURO + RELLENO BLANCO LIMPIO SIN TAPAR COMPUS)
    // =========================================================================
    const portalGroup = new THREE.Group();

    const whitePortalRing = new THREE.Mesh(
      new THREE.TorusGeometry(3.04, 0.42, 32, 120),
      mats.pureWhite
    );
    whitePortalRing.scale.set(1, 1, 0.32);
    whitePortalRing.position.z = -0.04;
    portalGroup.add(whitePortalRing);

    const bottomBevelArc = new THREE.Mesh(
      new THREE.TorusGeometry(3.16, 0.12, 24, 64, Math.PI * 0.34),
      mats.iceShadow
    );
    bottomBevelArc.rotation.z = -Math.PI * 0.67;
    bottomBevelArc.position.z = 0.08;
    portalGroup.add(bottomBevelArc);

    const outerNavyRim = new THREE.Mesh(
      new THREE.TorusGeometry(3.46, 0.15, 32, 120),
      mats.navyOutline
    );
    outerNavyRim.position.z = 0.06;
    portalGroup.add(outerNavyRim);

    const innerNavyRim = new THREE.Mesh(
      new THREE.TorusGeometry(2.6, 0.14, 32, 120),
      mats.navyOutline
    );
    innerNavyRim.position.z = 0.06;
    portalGroup.add(innerNavyRim);

    const topRivet = new THREE.Mesh(
      new THREE.SphereGeometry(0.11, 20, 20),
      mats.navyOutline
    );
    topRivet.position.set(0.08, 3.04, 0.14);

    const leftRivet = topRivet.clone();
    leftRivet.position.set(-1.92, 2.34, 0.14);
    portalGroup.add(topRivet, leftRivet);

    [-2.42, 2.42].forEach((sideX) => {
      const ledgeTop = new THREE.Mesh(
        new THREE.BoxGeometry(1.55, 0.14, 0.36),
        mats.metalLight
      );
      ledgeTop.position.set(sideX, -1.02, 0.24);

      const ledgeMid = new THREE.Mesh(
        new THREE.BoxGeometry(1.55, 0.18, 0.34),
        mats.metalMid
      );
      ledgeMid.position.set(sideX, -1.18, 0.23);

      const ledgeLine = new THREE.Mesh(
        new THREE.BoxGeometry(1.58, 0.08, 0.38),
        mats.navyOutline
      );
      ledgeLine.position.set(sideX, -0.92, 0.25);

      portalGroup.add(ledgeTop, ledgeMid, ledgeLine);
    });

    logoGroup.add(portalGroup);

    // =========================================================================
    // 4. CÍRCULO BLANCO CENTRAL CON EL CONTINENTE AMERICANO Y ARGENTINA EN CELESTE
    // =========================================================================
    const whiteBackdropGroup = new THREE.Group();

    const backdropDisc = new THREE.Mesh(
      new THREE.CylinderGeometry(2.52, 2.52, 0.18, 64),
      mats.pureWhite
    );
    backdropDisc.rotation.x = Math.PI / 2;
    backdropDisc.receiveShadow = true;
    whiteBackdropGroup.add(backdropDisc);

    const americasGroup = new THREE.Group();

    // 4A. Norteamérica + América Central
    const northAmericaShape = new THREE.Shape();
    northAmericaShape.moveTo(-1.75, 1.45);
    northAmericaShape.quadraticCurveTo(-1.45, 2.02, -0.75, 1.98);
    northAmericaShape.quadraticCurveTo(-0.18, 1.88, -0.1, 1.42);
    northAmericaShape.quadraticCurveTo(-0.15, 1.05, -0.52, 0.82);
    northAmericaShape.quadraticCurveTo(-0.38, 0.65, -0.55, 0.58);
    northAmericaShape.quadraticCurveTo(-0.78, 0.68, -0.82, 0.48);
    northAmericaShape.quadraticCurveTo(-0.55, 0.22, -0.12, 0.08);
    northAmericaShape.quadraticCurveTo(-0.32, 0.02, -0.68, 0.18);
    northAmericaShape.quadraticCurveTo(-1.18, 0.45, -1.42, 0.92);
    northAmericaShape.quadraticCurveTo(-1.85, 1.15, -1.75, 1.45);

    const northAmericaGeo = new THREE.ExtrudeGeometry(northAmericaShape, {
      depth: 0.06,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 3,
    });
    const northAmericaMesh = new THREE.Mesh(
      northAmericaGeo,
      mats.americaCeleste
    );
    northAmericaMesh.position.z = 0.08;
    americasGroup.add(northAmericaMesh);

    // 4B. América del Sur en Celeste
    const southAmericaShape = new THREE.Shape();
    southAmericaShape.moveTo(0.35, 0.95);
    southAmericaShape.quadraticCurveTo(0.85, 1.08, 1.25, 0.72);
    southAmericaShape.quadraticCurveTo(1.92, 0.42, 1.85, -0.08);
    southAmericaShape.quadraticCurveTo(1.68, -0.52, 1.25, -0.88);
    southAmericaShape.quadraticCurveTo(0.95, -1.35, 0.82, -1.78);
    southAmericaShape.quadraticCurveTo(0.66, -1.75, 0.62, -1.32);
    southAmericaShape.quadraticCurveTo(0.55, -0.65, 0.28, -0.15);
    southAmericaShape.quadraticCurveTo(0.08, 0.42, 0.35, 0.95);

    const southAmericaGeo = new THREE.ExtrudeGeometry(southAmericaShape, {
      depth: 0.06,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 3,
    });
    const southAmericaMesh = new THREE.Mesh(
      southAmericaGeo,
      mats.americaCeleste
    );
    southAmericaMesh.position.z = 0.08;
    americasGroup.add(southAmericaMesh);

    // 4C. Silueta de ARGENTINA destacada en Celeste Intenso (#0096F6)
    const argentinaShape = new THREE.Shape();
    argentinaShape.moveTo(0.78, -0.32);
    argentinaShape.quadraticCurveTo(1.18, -0.35, 1.26, -0.68);
    argentinaShape.quadraticCurveTo(1.22, -0.98, 1.02, -1.28);
    argentinaShape.quadraticCurveTo(0.92, -1.56, 0.82, -1.78);
    argentinaShape.quadraticCurveTo(0.7, -1.45, 0.72, -0.95);
    argentinaShape.quadraticCurveTo(0.68, -0.55, 0.78, -0.32);

    const argentinaGeo = new THREE.ExtrudeGeometry(argentinaShape, {
      depth: 0.08,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.02,
      bevelSegments: 3,
    });
    const argentinaMesh = new THREE.Mesh(
      argentinaGeo,
      mats.argentinaCeleste
    );
    argentinaMesh.position.z = 0.11;
    americasGroup.add(argentinaMesh);

    const malvinas = new THREE.Mesh(
      new THREE.SphereGeometry(0.075, 16, 16),
      mats.argentinaCeleste
    );
    malvinas.scale.set(1.3, 0.8, 0.5);
    malvinas.position.set(1.14, -1.58, 0.15);
    americasGroup.add(malvinas);

    whiteBackdropGroup.add(americasGroup);
    whiteBackdropGroup.position.set(0, 0.06, -0.12);
    logoGroup.add(whiteBackdropGroup);

    // =========================================================================
    // 5. MONITOR IZQUIERDO CON LÍNEAS DE CÓDIGO + TECLADO/BASE
    // =========================================================================
    const leftMonitorGroup = new THREE.Group();

    const monOuter = new THREE.Mesh(
      new THREE.BoxGeometry(1.22, 1.42, 0.28),
      mats.navyOutline
    );
    const monScreen = new THREE.Mesh(
      new THREE.BoxGeometry(0.98, 1.16, 0.32),
      mats.screenSlate
    );
    leftMonitorGroup.add(monOuter, monScreen);

    const leftCodeLines = [
      { y: 0.34, w: 0.38, x: -0.16 },
      { y: 0.21, w: 0.42, x: -0.14 },
      { y: 0.08, w: 0.24, x: -0.23 },
      { y: -0.18, w: 0.36, x: -0.17 },
      { y: -0.31, w: 0.25, x: -0.22 },
    ];
    leftCodeLines.forEach((line) => {
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(line.w, 0.055, 0.35),
        mats.pureWhite
      );
      bar.position.set(line.x, line.y, 0);
      leftMonitorGroup.add(bar);
    });

    const monNeck = new THREE.Mesh(
      new THREE.BoxGeometry(0.36, 0.25, 0.22),
      mats.navyOutline
    );
    monNeck.position.set(0.05, -0.78, 0);

    const keyboardFrame = new THREE.Mesh(
      new THREE.BoxGeometry(1.05, 0.24, 0.36),
      mats.navyOutline
    );
    keyboardFrame.position.set(-0.02, -0.92, 0.06);

    const keyboardTop = new THREE.Mesh(
      new THREE.BoxGeometry(0.88, 0.13, 0.38),
      mats.pureWhite
    );
    keyboardTop.position.set(-0.02, -0.91, 0.08);

    leftMonitorGroup.add(monNeck, keyboardFrame, keyboardTop);
    leftMonitorGroup.position.set(-2.42, 0.1, 0.26);
    logoGroup.add(leftMonitorGroup);

    // =========================================================================
    // 6. SERVIDOR DERECHO CON REJILLAS + TUBO VERTICAL + LÁMPARA DOMO
    // =========================================================================
    const rightServerGroup = new THREE.Group();

    const srvOuter = new THREE.Mesh(
      new THREE.BoxGeometry(1.06, 1.28, 0.28),
      mats.navyOutline
    );
    const srvInnerBorder = new THREE.Mesh(
      new THREE.BoxGeometry(0.86, 1.08, 0.31),
      mats.metalMid
    );
    const srvFace = new THREE.Mesh(
      new THREE.BoxGeometry(0.72, 0.92, 0.33),
      mats.metalLight
    );
    rightServerGroup.add(srvOuter, srvInnerBorder, srvFace);

    for (let i = 0; i < 6; i++) {
      const louver = new THREE.Mesh(
        new THREE.BoxGeometry(0.56, 0.04, 0.36),
        mats.navyOutline
      );
      louver.position.set(0, 0.18 - i * 0.095, 0);
      rightServerGroup.add(louver);
    }

    const pipeOuter = new THREE.Mesh(
      new THREE.CylinderGeometry(0.17, 0.17, 1.05, 24),
      mats.navyOutline
    );
    pipeOuter.position.set(-0.06, 1.08, -0.02);

    const pipeInner = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 1.06, 24),
      mats.metalMid
    );
    pipeInner.position.set(-0.06, 1.08, 0.03);

    rightServerGroup.add(pipeOuter, pipeInner);
    rightServerGroup.position.set(2.45, -0.2, 0.26);
    logoGroup.add(rightServerGroup);

    const lampGroup = new THREE.Group();

    const lampOutlineShell = new THREE.Mesh(
      new THREE.SphereGeometry(0.66, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.58),
      mats.navyOutline
    );
    const lampMainDome = new THREE.Mesh(
      new THREE.SphereGeometry(0.56, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.56),
      mats.metalLight
    );
    lampMainDome.position.set(-0.02, 0.02, 0.05);

    const lampRim = new THREE.Mesh(
      new THREE.TorusGeometry(0.56, 0.09, 20, 40),
      mats.navyOutline
    );
    lampRim.rotation.x = Math.PI / 2;
    lampRim.position.y = 0.08;

    const lampBulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.24, 24, 24),
      mats.pureWhite
    );
    lampBulb.position.set(0, 0.02, 0.04);

    lampGroup.add(lampOutlineShell, lampMainDome, lampRim, lampBulb);
    lampGroup.position.set(2.22, 2.18, 0.48);
    lampGroup.rotation.z = -Math.PI / 4.6;
    lampGroup.rotation.x = Math.PI / 7;
    logoGroup.add(lampGroup);

    // =========================================================================
    // 7. EL BICHITO CENTRAL (OJOS Y CABEZA QUE SIGUEN AL CURSOR DEL MOUSE)
    // =========================================================================
    const bugGroup = new THREE.Group();

    const headOuter = new THREE.Mesh(
      new THREE.SphereGeometry(1.22, 48, 48),
      mats.navyOutline
    );
    headOuter.scale.set(1.04, 0.96, 0.48);
    bugGroup.add(headOuter);

    const headHighlightCrescent = new THREE.Mesh(
      new THREE.TorusGeometry(1.06, 0.055, 24, 64, Math.PI * 0.78),
      mats.bugHighlight
    );
    headHighlightCrescent.rotation.z = Math.PI * 0.11;
    headHighlightCrescent.position.set(0, 0.05, 0.35);
    bugGroup.add(headHighlightCrescent);

    const headMain = new THREE.Mesh(
      new THREE.SphereGeometry(1.12, 48, 48),
      mats.bugBlack
    );
    headMain.scale.set(1.02, 0.94, 0.54);
    headMain.position.set(0, -0.04, 0.1);
    headMain.castShadow = true;
    bugGroup.add(headMain);

    const bodyOuter = new THREE.Mesh(
      new THREE.CylinderGeometry(0.88, 0.42, 1.55, 36),
      mats.bugBlack
    );
    bodyOuter.scale.set(1, 1, 0.44);
    bodyOuter.position.set(0, -1.08, 0.05);
    bugGroup.add(bodyOuter);

    const chestInner = new THREE.Mesh(
      new THREE.CylinderGeometry(0.62, 0.28, 1.2, 32),
      mats.bugChest
    );
    chestInner.scale.set(1, 1, 0.42);
    chestInner.position.set(0, -1.18, 0.16);
    bugGroup.add(chestInner);

    // Grupo contenedor para los dos ojos blancos que miran hacia donde va el mouse
    const eyesGroup = new THREE.Group();
    const eyeGeometry = new THREE.SphereGeometry(0.33, 32, 32);

    const leftEye = new THREE.Mesh(eyeGeometry, mats.eyeGlow);
    leftEye.scale.set(1.14, 0.95, 0.35);
    leftEye.position.set(-0.46, -0.08, 0.66);

    const rightEye = leftEye.clone();
    rightEye.position.set(0.46, -0.08, 0.66);

    eyesGroup.add(leftEye, rightEye);
    bugGroup.add(eyesGroup);

    function createBugAntenna(dir: number) {
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(dir * 0.16, 0.92, 0.12),
        new THREE.Vector3(dir * 0.38, 1.48, 0.16),
        new THREE.Vector3(dir * 0.68, 1.76, 0.2)
      );
      const stalk = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 24, 0.105, 16, false),
        mats.bugBlack
      );
      const tipBall = new THREE.Mesh(
        new THREE.SphereGeometry(0.28, 28, 28),
        mats.bugBlack
      );
      tipBall.scale.set(1, 1, 0.72);
      tipBall.position.set(dir * 0.68, 1.76, 0.2);

      const antennaGroup = new THREE.Group();
      antennaGroup.add(stalk, tipBall);
      return antennaGroup;
    }

    const leftAntenna = createBugAntenna(-1);
    const rightAntenna = createBugAntenna(1);
    bugGroup.add(leftAntenna, rightAntenna);

    bugGroup.position.set(0, -0.22, 0.55);
    logoGroup.add(bugGroup);

    // =========================================================================
    // 8. HOJAS VERDES EN PUNTA CON DOBLE TONO Y CONTORNO NAVY
    // =========================================================================
    function createPointedLogoLeaf(
      scale: number,
      rotZ: number,
      pos: [number, number, number],
      flipColors = false
    ) {
      const leafGroup = new THREE.Group();

      const outerShape = new THREE.Shape();
      outerShape.moveTo(0, -1.05);
      outerShape.quadraticCurveTo(0.78, -0.25, 0, 1.15);
      outerShape.quadraticCurveTo(-0.78, -0.25, 0, -1.05);

      const outerExtrude = new THREE.ExtrudeGeometry(outerShape, {
        depth: 0.12,
        bevelEnabled: true,
        bevelThickness: 0.04,
        bevelSize: 0.04,
        bevelSegments: 4,
      });
      const borderMesh = new THREE.Mesh(outerExtrude, mats.navyOutline);
      borderMesh.position.z = -0.06;
      leafGroup.add(borderMesh);

      const leftHalfShape = new THREE.Shape();
      leftHalfShape.moveTo(0, -0.92);
      leftHalfShape.lineTo(0, 0.98);
      leftHalfShape.quadraticCurveTo(-0.62, -0.2, 0, -0.92);

      const leftHalfGeo = new THREE.ExtrudeGeometry(leftHalfShape, {
        depth: 0.14,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelSegments: 3,
      });
      const leftHalfMesh = new THREE.Mesh(
        leftHalfGeo,
        flipColors ? mats.leafDark : mats.leafBright
      );
      leftHalfMesh.position.z = -0.03;
      leafGroup.add(leftHalfMesh);

      const rightHalfShape = new THREE.Shape();
      rightHalfShape.moveTo(0, -0.92);
      rightHalfShape.quadraticCurveTo(0.62, -0.2, 0, 0.98);
      rightHalfShape.lineTo(0, -0.92);

      const rightHalfGeo = new THREE.ExtrudeGeometry(rightHalfShape, {
        depth: 0.14,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelSegments: 3,
      });
      const rightHalfMesh = new THREE.Mesh(
        rightHalfGeo,
        flipColors ? mats.leafBright : mats.leafDark
      );
      rightHalfMesh.position.z = -0.03;
      leafGroup.add(rightHalfMesh);

      const centerVein = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 1.75, 0.08),
        mats.navyOutline
      );
      centerVein.position.set(0, 0.02, 0.12);
      leafGroup.add(centerVein);

      leafGroup.scale.setScalar(scale);
      leafGroup.position.set(pos[0], pos[1], pos[2]);
      leafGroup.rotation.z = rotZ;
      leafGroup.rotation.x = 0.14;
      return leafGroup;
    }

    const leavesGroup = new THREE.Group();
    leavesGroup.add(
      createPointedLogoLeaf(0.95, 0.62, [-0.95, -1.68, 1.12], false),
      createPointedLogoLeaf(0.95, -0.62, [0.95, -1.68, 1.12], true),
      createPointedLogoLeaf(0.76, 0.42, [-1.78, -2.02, 1.22], false),
      createPointedLogoLeaf(0.76, -0.42, [1.78, -2.02, 1.22], true),
      createPointedLogoLeaf(0.68, 1.12, [-2.28, -1.48, 1.02], false),
      createPointedLogoLeaf(0.68, -1.12, [2.28, -1.48, 1.02], true)
    );
    logoGroup.add(leavesGroup);

    // =========================================================================
    // 9. CORONA DE LETRAS Y PUNTOS CELESTES ALREDEDOR DEL ANILLO
    // =========================================================================
    const charsGroup = new THREE.Group();
    const symbols = [
      { char: 'A', angle: 112, r: 4.12 },
      { char: 'o', angle: 98, r: 4.18 },
      { char: 'd', angle: 84, r: 4.22 },
      { char: '+', angle: 70, r: 4.12 },
      { char: '4', angle: 56, r: 4.22 },
      { char: 'コ', angle: 43, r: 4.15 },
      { char: 'J', angle: 25, r: 4.18 },
      { char: 'J', angle: 12, r: 4.35 },
      { char: 'ト', angle: 0, r: 4.12 },
      { char: '+', angle: -11, r: 4.42 },
      { char: 'y', angle: -23, r: 4.18 },
      { char: 'J', angle: -36, r: 4.22 },
      { char: 'q', angle: -52, r: 4.28 },
      { char: 'L', angle: -136, r: 4.15 },
      { char: 'I', angle: -148, r: 4.12 },
      { char: 'o', angle: -162, r: 4.18 },
      { char: 't', angle: -175, r: 4.15 },
      { char: 'r', angle: 173, r: 4.28 },
      { char: '+', angle: 160, r: 4.1 },
      { char: 'o', angle: 147, r: 4.22 },
      { char: 'E', angle: 134, r: 4.1 },
      { char: '+', angle: 122, r: 4.15 },
    ];

    function createCharSprite(text: string) {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.font = 'bold 76px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.fillStyle = 'rgba(224, 247, 255, 0.92)';
        ctx.fillText(text, 64, 64);

        ctx.strokeStyle = '#7dd3fc';
        ctx.lineWidth = 4;
        ctx.strokeText(text, 64, 64);
      }

      const texture = new THREE.CanvasTexture(canvas);
      const mat = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.set(0.82, 0.82, 1);
      return sprite;
    }

    symbols.forEach((item, index) => {
      const rad = THREE.MathUtils.degToRad(item.angle);
      const sprite = createCharSprite(item.char);
      sprite.position.set(
        Math.cos(rad) * item.r,
        Math.sin(rad) * item.r,
        (Math.random() - 0.5) * 0.35
      );
      sprite.userData = {
        baseY: sprite.position.y,
        baseX: sprite.position.x,
        speed: 1.4 + Math.random() * 1.2,
        offset: index,
      };
      charsGroup.add(sprite);
    });

    for (let i = 0; i < 34; i++) {
      const angle = (i / 34) * Math.PI * 2;
      const radius = 3.85 + Math.random() * 0.75;
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.045 + Math.random() * 0.04, 12, 12),
        mats.glyphCyan
      );
      dot.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        (Math.random() - 0.5) * 0.5
      );
      charsGroup.add(dot);
    }

    logoGroup.add(charsGroup);

    // =========================================================================
    // 10. SEGUIMIENTO DEL MOUSE (OJOS + CABEZA + INCLINACIÓN 3D DE LA FIGURA)
    // =========================================================================
    const mouseTarget = { x: 0, y: 0 };
    const mouseSmooth = { x: 0, y: 0 };

    const handleWindowMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width * 0.5;
      const centerY = rect.top + rect.height * 0.5;

      // Normalizamos respecto a la posición de la figura en pantalla [-1, 1]
      const nx = THREE.MathUtils.clamp(
        (e.clientX - centerX) / (window.innerWidth * 0.45),
        -1,
        1
      );
      const ny = THREE.MathUtils.clamp(
        -(e.clientY - centerY) / (window.innerHeight * 0.45),
        -1,
        1
      );
      mouseTarget.x = nx;
      mouseTarget.y = ny;
    };

    window.addEventListener('mousemove', handleWindowMouseMove);

    const clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Interpolación suave hacia el puntero del mouse
      mouseSmooth.x += (mouseTarget.x - mouseSmooth.x) * 0.08;
      mouseSmooth.y += (mouseTarget.y - mouseSmooth.y) * 0.08;

      // 1. La figura completa flota y se inclina suavemente mirando al cursor
      logoGroup.position.y = Math.sin(t * 1.5) * 0.12 + mouseSmooth.y * 0.12;
      logoGroup.rotation.y =
        Math.sin(t * 0.6) * 0.06 + mouseSmooth.x * 0.34;
      logoGroup.rotation.x = -mouseSmooth.y * 0.24;

      // 2. El bichito gira su cabeza/cuerpo con más expresión hacia el mouse
      bugGroup.rotation.y = mouseSmooth.x * 0.22;
      bugGroup.rotation.x = -mouseSmooth.y * 0.16;
      bugGroup.rotation.z =
        Math.sin(t * 2.0) * 0.02 - mouseSmooth.x * 0.05;
      bugGroup.position.x = mouseSmooth.x * 0.1;
      bugGroup.position.y =
        -0.22 + Math.cos(t * 2.0) * 0.03 + mouseSmooth.y * 0.08;

      // 3. ¡Los ojos blancos se desplazan dentro de la cara siguiendo al mouse!
      eyesGroup.position.x = mouseSmooth.x * 0.22;
      eyesGroup.position.y = mouseSmooth.y * 0.16;

      // 4. Las antenas acompañan con un leve rebote
      leftAntenna.rotation.z = Math.sin(t * 2.6) * 0.04 - mouseSmooth.x * 0.06;
      rightAntenna.rotation.z =
        -Math.sin(t * 2.6) * 0.04 - mouseSmooth.x * 0.06;

      // 5. Las letras y partículas exteriores flotan alrededor
      charsGroup.children.forEach((child, idx) => {
        if (child.userData.speed) {
          child.position.y =
            child.userData.baseY +
            Math.sin(t * child.userData.speed + child.userData.offset) * 0.07;
        } else {
          child.position.z = Math.sin(t * 1.5 + idx) * 0.18;
        }
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newW = entry.contentRect.width;
        const newH = entry.contentRect.height;
        if (newW > 0 && newH > 0) {
          updateCameraFit(newW, newH);
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleWindowMouseMove);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative -mx-6 sm:-mx-10 lg:-mx-14 w-[calc(100%+3rem)] sm:w-[calc(100%+5rem)] lg:w-[calc(100%+7rem)] h-[460px] sm:h-[560px] lg:h-[650px] select-none">
      {/* Halo de luz suave detrás de la figura 3D sin cajas ni bordes */}
      <div className="pointer-events-none absolute inset-0 m-auto h-[76%] w-[76%] rounded-full bg-[radial-gradient(circle,rgba(0,150,246,0.42)_0%,rgba(88,204,2,0.14)_50%,transparent_75%)] blur-2xl" />

      {/* Lienzo WebGL 3D transparente con margen amplio a izquierda y derecha */}
      <div
        ref={mountRef}
        className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing"
      />
    </div>
  );
};
