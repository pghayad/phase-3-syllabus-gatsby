import { rest } from 'msw';

export const response = {
  id: 1,
  name: 'Groceries',
  budget: 80,
  items: [
    {
      id: 1,
      name: 'Eggs',
      price: 3,
      purchased: false,
      shoppingListId: 1,
    },
    {
      id: 2,
      name: 'Coffee',
      price: 9,
      purchased: true,
      shoppingListId: 1,
    },
    {
      id: 3,
      name: 'Cereal',
      price: 4,
      purchased: true,
      shoppingListId: 1,
    },
  ],
};

export let nextId = 4;

export const handlers = [
  rest.get('https://localhost:3000/shopping_lists/1', (req, res, ctx) => {
    return res(ctx.delay(500), ctx.status(200, 'OK'), ctx.json(response));
  }),
  rest.post('https://localhost:3000/items', (req, res, ctx) => {
    const { shoppingListId, price, name } = req.body;

    if (typeof shoppingListId !== 'number') {
      return res(
        ctx.delay(500),
        ctx.status(400, 'Bad Request'),
        ctx.json({ error: 'shoppingListId must be a number' })
      );
    }

    if (typeof price !== 'number') {
      return res(
        ctx.delay(500),
        ctx.status(400, 'Bad Request'),
        ctx.json({ error: 'price must be a number' })
      );
    }

    if (typeof name !== 'string') {
      return res(
        ctx.delay(500),
        ctx.status(400, 'Bad Request'),
        ctx.json({ error: 'name must be a string' })
      );
    }

    const newItem = {
      id: ++nextId,
      price,
      name,
      shoppingListId,
      purchased: false,
    };

    response.items.push(newItem);

    return res(ctx.delay(500), ctx.status(201, 'OK'), ctx.json(newItem));
  }),
  rest.patch('https://localhost:3000/items/:id', (req, res, ctx) => {
    const { purchased } = req.body;

    const { id } = req.params;

    if (!id) {
      return res(ctx.delay(500), ctx.status(404, 'Not Found'));
    }

    if (typeof purchased !== 'boolean') {
      return res(
        ctx.delay(500),
        ctx.status(400, 'Bad Request'),
        ctx.json({ error: 'purchased must be a boolean' })
      );
    }

    const item = response.items.find(item => item.id == id);

    item.purchased = purchased;

    return res(ctx.delay(500), ctx.status(201, 'OK'), ctx.json(item));
  }),
  rest.delete('https://localhost:3000/items/:id', (req, res, ctx) => {
    const { id } = req.params;

    if (!id) {
      return res(ctx.delay(500), ctx.status(404, 'Not Found'));
    }

    response.items = response.items.filter(item => item.id != id);

    return res(ctx.delay(500), ctx.status(201, 'OK'), ctx.json({}));
  }),
];
