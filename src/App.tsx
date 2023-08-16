import Container from "./Components/Container";

const App = () => {
  //   const result = fetchData().catch((err) =>
  //     console.log("error with data: ", err)
  //   );
  //   console.log(result);
  // }, []);

  // const testLambda = async () => {
  //   const url =
  //     "https://dnvgz2u3ed.execute-api.us-east-1.amazonaws.com/prod/data";

  //   fetch(url, {
  //     method: "GET",
  //     mode: "cors", // Request mode set to 'cors'
  //   })
  //     .then(async (response) => {
  //       const res = await response.json();
  //       console.log("res: ", res);
  //     })
  //     .then((data) => {
  //       // Process the response data
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       // Handle errors
  //       console.error("Error:", error);
  //     });
  // };

  // testLambda();
  return (
    <div className="App">
      <Container />
    </div>
  );
};

export default App;
