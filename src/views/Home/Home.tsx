import Header from "../../components/Header/Header";
import Playables from "../../components/Playables/Playables";
import RegisteredPayment from "../../components/RegisteredPayment/RegisteredPayment";
import * as S from "./Home.styles";

function Home() {
  return (
    <S.Home>
      <S.Container>
        <Header
          image="calculator"
          title="Sistema de Contas a Pagar"
          subTitle="Calcule multas e juros automaticamente para pagamentos em atraso"
        />

        <Playables />
        <RegisteredPayment />
      </S.Container>
    </S.Home>
  );
}

export default Home;
