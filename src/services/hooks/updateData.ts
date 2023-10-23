export default function updateData(
  dataName: string,
  dataId: number,
  data: string
): void {
  fetch(`http://localhost:3000/${dataName}/${dataId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: data,
  }).catch((err) => {
    console.log(`Error while updating ${dataName} with updateData`);
    console.log(err.message);
    throw err;
  });
}
