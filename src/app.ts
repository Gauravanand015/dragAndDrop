// DRAG AND DROP Interfaces

interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void; //* this is used to check that the target which you have dragged over is the valid drag area to  be dropped.
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void; //* this is used to show the user that this the right place to drop the targeted item otherwise show the not allowed drop sign(UI) to the user
}

// ENUM
enum ProjectStatus {
  Active,
  Finished,
}

// Project Type
class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = []; // this is the list of listeners function reference, the idea of this listeners function is when we add new project we can loop through the listens array and call the listeners function

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

// Project State Management
class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    // to guarantee that this is the singleton class
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
      // console.log(project.status);
      project.status = newStatus;
      this.updateListeners();
    }
  }

  updateListeners() {
    for (const listenersFn of this.listeners) {
      listenersFn(this.projects.slice()); // to add the copies of the listeners
    }
  }
}

const projectState = ProjectState.getInstance(); // will guarantee that this will work with the same object

//Validation
interface Validation {
  value: String | Number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validDetails: Validation) {
  // console.log(validDetails);
  let isValid = true;
  if (validDetails.required) {
    isValid = isValid && validDetails.value.toString().trim().length > 0;
  }

  if (
    validDetails.minLength != null &&
    typeof validDetails.value === "string"
  ) {
    isValid = isValid && validDetails.value.length >= validDetails.minLength;
  }

  if (
    validDetails.maxLength != null &&
    typeof validDetails.value === "string"
  ) {
    isValid = isValid && validDetails.value.length <= validDetails.maxLength;
  }

  if (validDetails.min != null && typeof validDetails.value === "number") {
    isValid = isValid && validDetails.value >= validDetails.min;
  }

  if (validDetails.max != null && typeof validDetails.value === "number") {
    isValid = isValid && validDetails.value <= validDetails.max;
  }

  return isValid;
}

// auto_bind decorators
function auto_bind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalDescriptor = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      let boundFxn = originalDescriptor.bind(this);
      return boundFxn;
    },
  };

  return adjustedDescriptor;
}

// Component

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    //*importNode is a method in the Document Object Model (DOM) API in JavaScript that allows you to clone a node from one document into another document. It is commonly used when you want to move or duplicate elements or nodes between different DOM documents.
    // *The importNode method takes two arguments:
    // *The node you want to clone.
    // *A boolean value specifying whether to clone the node's descendants (i.e., its children and their descendants) as well. If set to true, the entire subtree of the node will be cloned; if set to false, only the node itself will be cloned.

    this.element = importedNode.firstElementChild as U;

    if ((this, newElementId)) {
      this.element.id = newElementId;
    }

    this.attach(insertAtStart);
  }

  private attach(insertAtBeginning: Boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? "afterbegin" : "beforeend",
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContents(): void;
}

// Project Item Class

class ProjectItem
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

// render the project list to the DOM;
class ProjectList
  extends Component<HTMLDivElement, HTMLFormElement>
  implements DragTarget
{
  assignedProjects: any[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);

    this.assignedProjects = [];

    this.configure();
    this.renderContents();
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listEl.innerHTML = "";
    for (const projectItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, projectItem);
    }
  }

  @auto_bind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  @auto_bind
  dropHandler(event: DragEvent): void {
    const prjId = event.dataTransfer!.getData("text/plain");
    projectState.switchStatusOfMovedProject(
      prjId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  @auto_bind
  dragLeaveHandler(_: DragEvent): void {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }
  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("drop", this.dropHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((items) => {
        if (this.type === "active") {
          return items.status === ProjectStatus.Active;
        }
        return items.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderContents() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toLocaleUpperCase() + " PROJECTS";
  }
}

// projectInput Class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

const project = new ProjectInput();
const activeProjects = new ProjectList("active");
const finishedProjects = new ProjectList("finished");
