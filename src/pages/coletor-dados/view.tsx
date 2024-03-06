import { useToggle } from 'react-use';
import { registerDynamic, unRegisterDynamic } from '../chrome-extensions';
import Produto from '../../components/produtos';
import { Container } from './styles';

function Home() {

  const [ on, toggle ] = useToggle(true);

  const register = () => {
    toggle(false);
    registerDynamic();
  }

  const unregister = () => {
    toggle(true);
    unRegisterDynamic();
  }

  return (
    <Container className="animate__animated animate__fadeIn animate__fast">
      <form>

        <Produto />

        <div className="buttons dynamic-buttons">
          <button
            type="button" id="register-dynamic" onClick={register} disabled={!on}>
            Coletar dados
          </button>
          <button type="button" id="unregister-dynamic" onClick={unregister} disabled={on}>
            Unregister
          </button>
        </div>
      </form>



    </Container>
  );
}

export default Home;
