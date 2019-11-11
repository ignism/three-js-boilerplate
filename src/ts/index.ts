import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const stats = Stats()

let camera: THREE.PerspectiveCamera
let scene: THREE.Scene
let renderer: THREE.WebGLRenderer

let controls: OrbitControls
let container: HTMLElement

init()
animate()

function init() {
  scene = new THREE.Scene()

  scene.background = new THREE.Color(0x646464)

  container = document.getElementById('three-container')

  renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(container.clientWidth, container.clientHeight)

  container.appendChild(renderer.domElement)
  container.appendChild(stats.dom)

  camera = new THREE.PerspectiveCamera(80, container.clientWidth / container.clientHeight, 1, 20000)

  camera.position.set(20, 20, 20)
  camera.lookAt(0, 0, 0)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.025
  controls.screenSpacePanning = false
  controls.minDistance = 10
  controls.maxDistance = 100

  let geometry = new THREE.BoxGeometry(10, 10, 10, 10, 10, 10)
  let mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial())
  scene.add(mesh)

  let directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  scene.add(directionalLight)

  window.addEventListener('resize', onWindowResize, false)
}

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight
  camera.updateProjectionMatrix()

  renderer.setSize(container.clientWidth, container.clientHeight)
}

function animate() {
  requestAnimationFrame(animate)

  stats.update()
  controls.update()

  render()
}

function render() {
  renderer.render(scene, camera)
}
