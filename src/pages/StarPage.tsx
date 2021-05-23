import React, { useEffect, useState } from 'react';
import { Button, Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { requestAllStar, requestSearchStar } from '../store/actions/star';
import { State } from '../types/state';
import UserCard from '../components/UserCard';
import { useLocation, useHistory } from 'react-router-dom';

interface MatchParams {
  searchText: string;
}
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const StarPage: React.FC = (props) => {
  const star = useSelector((state: State) => state.star);
  const history = useHistory();
  const dispatch = useDispatch();
  const query = useQuery();
  const searchTextParams = query.get('searchText');

  const [searchText, setSearchText] = useState(searchTextParams || '');

  useEffect(() => {
    if (searchTextParams === null) {
      dispatch(requestAllStar());
    } else {
      dispatch(requestSearchStar(searchTextParams));
    }
  }, []);

  const handleSearch = () => {
    history.push(`/star?searchText=${searchText}`);
    if (searchText === null) {
      dispatch(requestAllStar());
    } else {
      dispatch(requestSearchStar(searchText));
    }
  };

  return (
    <>
      <Container>
        <h2 style={{ margin: '30px 0' }}>Top starts with most followers.</h2>
        <label>
          <input
            type="text"
            value={searchText}
            onChange={(e: any) => {
              setSearchText(e.target.value);
            }}
          />
        </label>
        <Button color="primary" variant="contained" size="small" onClick={handleSearch}>
          Search
        </Button>
        {star !== [] &&
          star.map((item: any, index: any) => (
            <div key={index}>
              <UserCard
                _id={item._id}
                avatar={item.avatar}
                fullName={item.name}
                followerNum={item.followerNum}
                desc={item.description}
              />
            </div>
          ))}
        {star.length === 0 && <div>no results found</div>}
      </Container>
    </>
  );
};

export default StarPage;
