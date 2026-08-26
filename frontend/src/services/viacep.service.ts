import axios from "axios";

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export async function fetchAddressByCep(
  cep: string,
): Promise<ViaCepResponse | null> {
  const cleanCep = cep.replace(/\D/g, "");
  if (cleanCep.length !== 8) {
    return null;
  }

  try {
    const response = await axios.get<ViaCepResponse>(
      `https://viacep.com.br/ws/${cleanCep}/json/`,
    );
    if (response.data.erro) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.error("Erro ao consultar ViaCEP:", error);
    return null;
  }
}
