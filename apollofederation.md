# Apollo Federation

No caso dessa aplicação de estudos, temos dois microserviços, mas é possível que tenhamos diversos deles durante a vida, 
criemos novos e o front-end precisará se comunicar com cada um deles para listar informações e realizar outras ações. No
futuro, com diversos serviços disponíveis, fica complicado para o front-end especificar com qual deles irá se comunicar.

Nesse caso, utilizamos o Apollo Federation, que é responsável por criar o nosso *Gateway* ou *Apollo Gateway*, que tem seu
endereço próprio e fica responsável por garantir que o front-end possa acessar um único endereço e ele mesmo faz a comunicação 
com os microserviços que são necessários. Ou seja, ele entende quais informações são necessárias de cada serviço, fazendo o proxy
e enviando a requisição do FE para o serviço responsável por aquela informação.

Além disso, o *gateway* nos dá oportunidades incríveis, como junção de informações dos serviços, ou seja, ele recebe uma requisição do FE,
buscando da mesma query as informações necessárias, fazendo o PROXY e trazendo os dados.