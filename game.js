const startScreen = document.getElementById("startScreen");
const carSelection = document.getElementById("carSelection");

let selectedCar = null;

// Mostra la schermata di selezione auto
document.getElementById("startButton").addEventListener("click", () => {
  startScreen.style.display = "none";
  carSelection.style.display = "flex";
});

// Salva l'auto selezionata e avvia il gioco
document.querySelectorAll(".carButton").forEach((button) => {
  button.addEventListener("click", (event) => {
    selectedCar = event.target.dataset.car;
    carSelection.style.display = "none";
    initGame(selectedCar);
  });
});

function initGame(car) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const light = new THREE.PointLight(0xffffff, 1, 100);
  light.position.set(10, 10, 10);
  scene.add(light);

  const carGeometry = new THREE.BoxGeometry(2, 1, 4);
  const carMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const carMesh = new THREE.Mesh(carGeometry, carMaterial);
  scene.add(carMesh);

  camera.position.set(0, 5, 10);

  const planeGeometry = new THREE.PlaneGeometry(500, 500);
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
  const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
  planeMesh.rotation.x = -Math.PI / 2;
  scene.add(planeMesh);

  const controls = { forward: false, backward: false, left: false, right: false };
  window.addEventListener("keydown", (e) => {
    if (e.key === "w") controls.forward = true;
    if (e.key === "s") controls.backward = true;
    if (e.key === "a") controls.left = true;
    if (e.key === "d") controls.right = true;
  });

  window.addEventListener("keyup", (e) => {
    if (e.key === "w") controls.forward = false;
    if (e.key === "s") controls.backward = false;
    if (e.key === "a") controls.left = false;
    if (e.key === "d") controls.right = false;
  });

  function animate() {
    requestAnimationFrame(animate);

    if (controls.forward) carMesh.position.z -= 0.1;
    if (controls.backward) carMesh.position.z += 0.1;
    if (controls.left) carMesh.rotation.y += 0.05;
    if (controls.right) carMesh.rotation.y -= 0.05;

    camera.position.set(carMesh.position.x, carMesh.position.y + 5, carMesh.position.z + 10);
    camera.lookAt(carMesh.position);

    renderer.render(scene, camera);
  }

  animate();
}
