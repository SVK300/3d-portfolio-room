const scene = new THREE.Scene();\
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
    title: "Athena",\
    medium: "Acrylic on canvas",\
    year: "2023"\
  \},\
  \{\
    name: "painting2",\
    file: "assets/painting2.jpg",\
    position: [0, 5, -9.9],\
    title: "Lilies: Commission Work",\
    medium: "Acrylic on canvas",\
    year: "2024"\
  \},\
  \{\
    name: "painting3",\
    file: "assets/painting3.jpg",\
    position: [6, 5, -9.9],\
    title: "Radha Krishna",\
    medium: "Acrylic on canvas",\
    year: "2022"\
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
