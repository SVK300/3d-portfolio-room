// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.set(0, 5, 10);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: 0xaaaaaa })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Wall (back wall to hang paintings)
const wall = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 10),
  new THREE.MeshStandardMaterial({ color: 0xf0f0f0 })
);
wall.position.set(0, 5, -10);
scene.add(wall);

// Paintings
const paintings = [
  {
    name: "painting1",
    file: "assets/painting1.jpg",
    position: [-6, 5, -9.9],
    title: "Athena",
    medium: "Acrylic on canvas",
    year: "2023"
  },
  {
    name: "painting2",
    file: "assets/painting2.jpg",
    position: [0, 5, -9.9],
    title: "Lilies: Commission Work",
    medium: "Acrylic on canvas",
    year: "2024"
  },
  {
    name: "painting3",
    file: "assets/painting3.jpg",
    position: [6, 5, -9.9],
    title: "Radha Krishna",
    medium: "Acrylic on canvas",
    year: "2022"
  }
];

paintings.forEach(p => {
  const texture = new THREE.TextureLoader().load(p.file);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), material);
  mesh.position.set(...p.position);
  mesh.name = p.name;
  mesh.userData = {
    title: p.title,
    medium: p.medium,
    year: p.year
  };
  scene.add(mesh);
});

// Interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    const clicked = intersects[0].object;
    if (clicked.userData.title) {
      let infoBox = document.getElementById('info');
      if (!infoBox) {
        infoBox = document.createElement('div');
        infoBox.id = 'info';
        infoBox.style.position = 'absolute';
        infoBox.style.top = '20px';
        infoBox.style.left = '20px';
        infoBox.style.padding = '10px';
        infoBox.style.background = 'rgba(0,0,0,0.7)';
        infoBox.style.color = 'white';
        infoBox.style.fontFamily = 'Arial, sans-serif';
        document.body.appendChild(infoBox);
      }
      infoBox.innerHTML = `<strong>${clicked.userData.title}</strong><br>${clicked.userData.medium}<br>${clicked.userData.year}`;
      infoBox.style.display = 'block';

      clearTimeout(infoBox.timeout);
      infoBox.timeout = setTimeout(() => {
        infoBox.style.display = 'none';
      }, 4000);
    }
  }
});

// Render Loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
