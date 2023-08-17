import styles from './styles.module.css'

import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import BaseApi from "../../../services/Api";
import { useStateContext } from "../../../context/ContextProvider";

import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { findIndex } from "lodash";
import Pagination from "../../../components/Layout/Pagination";
import { Spinner } from "react-bootstrap";
import TableContainer from "../../../components/Layout/TableContainer";
import ModalPlayer from "../../../components/Modals/ModalPlayer/index";





const INITIAL_DATA = {
  total: 0,
  current_page: 1,
  last_page: 1,
  first_page_url: "",
  last_page_url: "",
  next_page_url: "",
  prev_page_url: null,
  path: "",
  from: 1,
  to: 1,
  data: [],
};


export default function Players(){
    let [searchParams, setSearchParams] = useSearchParams();

    let controller = new AbortController();

    const INITIAL_FILTERS = {
        search: searchParams.get("search") || "",
    };

    const INITIAL_QUERY = {
        sort: "id",
        order: "desc",
        per_page: 10,
        page: searchParams.get("page") || 1,
    };

    const [isLoading, setLoading] = React.useState(true);
    const [isFiltering, setFiltering] = React.useState(true);
    const [isPaginating, setPaginating] = React.useState(true);

    const [query, setQuery] = React.useState({
        ...INITIAL_QUERY,
        ...INITIAL_FILTERS,
    });
    const [filters, setFilters] = React.useState({ ...INITIAL_FILTERS });
    const [tableData, setTableData] = React.useState({ ...INITIAL_DATA });

    const { setNotification } = useStateContext();

    const requestData = (args = {}) => {
        setLoading(true);
        let q = { ...query, ...args };
        BaseApi.get("/jogador", {
        signal: controller.signal,
        params: {
            ...q,
            search: q.search !== "" ? q.search : undefined,
        },
        })
        .then((response) => {
            setTableData(response.data);
            setLoading(false);
            setPaginating(false);
            setFiltering(false);
        })
        .catch((err) => {
            if (err) {
            console.log(err);
            toast.error("Erro ao carregar dados da tabela");
            setTableData({ ...INITIAL_DATA });
            setLoading(false);
            setPaginating(false);
            setFiltering(false);
            }
        });
    };


    const setSearch = (args = {}) => {
        let params = { ...args };
        if (filters.search && filters.search !== "") params.q = filters.search;
        setSearchParams(params);
       
        
      };
    
      const handlePagination = (page) => {
        setSearch({ p: page });
        setPaginating(true);
        setQuery({ ...query, page });
      };
    
      const handleFilters = (e) => {
        e.preventDefault();
        setSearch();
        setFiltering(true);
        setQuery({ ...query, ...filters, page: 1 });
      
        
      };
    

    const handleCreatePlayer = (player) => {
        setLoading(true);
        setFilters({ ...INITIAL_FILTERS });
        setQuery({ ...INITIAL_QUERY });
    };

    const handleUpdatePlayer = (player) => {
        let data = [...tableData.data];
        let toUpdate = findIndex(data, { id: player.id });
        if (toUpdate === -1) return;
        data[toUpdate] = { ...data[toUpdate], ...player };
        setTableData({ ...tableData, data: data });
    };

    const onDelete = (player) => {
        Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        }).then(({ isConfirmed }) => {
        if (isConfirmed) {
            setLoading(true);
            BaseApi.delete(`/jogador/${player.id}`)
            .then(res => {
                toast.success('Player deleted successfully!');
                requestData();
            })
            .catch(err => {
                Swal.fire('Oops!', err?.data?.errors?.[0] || err?.data?.message || 'Ocorreu um erro ao deletar este usuário.', 'error');
                setLoading(false);
            }).finally(() => setLoading(false));
        }
        });
    };

    useEffect(() => {
        controller = new AbortController();
        requestData();
       
        return () => {
        controller.abort();
        setLoading(true);
        };
    }, [query]);

 

    return(
        <>
      <div className="d-flex flex-column">
        <div className={"d-flex flex-column flex-md-row pb-4"}>
          <div className={`${styles.nacionalidade} col-12 col-md-4 mb-2`}>
            <h1>Jogadores</h1>
          </div>
          <div className="col-12 col-md-6 mb-2">
            <form onSubmit={handleFilters} className="d-flex flex-row">
              <input
                type="text"
                className="form-control "
                placeholder="Search"
                aria-label="Search"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />
              <button className="btn btn-outline-success ms-2" type="submit">
                <span>Search</span>
              </button>
            </form>
          </div>
          <div className="col-12 col-md-2 d-flex justify-content-end mb-2">
            
         
          <ModalPlayer onCreate={handleCreatePlayer}>
              <button className="btn btn-outline-success ms-2" type="button">
                <span>Create</span>
              </button>
            </ModalPlayer>
        
          
            
          </div>
        </div>
        <TableContainer>
          <div className="d-flex align-items-center justify-content-center">
            {isLoading && (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </div>
          {!isLoading && (
            <>
              {isFiltering && (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
              {!isFiltering && (
               
                <>
                
                  <Pagination
                    onPaginate={handlePagination}
                    showOnBottom={!isPaginating && tableData.data.length > 0}
                    showOnTop={tableData.data.length > 0}
                    paginateData={tableData}
                  >
                    {!isPaginating && (
                      <>
                        <div className={styles.table_container}>
                          <table className={`table`}>
                            <thead className={`${isLoading ? "d-none" : ""}`}>
                              <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Team</th>
                                <th>Age</th>
                                <th>Nationality</th>
                                <th>Image</th>
                                <th>Create Date</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {tableData.data.map((item) => (
                                <tr>
                                  <td>{item.id}</td>
                                  <td>{item.nome}</td>
                                  <td>{item.time}</td>
                                  <td>{item.idade}</td>
                                  <td>{item?.nacionalidades?.nome}</td>
                                 
                                  <td><img className={styles.playerImage} src={item.imagem} alt="" /></td>

                                  <td>{item.created_at}</td>
                                  <td>
                                    <div className="d-flex align-items-center">

                                    <ModalPlayer
                                        idPlayer={item.id}
                                        onUpdate={handleUpdatePlayer}
                                      />
                                      &nbsp;
                                     
                                      <button
                                        className="btn btn-danger"
                                        onClick={() => onDelete(item)}
                                      >
                                        <i className="bi bi-trash-fill" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}
                    {isPaginating && (
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    )}
                    {tableData.data.length === 0 && (
                      <h5 className="text-purple-3 text-center">
                        Não foram encontrados registros com estes filtros.
                      </h5>
                    )}
                  </Pagination>
                </>
              )}
            </>
          )}
        </TableContainer>
      </div>
    </>
    )
}