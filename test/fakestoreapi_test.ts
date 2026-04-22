const pactum = require('pactum');

const { settings, request } = pactum;

beforeAll(() => {
  settings.setLogLevel('ERROR');
  
  request.setDefaultHeaders({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
  });
});

describe('Fake Store API - 10 Cenários de Testes', () => {
  const BASE_URL = 'https://fakestoreapi.com';

  it('1. Deve listar todos os produtos', async () => {
    await pactum.spec()
      .get(`${BASE_URL}/products`)
      .expectStatus(200)
      .expectJsonLike([]); 
  });

  it('2. Deve buscar um produto específico (ID 1)', async () => {
    await pactum.spec()
      .get(`${BASE_URL}/products/1`)
      .expectStatus(200)
      .expectJsonSchema({
        "type": "object",
        "properties": { "id": { "type": "number" } }
      });
  });

  it('3. Deve limitar a quantidade de resultados (Limit 5)', async () => {
    await pactum.spec()
      .get(`${BASE_URL}/products`)
      .withQueryParams('limit', 5)
      .expectStatus(200)
      .expectJsonLength(5); 
  });

  it('4. Deve ordenar os produtos por ordem decrescente (Sort Desc)', async () => {
    await pactum.spec()
      .get(`${BASE_URL}/products`)
      .withQueryParams('sort', 'desc')
      .expectStatus(200);
  });

  it('5. Deve criar um novo produto (POST)', async () => {
    await pactum.spec()
      .post(`${BASE_URL}/products`)
      .withJson({
        title: 'Monitor Gamer',
        price: 1500,
        category: 'electronics'
      })
      .expectStatus(200); 
  });

  it('6. Deve atualizar um produto via PUT', async () => {
    await pactum.spec()
      .put(`${BASE_URL}/products/1`)
      .withJson({ title: 'Novo Título' })
      .expectStatus(200);
  });

  it('7. Deve deletar um produto', async () => {
    await pactum.spec()
      .delete(`${BASE_URL}/products/1`)
      .expectStatus(200);
  });

  it('8. Deve listar todas as categorias disponíveis', async () => {
    await pactum.spec()
      .get(`${BASE_URL}/products/categories`)
      .expectStatus(200)
      .expectJsonLike(["electronics", "jewelery"]);
  });

  it('9. Deve listar produtos de uma categoria específica (Jewelery)', async () => {
    await pactum.spec()
      .get(`${BASE_URL}/products/category/jewelery`)
      .expectStatus(200);
  });

  it('10. Deve realizar login de usuário com sucesso', async () => {
    await pactum.spec()
      .post(`${BASE_URL}/auth/login`)
      .withJson({
        username: 'mor_2314',
        password: '83r5^_',
      })
      .expectStatus(200) 
      .expectJsonLike({
        token: /.+/ 
      });
  });

});
