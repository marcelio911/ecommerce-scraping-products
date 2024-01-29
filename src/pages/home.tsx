import { useToggle } from 'react-use';
import styled from 'styled-components';
import { registerDynamic, unRegisterDynamic } from './chrome-extensions';
import Produto from './produto';

const Wrapper = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  p {
    font-size: 2rem;
    margin: 0;
  }
  span {
    font-size: 1rem;
  }
`;

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
    <Wrapper className="animate__animated animate__fadeIn animate__fast">
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



    </Wrapper>
  );
}

export default Home;
