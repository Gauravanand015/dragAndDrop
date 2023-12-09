namespace App {
  export interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
  }

  export interface DragTarget {
    dragOverHandler(event: DragEvent): void; //* this is used to check that the target which you have dragged over is the valid drag area to  be dropped.
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void; //* this is used to show the user that this the right place to drop the targeted item otherwise show the not allowed drop sign(UI) to the user
  }
}
