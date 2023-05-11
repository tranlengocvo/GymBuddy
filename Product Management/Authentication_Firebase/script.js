// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

const userSignIn = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function() {
      alert('Sign in successful');
      window.location.href = '../index.html';
    })
    .catch(function(error) {
      alert(error.message)
    })
}

// const userSignUp = (email, password) => {
//   firebase
//     .auth()
//     .createUserWithEmailAndPassword(email, password)
//     .then(function () {
//       alert("Sign up successful!");
//     })
//     .catch(function (error) {
//       alert(error.message);
//     });
// };

// Lớp (class) Form
class Form {
  constructor(id, fields, onSubmit) {
    this.id = id;
    this.fields = fields;
    this.onSubmit = onSubmit;
    this.element = document.getElementById(id);
    this.element.addEventListener("submit", this.onSubmit);
  }

  getData() {
    const data = {};
    this.fields.forEach((field) => {
      if (field.element) {
        data[field.name] = field.getValue();
      }
    });
    return data;
  }

  clear() {
    this.fields.forEach((field) => {
      if (field.element) {
        field.setValue("");
      }
    });
  }

  isValid() {
    let isValid = true;
    this.fields.forEach((field) => {
      if (!field.isValid()) {
        isValid = false;
      }
    });
    return isValid;
  }
}

// Lớp (class) Field
class Field {
  constructor(name, validators) {
    this.name = name;
    this.element = document.getElementsByName(name)[0];
    this.validators = validators || [];
  }

  getValue() {
    return this.element.value;
  }

  isValid() {
    let isValid = true;
    if (this.element) {
      this.validators.forEach((validator) => {
        if (!validator(this.getValue())) {
          isValid = false;
        }
      });
    }
    return isValid;
  }
  setValue(value) {
    if (this.element) {
      this.element.value = value;
    }
  }
}

// Các hàm kiểm tra tính hợp lệ của dữ liệu
const isRequired = (value) => {
  return value.trim() !== "";
};

const isEmail = (value) => {
  // Kiểm tra định dạng email bằng regular expression
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(value);
};

const isPasswordMatched = (password, confirmPassword) => {
  return password === confirmPassword;
};
// Tạo form đăng nhập
const loginFields = [
  new Field("username", [(value) => isRequired(value)]),
  new Field("password", [(value) => isRequired(value)]),
];

const loginForm = new Form("login-form", loginFields, (event) => {
  event.preventDefault();
  if (loginForm.isValid()) {
    const data = loginForm.getData();
    userSignIn(data.username, data.password);
    loginForm.clear();
  }
});
