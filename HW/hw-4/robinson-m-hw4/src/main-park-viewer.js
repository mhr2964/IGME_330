import * as firebase from "./firebase.js";

const init = () => {
    const dbRef = firebase.ref(firebase.getDatabase());
    console.log(dbRef);
    const list = document.querySelector("#parks-list");
    firebase.get(firebase.child(dbRef, 'favorited-parks')).then(snapshot => {
        if (snapshot.exists()) {
            let json;
            json = snapshot.val();
            console.log(json);
            const keys = Object.keys(json);
            let html = "";
            for (let k of keys){
                const obj = json[k];
                html += `<li>${obj.parkName} - ID: ${obj.parkID} -  Favorites: ${obj.favorites}</li>`;
            }
            list.innerHTML = html;
          } else {
            console.log("No data available");
          }
      }).catch((error) => {
        console.error(error);
      });
}
init();

