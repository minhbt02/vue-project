export default async function createData(dataName: string, data: string) {
  await fetch(`http://localhost:3000/${dataName}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: data,
  }).catch((err) => {
    console.log(`Error while creating ${dataName} with createData`);
    console.log(err.message);
  });
}
