namespace App {
  //! Component
  export abstract class Component<
    T extends HTMLElement,
    U extends HTMLElement
  > {
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
}
