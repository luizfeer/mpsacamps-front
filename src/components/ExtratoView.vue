<template>
<div class="text-center mt-6">
    <!-- <button class="bg-blue-500 text-white w-full py-3 rounded-lg font-semibold text-sm" @click="imprimirComprovante">Imprimir Comprovante</button> -->
</div>
</template>

<script>
import {
  toRefs
} from 'vue'
// import pdfMake from 'pdfmake/build/pdfmake'
// import pdfFonts from 'pdfmake/build/vfs_fonts'

// pdfMake.vfs = pdfFonts.pdfMake.vfs

export default {
  props: {
    user: {
      type: Object,
      default: () => {}
    },
    evento: {
      type: Object,
      default: () => {}
    }
  },
  setup (props, {
    emit
  }) {
    const {
      user,
      evento
    } = toRefs(props)

    const option = {
      year: 'numeric',
      month: ('long' || 'short' || 'numeric'),
      weekday: ('long' || 'short'),
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }

    const imprimirComprovante = () => {
      const logo = new Image()
      logo.src = '/FEUPAM-logo.png'
      const documentDefinition = {
        content: [
        //   {
        //   image: logo,
        //   width: 90,
        //   height: 30
        // },
          {
            text: 'Comprovante de Inscrição Federacamps 2023',
            style: 'header',
            margin: [0, 20, 0, 8]
          },
          {
            table: {
              body: [
                ['Nome', user.value.name],
                ['Idade', user.value.idade],
                ['Gênero', user.value.genero],
                ['E-mail', user.value.email],
                ['Telefone', `(${user.value.ddd}) ${user.value.cellphone}`],
                ['Responsável', user.value.responsavel],
                ['Endereço', user.value.address],
                ['Complemento', user.value.complemento],
                ['CEP', user.value.cep],
                ['Cidade', user.value.cidade],
                ['Estado', user.value.estado],
                ['Igreja', user.value.church],
                ['Pastor', user.value.pastor],
                ['Documento do Responsável', user.value.documento_responsavel],
                ['Telefone do Responsável', `(${user.value.ddd_responsavel}) ${user.value.cellphone_responsavel}`],
                ['Alergia', user.value.alergia],
                ['Medicamento', user.value.medicamento],
                ['Informações Adicionais', user.value.info_add],
                ...(user.value.equipe ? [
                  ['Equipe', 'Sim']
                ] : [])
              ],
              margin: [0, 20, 0, 8]
            }
          },
          {
            text: 'Detalhes do Evento',
            style: 'subheader',
            margin: [0, 20, 0, 8]
          },
          {
            style: 'tableExample',
            margin: [0, 20, 0, 8],

            table: {
              body: [
                ['Evento', evento.value.evento],
                ['Valor', (evento.value.amount / 100).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })],
                ['Lote', evento.value.lote],
                ['Meio de Pagamento', evento.value.meio],
                ['Data do pagamento', (new Date(evento.value.createAt).toLocaleDateString('pt-BR', option))],
                ['Status', evento.value.status],
                ['Pagamento', evento.value.payLink],
                ['Código da Transação', evento.value.chargeId],
                ['Data da consulta', (new Date().toLocaleDateString('pt-BR', option))]
              ]
            },
            layout: {
              hLineWidth: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 2 : 1
              },
              vLineWidth: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 2 : 1
              },
              hLineColor: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 'black' : 'gray'
              },
              vLineColor: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray'
              }
            }
          },
          {
            text: 'Estou de acordo com as regras do acampamento:',
            style: 'subheader',
            margin: [0, 20, 0, 8]
          },

          {
            ul: [
              'A idade mínima para a participação do acampamento é de 12 anos completos.',
              'Respeitar a liderança do acampamento.',
              'Você está indo para um acampamento cristão e acreditamos que Deus tem muito a falar com você. Por isso, sua participação em todos os cultos é OBRIGATÓRIA.',
              'Os horários das programações devem ser cumpridos rigorosamente.',
              'É expressamente proibido o consumo de bebidas alcoólicas, cigarros ou qualquer tipo de substância toxica nas dependências do acampamento.',
              'Não é permitido o uso de qualquer tipo de rojão ou derivados.',
              'É proibido ir até ao rio.',
              'Os casais de namorados não devem se afastar dos grupos e é expressamente proibido “ficar" no acampamento.',
              'É proibido os meninos entrarem nos dormitórios femininos e vice-versa.',
              'É proibido sair dos limites do acampamento sem autorização.',
              'Respeitar o toque de recolher.',
              'Qualquer situação não prevista nas regras, será analisada pela liderança do acampamento, estando sujeito a medidas disciplinares.',
              'Na incidência de infração grave, o acampante poderá ser convidado a se retirar do acampamento sem a devolução do seu dinheiro.',
              'Em caso de desistência, o acampante não terá a devolução do valor já pago na inscrição.'
            ],
            margin: [0, 20, 0, 8]
          }
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
            alignment: 'center'
          },
          item: {
            margin: [0, 5, 0, 0]
          },
          defaultStyle: {
            font: 'Arial'
          }
        }
      }
      const bola = documentDefinition
      console.log(bola)
      // pdfMake.createPdf(documentDefinition).download('comprovante-inscricao.pdf')
    }

    return {
      imprimirComprovante

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
