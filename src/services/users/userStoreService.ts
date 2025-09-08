import type { User } from '../../interfaces/user'; 

function pageCalculate(currentPage: number, usersPerPage: number, userList: Array<User>): Array<User> {
  let start = currentPage * usersPerPage;
  let end = (currentPage * usersPerPage) + usersPerPage;
  return userList.slice(start, end);
}

function subtract(a: number, b: number): number {
  return a - b;
}

function multiply(a: number, b: number): number {
  return a * b;
}

export { pageCalculate, subtract, multiply };
