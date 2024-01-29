import { useState } from 'react';
import styled from 'styled-components';

const Productter = styled.div`
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

function Produto() {

  const [link, setLink] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  return (
    <Productter id="produtos">

      <p>Capturar produto</p>
      <label htmlFor="link">Link de afiliado</label>
      <input type="text" id="link" onChange={(e) => setLink(e.target.value)} value={link} />
      <br />
      <label htmlFor="name">Nome do produto</label>
      <input type="text" id="name" onChange={() => { setName }} value={name} disabled />
      <label htmlFor="price">Preço</label>
      <input type="text" id="price" onChange={() => { setPrice }} value={price} disabled />
      <br />
      <span>Para capturar o produto, clique no botão abaixo.</span>

    </Productter>
  );
}

export default Produto;
