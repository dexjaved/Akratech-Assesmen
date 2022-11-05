import axios from "axios";
import { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import CardComponent from "./card-component";

export default function App() {
  const [apiResponse, setApiResponse] = useState<any>();
  const [renderSpinner, setRenderSpinner] = useState(false);

  const fetchResponse = (): void => {
    setRenderSpinner(true);
    axios
      .get("https://randomuser.me/api/?results=50")
      .then((response) => JSON.stringify(response.data.results))
      .then((response) => {
        localStorage.setItem("apiResponse", response);
        setApiResponse(JSON.parse(response));
      });
    setRenderSpinner(false);
  };

  useEffect(() => {
    if (
      localStorage.getItem("apiResponse") !== null &&
      JSON.parse(localStorage.getItem("apiResponse") || "").length > 0
    ) {
      const totalValues = localStorage.getItem("apiResponse");
      setApiResponse(JSON.parse(totalValues || ""));
    } else {
      fetchResponse();
    }
  }, []);

  const deleteTrigger = (id: number): void => {
    const filteredArrayElements = apiResponse.filter(
      (data: any, index: number) => {
        return index !== id;
      }
    );
    localStorage.setItem("apiResponse", JSON.stringify(filteredArrayElements));
    setApiResponse(filteredArrayElements);
  };

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <div> Total Elements : {apiResponse?.length} </div>
        <button onClick={() => fetchResponse()}>Refresh</button>
      </div>
      {renderSpinner ? <CircularProgress /> : null}
      {!renderSpinner
        ? apiResponse?.map((data: any, index: number) => {
            return (
              <>
                <CardComponent
                  name={data.name.first + " " + data.name.last}
                  image={data.picture.large}
                  onDeleteClick={(index: number) => deleteTrigger(index)}
                  id={index}
                />
              </>
            );
          })
        : null}
    </div>
  );
}
