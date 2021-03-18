// import our actions
import { reducer } from '../utils/reducers';
import { UPDATE_ITEMS, UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../utils/actions';

// create a sample of what our global state will look like
const initialState = {
  items: [],
  categories: [{ name: 'Appetizer' }],
  currentCategory: '1',
};

test('UPDATE_ITEMS', () => {
  const newState = reducer(initialState, {
    type: UPDATE_ITEMS,
    items: [{}, {}],
  });

  expect(newState.items.length).toBe(2);
  expect(initialState.items.length).toBe(0);
});

test('UPDATE_CATEGORIES', () => {
  const newState = reducer(initialState, {
    type: UPDATE_CATEGORIES,
    categories: [{}, {}],
  });

  expect(newState.categories.length).toBe(2);
  expect(initialState.categories.length).toBe(1);
});

test('UPDATE_CURRENT_CATEGORY', () => {
  const newState = reducer(initialState, {
    type: UPDATE_CURRENT_CATEGORY,
    currentCategory: '2',
  });

  expect(newState.currentCategory).toBe('2');
  expect(initialState.currentCategory).toBe('1');
});
