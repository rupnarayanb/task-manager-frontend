//const BASE_URL = "http://192.168.1.2:5001/api"
const BASE_URL = "https://task-manager-backend-ugi1.onrender.com/api"

export async function fetchTasks(){
    const res = await fetch(`${BASE_URL}/task`);
    return res.json();
}

export async function addNewTask(title:string){
    const res = await fetch(`${BASE_URL}/task`,{
        method:"POST",
        headers: {"content-type" : "application/json"},
        body:JSON.stringify({title})
    })
    return res.json();
}

export async function toggleTask(id:string, completed:boolean){
    const res = await fetch(`${BASE_URL}/task`,{
        method:"PUT",
        headers: {"content-type" : "application/json"},
        body:JSON.stringify({completed})
    })

    return res.json();
}

export async function deleteExistingTask(id:string){
    const res = await fetch(`${BASE_URL}/task/${id}`,{
        method:"DELETE"
    })

    return res.json();
}