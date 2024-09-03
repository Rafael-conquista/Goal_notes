import get_api_url from "../config";

const apiUrl = get_api_url()

export async function getAllGoals(id) {
  try {
    let response = await fetch(apiUrl + `usergoals/${id}?ativas=true`, {
      headers: {
        'ngrok-skip-browser-warning': 'true',  // Adiciona o cabeçalho personalizado
      }
    })
    let goalsData = await response.json()
    return goalsData
  } catch (e) {
    console.log(e)
  }
}

export async function getAllFinishedGoals(id) {
  try {
    let response = await fetch(apiUrl + `usergoals/${id}?ativas=false`, {
      headers: {
        'ngrok-skip-browser-warning': 'true',  // Adiciona o cabeçalho personalizado
      }
    })
    let goalsData = await response.json()
    return goalsData
  } catch (e) {
    console.log(e)
  }
}

export async function createGoal(data) {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "name": data.name,
      "obs": data.obs,
      "importance_degree": data.importance_degree,
      "user_id": data.user_id,
      "type_id": data.type_id,
      "expected_data": Number(data.expected_data)
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    let response = await fetch(apiUrl + "goal/2", requestOptions)
    return response.json()
  } catch (e) {
    console.log(e)
    return false
  }
}

export async function UpdateGoal(data, id) {
  try {
    var raw
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    if ("end_date" in data) {
      raw = JSON.stringify({
        "end_date": data.end_date
      });
    } else {
      raw = JSON.stringify({
        "name": data.name,
        "obs": data.obs,
        "pomodoro_cycles": data.pomodoro_cycles,
        "importance_degree": data.importance_degree,
        "user_id": data.user_id,
        "expected_data": Number(data.expected_data)
      });

    }

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    let response = await fetch(apiUrl + `goal/${id}`, requestOptions)
    return response.json()
  } catch (e) {
    console.log(e)
    return false
  }
}

export async function deleteGoals(id) {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };

    let response = await fetch(apiUrl + `goal/${id}`, requestOptions)
    return response.json()
  } catch (e) {
    console.log(e)
    return false
  }
}

export async function registerItems(data, id) {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "desc": data,
      "goals_id": id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    let response = await fetch(apiUrl + "item_register", requestOptions)
    return response.json()
  } catch (e) {
    console.log(e)
    return false
  }
}

export async function updateItems(data) {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(data);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    let response = await fetch(apiUrl + `item/${data.id}`, requestOptions)
    return response.json()
  } catch (e) {
    console.log(e)
    return false
  }
}

export async function deleteItems(id) {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };

    let response = await fetch(apiUrl + `item/${id}`, requestOptions)
    return response.json()
  } catch (e) {
    console.log(e)
    return false
  }
}

export async function getItemsByGoal(id) {
  try {
    let response = await fetch(apiUrl + `items_by_goal/${id}`, {
      headers: {
        'ngrok-skip-browser-warning': 'true',  // Adiciona o cabeçalho personalizado
      }
    })
    let goalsData = await response.json()
    return goalsData
  } catch (e) {
    console.log(e)
  }
}

export async function getFinishedGoalsList(id) {
  try {
    let response = await fetch(apiUrl + `usergoals/${id}?tipo_busca=ended`, {
      headers: {
        'ngrok-skip-browser-warning': 'true',  // Adiciona o cabeçalho personalizado
      },
    })
    let goalsData = await response.json()
    return goalsData
  } catch (e) {
    console.log(e)
  }
}

export async function getNextGoalsList(id) {
  try {
    let response = await fetch(apiUrl + `usergoals/${id}?tipo_busca=nexts`, {
      headers: {
        'ngrok-skip-browser-warning': 'true',  // Adiciona o cabeçalho personalizado
      }
    })
    let goalsData = await response.json()
    return goalsData
  } catch (e) {
    console.log(e)
  }
}