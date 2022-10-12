import * as BABYLON from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";

const TAG_COMPONENT_NAMES = {
  PLACEHOLDER: "GUI-PlaceHolder-",
  ADVANCEDTEXTURE: "GUI-Texture-",
  RING: "GUI-Tag-",
};

export default class Tag {
  constructor(
    { position, id, label, manage, link, description },
    context,
    virtualSpace
  ) {
    this._position = position;
    this._id = id;
    this._label = label;
    this._description = description;
    this._link = link;
    this._context = context;
    this.virtualSpace = virtualSpace;
    this._manage = manage || false;
    this._placeholder = null;
    this._displayed = false;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  delete() {
    this._context.meshes.forEach((mesh) => {
      if (mesh.id.includes(`${TAG_COMPONENT_NAMES.PLACEHOLDER}${this._id}`)) {
        mesh.dispose();
        mesh = null;
      }
    });

    this._context.textures.forEach((texture) => {
      if (
        texture.name.includes(
          `${TAG_COMPONENT_NAMES.ADVANCEDTEXTURE}${this._id}`
        )
      ) {
        texture.dispose();
        texture = null;
      }
    });
  }

  add() {
    let placeholder = BABYLON.Mesh.CreateSphere(
      `${TAG_COMPONENT_NAMES.PLACEHOLDER}${this._id}`,
      2,
      this._context
    );

    // Set Position

    placeholder.position.y = this._position.y;
    placeholder.position.z = this._position.z;
    placeholder.position.x = this._position.x;

    // GUI Component

    let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI(
      `${TAG_COMPONENT_NAMES.ADVANCEDTEXTURE}${this._id}`,
      true,
      this._context
    );

    let ring = GUI.Button.CreateSimpleButton(
      `${TAG_COMPONENT_NAMES.RING}${this._id}`,
      ""
    );

    ring.width = "20px";
    ring.height = "20px";
    ring.cornerRadius = 20;
    ring.color = "#ffff";
    ring.thickness = 3;
    ring.background = "rgba(255, 255, 255, 0)";
    advancedTexture.addControl(ring);
    ring.linkOffsetY = -0;
    ring.linkWithMesh(placeholder);

    // this._tags.push(ring);

    ring.onPointerEnterObservable.add(() => {
      // Display Label

      this.displayLabel();
    });

    ring.onPointerUpObservable.add(() => {
      // Display Label

      this.displayLabel();
    });

    ring.onPointerDownObservable.add(() => {
      // Display Label

      this.displayLabel();
    });
  }

  displayLabel() {
    // Graphical component

    if (this._displayed) return;

    this._displayed = true;

    this._placeholder = BABYLON.Mesh.CreateSphere(
      `GUI-Label-${this._id}`,
      2,
      this._context
    );

    this._placeholder.position.y = this._position.y || 0;
    this._placeholder.position.z = this._position.z || 0;
    this._placeholder.position.x = this._position.x || 0;

    // GUI
    let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI(
      `Container-GUI-${this._id}`,
      true,
      this._context
    );

    // Main Box

    let box = new GUI.Rectangle(`Box-${this._id}`);
    box.width = "180px";
    box.adaptHeightToChildren = true;
    box.cornerRadius = 15;
    box.color = "#2d3436";
    box.thickness = 0;
    box.background = "#ffff";

    box.onPointerOutObservable.add(() => {
      // The entire GUI Component
      advancedTexture.removeControl(box);
      this._displayed = false;
    });

    advancedTexture.addControl(box);
    box.linkWithMesh(this._placeholder);

    // Stack

    let panelStack = new GUI.StackPanel(`Panel-Stack-${this._id}`);
    panelStack.isVertical = true;
    box.addControl(panelStack);

    // X button

    let x_btn = this.generalButton("", "X_Btn", advancedTexture, {
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
        this._displayed = false;
      },
    });

    x_btn.left = -2;

    panelStack.addControl(x_btn);

    // White Space 1

    let white_space_1 = new GUI.Rectangle("White_Space_1");

    white_space_1.height = "10px";
    white_space_1.cornerRadius = 15;
    white_space_1.color = "#2d3436";
    white_space_1.thickness = 0;
    white_space_1.background = "transparent";
    panelStack.addControl(white_space_1);

    // Labels

    let text = new GUI.TextBlock();
    text.text = this._label || "";
    text.resizeToFit = true;
    text.textWrapping = true;
    panelStack.addControl(text);

    if (this._description) {
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
      description.text = this._description || "";
      description.fontSize = "12px";
      description.resizeToFit = true;
      description.textWrapping = true;
      panelStack.addControl(description);
    }

    // White Space 2

    let white_space_2 = new GUI.Rectangle("white_space_2");

    white_space_2.height = this._link ? "10px" : "20px";
    white_space_2.cornerRadius = 15;
    white_space_2.color = "#2d3436";
    white_space_2.thickness = 0;
    white_space_2.background = "transparent";
    panelStack.addControl(white_space_2);

    if (this._link) {
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

          windowOpen(this._link, "_blank");
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

    if (this._manage) {
      let delete_btn = this.generalButton(
        "DELETE",
        "delete_btn",
        advancedTexture,
        {
          bgcolor: "#d63031",
          color: "#ffff",
          handleClick: () => {
            if (this._id) this.virtualSpace.deleteTag(this._id);

            // The entire GUI Component

            advancedTexture.removeControl(box);
            this._displayed = false;
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
}
