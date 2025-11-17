import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Playables from "../../components/Playables/Playables";
import RegisteredPayment from "../../components/RegisteredPayment/RegisteredPayment";
import * as S from "./Home.styles";
import type { Account } from "../../model/Payment";
import { paymentService } from "../../services/paymentService";

function Home() {
  const [paymentList, setPaymentList] = useState<Account[]>([]);

  const loadContas = async () => {
    try {
      const data = await paymentService.getAllAccounts();
      console.log(data);
      
      setPaymentList(data);
    } catch (error) {
      console.error("Erro ao buscar contas:", error);
    }
  };

  useEffect(() => {
    loadContas();
  }, []);
  return (
    <S.Home>
      <S.Container>
        <Header
          image="calculator"
          title="Sistema de Contas a Pagar"
          subTitle="Calcule multas e juros automaticamente para pagamentos em atraso"
        />

        <Playables onAccountAdded={loadContas}/>
        <RegisteredPayment payment={paymentList}/>
      </S.Container>
    </S.Home>
  );
}

export default Home;
