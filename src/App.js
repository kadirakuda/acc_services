import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});

  // 4491dee8-8561-421e-b534-b937f3d396d1
  // var url = "/12766307";
  // var key = "ZGVjYWMzMTctM2E5MC00OTM2LThmNzktYzkzYzY1YWExNTAxOg==";
  // var headers = new Headers({
  //   Authorization: "Basic " + key,
  // "Content-Type": "text/json",
  // Origin: "https://localhost:3000",
  // "Access-Control-Allow-Origin": "*",
  // "Access-Control-Allow-Credentials": "true",
  // "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
  // // "Access-Control-Allow-Headers":
  // "Access-Control-Allow-Headers":
  //   "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
  // });
  // var obj = {
  //   mode: "cors",
  //   method: "GET",
  //   cache: "no-cache",
  //   headers: headers,
  // };
  // fetch(url, obj)
  //   .then((resp) => resp.json())
  //   .then((data) => console.log(data))
  //   .catch(function (err) {
  //     console.log(err);
  //   });

  async function searchAPI() {
    const data = { name: "John" };
    const key = "ZGVjYWMzMTctM2E5MC00OTM2LThmNzktYzkzYzY1YWExNTAxOg==";
    try {
      let response = await fetch(
        `https://api.companieshouse.gov.uk/company/12766307`,
        {
          method: "get",
          headers: {
            Authorization: "Basic " + key,
            "Content-Type": "text/json",
            Origin: "https://localhost:3000",
            "Access-Control-Allow-Origin": "https://localhost:3000",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
            // "Access-Control-Allow-Headers":
            "Access-Control-Allow-Headers":
              "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
          },
          mode: "cors",
          cache: "default",
        }
      );
      let data = await response.text();
      return data;
    } catch (err) {
      return err;
    }
  }

  async function main() {
    console.log("first");

    let result = await searchAPI();
    console.log(result);

    console.log("second");
  }

  main();
  const handleSearch = async (e) => {
    e.preventDefault();
    if (search === "") return;

    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`;

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();
    // console.log(json);
    setResults(json.query.search);
    setSearchInfo(json.query.searchinfo);
  };

  return (
    <div className="App">
      <header>
        <h1>Start your Limited Company Online Today</h1>
        <form action="" className="search-box" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Your company name here.."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        {searchInfo.totalhits ? (
          <p>Search Results: {searchInfo.totalhits}</p>
        ) : (
          ""
        )}
      </header>
      <div className="results">
        {results.map((result, i) => {
          const url = `https://en.wikipedia.org/?curid${result.pageid}`;

          return (
            <div className="result">
              <h3>{result.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
              <a href={url} rel="nofollow">
                Read more
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default App;
