// namespace App {
//   //! ENUM
//   export enum ProjectStatus {
//     Active,
//     Finished,
//   }

//   //! Project Type
//   export class Project {
//     constructor(
//       public id: string,
//       public title: string,
//       public description: string,
//       public people: number,
//       public status: ProjectStatus
//     ) {}
//   }
// }

// ? Import And Export Using ES6

//! ENUM
export enum ProjectStatus {
  Active,
  Finished,
}

//! Project Type
export class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}
