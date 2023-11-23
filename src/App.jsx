import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(
        `https://api.sampleapis.com/codingresources/codingResources/?_page=${page}&limit=10`
      )
      .then((response) => {
        setData((prevData) => [...prevData, ...response.data]);
        setPage((prevPage) => prevPage + 1);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight / 2
      ) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  console.log(data);

  return (
    <>
      <h1 className="text-4xl text-center mt-5">React Infinite Scroll</h1>
      <div className="grid grid-cols-4 p-5 gap-5">
        {data.map((item, i) => (
          <div
            className="flex flex-col justify-between p-5 rounded-3xl shadow-2xl"
            key={i}
          >
            <div className="">
              <p className="text-2xl font-bold">{item.description}</p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus
                tempore corporis nobis nihil officiis architecto beatae ipsa
                nulla, accusantium animi soluta non pariatur vero magnam
                mollitia nam
              </p>
              <button className="mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                {item.topics.join(", ")}
              </button>
              <button className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                {item.levels.join(", ")}
              </button>
              <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                {item.types.join(", ")}
              </button>
            </div>

            <div>
              <button className="mt-4 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                <a href={item.url}>See More</a>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
