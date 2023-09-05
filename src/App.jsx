import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputSearch from "./components/InputSearch";
import MyNavbar from "./components/MyNavbar";
import { useEffect, useRef, useState } from "react";
import MyCard from "./components/MyCard";
import axios from "axios";

const App = () => {
  const [key, setKey] = useState("");
  const [data, setData] = useState([]);
  let searchRef = useRef(null);

  function handleEnter(e) {
    if (e.key == "Enter") {
      showData();
    }
  }

  function handleClick() {
    showData();
  }

  // function showData() {
  //   searchRef.current.innerHTML = "Wait....";
  //   setKey("");
  //   axios
  //     .get(
  //       `https://newsapi.org/v2/${
  //         key == "" ? "top-headlines?country=us&" : "everything?"
  //       }apiKey=9c6131f2202d4dafb822bc76564f80c4&q=${key}`
  //     )
  //     .then((res) => {
  //       setData(res.data.articles);
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(function () {
  //       searchRef.current.innerHTML = "Search";
  //     });
  // }

  function showData() {
    setKey("");
    axios
      .get(
        `https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=2cc9e0c2c593864b3b4556466634e8fd`
      )
      .then((res) => {
        console.log(res);
        setData(res.data.articles);
      })
      .catch((err) => console.log(err))
      .finally(function () {
        searchRef.current.innerHTML = "Search";
      });
  }

  useEffect(() => {
    showData();
  }, []);
  return (
    <>
      <MyNavbar />
      <Container className="mt-3">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <InputSearch
              value={key}
              onChange={(e) => setKey(e.target.value)}
              onClick={() => handleClick()}
              onKeyUp={(e) => handleEnter(e)}
              ref={searchRef}
            />
          </Col>
        </Row>
        <Row>
          {data.map((item, i) => (
            <Col key={i}>
              <MyCard
                img={item.image}
                title={item.title}
                description={item.description}
                author={item.author}
                publishedAt={item.publishedAt}
                url={item.url}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default App;
