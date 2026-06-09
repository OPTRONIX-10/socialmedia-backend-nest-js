export class UsersService {
  users: {
    id: number;
    name: string;
    age: number;
    gender: string;
    email: string;
    isMarried: boolean;
  }[] = [
    {
      id: 1,
      name: 'Abhishek',
      email: 'abho@gmail.com',
      age: 25,
      gender: 'Male',
      isMarried: false,
    },
    {
      id: 2,
      name: 'KS',
      age: 26,
      email: 'abho@gmail.com',
      gender: 'Female',
      isMarried: true,
    },
  ];

  getallUsers() {
    return this.users;
  }

  getUserById(id: number) {
    return this.users.find((x) => x.id == id);
  }

  createNewUser(user: {
    id: number;
    name: string;
    age: number;
    gender: string;
    email: string;
    isMarried: boolean;
  }) {
    this.users.push(user);
  }
}
