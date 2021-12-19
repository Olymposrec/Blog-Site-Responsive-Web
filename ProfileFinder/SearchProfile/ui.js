class UI{
    constructor(){
        this.profileContainer = document.querySelector('#profileContainer');
        this.alert = document.querySelector('#alert');
    }

    showProfile(profile){
        this.profileContainer.innerHTML=`
        
            <div class="card card-body mt-3 text-white" id="search-result" >

                <div class="row mt-3">

                    <div class="col-md-3 mt-3>
                        <a href="https://placeholder.com">
                        <img src="https://via.placeholder.com/300x200" class="img-thumbnail">
                        </a>
                    </div>
                    <div class="col-md-9 mb-2">
                        
                        <h4> Contact </h4>
                        <ul class="list-group text-white" id="contact-list">

                            <li class="list-group-item" id="contact-list">
                                Name: ${profile.name}
                            </li>
                            <li class="list-group-item" id="contact-list">
                                Username: ${profile.username}
                            </li>
                            <li class="list-group-item" id="contact-list">
                                Email: ${profile.email}
                            </li>
                            <li class="list-group-item" id="contact-list">
                                Address: ${profile.address.street}, ${profile.address.city}, ${profile.address.zipcode}, ${profile.address.suite}
                            </li>
                            <li class="list-group-item" id="contact-list">
                                Website: ${profile.website}
                            </li>
                            <li class="list-group-item" id="contact-list">
                                Company Name: ${profile.company.name}
                            </li>

                        </ul>
                        <h4 class="mt-4"> To Do List </h4>
                        <ul id="todo" class="list-group">
                        </ul>
                    </div>

                </div>

            </div>

        `;
    }

    showAlert(text){
        this.alert.innerHTML=`${text} is not found.`
    }

    showTodo(todo){
        let html="";

        todo.forEach(item =>{
            if(item.completed){
                html+=`
                
                    <li class="list-group-item bg-success">
                        ${item.title}
                    </li>
                
                `;
            }else{
                html+=`
                
                    <li class="list-group-item bg-secondary">
                        ${item.title}
                    </li>
                
                `;
            }
        });


        this.profileContainer.querySelector('#todo').innerHTML=html;
    }

    clear(){
        this.profileContainer.innerHTML="";
        this.alert.innerHTML ="";
    }
}