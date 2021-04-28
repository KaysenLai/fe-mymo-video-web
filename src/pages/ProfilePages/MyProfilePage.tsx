import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { authAxios } from '../../api/axios';
import { useQuery } from 'react-query';
import { apiMyProfile } from '../../api/api';
import Loading from '../../components/Loading';
import LoadingIcon from '../../components/LoadingIcon';

const ProfilePage: React.FC = () => {
  useEffect(() => {});
  const { isLoading, error, data, isFetching } = useQuery('myProfileData', async () => {
    const res = await authAxios(apiMyProfile());
    console.log(res.data);
    return res.data;
  });

  if (isLoading) {
    return <Loading isLoading />;
  }
  if (error) {
    return <LoadingIcon />;
  }
  return (
    <>
      <Container>
        <div>{JSON.stringify(data)}</div>
      </Container>
    </>
  );
};

export default ProfilePage;
