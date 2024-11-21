import axios from "axios";
const BASE_URL = process.env.REACT_APP_SERVER_URL;

async function getCategories() {
  try {
    const res = await axios.get(`${BASE_URL}/data/getCategories`);

    return res.data.categories;
  } catch (e) {
    alert(e);
  }
}
export { getCategories };
