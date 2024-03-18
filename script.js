const container = document.getElementById('container');
document.addEventListener('DOMContentLoaded', function() {
    getTasks();
});

async function getTasks()
{
    let tasks = await getAPICall("http://127.0.0.1:5000/api/tasks");

    if(tasks != undefined)
    {
        // read response
        // console.log(response);
        for(let i = 0; i < tasks.length; i++)
        {
            for(let j = 0; j < tasks[i].length; j++)
            {
                const div = document.createElement("div");
                div.style.boxShadow = "1px 1px aqua";
                div.innerHTML = tasks[i][j].title + ':<br/>' + tasks[i][j].description;
                if(tasks[i][j].media)
                {
                    div.style.backgroundImage = "url('" + tasks[i][j].media + "')";
                    div.style.backgroundSize  = "cover";
                }
                div.className = "card";
                container.appendChild(div);
            }
        }
    }
}

async function getAPICall(url)
{
    try
    {
        const response = await fetch(url);
        
        // Check if the request was successful
        if (!response.ok) 
        {
            throw new Error('Failed to fetch post data');
        }
        
        // Parse the JSON response
        const taskData = await response.json();
        return taskData;
    } 
    catch (error) 
    {
        console.error('Error:', error.message);
    }
}
// function getRandImg()
// {
//     https://source.unsplash.com/random/?Space/
// }
function createTask() {
    // Example task data (replace with actual data)
    const taskData = {
        title: document.getElementById('NewTitle').value,
        description: document.getElementById('NewDesc').value
        // media: getRandImg()
        // deadline: '2023-12-31',
        // Add other properties as needed
    };

    fetch('http://127.0.0.1:5000/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: '['+ JSON.stringify(taskData) +']'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to create task');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message); // Print success message
        // You can perform additional actions here, such as updating the UI
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle error, such as displaying an error message to the user
    });
}
