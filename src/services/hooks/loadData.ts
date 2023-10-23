export default function loadData(dataName: string) {
  const returnData = fetch(`http://localhost:3000/${dataName}`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(`Error while getting ${dataName} with loadData`);
      console.log(err.message);
      throw err;
    });
  return returnData;
}
