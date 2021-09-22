export const galleryService = {
  loadImages,
};
async function loadImages(page) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`
  ).then((data) => data.json());
  return response;
}
