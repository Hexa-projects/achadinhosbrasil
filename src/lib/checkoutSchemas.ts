import { z } from "zod";

const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
const phoneRegex = /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/;
const cepRegex = /^\d{5}-?\d{3}$/;

export const identificationSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome completo").max(120),
  email: z.string().trim().email("Email inválido").max(255),
  phone: z.string().trim().regex(phoneRegex, "WhatsApp inválido. Ex: (11) 91234-5678"),
  cpf: z.string().trim().regex(cpfRegex, "CPF inválido"),
});

export const shippingSchema = z.object({
  zip: z.string().trim().regex(cepRegex, "CEP inválido"),
  street: z.string().trim().min(2, "Informe o endereço").max(200),
  number: z.string().trim().min(1, "Número obrigatório").max(20),
  complement: z.string().trim().max(120).optional(),
  neighborhood: z.string().trim().min(2, "Bairro obrigatório").max(120),
  city: z.string().trim().min(2, "Cidade obrigatória").max(120),
  state: z.string().trim().length(2, "UF (2 letras)"),
});

export type IdentificationData = z.infer<typeof identificationSchema>;
export type ShippingData = z.infer<typeof shippingSchema>;

export function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 10) {
    return d.replace(/(\d{2})(\d{0,4})(\d{0,4}).*/, (_, a, b, c) =>
      [a && `(${a}`, a.length === 2 && ") ", b, c && `-${c}`].filter(Boolean).join(""),
    );
  }
  return d.replace(/(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
}

export function maskCpf(v: string) {
  return v
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function maskCep(v: string) {
  return v.replace(/\D/g, "").slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2");
}
