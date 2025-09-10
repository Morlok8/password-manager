import type { User } from '../../interfaces/user'; 

// calculate id for added user
function addUserService(user: User, userList: Array<User>): Array<User>{
    if(userList.length > 0){
        let max = userList.reduce(function(prev: User, current: User) {
            return (prev && prev.id > current.id) ? prev : current
        }); 
        user.id = max.id + 1;
    }
    else{
        user.id = 1;
    } 
    userList.push(user);          
    return userList;
}

// take portion of the array that will be shown on the page
function pageCalculateService(currentPage: number, usersPerPage: number, userList: Array<User>): Array<User> {
  let start = currentPage * usersPerPage;
  let end = (currentPage * usersPerPage) + usersPerPage;
  return userList.slice(start, end);
}

// filter users based on a search input 
function filterUsersService(filter: string, filterValue: string, userList: Array<User>): Array<User>{
    let userListFiltered = userList.filter(user =>
                {
                    if(typeof filter === 'string'){
                        if(filter === "tags"){
                            let filterArray = filterValue.split(";");

                            let check = false;
                            
                            filterArray.forEach((tag) => {
                                //return user.tags.toLowerCase().includes(tag);
                                let t = tag.trim()+";";
                                if(tag.trim() && user.tags.toLowerCase().includes(t))
                                    check = true;
                            });
                            if(check)
                                return user;
                        }
                        else
                            return user[filter as keyof User].toString().toLowerCase().includes(filterValue);
                    }
                        
                }
            );
    return userListFiltered;
}

export { pageCalculateService, addUserService, filterUsersService };
