export default function cnpjMask(value : any) {
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{2})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o 
      //primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{3})/, '$1/$2')
      .replace(/(\d{4})(\d{2})/, '$1-$2')
}

export function removeCnpjMask(value : any) : string {
  return value
    .replace(/\D/g, '')
}
