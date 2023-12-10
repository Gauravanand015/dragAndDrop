// namespace App {
//   //! PROJECT STATE MANAGEMENT
//   type Listener<T> = (items: T[]) => void;

//   class State<T> {
//     protected listeners: Listener<T>[] = []; //* this is the list of listeners function reference, the idea of this listeners function is when we add new project we can loop through the listeners array and call the listeners function

//     addListener(listenerFn: Listener<T>) {
//       this.listeners.push(listenerFn);
//     }
//   }

//   export class ProjectState extends State<Project> {
//     private projects: Project[] = [];
//     private static instance: ProjectState;

//     private constructor() {
//       //* to guarantee that this is the singleton class
//       super();
//     }

//     static getInstance() {
//       if (this.instance) {
//         return this.instance;
//       }
//       this.instance = new ProjectState();
//       return this.instance;
//     }

//     addProject(title: string, description: string, numOfPeople: number) {
//       let newProject = new Project(
//         Math.random().toString(),
//         title,
//         description,
//         numOfPeople,
//         ProjectStatus.Active
//       );
//       this.projects.push(newProject);
//       this.updateListeners();
//     }

//     switchStatusOfMovedProject(projectId: string, newStatus: ProjectStatus) {
//       let project = this.projects.find((elem) => elem.id === projectId);
//       if (project && project.status !== newStatus) {
//         console.log(project.status);
//         project.status = newStatus;
//         this.updateListeners();
//       }
//     }

//     updateListeners() {
//       for (const listenersFn of this.listeners) {
//         listenersFn(this.projects.slice()); //* to add the copies of the listeners
//       }
//     }
//   }

//   export const projectState = ProjectState.getInstance(); //* will guarantee that this will work with the same object
// }

//******************************************************************************************/

//? Import And Export using ES6 syntax
import { Project, ProjectStatus } from "../models/project";

//! PROJECT STATE MANAGEMENT
type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = []; //* this is the list of listeners function reference, the idea of this listeners function is when we add new project we can loop through the listeners array and call the listeners function

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

export class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    //* to guarantee that this is the singleton class
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    let newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    this.updateListeners();
  }

  switchStatusOfMovedProject(projectId: string, newStatus: ProjectStatus) {
    let project = this.projects.find((elem) => elem.id === projectId);
    if (project && project.status !== newStatus) {
      console.log(project.status);
      project.status = newStatus;
      this.updateListeners();
    }
  }

  updateListeners() {
    for (const listenersFn of this.listeners) {
      listenersFn(this.projects.slice()); //* to add the copies of the listeners
    }
  }
}

export const projectState = ProjectState.getInstance(); //* will guarantee that this will work with the same object
