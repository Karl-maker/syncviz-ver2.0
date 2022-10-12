import * as BABYLON from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";

export default class Tags {
  constructor(props) {
    this._tags = [];
  }

  delete(id, scene) {
    scene.meshes.forEach((mesh) => {
      if (mesh.id.includes(`tag-${id}`)) {
        mesh.dispose();
        mesh = null;
      }
    });

    scene.textures.forEach((texture) => {
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

  displayLabel(scene, data, manage, { setInfo, setInfoOpen, virtualSpace }) {
    // Graphical component

    let plane = BABYLON.Mesh.CreateSphere(`gui-label-${data._id}`, 2, scene);

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
      `container-${data._id}`,
      true,
      scene
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

    // X button

    let x_btn = this.generalButton("", "x_btn", advancedTexture, {
      bgcolor: "#d63031",
      borderRadius: 50,
      color: "#ffff",
      fontSize: 10,
      horizontalPosition: 1,
      width: "25px",
      height: "25px",
      thickness: 5,
      handleClick: () => {
        // The entire GUI Component
        advancedTexture.removeControl(box);
        setInfoOpen(false);
      },
    });

    x_btn.left = -2;

    panelStack.addControl(x_btn);

    // White Space 1

    let white_space_1 = new GUI.Rectangle("white_space_1");

    white_space_1.height = "10px";
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

    white_space_2.height = data.link ? "10px" : "20px";
    white_space_2.cornerRadius = 15;
    white_space_2.color = "#2d3436";
    white_space_2.thickness = 0;
    white_space_2.background = "transparent";
    panelStack.addControl(white_space_2);

    if (data.link) {
      // Button
      let link_btn = this.generalButton("LINK", "link_btn", advancedTexture, {
        bgcolor: "#ffff",
        color: "#74b9ff",
        thickness: 0.2,
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

    // let close_btn = this.generalButton("CLOSE", "close_btn", advancedTexture, {
    //   bgcolor: "transparent",
    //   handleClick: () => {
    //     // The entire GUI Component
    //     advancedTexture.removeControl(box);
    //     setInfoOpen(false);
    //   },
    // });

    // panelStack.addControl(close_btn);

    // // White Space 3

    // let white_space_3 = new GUI.Rectangle("white_space_3");

    // white_space_3.height = "5px";
    // white_space_3.cornerRadius = 15;
    // white_space_3.color = "#2d3436";
    // white_space_3.thickness = 0;
    // white_space_3.background = "transparent";
    // panelStack.addControl(white_space_3);

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
    {
      bgcolor,
      color,
      handleClick,
      horizontalPosition,
      width,
      height,
      fontSize,
      borderRadius,
      thickness,
    }
  ) {
    let btn = GUI.Button.CreateSimpleButton(`${name}`, "");

    btn.width = width || "90px";
    btn.height = height || "30px";
    btn.cornerRadius = borderRadius || 10;
    btn.color = color || "#2d3436";
    btn.adaptWidthToChildren = false;
    btn.thickness = thickness || 0.05;
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

  add(
    scene,
    data,
    index,
    { backgroundColor, fontColor, setInfo, setInfoOpen }
  ) {
    let plane = BABYLON.Mesh.CreateSphere(`tag-${data._id}`, 2, scene);

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
      `UI-Tag-${data._id}`,
      true,
      scene
    );

    let rect1 = GUI.Button.CreateSimpleButton(`Button-${data._id}`, "");

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

      //   camera.setTarget(
      //     new BABYLON.Vector3(
      //       plane.position.x,
      //       plane.position.y,
      //       plane.position.z
      //     )
      //   );
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
}
