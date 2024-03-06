import { Container } from './styles';

const Enquetes = () => {

  return (
    // i am  using tailwindcss for styling
    <Container className="animate__animated animate__fadeIn animate__fast">
      <div className='flex flex-col items-center justify-center'>
      * Filtro por categoria
      * Ordenação por popularidade
      * Resultados em tempo real
      * Votação em vários produtos
      </div>
    </Container>
  );
}

export default Enquetes;
