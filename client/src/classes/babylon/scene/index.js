import Camera from "../camera";
import * as BABYLON from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";
import "@babylonjs/loaders/glTF";
import "@babylonjs/loaders/OBJ";

export default class Scene {
  constructor(props) {
    const { scene } = props;

    this._scene = scene;
    this._canvas = null;
    this._mobile = false;
    this._tags = [];
  }

  get scene() {
    return this._scene;
  }

  set scene(scene) {
    this._scene = scene;
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

  async loadScene(url, { setProgress }) {
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
      return scene;
    });
  }

  setArcCameraFraming() {
    var framingBehavior = this._scene.activeCamera.getBehaviorByName("Framing");
    //framingBehavior.framingTime = 0.5;
    framingBehavior.elevationReturnTime = -1;

    var worldExtends = this._scene.getWorldExtends();
    this._scene.activeCamera.lowerRadiusLimit = null;

    // worldExtends.min.x = worldExtends.min.x - worldExtends.min.x * 0.8;
    // worldExtends.min.y = worldExtends.min.y - worldExtends.min.y * 0.8;
    // worldExtends.min.z = worldExtends.min.z - worldExtends.min.z * 0.8;

    framingBehavior.zoomOnBoundingInfo(worldExtends.min, worldExtends.max);
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

  addTag(data, index, { backgroundColor, fontColor, setInfo, setInfoOpen }) {
    var plane = BABYLON.Mesh.CreateSphere("gui-position", 2, this._scene);

    if (data.position) {
      // Move the sphere upward 1/2 its height
      plane.position.y = data.position.y || 0;
      plane.position.z = data.position.z || 0;
      plane.position.x = data.position.x || 0;
    } else {
      plane.position.y = 0;
      plane.position.z = 0;
      plane.position.x = 0;
    }

    // GUI
    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var rect1 = GUI.Button.CreateSimpleButton("button1", "");
    // rect1.width = this._mobile ? 0.4 : 0.2;
    // rect1.height = "30px";
    // rect1.cornerRadius = 20;
    // rect1.color = fontColor;
    // rect1.thickness = 0;
    // rect1.background = backgroundColor;
    // advancedTexture.addControl(rect1);
    // rect1.linkWithMesh(plane);
    // rect1.linkOffsetY = -80;

    rect1.width = "20px";
    rect1.height = "20px";
    rect1.cornerRadius = 20;
    rect1.color = fontColor;
    //rect1.adaptWidthToChildren = true;
    rect1.thickness = 3;
    rect1.background = "transparent";
    advancedTexture.addControl(rect1);
    rect1.linkOffsetY = -0;
    rect1.linkWithMesh(plane);

    const camera = this._scene.activeCamera;

    rect1.onPointerUpObservable.add(function () {
      setInfo(data);
      setInfoOpen(true);

      camera.setPosition(plane.position);
    });

    // var icon = GUI.Button.CreateSimpleButton("button", "");
    // icon.width = "20px";
    // icon.height = "20px";
    // icon.color = fontColor;
    // icon.cornerRadius = 20;
    // icon.background = backgroundColor;

    // var header = GUI.Control.AddHeader(icon, "", "100px", {
    //   isHorizontal: true,
    //   controlFirst: true,
    // });
    // header.height = "30px";

    // rect1.addControl(icon);

    // var label = new GUI.TextBlock();
    // label.text = data.text;
    // label.fontSize = 15;
    // rect1.addControl(label);

    // var target = new GUI.Ellipse();
    // target.width = "10px";
    // target.height = "10px";
    // target.color = fontColor;
    // target.thickness = 0;
    // target.linkOffsetY = -5;
    // target.background = backgroundColor;
    // advancedTexture.addControl(react);
    // target.linkWithMesh(react);

    // var line = new GUI.Line();
    // line.lineWidth = 2;
    // line.color = fontColor;
    // line.y2 = 10;
    // line.linkOffsetY = -5;
    // advancedTexture.addControl(line);
    // line.linkWithMesh(plane);
    // line.connectedControl = rect1;
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
