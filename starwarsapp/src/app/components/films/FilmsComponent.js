import React, { useEffect, useState } from "react";
import { MainContainer } from "../commonElements/MainContainer";
import { InputContainer } from "../commonElements/InputContainer";
import { InputBrowser } from "../commonElements/InputBrowser";
import { CardStyled } from "../commonElements/CardStyled";
import { CardInfo } from "../commonElements/CardInfo";
import { CardButton } from "../commonElements/CardButton";
import { GridContainer } from "../commonElements/GridContainer";
import { FilmsModal } from "../commonElements/SectionsModals/FilmsModal";
import { ChangePageLi } from "../commonElements/ChangePageLi";
import { Loader } from "../commonElements/Loader";

export const FilmsComponent = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [isLoaderOpen, setIsLoaderOpen] = useState(true);

  const [openedModal, setOpenedModal] = useState("");

  const showModal = (valueOfOpenedModal) => {
    setOpenedModal(valueOfOpenedModal);
  };

  const fetchData = (page = 1, search = "") =>
    fetch(
      `https://swapi.dev/api/films/?format=json&page=${page}&search=${search}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        setCount(data.count);
        setData(data.results);
        setIsLoaderOpen(false);
      });

  useEffect(() => {
    fetchData(page, search);
  }, [page, search]);

  const onInputChange = (event) => {
    setPage(1);
    setSearch(event.target.value);
  };

  const singleCard = data.map((item) => {
    return (
      <CardStyled key={item.title}>
        <CardInfo>{item.title}</CardInfo>
        <CardButton onClick={() => showModal(item.title)}>
          Dowiedz się więcej
        </CardButton>
        <FilmsModal
          isModalOpen={item.title === openedModal ? true : false}
          showModal={showModal}
          item={item}
        ></FilmsModal>
      </CardStyled>
    );
  });

  return (
    <MainContainer>
      <Loader isLoaderOpen={isLoaderOpen}></Loader>
      <InputContainer>
        <InputBrowser
          type="text"
          value={search}
          placeholder="Wpisz nazwę filmu"
          onChange={onInputChange}
        />
      </InputContainer>

      <GridContainer>
        {singleCard}
      </GridContainer>
      <InputContainer>
        <ul style={{ display: "flex" }}>
          {new Array(Math.ceil(count / 10)).fill(0).map((_, index) => (
            <ChangePageLi key={index} onClick={() => setPage(index + 1)}>
              {index + 1}
            </ChangePageLi>
          ))}
        </ul>
      </InputContainer>
    </MainContainer>
  );
};
