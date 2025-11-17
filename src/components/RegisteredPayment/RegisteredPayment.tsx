import { CardComponent } from "../../styles/common/Card";
import { HeaderComponent } from "../../styles/common/Header";
import * as S from "./RegisteredPayment.styles";
import type { Account } from "../../model/Payment";
import { formatCurrency, formatDate } from "../../utils/formatters";

interface RegisteredPaymentProps {
  payment: Account[];
}

const RegisteredPayment: React.FC<RegisteredPaymentProps> = ({ payment }) => {

  function getStatusColor(dias: number): { background: string } {
    if (dias === 0) {
      return { background: "#33cc66" };
    }
    if (dias <= 3) {
      return { background: "#cecb2c" };
    }
    if (dias <= 5) {
      return { background: "#ff5e00" };
    }
    return { background: "#fa0019" };
  }

  return (
    <CardComponent style={{ width: "575px", margin: "2rem 0 5rem 0" }}>
      <HeaderComponent>
        <h2>Contas Cadastradas</h2>
        <p>{payment.length} conta cadastrada</p>
      </HeaderComponent>

      {payment.slice().reverse().map((p) => {
        const statusColors = getStatusColor(p.diasEmAtraso);
        return (
          <CardComponent key={p.id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <div>
                <h4 style={{ fontWeight: "600" }}>{p.nome}</h4>
                <p style={{ fontSize: ".8rem", color: "#6c7c9a" }}>
                  Pagamento em {formatDate(p.dataPagamento)}
                </p>
              </div>

              <S.Content bgColor={statusColors.background}>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontWeight: "600",
                    color: "white",
                  }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 155 207"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 12.9C0 5.76469 5.76469 0 12.9 0H141.9C149.035 0 154.8 5.76469 154.8 12.9C154.8 20.0353 149.035 25.8 141.9 25.8V30.2344C141.9 47.3269 135.087 63.7341 122.993 75.8278L95.6213 103.2L122.993 130.572C135.087 142.666 141.9 159.073 141.9 176.166V180.6C149.035 180.6 154.8 186.365 154.8 193.5C154.8 200.635 149.035 206.4 141.9 206.4H12.9C5.76469 206.4 0 200.635 0 193.5C0 186.365 5.76469 180.6 12.9 180.6V176.166C12.9 159.073 19.7128 142.666 31.8066 130.572L59.1787 103.2L31.8066 75.8278C19.7128 63.7341 12.9 47.3269 12.9 30.2344V25.8C5.76469 25.8 0 20.0353 0 12.9ZM38.7 25.8V30.2344C38.7 40.5141 42.7716 50.3503 50.0278 57.6066L77.4 84.9787L104.772 57.6066C112.028 50.3503 116.1 40.5141 116.1 30.2344V25.8H38.7ZM38.7 180.6H116.1V176.166C116.1 165.886 112.028 156.05 104.772 148.793L77.4 121.421L50.0278 148.793C42.7716 156.05 38.7 165.886 38.7 176.166V180.6Z"
                      fill="white"
                    />
                  </svg>

                  {p.diasEmAtraso}
                </span>
              </S.Content>
            </div>

            <div
              style={{
                display: "flex",
              }}
            >
              <div style={{ width: "49%" }}>
                <p style={{ fontSize: ".8rem", color: "#6c7c9a" }}>
                  Valor Original
                </p>
                <p style={{ fontWeight: "600" }}>
                  {formatCurrency(p.valorOriginal)}
                </p>
              </div>

              <div>
                <p style={{ fontSize: ".8rem", color: "#6c7c9a" }}>
                  Valor Corrigido
                </p>
                <p style={{ fontWeight: "600", color: "#33cc66" }}>
                  {formatCurrency(p.valorCorrigido)}
                </p>
              </div>
            </div>
          </CardComponent>
        );
      })}
    </CardComponent>
  );
};

export default RegisteredPayment;
