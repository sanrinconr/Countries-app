export function getURLApi(){
    if(window.location.hostname === "localhost"){
        return "http://localhost:5001/paises-e1544/us-central1/api/"
    }
    return "https://us-central1-paises-e1544.cloudfunctions.net/api/"
}