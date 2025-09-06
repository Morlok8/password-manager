import { defineStore } from 'pinia';
import type { User } from '../interfaces/user'; 
 
export const useUsersStore = defineStore('users', {
    state: () => {
        return {
            userList: [] as User[],
        }
    },
    getters: {
        getUsers(state){
            return state.userList
        },
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
        },
        setUsers(users: Array<User>){
            this.userList = users;
            localStorage.setItem('users', JSON.stringify(users));
        },
        addUser(user: User){
            //console.log(user);
            console.log(this.userList.length);
            if(this.userList.length > 0){
                console.log(this.userList);
                    let max = this.userList.reduce(function(prev: User, current: User) {
                    return (prev && prev.id > current.id) ? prev : current
                }); 
                user.id = max.id + 1;
            }
            else{
                user.id = 1;
            }           
            this.userList.push(user);
            localStorage.setItem('users', JSON.stringify(this.userList));
        },
        editUser(id: number){
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
            
            this.userList = this.userList.filter(user =>
                {
                    console.log(user.name);
                    console.log(user[filter]);
                    return user[filter].toLowerCase().includes(filterValue);
                }
            );
            
        }   
    }
});
