const firebaseConfig = {
    apiKey: "AIzaSyB3jQ4yPgUa_qRihZuxlMa6me9Z2eZZiFw",
    authDomain: "gym-management-project-55289.firebaseapp.com",
    databaseURL: "https://gym-management-project-55289-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "gym-management-project-55289",
    storageBucket: "gym-management-project-55289.appspot.com",
    messagingSenderId: "787800355187",
    appId: "1:787800355187:web:6645726d133202469a5506",
    measurementId: "G-9C8EKQQ4G5"
  };

  firebase.initializeApp(firebaseConfig);

  // Initial Database
  const database = firebase.database();

  // Get info

  const usersRef = database.ref('members');
  const userList = document.querySelector('#members-list');

  // Create new info
  
  const createUser = (name, email, number, avatar) => {
    const newUserRef = usersRef.push();

    newUserRef.set({
        name: name,
        email: email,
        number: number,
        avatar: avatar,
    });
};

//Edit User
const editUser = (key, user) => {
    const name = prompt('Enter new user name', user.name);
    const email = prompt('Enter new user email', user.email);
    const number = prompt('Enter new user number', user.number);
    const avatar = prompt('Enter new user avatar url', user.avatar);

    usersRef.child(key).update({
        name: name,
        email: email,
        number: number,
        avatar: avatar,
    });
};

// Delete user
const deleteUser = (key) => {
    const confirmation = confirm("Are you sure to delete this user's information?");
    if(confirmation === true){
        usersRef.child(key).remove();
    }
}

// Handle form submit
const form = document.querySelector('#user-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const numberInput = document.querySelector('#number');
const avatarInput = document.querySelector('#avatar');

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    createUser(nameInput.value, emailInput.value, numberInput.value, avatarInput.value);
    form.reset; // Clear form
    nameInput.value = '';
    emailInput.value = '';
    numberInput.value = '';
    avatarInput.value = '';
});

usersRef.on('child_added', (snapshot) => {
    const user = snapshot.val();
    const key = snapshot.key;
    
    // Create user element
    const userEl = document.createElement('div');
    userEl.classList.add('col', 'col-6');

    // Create user image element
    const userImageEl = document.createElement('img');
    userImageEl.src = user.avatar;
    userImageEl.alt = user.name;
    userEl.appendChild(userImageEl);

    // Create user name element
    const userNameEl = document.createElement('h3');
    userNameEl.textContent = user.name;
    userEl.appendChild(userNameEl);

    // Create user number element
    const userNumberEl = document.createElement('p');
    userNumberEl.textContent = user.number;
    userEl.appendChild(userNumberEl);

    // Create user email element
    const userEmailEl = document.createElement('p');
    userEmailEl.textContent = user.email;
    userEl.appendChild(userEmailEl);

    //Create edit and delete button element
    const editBtnElement = document.createElement('button');
    editBtnElement.textContent = 'Edit';
    editBtnElement.classList.add('edit');
    editBtnElement.addEventListener('click', () => {
        editUser(key, user);
    });
    userEl.appendChild(editBtnElement);

    const deleteBtnElement = document.createElement('button');
    deleteBtnElement.textContent = 'Delete';
    deleteBtnElement.classList.add('delete');
    deleteBtnElement.addEventListener('click', () => {
        deleteUser(key);
        location.reload();
    });
    userEl.appendChild(deleteBtnElement);

    //Append user element to user list 
    userList.appendChild(userEl);
});