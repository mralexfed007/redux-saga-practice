import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOAD_FILTERED_USERS, LOAD_USERS } from "../redux/reducers/people/actions";
import { selectPeople } from "../redux/reducers/people/selectors";
import PeopleTablePagination from "./PeopleTablePagination";
import SearchForm from "./SearchForm";

export default function PeopleTable() {
  const tableHead = ['Name', 'Birth year', 'Eye color', 'Gender', 'Hair color', 'Height', 'Mass', '']
  const people = useSelector(selectPeople);
  const dispatch = useDispatch();
  const changePage = (newPage) => dispatch({
    type: LOAD_USERS,
    payload: {
      page: newPage,
      search: people.search,
    }
  })

  function search(e) {
      dispatch({
        type: LOAD_FILTERED_USERS,
        payload: {
          page: 1,
          search: e.target.value,
        }
    })
}

  return (
    <>
      <h1 className="title is-3 center" text-align="center"> Star Wars People</h1>
      < SearchForm searchPeople={search} />
      {people.loading
        ? (
          <div>
            Loading...
          </div>
          )
        : (
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                {tableHead.map(col => (
                  <th
                    key={col}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {people.data?.results?.map(person => (
                <tr key={person.name}>
                  <td>{person.name}</td>
                  <td>{person.birth_year}</td>
                  <td>{person.eye_color}</td>
                  <td>{person.gender}</td>
                  <td>{person.hair_color}</td>
                  <td>{person.height}</td>
                  <td>{person.mass}</td>
                  <td>
                    
                      <Link to={`/people/${person.url.replaceAll(/\D/g, '')}`}>
                        <button className="button is-link is-light">
                          Details
                        </button>
                      </Link>
                    
                  </td>
                </tr>
                
              ))}
            </tbody>
          </table>
        )
      }
      <PeopleTablePagination selectedPage={people.page} total={people.data?.count} changePage={changePage}/>
    </>
  );
};
