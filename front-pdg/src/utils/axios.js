import axios from "axios";
export default axios.create({

    baseURL:'http://localhost:8000/',   

    headers: {
        "X-Requested-With": "XMLHttpRequest",
        Authorization: {
            toString() {
                return `Bearer ${localStorage.getItem("access_token")}`;
            },
        },
    },
  
});
