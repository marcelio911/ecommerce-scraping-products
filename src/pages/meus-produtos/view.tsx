import { Container } from './styles';

const MeusProdutos = () => {

  return (
    // i am  using tailwindcss for styling
    <Container className="animate__animated animate__fadeIn animate__fast">
      <div className='flex flex-col items-center justify-center'>
        * Histórico de votos e cliques
        * Links para produtos no Instagram
        * Remoção de produtos
      </div>
    </Container>
  );
}

export default MeusProdutos;
