import { defineStore } from 'pinia';
import type { User } from '../interfaces/user'; 
import { pageCalculateService, addUserService } from '../services/users/userStoreService';
 
export const useUsersStore = defineStore('users', {
    state: () => {
        return {
            userList: [] as User[],
            userListFiltered: [] as User[],
            userListCurrent: [] as User[],
            currentPage: 0,
            usersPerPage: 5,
            totalPages: 1 
        }
    },
    getters: {
        getUsers(state){
            let result: Array<User>; 
            
            if(state.userListFiltered.length !== 0)
                result = state.userListFiltered
            else 
                result = state.userList;

            if(state.userListCurrent.length !== 0){
                result = this.getCurrentPageUsers;
            }
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
        /*getUser(id){
            this.userList;
        }*/
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
                //this.userList = this.userList.slice(this.currentPage, this.usersPerPage);
            }  
        },
        setUsers(users: Array<User>){
            this.userList = users;
            this.setUsersCurrent(users); //?
            this.setTotalPages();
            localStorage.setItem('users', JSON.stringify(users));
        },
        setUsersCurrent(usersCurrent: Array<User>){
            this.userListCurrent = usersCurrent;
        },
        setTotalPages(){
            this.totalPages = Math.ceil(this.userList.length / this.usersPerPage);
        },
        setFilteredUsers(userListFiltered: Array<User>){
            this.userListFiltered = userListFiltered;
        },
        
        addUser(user: User){
            let userListAdded = addUserService(user, this.userList);
            this.setUsers(userListAdded);     
            //localStorage.setItem('users', JSON.stringify(this.userList));
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
        filterUsers(filter: string, filterValue: string){
            let userListFiltered = this.userList.filter(user =>
                {
                    if(typeof filter === 'string')
                        return user[filter as keyof User].toString().toLowerCase().includes(filterValue);
                }
            );
            this.setFilteredUsers(userListFiltered);
        },
        unsetFilterUsers(){
            this.userListFiltered = [];
        },
        pageSet(){
            let users = pageCalculateService(this.currentPage, this.usersPerPage, this.userList);//this.pageCalculate();
            this.setUsersCurrent(users);
        },
        pageIncrease(){
            if(this.currentPage < this.totalPages){
                //if(this.totalPages!== 2 && this.currentPage!==1){
                    this.currentPage = this.currentPage + 1;
                    this.pageSet();
                    console.log(this.currentPage, this.totalPages);
                //}
            }
        },
        pageDecrease(){
            if(this.currentPage > 0){
                this.currentPage = this.currentPage - 1;
                this.pageSet();
            }   
        },
    }
});
