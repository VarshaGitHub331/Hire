import axios from "axios";
const BASE_URL = process.env.REACT_APP_SERVER_URL;

async function getSkills(categories) {
  console.log(categories);
  try {
    const result = await axios.get(
      `${BASE_URL}/data/fetchSkills`,

      {
        params: {
          categories,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result.data;
  } catch (e) {
    alert(e);
  }
}
export { getSkills };
