import { defineStore } from 'pinia';
import type { User } from '../interfaces/user'; 
import { pageCalculateService, addUserService, filterUsersService } from '../services/users/userStoreService';
 
export const useUsersStore = defineStore('users', {
    state: () => {
        return {
            userList: [] as User[], // all users, that we get from localStorage
            userListFiltered: [] as User[], // filtered users based on a query
            userListCurrent: [] as User[], // users that we show on one page
            currentPage: 0,
            usersPerPage: 5,
            totalPages: 1 
        }
    },
    getters: {
        getUsers(state){
            let result: Array<User>; 
            if(state.userListFiltered.length !== 0){
                result = state.userListFiltered;
            } 
            else if(state.userListCurrent.length !== 0){
                result = this.getCurrentPageUsers;
            }
            else 
                result = state.userList;
            return result;
        },
        getTotalPages(state){
            let totalPages: Number;
            if(Array.isArray(this.userList))
                totalPages = Math.ceil(this.userList.length / state.usersPerPage);
            else 
                totalPages = 1; 
            return totalPages; 
        },
        getCurrentPageUsers(state){
            let start = state.currentPage * state.usersPerPage;
            let end = (state.currentPage * state.usersPerPage) + state.usersPerPage;
            return state.userList.slice(start, end);
        }   

    },
    actions:{
        initialize(){
            const stored = localStorage.getItem('users');
            if (stored) {
                this.userList = JSON.parse(stored);
            }
            if(Array.isArray(this.userList)){
                this.totalPages = Math.floor(this.userList.length / this.usersPerPage);
                this.userListCurrent = this.userList.slice(this.currentPage, this.usersPerPage);
            }  
        },
        // setters
        // function that handles all changes to the UserList
        setUsers(users: Array<User>){
            this.userList = users;
            this.setUsersCurrent(users); //?
            this.setTotalPages();
            localStorage.setItem('users', JSON.stringify(users));
        },
        // function that sets the UserListCurrent
        setUsersCurrent(usersCurrent: Array<User>){
            this.userListCurrent = usersCurrent;
        },
        // function that sets filtered users
        setFilteredUsers(userListFiltered: Array<User>){
            this.userListFiltered = userListFiltered;
        },
        setTotalPages(){
            this.totalPages = Math.ceil(this.userList.length / this.usersPerPage);
        },
        // function for setting page
        setPage(){
            let users = pageCalculateService(this.currentPage, this.usersPerPage, this.userList); //call of function that returns array for specific page
            this.setUsersCurrent(users);
        },
        // add, edit and remove users
        addUser(user: User){
            let userListAdded = addUserService(user, this.userList);
            this.setUsers(userListAdded);     
        },
        editUser(){
            this.setUsers(this.userList);     
        },
        removeUser(id: number){
            let userList = this.userList.filter(function(user: User){ 
                if(user.id !== id){
                    return user;
                }
            });
            this.setUsers(userList);
            
        },
        // filter functions
        filterUsers(filter: string, filterValue: string){
            let userListFiltered = filterUsersService(filter, filterValue, this.userList);
            this.setFilteredUsers(userListFiltered);
        },
        unsetFilterUsers(){
            this.userListFiltered = [];
        },
        // pagination functions
        // functions for oncreasing / decreasing page with buttons
        pageIncrease(){
            if(this.currentPage < this.totalPages){
                //if(this.totalPages!== 2 && this.currentPage!==1){
                    this.currentPage = this.currentPage + 1;
                    this.setPage();
                //}
            }
        },
        pageDecrease(){
            if(this.currentPage > 0){
                this.currentPage = this.currentPage - 1;
                this.setPage();
            }   
        },
    }
});
