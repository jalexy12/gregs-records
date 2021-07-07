const BASE_URL: string =
  "https://gist.githubusercontent.com/seanders/df38a92ffc4e8c56962e51b6e96e188f/raw/b032669142b7b57ede3496dffee5b7c16b8071e1/";

async function getRecords(page: number) {
  try {
    const response = await fetch(urlWithPage(page));

    if (response.ok) {
      return await response.json();
    } else {
      return { message: "Error fetching records" };
    }
  } catch (e) {
    return { message: "Error fetching records" };
  }
}

function urlWithPage(page: number) {
  return BASE_URL + `page${page}.json`;
}

export { getRecords };
