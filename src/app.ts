// / <reference path="components/projects-list.ts"/>
// / <reference path="components/project-inputs.ts"/>

//! DRAG AND DROP Project

// namespace App {
//   new ProjectInput();
//   new ProjectList("active");
//   new ProjectList("finished");
// }

// ************************************************************************************/

// ? Import and export using  ES6 syntax
import { ProjectInput } from "./components/project-inputs.js";
import { ProjectList } from "./components/projects-list.js";

new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
