import { Container } from "./styles";

const Home = () => {

  return (
    // i am  using tailwindcss for styling
    <Container className="animate__animated animate__fadeIn animate__fast">
      <div className='flex flex-col items-center justify-center'>
        * Vídeo explicativo
        * Depoimentos
        * Links para redes sociais
      </div>
    </Container>
  );
}

export default Home;
