import httpClient from "../http-common";
import axios from "axios";
const getAll = () => {
    return httpClient.get('/employees');
}

const create = data => {
    return httpClient.post("/employees", data);
}

const get = id => {
    return httpClient.get(`/employees/${id}`);
}

const update = data => {
    return httpClient.put('/employees', data);
}

/*
Just replace field name of object employee by the value +1-555-56
*/ 
const patch = (id) => {
    return axios.patch(`http://localhost:8080/api/v1/${id}`,[{"op":"replace","path":"/name","value":"+1-555-56"}],
    {
        headers:{ "Content-Type": "application/json-patch+json"}, 
    })
};
/* other examples add  in list favourites value bread in start of list

    [{"op":"add",
    "path":"/favorites/0",
    "value":"Bread"}]

The modified customer details after the add operation would be:

{
    "id":"1",
    "telephone":"001-555-1234",
    "favorites":["Bread","Milk","Eggs"],
    "communicationPreferences": {"post":true, "email":true}
}
remove/empty value 
[{
    "op":"remove",
    "path":"/name"
}] gives path:null

can do several operations:
[
    {"op":"replace","path":"/telephone","value":"+1-555-56"},
    {"op":"add","path":"/favorites/0","value":"Bread"}
]
replace value telephone by +1-555-56
and add value bread to list favorites in start of list (position)

[{
    "op":"copy",
    "from":"/favorites/0",
    "path":"/favorites/-"
}]
copy first value at position 0 to last position of list

Tutorial: https://www.baeldung.com/spring-rest-json-patch
*/


const remove = id => {
    return httpClient.delete(`/employees/${id}`);
}
export default { getAll, create, get, update, remove, patch };