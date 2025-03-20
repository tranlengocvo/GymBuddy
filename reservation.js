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

  const usersRef = database.ref('users');

  // Create new info
  
  const createUser = (name, email, datetime, course) => {
    const newUserRef = usersRef.push();

    newUserRef.set({
        name: name,
        email: email,
        datetime: datetime,
        course: course,
    },  function(error) {
        if (error) {
          alert("Register form could not be saved." + error);
        } else {
          alert("Register successfully.");
        }
    });
};
// Handle form submit
const form = document.querySelector('#user-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const datetimeInput = document.querySelector('#datetime');
const courseInput = document.querySelector('#course');

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    createUser(nameInput.value, emailInput.value, datetimeInput.value, courseInput.value);
    form.reset; // Clear form
    nameInput.value = '';
    emailInput.value = '';
    datetimeInput.value = '';
    courseInput.value = '';
});


// usersRef.on('child_added', (snapshot) => {
//     const user = snapshot.val();
//     const key = snapshot.key;
    
//     // Create user element
//     const userEl = document.createElement('div');
//     userEl.classList.add('col', 'col-6');

//     // Create user image element
//     const userImageEl = document.createElement('img');
//     userImageEl.src = user.avatar;
//     userImageEl.alt = user.name;
//     userEl.appendChild(userImageEl);

//     // Create user name element
//     const userNameEl = document.createElement('h3');
//     userNameEl.textContent = user.name;
//     userEl.appendChild(userNameEl);

//     // Create user number element
//     const userNumberEl = document.createElement('p');
//     userNumberEl.textContent = user.number;
//     userEl.appendChild(userNumberEl);

//     // Create user email element
//     const userEmailEl = document.createElement('p');
//     userEmailEl.textContent = user.email;
//     userEl.appendChild(userEmailEl);

// });