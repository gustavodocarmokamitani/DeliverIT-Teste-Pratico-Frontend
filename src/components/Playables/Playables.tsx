import { useState } from "react";
import Input from "../Input/Input";
import { CardComponent } from "../../styles/common/Card";
import { HeaderComponent } from "../../styles/common/Header";
import { paymentService } from "../../services/paymentService";
import type { CreateAccountPayload } from "../../model/CreatePaymentPayload";
import * as S from "./Playables.styles";

const initialFormState: CreateAccountPayload = {
  nome: "",
  valorOriginal: 0,
  dataVencimento: "",
  dataPagamento: "",
};

const Playables = () => {
  const [formData, setFormData] =
    useState<CreateAccountPayload>(initialFormState);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "valorOriginal"
          ? parseFloat(value.replace(",", ".")) || 0
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      if (
        !formData.nome ||
        formData.valorOriginal <= 0 ||
        !formData.dataPagamento ||
        !formData.dataVencimento
      ) {
        setErrorMessage(
          "Por favor, preencha todos os campos obrigatórios corretamente."
        );
        setLoading(false);
        return;
      }

      await paymentService.createAccount(formData);

      setSuccessMessage(
        `Conta adicionar com sucesso."
        }`
      );
      setFormData(initialFormState);
    } catch (error) {
      let userMessage = "Erro desconhecido ao processar a conta.";

      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response
      ) {
        const axiosError = error as any;
        const responseData = axiosError.response.data;
        const statusCode = axiosError.response.status;

        if (
          statusCode === 500 &&
          responseData &&
          typeof responseData === "string"
        ) {
          const match = responseData.match(
            /System\.ArgumentException: (.*?)\r\n/
          );

          if (match && match[1]) {
            userMessage = match[1];
          } else {
            userMessage =
              "Erro no servidor (500). Verifique os logs do backend.";
          }
        } else if (statusCode >= 400 && statusCode < 500) {
          userMessage =
            responseData.message ||
            responseData.title ||
            `Erro ${statusCode} na requisição.`;
        }
      }

      console.error("Erro ao adicionar conta:", error);
      setErrorMessage(userMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardComponent as="form" onSubmit={handleSubmit}>
      <HeaderComponent>
        <h2>Adicionar Conta a Pagar</h2>
        <p>
          Preencha os dados da conta para calcular multas e juros
          automaticamente
        </p>
      </HeaderComponent>

      {successMessage && (
        <p style={{ textAlign: "center", color: "green" }}>{successMessage}</p>
      )}
      {errorMessage && (
        <p style={{ textAlign: "center", color: "red" }}>{errorMessage}</p>
      )}

      <Input
        type="text"
        placeholder="Ex: Conta de Luz"
        label="Nome da Conta"
        name="nome"
        value={formData.nome}
        onChange={handleInputChange}
      />

      <Input
        type="text"
        placeholder="0.00"
        label="Valor Original (R$)"
        name="valorOriginal"
        value={formData.valorOriginal || ""}
        onChange={handleInputChange}
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "49%", display: "flex", flexDirection: "column" }}>
          <Input
            type="date"
            label="Data de Vencimento"
            name="dataVencimento"
            value={formData.dataVencimento}
            onChange={handleInputChange}
          />
        </div>

        <div style={{ width: "49%", display: "flex", flexDirection: "column" }}>
          <Input
            type="date"
            label="Data de Pagamento"
            name="dataPagamento"
            value={formData.dataPagamento}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <S.ButtonComponent type="submit" disabled={loading}>
        {loading ? "Adicionando..." : "Adicionar Conta"}
      </S.ButtonComponent>
    </CardComponent>
  );
};

export default Playables;
