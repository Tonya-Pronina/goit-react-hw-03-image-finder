import axios from "axios";


export const FetchImages = async (query, page = 1, per_page = 12) => {
    const params = new URLSearchParams({
    key: '35900123-c9c0239e27eb1dd1d96f05647',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page,
  });

  const response = await axios.get(
    `https://pixabay.com/api/?${params.toString()}`
  );

   if (response.status !== 200) {
    throw new Error(response.status);
  };

  return response.data
}