import Camera from "../camera";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import "@babylonjs/loaders/OBJ";
import "@babylonjs/loaders/STL";
import Tag from "../tag";

export default class Scene {
  constructor(props) {
    const { scene } = props;

    this._scene = scene;
    this._canvas = null;
    this._mobile = false;
    this._tags = [];
    this._manage = false;
  }

  get scene() {
    return this._scene;
  }

  set scene(scene) {
    this._scene = scene;
  }

  get manage() {
    return this._manage;
  }

  set manage(manage) {
    this._manage = manage;
  }

  get canvas() {
    this._canvas = this._scene.getEngine().getRenderingCanvas();
    return this._canvas;
  }

  set canvas(canvas) {
    this._canvas = canvas;
  }

  get camera() {
    return this._camera;
  }

  set camera(camera) {
    this._camera = camera;
  }
  get mobile() {
    return this._mobile;
  }

  set mobile(mobile) {
    this._mobile = mobile;
  }

  async initializeCamera({ x, y, z, mobile, vr }) {
    x = x || 0;
    y = y || 0;
    z = z || 0;

    this._mobile = mobile;
    this._camera = new Camera({ scene: this._scene });

    this._camera.initializeArc("camera1", {
      x,
      y,
      z,
    });

    this._scene.clipPlane = new BABYLON.Plane(0, 0, 0, 0);
    this._camera.instance.useFramingBehavior = true;
    this._camera.instance.setTarget(BABYLON.Vector3.Zero());
  }

  async loadScene(url, { setProgress }, callback) {
    var light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 0),
      this._scene
    );

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;
    return BABYLON.SceneLoader.AppendAsync("", url, this._scene, (evt) => {
      // On Progress
      let loadedPercent = 0;
      if (evt.lengthComputable) {
        loadedPercent = ((evt.loaded * 100) / evt.total).toFixed();
      } else {
        let dlCount = evt.loaded / (1024 * 1024);
        loadedPercent = Math.floor(dlCount * 100.0) / 100.0;
      }
      if (setProgress) setProgress(loadedPercent);
    }).then((scene) => {
      if (callback) callback(scene);
      return scene;
    });
  }

  setArcCameraFraming(callback) {
    let framingBehavior = this._scene.activeCamera.getBehaviorByName("Framing");
    framingBehavior.framingTime = 5000;
    framingBehavior.elevationReturnTime = -1;
    framingBehavior.autoCorrectCameraLimitsAndSensibility = true;

    let worldExtends = this._scene.getWorldExtends();

    this._scene.activeCamera.useBouncingBehavior = true;
    this._scene.activeCamera.allowUpsideDown = false;

    // worldExtends.min.x = worldExtends.min.x - worldExtends.min.x * 0.8;
    // worldExtends.min.y = worldExtends.min.y - worldExtends.min.y * 0.8;
    // worldExtends.min.z = worldExtends.min.z - worldExtends.min.z * 0.8;

    framingBehavior.zoomOnBoundingInfo(worldExtends.min, worldExtends.max);
    framingBehavior.zoomOnMeshesHierarchy(this._scene.meshes);
    this._scene.activeCamera.lowerRadiusLimit = 0;

    callback();
  }

  getParentMesh(meshes) {
    let parent = new BABYLON.Mesh("parent", this._scene);

    meshes.forEach((mesh) => {
      mesh.parent = parent;
      this.getParentSize(mesh);
    });

    return parent;
  }

  getParentSize(parent) {
    const sizes = parent.getHierarchyBoundingVectors();
    const size = {
      x: sizes.max.x - sizes.min.x,
      y: sizes.max.y - sizes.min.y,
      z: sizes.max.z - sizes.min.z,
    };
    return size;
  }

  totalBoundingInfo(meshes) {
    var boundingInfo = meshes[0].getBoundingInfo();
    var min = boundingInfo.minimum.add(meshes[0].position);
    var max = boundingInfo.maximum.add(meshes[0].position);
    for (var i = 1; i < meshes.length; i++) {
      boundingInfo = meshes[i].getBoundingInfo();
      min = BABYLON.Vector3.Minimize(
        min,
        boundingInfo.minimum.add(meshes[i].position)
      );
      max = BABYLON.Vector3.Maximize(
        max,
        boundingInfo.maximum.add(meshes[i].position)
      );
    }
    return new BABYLON.BoundingInfo(min, max);
  }

  async loadLocalScene(name) {
    new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
    BABYLON.SceneLoader.ImportMeshAsync("", "../../../examples/", name).then(
      function (scene) {
        // do something with the scene
      }
    );
  }

  deleteTag(id) {
    // this._tag.delete(id, this._scene);
    this._tags.forEach((tag) => {
      if (id === tag.id) {
        tag.delete();
        tag = null;
      }
    });
  }

  displayGUILabel(data, manage, { setInfo, setInfoOpen, virtualSpace }) {
    // this._tag.displayLabel(this._scene, data, manage, {
    //   setInfo,
    //   setInfoOpen,
    //   virtualSpace,
    // });
  }

  addTag(data, { virtualSpace }) {
    const tag = new Tag(
      {
        position: data.position,
        id: data._id,
        label: data.text,
        link: data.link,
        description: data.description,
        manage: this._manage,
      },
      this._scene,
      virtualSpace
    );
    tag.add();
    this._tags.push(tag);
  }

  createAnimation({ property, from, to }) {
    const FRAMES_PER_SECOND = 60;
    const ease = new BABYLON.CubicEase();
    ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

    const animation = BABYLON.Animation.CreateAnimation(
      property,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      FRAMES_PER_SECOND,
      ease
    );
    animation.setKeys([
      {
        frame: 0,
        value: from,
      },
      {
        frame: 100,
        value: to,
      },
    ]);

    return animation;
  }
}
