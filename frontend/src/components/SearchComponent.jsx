import React, { useState, useEffect } from "react";
import { SearchTodo } from "../redux/action";
import style from "./../styles/style.module.css";
import { connect } from "react-redux";

function SearchComponent(props) {
  const [searchText, setsearchText] = useState("");
  const [searchBy, setsearchBy] = useState("title");

  const onChangeSearchText = (e) => {
    setsearchText(e.target.value);
  };

  useEffect(() => {
    searchTodo();
  });

  const onChangeSearchBy = (e) => {
    setsearchBy(e.target.value);
  };

  const searchTodo = () => {
    props.SearchTodo(searchBy, searchText);
  };

  return (
    <>
      <div className={`${style.header} justify-content-around mt-md-4`}>
        Search By:{" "}
        <select value={searchBy} onChange={onChangeSearchBy}>
          <option value="title">Title</option>
          <option value="description">Description</option>
          <option value="priority">Priority</option>
        </select>
        <input
          style={{ width: "60%", paddingLeft: "10px" }}
          type="text"
          onChange={onChangeSearchText}
          value={searchText}
        />
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    SearchTodo: (field, text) => dispatch(SearchTodo(field, text)),
  };
};

export default connect(null, mapDispatchToProps)(SearchComponent);
