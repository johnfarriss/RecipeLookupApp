import axios from "axios";

const baseUrl = "http://localhost:54373/api/";

export default {

    Recipe(url=baseUrl + 'Recipe/'){
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url+id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url+id, updateRecord),
            delete: id => axios.delete(url + id),
            search: substring => axios.get(url + 'Search/' + substring)
        }
    }
}