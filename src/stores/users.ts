import { defineStore } from 'pinia';
import type { User } from '../interfaces/user'; 
 
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
            if(this.userList.length > 0){
                let max = this.userList.reduce(function(prev: User, current: User) {
                    return (prev && prev.id > current.id) ? prev : current
                }); 
                user.id = max.id + 1;
            }
            else{
                user.id = 1;
            }           
            this.userList.push(user);
            this.setUsers(this.userList);     
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
                    return user[filter].toLowerCase().includes(filterValue);
                }
            );
            this.setFilteredUsers(userListFiltered);
        },
        unsetFilterUsers(){
            this.userListFiltered = [];
        },

        pageCalculate(){
            let start = this.currentPage * this.usersPerPage;
            let end = (this.currentPage * this.usersPerPage) + this.usersPerPage;
            return this.userList.slice(start, end);
        },
        pageSet(){
            console.log('set');
            let users = this.pageCalculate();
            this.setUsersCurrent(users);
        },
        pageIncrease(){
            console.log(this.currentPage, this.totalPages);
            if(this.currentPage < this.totalPages){
                this.currentPage = this.currentPage + 1;
                this.pageSet();
            }
            else{
                console.log('cant increase');
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
