export class Person
{
  constructor(public firstName: string,
    public lastName: string, public age: number) 
  {
  }
  
  public get fullName()
  { return this.firstName + " " + this.lastName; }

  public get formalName()
  { return this.lastName + ", " + this.firstName; }
}
