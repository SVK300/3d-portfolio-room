{\rtf1\ansi\ansicpg1252\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const scene = new THREE.Scene();\
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);\
const renderer = new THREE.WebGLRenderer();\
renderer.setSize(window.innerWidth, window.innerHeight);\
document.body.appendChild(renderer.domElement);\
\
// Light\
const light = new THREE.AmbientLight(0xffffff, 1);\
scene.add(light);\
\
// Floor\
const floor = new THREE.Mesh(\
  new THREE.PlaneGeometry(20, 20),\
  new THREE.MeshStandardMaterial(\{ color: 0xaaaaaa \})\
);\
floor.rotation.x = -Math.PI / 2;\
scene.add(floor);\
\
// Wall\
const wall = new THREE.Mesh(\
  new THREE.PlaneGeometry(20, 10),\
  new THREE.MeshStandardMaterial(\{ color: 0xf0f0f0 \})\
);\
wall.position.z = -10;\
wall.position.y = 5;\
scene.add(wall);\
\
// Paintings\
const paintings = [\
  \{\
    name: "painting1",\
    file: "assets/painting1.jpg",\
    position: [-6, 5, -9.9],\
    title: "Sunset Glow",\
    medium: "Acrylic on canvas",\
    year: "2023"\
  \},\
  \{\
    name: "painting2",\
    file: "assets/painting2.jpg",\
    position: [0, 5, -9.9],\
    title: "Dreamscape",\
    medium: "Oil on wood",\
    year: "2022"\
  \},\
  \{\
    name: "painting3",\
    file: "assets/painting3.jpg",\
    position: [6, 5, -9.9],\
    title: "Silent Blue",\
    medium: "Watercolor on paper",\
    year: "2021"\
  \}\
];\
\
paintings.forEach(p => \{\
  const tex = new THREE.TextureLoader().load(p.file);\
  const mat = new THREE.MeshBasicMaterial(\{ map: tex \});\
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), mat);\
  mesh.position.set(...p.position);\
  mesh.name = p.name;\
  mesh.userData = \{\
    title: p.title,\
    medium: p.medium,\
    year: p.year\
  \};\
  scene.add(mesh);\
\});\
\
// Camera\
camera.position.set(0, 5, 10);\
\
// Interaction\
const raycaster = new THREE.Raycaster();\
const mouse = new THREE.Vector2();\
\
window.addEventListener('click', (event) => \{\
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;\
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;\
\
  raycaster.setFromCamera(mouse, camera);\
  const intersects = raycaster.intersectObjects(scene.children);\
\
  if (intersects.length > 0) \{\
    const clicked = intersects[0].object;\
    if (clicked.userData.title) \{\
      const infoBox = document.getElementById('info');\
      infoBox.innerHTML = `<strong>$\{clicked.userData.title\}</strong><br>$\{clicked.userData.medium\}<br>$\{clicked.userData.year\}`;\
      infoBox.style.display = 'block';\
      setTimeout(() => \{ infoBox.style.display = 'none'; \}, 4000);\
    \}\
  \}\
\});\
\
function animate() \{\
  requestAnimationFrame(animate);\
  renderer.render(scene, camera);\
\}\
\
animate();}