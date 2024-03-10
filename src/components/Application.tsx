import Container from './Container';
import useData from '../hooks/useData';
import Results from './Results';

function Application() {
  const { data, loading, error } = useData();

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container>Error: {error.message}</Container>;
  }

  return (
    <Container>
      {data !== null ? <Results data={data} /> : 'No data available'}
    </Container>
  );
}

export default Application;
