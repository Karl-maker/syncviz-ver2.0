import Camera from "../camera";
import * as BABYLON from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";
import "@babylonjs/loaders/glTF";
import "@babylonjs/loaders/OBJ";
import "@babylonjs/loaders/STL";

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
    this._scene.meshes.forEach((mesh) => {
      if (mesh.id.includes(`tag-${id}`)) {
        console.log(mesh);
        mesh.dispose();
        mesh = null;
      }
    });

    this._scene.textures.forEach((texture) => {
      if (texture.name.includes(`UI-Tag-${id}`)) {
        texture.dispose();
        texture = null;
      }
    });

    this._tags.forEach((tag) => {
      if (tag.name.includes(`Button-${id}`)) {
        tag.dispose();
        tag = null;
      }
    });

    this._tags.filter(function (e) {
      return e !== null;
    });
  }

  displayGUILabel(data, manage, { setInfo, setInfoOpen, virtualSpace }) {
    // Graphical component

    let plane = BABYLON.Mesh.CreateSphere(
      `gui-label-${data._id}`,
      2,
      this._scene
    );

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
    let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI(
      `container-${data._id}`
    );

    // Main Box

    let box = new GUI.Rectangle(`box-${data._id}`);
    box.width = this._mobile ? "180px" : "200px";
    box.adaptHeightToChildren = true;
    box.cornerRadius = 15;
    box.color = data.link ? "#2d3436" : "#2d3436";
    box.thickness = data.link ? 0 : 0;
    box.background = data.link ? "#ffff" : "#ffff";

    box.onPointerOutObservable.add(() => {
      // The entire GUI Component
      advancedTexture.removeControl(box);
      setInfoOpen(false);
    });

    advancedTexture.addControl(box);
    box.linkWithMesh(plane);

    // Stack

    let panelStack = new GUI.StackPanel(`panel-stack-${data._id}`);
    panelStack.isVertical = true;
    box.addControl(panelStack);

    // White Space 1

    let white_space_1 = new GUI.Rectangle("white_space_1");

    white_space_1.height = "20px";
    white_space_1.cornerRadius = 15;
    white_space_1.color = "#2d3436";
    white_space_1.thickness = 0;
    white_space_1.background = "transparent";
    panelStack.addControl(white_space_1);

    // Labels

    let text = new GUI.TextBlock();
    text.text = data.text || "";
    text.resizeToFit = true;
    text.textWrapping = true;
    panelStack.addControl(text);

    if (data.description) {
      // White Space 2

      let white_space_5 = new GUI.Rectangle("white_space_5");

      white_space_5.height = "5px";
      white_space_5.cornerRadius = 15;
      white_space_5.color = "#2d3436";
      white_space_5.thickness = 0;
      white_space_5.background = "transparent";
      panelStack.addControl(white_space_5);

      // Labels

      let description = new GUI.TextBlock();
      description.text = data.description || "";
      description.fontSize = "12px";
      description.resizeToFit = true;
      description.textWrapping = true;
      panelStack.addControl(description);
    }

    // White Space 2

    let white_space_2 = new GUI.Rectangle("white_space_2");

    white_space_2.height = data.link ? "5px" : "20px";
    white_space_2.cornerRadius = 15;
    white_space_2.color = "#2d3436";
    white_space_2.thickness = 0;
    white_space_2.background = "transparent";
    panelStack.addControl(white_space_2);

    if (data.link) {
      // Button
      let link_btn = this.generalButton("LINK", "link_btn", advancedTexture, {
        bgcolor: "#74b9ff",
        color: "#ffff",
        fontSize: "12px",
        height: "25px",
        width: "50px",
        handleClick: () => {
          // Open URL
          function windowOpen(url, specs) {
            if (!url.match(/^https?:\/\//i) || !url.match(/^http?:\/\//i)) {
              url = "https://" + url;
            }
            return window.open(url, specs);
          }

          windowOpen(data.link, "_blank");
        },
      });

      panelStack.addControl(link_btn);

      // White Space 6

      let white_space_6 = new GUI.Rectangle("white_space_6");

      white_space_6.height = "8px";
      white_space_6.cornerRadius = 15;
      white_space_6.color = "#2d3436";
      white_space_6.thickness = 0;
      white_space_6.background = "transparent";
      panelStack.addControl(white_space_6);
    }

    // Close button

    let close_btn = this.generalButton("CLOSE", "close_btn", advancedTexture, {
      bgcolor: "transparent",
      handleClick: () => {
        // The entire GUI Component
        advancedTexture.removeControl(box);
        setInfoOpen(false);
      },
    });

    panelStack.addControl(close_btn);

    // White Space 3

    let white_space_3 = new GUI.Rectangle("white_space_3");

    white_space_3.height = "5px";
    white_space_3.cornerRadius = 15;
    white_space_3.color = "#2d3436";
    white_space_3.thickness = 0;
    white_space_3.background = "transparent";
    panelStack.addControl(white_space_3);

    // Delete Button

    if (manage) {
      let delete_btn = this.generalButton(
        "DELETE",
        "delete_btn",
        advancedTexture,
        {
          bgcolor: "#d63031",
          color: "#ffff",
          handleClick: () => {
            if (data) virtualSpace.deleteTag(data._id);

            // The entire GUI Component
            advancedTexture.removeControl(box);
            setInfoOpen(false);
          },
        }
      );

      // Connect GUI Components

      panelStack.addControl(delete_btn);
    }

    // White Space 4

    let white_space_4 = new GUI.Rectangle("white_space_4");

    white_space_4.height = "5px";
    white_space_4.cornerRadius = 15;
    white_space_4.color = "#2d3436";
    white_space_4.thickness = 0;
    white_space_4.background = "transparent";
    panelStack.addControl(white_space_4);
  }

  generalButton(
    text,
    name,
    advancedTexture,
    { bgcolor, color, handleClick, horizontalPosition, width, height, fontSize }
  ) {
    let btn = GUI.Button.CreateSimpleButton(`${name}`, "");

    btn.width = width || "90px";
    btn.height = height || "30px";
    btn.cornerRadius = 10;
    btn.color = color || "#2d3436";
    btn.adaptWidthToChildren = false;
    btn.thickness = 0.05;
    btn.background = bgcolor || "#ffff";
    btn.horizontalAlignment = horizontalPosition || 2;

    let label = new GUI.TextBlock();
    label.text = text;
    label.fontSize = fontSize || 15;
    btn.addControl(label);

    // On click
    btn.onPointerUpObservable.add(function () {
      handleClick(btn);
    });

    return btn;
  }

  addTag(data, index, { backgroundColor, fontColor, setInfo, setInfoOpen }) {
    let plane = BABYLON.Mesh.CreateSphere(`tag-${data._id}`, 2, this._scene);

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
    let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI(
      `UI-Tag-${data._id}`
    );

    let rect1 = GUI.Button.CreateSimpleButton(`Button-${data._id}`, "");
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

    this._tags.push(rect1);

    rect1.onPointerEnterObservable.add(() => {
      setInfo(data);
      setInfoOpen(true);
    });

    rect1.onPointerUpObservable.add(function () {
      setInfo(data);
      setInfoOpen(true);

      // camera.setTarget(
      //   new BABYLON.Vector3(
      //     plane.position.x,
      //     plane.position.y,
      //     plane.position.z
      //   )
      // );
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
