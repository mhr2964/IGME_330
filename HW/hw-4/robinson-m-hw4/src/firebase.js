// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, push, onValue, increment, get, child} from  "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGgxK-Ft-vxVach5sk9OO0SR5Jnf3_NSY",
  authDomain: "park-buddy-b9b90.firebaseapp.com",
  projectId: "park-buddy-b9b90",
  storageBucket: "park-buddy-b9b90.appspot.com",
  messagingSenderId: "627591104806",
  appId: "1:627591104806:web:8c982e457ddad2ad52d9e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const writeFavoriteParkData = (parkID, parkName, incrementValue) => {
    const db = getDatabase();
    const parkRef = ref(db, 'favorited-parks/' + parkID);
    set(parkRef, {
        parkID,
        parkName,
        favorites: increment(incrementValue)
    });
}

export {getDatabase, ref, get, child};