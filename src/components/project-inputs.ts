// / <reference path="base-components.ts"/>
// / <reference path="../decorators/autobinder.ts"/>
// / <reference path="../utils/validations.ts"/>
// / <reference path="../state/project-state.ts"/>

// namespace App {
//   //! projectInput Class
//   export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
//     titleInputElement: HTMLInputElement;
//     descriptionInputElement: HTMLInputElement;
//     peopleInputElement: HTMLInputElement;

//     constructor() {
//       super("project-input", "app", true, "user-input");
//       this.titleInputElement = this.element.querySelector(
//         "#title"
//       ) as HTMLInputElement;
//       this.descriptionInputElement = this.element.querySelector(
//         "#description"
//       ) as HTMLInputElement;
//       this.peopleInputElement = this.element.querySelector(
//         "#people"
//       ) as HTMLInputElement;
//       this.configure();
//     }

//     private gatherUserInputs(): [string, string, number] | void {
//       const enteredTitle = this.titleInputElement.value;
//       const enteredDescription = this.descriptionInputElement.value;
//       const enteredPeople = this.peopleInputElement.value;

//       const titleValidAble: Validation = {
//         value: enteredTitle,
//         required: true,
//       };

//       const descriptionValidAble: Validation = {
//         value: enteredDescription,
//         required: true,
//         minLength: 5,
//       };

//       const peopleValidAble: Validation = {
//         value: +enteredPeople,
//         required: true,
//         min: 1,
//         max: 5,
//       };

//       if (
//         !validate(titleValidAble) ||
//         !validate(descriptionValidAble) ||
//         !validate(peopleValidAble)
//       ) {
//         alert("Please enter valid Input");
//         return;
//       } else {
//         return [enteredTitle, enteredDescription, +enteredPeople];
//       }
//     }

//     private clearUserInputs(): void {
//       this.titleInputElement.value = "";
//       this.descriptionInputElement.value = "";
//       this.peopleInputElement.value = "";
//     }

//     @auto_bind
//     private submitHandler(event: Event) {
//       event.preventDefault();
//       const userInputs = this.gatherUserInputs();
//       if (Array.isArray(userInputs)) {
//         const [title, description, people] = userInputs;
//         projectState.addProject(title, description, people);
//         this.clearUserInputs();
//       }
//     }

//     renderContents(): void {}
//     configure() {
//       this.element.addEventListener("submit", this.submitHandler);
//     }
//   }
// }

// *************************************************************************************/

// ? import and export using ES6

import { Component } from "./base-components";
import { Validation, validate } from "../utils/validations";
import { auto_bind } from "../decorators/autobinder";
import { projectState } from "../state/project-state";

//! projectInput Class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;
    this.configure();
  }

  private gatherUserInputs(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidAble: Validation = {
      value: enteredTitle,
      required: true,
    };

    const descriptionValidAble: Validation = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };

    const peopleValidAble: Validation = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !validate(titleValidAble) ||
      !validate(descriptionValidAble) ||
      !validate(peopleValidAble)
    ) {
      alert("Please enter valid Input");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearUserInputs(): void {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @auto_bind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInputs = this.gatherUserInputs();
    if (Array.isArray(userInputs)) {
      const [title, description, people] = userInputs;
      projectState.addProject(title, description, people);
      this.clearUserInputs();
    }
  }

  renderContents(): void {}
  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }
}
