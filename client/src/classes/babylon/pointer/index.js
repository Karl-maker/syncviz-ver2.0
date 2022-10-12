import * as BABYLON from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";

export default class Pointer {
  constructor(location, username, theme) {
    this.location = location;
    this.username = username;
    this.theme = theme;
    this.objectUrl = "/static/pointer.js";
  }

  draw(context) {
    this.mesh = BABYLON.Mesh.CreateSphere(
      `pointer-${this.username}`,
      5,
      context
    );
  }

  update() {
    this.mesh.position = new BABYLON.Vector3(
      this.location.x,
      this.location.y,
      this.location.z
    );
  }

  control(location) {
    this.location = location;
  }
}
