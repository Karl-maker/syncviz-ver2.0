import {
  FreeCamera,
  Vector3,
  ArcRotateCamera,
  TouchCamera,
  VirtualJoysticksCamera,
} from "@babylonjs/core";

export default class Camera {
  constructor(props) {
    const { scene } = props;

    this._scene = scene;
    this._instance = null;
  }

  get instance() {
    return this._instance;
  }

  set instance(instance) {
    this._instance = instance;
  }

  initializeFree(name, position) {
    this._instance = new FreeCamera(
      name || "camera1",
      new Vector3(position.x, position.y, position.z),
      this._scene
    );

    this._instance.speed = 0.5;
    this._instance.inertia = 0.9;

    return;
  }

  initializeArc(name, position) {
    this._instance = new ArcRotateCamera(
      name || "camera1",
      1,
      0.8,
      10,
      new Vector3(position.x, position.y, position.z),
      this._scene
    );

    this._instance.angularSensibility = -this._instance.angularSensibility;

    return;
  }

  async initializeVR(name, position) {}

  initializeGesture(name, position) {
    this._instance = new TouchCamera(
      name || "camera1",

      new Vector3(position.x, position.y, position.z),
      this._scene
    );

    return;
  }

  initializeVirtualJoystick(name, position) {
    this._instance = new VirtualJoysticksCamera(
      name || "camera1",
      new Vector3(position.x, position.y, position.z),
      this._scene
    );

    this._instance.speed = 0.5;
    this._instance.inertia = 0.6;
    this._instance.minZ = 0.1;

    //   if(BABYLON.VirtualJoystick.Canvas.style.zIndex == "-1"){
    //     BABYLON.VirtualJoystick.Canvas.style.zIndex = "4";
    // }else{
    //     BABYLON.VirtualJoystick.Canvas.style.zIndex = "-1";
    // }

    //this._instance.Canvas.style.zIndex = "-1";

    return;
  }

  settingDefault() {
    this._instance.speed = 0.5;
    this._instance.inertia = 0.9;
  }
}
