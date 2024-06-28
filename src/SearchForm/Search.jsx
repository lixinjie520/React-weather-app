import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Styles from "./Search.module.css";
import { useState } from "react";

export default function SearchForm({ handleSubmit }) {
  const [cityName, setCityName] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(cityName, clearInput);
  };
  const clearInput = () => {
    setCityName("");
  };
  return (
    <>
      <form className={Styles.search} onSubmit={onSubmit}>
        <input
          value={cityName}
          type="text"
          placeholder="Enter a city name"
          className={Styles.searchInput}
          onChange={(e) => {
            setCityName(e.target.value);
          }}
        />
        <button className={Styles.searchBtn} name="submit" type="submit">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size="xl"
            style={{ color: "gray" }}
          />
        </button>
      </form>
    </>
  );
}
