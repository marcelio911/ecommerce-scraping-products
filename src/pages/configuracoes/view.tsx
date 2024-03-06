import { Container } from './styles';

const Configuracoes = () => {

  return (
    // i am  using tailwindcss for styling
    <Container className="animate__animated animate__fadeIn animate__fast">
      <div className='flex flex-col items-center justify-center'>
        * Login no Google
        * Idioma da interface
        * Categorias de interesse
      </div>
    </Container>
  );
}

export default Configuracoes;
