// /// <reference path="base-components.ts"/>
// /// <reference path="../models/drag-drop.ts"/>
// /// <reference path="../models/project.ts"/>
// /// <reference path="../decorators/autobinder.ts"/>

// namespace App {
//   //! Project Item Class

//   export class ProjectItem
//     extends Component<HTMLUListElement, HTMLLIElement>
//     implements Draggable
//   {
//     private project: Project;

//     get persons() {
//       if (this.project.people === 1) {
//         return `Number of person assigned : ${this.project.people}`;
//       } else {
//         return `Number of people assigned : ${this.project.people}`;
//       }
//     }

//     constructor(hostId: string, project: Project) {
//       super("single-project", hostId, false, project.id);
//       this.project = project;

//       this.configure();
//       this.renderContents();
//     }

//     @auto_bind
//     dragStartHandler(event: DragEvent): void {
//       event.dataTransfer!.setData("text/plain", this.project.id);
//       event.dataTransfer!.effectAllowed = "move";
//     }
//     dragEndHandler(_: DragEvent): void {
//       // console.log("dragEnd");
//     }

//     configure(): void {
//       this.element.addEventListener("dragstart", this.dragStartHandler);
//       this.element.addEventListener("dragend", this.dragEndHandler);
//     }

//     renderContents(): void {
//       this.element.querySelector("h2")!.textContent = this.project.title;
//       this.element.querySelector("h3")!.textContent = this.persons;
//       this.element.querySelector("p")!.textContent =
//         `Description : ` + this.project.description;
//     }
//   }
// }

// ****************************************************************************/

// ? Import and Export using ES6 Syntax

import { auto_bind } from "../decorators/autobinder.js";
import { Draggable } from "../models/drag-drop.js";
import { Project } from "../models/project.js";
import { Component } from "./base-components.js";

//! Project Item Class

export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  get persons() {
    if (this.project.people === 1) {
      return `Number of person assigned : ${this.project.people}`;
    } else {
      return `Number of people assigned : ${this.project.people}`;
    }
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContents();
  }

  @auto_bind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }
  dragEndHandler(_: DragEvent): void {
    // console.log("dragEnd");
  }

  configure(): void {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContents(): void {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.persons;
    this.element.querySelector("p")!.textContent =
      `Description : ` + this.project.description;
  }
}
