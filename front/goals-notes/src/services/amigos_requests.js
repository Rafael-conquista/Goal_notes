export async function getAmigosUser(id) {
  try {
    let response = await fetch(`http://127.0.0.1:5000/AmigosUser/${id}`);
    let result = await response.json();
    return result.amigos;
  } catch (e) {
    console.log(e);
    return [];
  }
}
